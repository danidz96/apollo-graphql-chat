const { User } = require('../models');

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
      const { username, email, password, confirmPassword } = args;
      try {
        // TODO: Validate input data
        // TODO: Check if username / email exists
        // TODO: Hash password
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
