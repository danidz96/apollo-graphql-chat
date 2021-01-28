const { User } = require('../models');
const { UserInputError, AuthenticationError } = require('apollo-server');
const bcrypt = require('bcryptjs');

module.exports = {
  Query: {
    getUsers: async () => {
      try {
        const users = await User.findAll();
        return users;
      } catch (error) {
        console.log(error);
      }
    },
    login: async (_, args) => {
      const { username, password } = args;
      let errors = {};
      try {
        const user = await User.findOne({
          where: { username },
        });
        if (!user) {
          errors.username = 'user not found';
          throw new UserInputError('User not found', { errors });
        }

        const correctPassword = await bcrypt.compare(password, user.password);

        if (!correctPassword) {
          errors.password = 'password is incorrect';
          throw new AuthenticationError('Password is incorrect', { errors });
        }

        return user;
      } catch (error) {
        console.log(error);
      }
    },
  },
  Mutation: {
    register: async (_, args) => {
      let { username, email, password, confirmPassword } = args;
      let errors = {};
      try {
        if (!username.trim()) errors.username = 'username must not be empty';
        if (!email.trim()) errors.email = 'email must not be empty';
        if (!password.trim()) errors.password = 'password must not be empty';
        if (!confirmPassword.trim()) errors.confirmPassword = 'repeat password must not be empty';
        if (password !== confirmPassword.trim()) errors.confirmPassword = 'passwords must match';

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
