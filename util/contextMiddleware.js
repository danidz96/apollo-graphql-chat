const jwt = require('jsonwebtoken');
const { AuthenticationError } = require('apollo-server');

const env = process.env.NODE_ENV || 'development';
const { jwtSecretKey } = require('../config/config')[env];

module.exports = (context) => {
  if (context.req?.headers?.authorization) {
    const token = context.req.headers.authorization.split('Bearer ')[1];

    jwt.verify(token, jwtSecretKey, (err, decodedToken) => {
      if (err) {
        throw new AuthenticationError('Unauthenticated');
      }
      context.user = decodedToken;
    });
  }

  return context;
};
