const { UserInputError, AuthenticationError } = require('apollo-server');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { Op } = require('sequelize');
const { User, Message } = require('../../models');

const env = process.env.NODE_ENV || 'development';
const { jwtSecretKey } = require('../../config/config')[env];

module.exports = {
  Query: {
    getUsers: async (_, __, { user }) => {
      try {
        if (!user) throw new AuthenticationError('Unauthenticated');

        let users = await User.findAll({
          attributes: ['username', 'imageUrl', 'createdAt'],
          where: { username: { [Op.ne]: user.username } },
        });

        const allUserMessages = await Message.findAll({
          where: {
            [Op.or]: [{ from: user.username }, { to: user.username }],
          },
          order: [['createdAt', 'DESC']],
        });

        users = users.map((otherUser) => {
          const latestMessage = allUserMessages.find(
            (message) => message.from === otherUser.username || message.to === otherUser.username,
          );
          otherUser.latestMessage = latestMessage;
          return otherUser;
        });

        return users;
      } catch (error) {
        console.log(error);
        throw error;
      }
    },
    login: async (_, args) => {
      const { username, password } = args;
      let errors = {};

      try {
        if (username.trim() === '') errors.username = 'Username must not be empty';
        if (password === '') errors.password = 'Password must not be empty';

        if (Object.keys(errors).length > 0) {
          throw new UserInputError('Bad input', { errors });
        }

        const user = await User.findOne({
          where: { username },
        });

        if (!user) {
          errors.username = 'User not found';
          throw new UserInputError('User not found', { errors });
        }

        const correctPassword = await bcrypt.compare(password, user.password);

        if (!correctPassword) {
          errors.password = 'Password is incorrect';
          throw new UserInputError('Password is incorrect', { errors });
        }

        const token = jwt.sign(
          {
            username,
          },
          jwtSecretKey,
          { expiresIn: '5h' },
        );

        return { ...user.toJSON(), createdAt: user.createdAt.toISOString(), token };
      } catch (error) {
        throw error;
      }
    },
  },
  Mutation: {
    register: async (_, args) => {
      let { username, email, password, confirmPassword } = args;
      let errors = {};
      try {
        if (!username.trim()) errors.username = 'Username must not be empty';
        if (!email.trim()) errors.email = 'Email must not be empty';
        if (!password.trim()) errors.password = 'Password must not be empty';
        if (!confirmPassword.trim()) errors.confirmPassword = 'Confirm password must not be empty';
        if (password !== confirmPassword.trim()) errors.confirmPassword = 'Passwords must match';

        if (Object.keys(errors).length > 0) {
          throw errors;
        }

        password = await bcrypt.hash(password, 6);

        const user = await User.create({
          username,
          email,
          password,
        });

        return user;
      } catch (error) {
        throw new UserInputError('Bad input', { errors: error });
      }
    },
  },
};
