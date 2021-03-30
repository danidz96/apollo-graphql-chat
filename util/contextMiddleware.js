const jwt = require('jsonwebtoken');
const { PubSub } = require('apollo-server');

const pubSub = new PubSub();

const env = process.env.NODE_ENV || 'development';
const { jwtSecretKey } = require('../config/config')[env];

module.exports = (context) => {
  let token;
  if (context.req?.headers?.authorization) {
    token = context.req.headers.authorization.split('Bearer ')[1];
  } else if (context.connection?.context.Authorization) {
    token = context.connection.context.Authorization.split('Bearer ')[1];
  }

  if (token) {
    jwt.verify(token, jwtSecretKey, (err, decodedToken) => {
      context.user = decodedToken;
    });
  }

  context.pubSub = pubSub;

  return context;
};
