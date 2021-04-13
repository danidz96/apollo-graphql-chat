const { UserInputError, AuthenticationError, ForbidenError, withFilter } = require('apollo-server');
const { Op } = require('sequelize');
const { User, Message, Reaction } = require('../../models');

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
    sendMessage: async (_, { to, content }, { user, pubSub }) => {
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

        pubSub.publish('NEW_MESSAGE', { newMessage: message });

        return message;
      } catch (error) {
        console.log(error);
        throw error;
      }
    },
    reactToMessage: async (_, { uuid, content }, { user }) => {
      const reactions = ['👍', '👎', '👌', '👏', '❤️', '😄', '😮', '😢', '😡'];
      try {
        if (!reactions.includes(content)) {
          throw new UserInputError('Invalid reaction');
        }

        const username = user ? user.username : '';
        user = await User.findOne({ where: { username } });
        if (!user) {
          throw new AuthenticationError('Unauthenticated');
        }

        const message = await Message.findOne({ where: { uuid } });
        if (!message) {
          throw new UserInputError('Message not found');
        }

        if (message.from !== user.username && message.to !== user.username) {
          throw new ForbidenError('Unauthorized');
        }

        let reaction = await Reaction.findOne({ where: { messageId: message.id, userId: user.id } });

        if (reaction) {
          reaction.content = content;
          await reaction.save();
        } else {
          reaction = await Reactions.create({ messageId: message.id, userId: user.id, content });
        }

        return reaction;
      } catch (error) {
        throw error;
      }
    },
  },
  Subscription: {
    newMessage: {
      subscribe: withFilter(
        (_, __, { pubSub, user }) => {
          if (!user) throw new AuthenticationError('Unauthenticated');
          return pubSub.asyncIterator(['NEW_MESSAGE']);
        },
        ({ newMessage }, _, { user }) => {
          if (newMessage.from === user.username || newMessage.to === user.username) {
            return true;
          }

          return false;
        },
      ),
    },
  },
};
