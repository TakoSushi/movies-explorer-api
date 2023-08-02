const jwt = require('jsonwebtoken');
const UnauthorizedError = require('../errors/unauthorized-err');
const { needAuth } = require('../utils/constants');

module.exports = (req, res, next) => {
  const authorization = req.cookies.jwt;
  if (!authorization) {
    throw new UnauthorizedError(needAuth);
  }

  const token = authorization.replace('Bearer ', '');
  let payload;
  try {
    const { NODE_ENV, JWT_SECRET } = process.env;

    payload = jwt.verify(token, NODE_ENV === 'prodaction' ? JWT_SECRET : 'dev-secret');
  } catch (err) {
    throw new UnauthorizedError(needAuth);
  }

  req.user = payload;
  next();
};
