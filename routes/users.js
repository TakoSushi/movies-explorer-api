const router = require('express').Router();
const { celebrate, Segments } = require('celebrate');
const { getUserInfo, changeUserInfo } = require('../controllers/users');
const { userInfoValid } = require('../utils/validationopt');

router.get('/me', getUserInfo);

router.patch('/me', celebrate({
  [Segments.BODY]: userInfoValid,
}), changeUserInfo);

module.exports = router;
