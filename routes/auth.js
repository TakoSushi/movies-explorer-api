const router = require('express').Router();
const { celebrate, Segments } = require('celebrate');
const { createUser, signin, signout } = require('../controllers/users');
const { signupValid, signinValid } = require('../utils/validationopt');

router.post('/signup', celebrate({
  [Segments.BODY]: signupValid,
}), createUser);

router.post('/signin', celebrate({
  [Segments.BODY]: signinValid,
}), signin);

router.post('/signout', signout);

module.exports = router;
