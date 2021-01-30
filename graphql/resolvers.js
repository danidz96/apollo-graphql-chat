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
        if (username.trim() === '') errors.username = 'username must not be empty';
        if (password === '') errors.password = 'password must not be empty';

        if (Object.keys(errors).length > 0) {
          return new UserInputError('Bad input', { errors });
        }

        const user = await User.findOne({
          where: { username },
        });

        if (!user) {
          errors.username = 'user not found';
          return new UserInputError('User not found', { errors });
        }

        const correctPassword = await bcrypt.compare(password, user.password);

        if (!correctPassword) {
          errors.password = 'password is incorrect';
          return new AuthenticationError('Password is incorrect', { errors });
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
          return errors;
        }

        password = await bcrypt.hash(password, 6);

        const user = await User.create({
          username,
          email,
          password,
        });

        return user;
      } catch (error) {
        return new UserInputError('Bad input', { errors: error });
      }
    },
  },
};
