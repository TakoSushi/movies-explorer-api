const router = require('express').Router();
const { getAllMovies, createNewMovie, deleteMovieById } = require('../controllers/movies');

router.get('', getAllMovies);

router.post('', createNewMovie);

router.delete('/:movieId', deleteMovieById);

module.exports = router;
