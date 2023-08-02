const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const NotFoundError = require('../errors/not-found-err');
const { successAuth, successSignout, userNotFound } = require('../utils/constants');

const createUser = (req, res, next) => {
  const newUser = req.body;
  bcrypt.hash(newUser.password, 10)
    .then((hash) => User.create({
      name: newUser.name,
      email: newUser.email,
      password: hash,
    }))
    .then(({ name, email }) => res.status(201).send({ name, email }))
    .catch(next);
};

const signin = (req, res, next) => {
  const { email, password } = req.body;

  return User.findUserByCredentials(email, password)
    .then((user) => {
      const { NODE_ENV, JWT_SECRET } = process.env;

      const token = jwt.sign(
        { _id: user._id },
        NODE_ENV === 'prodaction' ? JWT_SECRET : 'dev-secret',
        { expiresIn: '7d' },
      );

      res.status(200).cookie('jwt', token, {
        maxAge: 3600000 * 24 * 7,
        httpOnly: true,
        sameSite: true,
      })
        .send({ message: successAuth })
        .end();
    })
    .catch(next);
};

const signout = (req, res) => {
  res
    .clearCookie('jwt')
    .status(200)
    .send({ message: successSignout });
};

const getUserInfo = (req, res, next) => {
  User.findById(req.user._id)
    .orFail(new NotFoundError(userNotFound))
    .then((user) => res.send(user))
    .catch(next);
};

const changeUserInfo = (req, res, next) => {
  const newUserInfo = req.body;
  User.findByIdAndUpdate(
    req.user._id,
    newUserInfo,
    { new: true, runValidators: true },
  )
    .orFail(new NotFoundError(userNotFound))
    .then((user) => res.send(user))
    .catch(next);
};

module.exports = {
  getUserInfo,
  changeUserInfo,
  createUser,
  signin,
  signout,
};
