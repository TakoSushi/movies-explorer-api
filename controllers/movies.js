const Movie = require('../models/movie');
const NotFoundError = require('../errors/not-found-err');

const getAllMovies = (req, res, next) => {
  Movie.find({})
    .then((movies) => res.send(movies))
    .catch(next);
};

const createNewMovie = (req, res, next) => {
  const newMovie = req.body;
  newMovie.owner = req.user._id;
  Movie.create(newMovie)
    .then((movie) => res.status(201).sent(movie))
    .catch(next);
};

const deleteMovieById = (req, res, next) => {
  Movie.findByIdAndDelete(req.params.movieId)
    .orFail(new NotFoundError('Карточка не найдена'))
    .then(() => res.status(200).send({ message: 'Фильм удален' }))
    .catch(next);
};

// Card.findById(req.params.cardId)
// .orFail(new NotFoundError('Карточка не найдена'))
// .then((card) => {
//   if (card.owner.equals(req.user._id)) {
//     return Card.findByIdAndDelete(req.params.cardId)
//       .then(() => res.status(200).send({ message: 'Пост удален' }));
//   }
//   throw new ForbiddenError('Недостаточно прав');
// })
// .catch(next);
// };

module.exports = { getAllMovies, createNewMovie, deleteMovieById };
