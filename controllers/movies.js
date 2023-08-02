const Movie = require('../models/movie');
const NotFoundError = require('../errors/not-found-err');
const ForbiddenError = require('../errors/forbidden-err');
const { filmNotFound, filmDeleted, noPermission } = require('../utils/constants');

const getAllMovies = (req, res, next) => {
  Movie.find({})
    .then((movies) => {
      const userMovies = movies.filter((movie) => movie.owner.toHexString() === req.user._id);
      res.send(userMovies);
    })
    .catch(next);
};

const createNewMovie = (req, res, next) => {
  const newMovie = req.body;
  newMovie.owner = req.user._id;
  Movie.create(newMovie)
    .then((movie) => {
      res.status(201).send(movie);
    })
    .catch(next);
};

const deleteMovieById = (req, res, next) => {
  Movie.findById(req.params.movieId)
    .orFail(new NotFoundError(filmNotFound))
    .then((movie) => {
      if (movie.owner.equals(req.user._id)) {
        return Movie.findByIdAndDelete(req.params.movieId)
          .then(() => res.status(200).send({ message: filmDeleted }));
      }
      throw new ForbiddenError(noPermission);
    })
    .catch(next);
};

module.exports = { getAllMovies, createNewMovie, deleteMovieById };
