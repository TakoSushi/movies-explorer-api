const { Joi } = require('celebrate');

const userInfoValid = Joi.object().keys({
  name: Joi.string().required().min(2).max(30),
  email: Joi.string().required().email(),
});

const signupValid = Joi.object().keys({
  name: Joi.string().required().min(2).max(30),
  email: Joi.string().required().email(),
  password: Joi.string().required().min(8),
});

const signinValid = Joi.object().keys({
  email: Joi.string().required().email(),
  password: Joi.string().required().min(8),
});

const newMovieValid = Joi.object().keys({
  country: Joi.string().required(),
  director: Joi.string().required(),
  duration: Joi.number().required(),
  year: Joi.string().required(),
  description: Joi.string().required(),
  image: Joi.string().required().uri(),
  trailerLink: Joi.string().required().uri(),
  thumbnail: Joi.string().required().uri(),
  movieId: Joi.number().required(),
  nameRU: Joi.string().required(),
  nameEN: Joi.string().required(),
});

const movieIdValid = Joi.object().keys({
  movieId: Joi.string().length(24).hex().required(),
});

module.exports = {
  userInfoValid,
  signupValid,
  signinValid,
  newMovieValid,
  movieIdValid,
};
