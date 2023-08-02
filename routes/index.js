const router = require('express').Router();
const { errors } = require('celebrate');
const userRoutes = require('./users');
const movieRoutes = require('./movies');
const authRoutes = require('./auth');
const auth = require('../middlewares/auth');
const { errorLogger } = require('../middlewares/logger');
const errorsHandler = require('../middlewares/errorshandler');
const NotFoundError = require('../errors/not-found-err');
const { incorrectPath } = require('../utils/constants');

router.use('', authRoutes);

router.use(auth);

router.use('/users', userRoutes);
router.use('/movies', movieRoutes);

router.use('*', () => {
  throw new NotFoundError(incorrectPath);
});

router.use(errorLogger);
router.use(errors());
router.use(errorsHandler);

module.exports = router;
