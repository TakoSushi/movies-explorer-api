const router = require('express').Router();
const { celebrate, Joi, Segments } = require('celebrate');
const { getUserInfo, changeUserInfo } = require('../controllers/users');

router.get('/me', getUserInfo);

router.patch('/me', celebrate({
  [Segments.BODY]: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    email: Joi.string().required().email(),
  }),
}), changeUserInfo);

module.exports = router;
