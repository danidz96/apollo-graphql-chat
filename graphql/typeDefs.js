const { gql } = require('apollo-server');

module.exports = gql`
  type User {
    username: String!
    createdAt: String!
    token: String
    imageUrl: String
    latestMessage: Message
  }
  type Query {
    getUsers: [User]!
    login(username: String!, password: String!): User!
    getMessages(from: String!): [Message]!
  }
  type Message {
    uuid: String!
    from: String!
    to: String!
    content: String!
    createdAt: String!
  }
  type Reaction {
    uuid: String!
    content: String!
    createdAt: String!
    Message: Message!
    User: User!
  }
  type Mutation {
    register(username: String!, email: String!, password: String!, confirmPassword: String!): User!
    sendMessage(to: String!, content: String!): Message!
    reactToMessage(uuid: String!, content: String!): Reaction!
  }
  type Subscription {
    newMessage: Message!
  }
`;
