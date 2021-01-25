const { User } = require('../models');
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
  },
  Mutation: {
    register: async (parent, args) => {
      let { username, email, password, confirmPassword } = args;
      try {
        // TODO: Validate input data
        // TODO: Check if username / email exists

        password = await bcrypt.hash(password, 6);

        const user = await User.create({
          username,
          email,
          password,
        });

        return user;
      } catch (error) {
        console.log(error);
        throw error;
      }
    },
  },
};
