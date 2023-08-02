const router = require('express').Router();
const { celebrate, Segments } = require('celebrate');
const { getAllMovies, createNewMovie, deleteMovieById } = require('../controllers/movies');
const { newMovieValid, movieIdValid } = require('../utils/validationopt');

router.get('', getAllMovies);

router.post('', celebrate({
  [Segments.BODY]: newMovieValid,
}), createNewMovie);

router.delete('/:movieId', celebrate({
  [Segments.PARAMS]: movieIdValid,
}), deleteMovieById);

module.exports = router;
