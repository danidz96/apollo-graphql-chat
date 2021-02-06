const { gql } = require('apollo-server');

module.exports = gql`
  type User {
    username: String!
    email: String!
    createdAt: String!
    token: String
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
  type Mutation {
    register(username: String!, email: String!, password: String!, confirmPassword: String!): User!
    sendMessage(to: String!, content: String!): Message!
  }
`;
