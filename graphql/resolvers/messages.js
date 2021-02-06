const { UserInputError, AuthenticationError } = require('apollo-server');
const { Op } = require('sequelize');
const { User, Message } = require('../../models');

module.exports = {
  Query: {
    getMessages: async (_, { from }, { user }) => {
      try {
        if (!user) throw new AuthenticationError('Unauthenticated');

        const otherUser = await User.findOne({ where: { username: from } });
        if (!otherUser) throw new AuthenticationError('Unauthenticated');

        const usernames = [user.username, otherUser.username];

        const messages = await Message.findAll({
          where: {
            from: { [Op.in]: usernames },
            to: { [Op.in]: usernames },
          },
          order: [['createdAt', 'DESC']],
        });

        return messages;
      } catch (error) {
        console.log(error);
        throw error;
      }
    },
  },
  Mutation: {
    sendMessage: async (_, { to, content }, { user }) => {
      try {
        if (!user) throw new AuthenticationError('Unauthenticated');

        const recipient = await User.findOne({ where: { username: to } });

        if (!recipient) {
          throw new UserInputError('User not found');
        } else if (recipient.username === user.username) {
          throw new UserInputError("You can't message yourself");
        }

        if (content.trim() === '') throw new UserInputError('Message is empty');

        const message = await Message.create({ from: user.username, to, content });
        return message;
      } catch (error) {
        console.log(error);
        throw error;
      }
    },
  },
};
