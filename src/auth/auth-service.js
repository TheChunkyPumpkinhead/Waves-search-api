// log in services

const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('../config');
const { JWT_SECRET } = require('../config');

const AuthService = {
  getUserWithUserName(db, email) {
    return db('users')
      .where('email', email)
      .first();
  },
  comparePasswords(password, hash) {
    return bcrypt.compare(password, hash);
  },
  creatJWT(subject, payload) {
    return jwt.sign(payload, config.JWT_SECRET, {
      subject,
      algorithm: 'HS256',
    });
  },
  verifyJwt(token) {
    console.log('verify jwt', token, config.JWT_SECRET);
    return jwt.verify(token, config.JWT_SECRET, {
      algorithms: ['HS256'],
    });
  },
  parseBasicToken(token) {
    return Buffer
      .from(token, 'base64')
      .toString()
      .split(':');
  },
};

module.exports = AuthService; 