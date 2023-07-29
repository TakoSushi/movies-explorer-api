const Movie = require('../models/movie');
const NotFoundError = require('../errors/not-found-err');
const ForbiddenError = require('../errors/forbidden-err');

const getAllMovies = (req, res, next) => {
  Movie.find({})
    .then((movies) => res.send(movies))
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
    .orFail(new NotFoundError('Карточка не найдена'))
    .then((movie) => {
      if (movie.owner.equals(req.user._id)) {
        return Movie.findByIdAndDelete(req.params.movieId)
          .then(() => res.status(200).send({ message: 'Фильм удален' }));
      }
      throw new ForbiddenError('Недостаточно прав');
    })
    .catch(next);
};

module.exports = { getAllMovies, createNewMovie, deleteMovieById };
