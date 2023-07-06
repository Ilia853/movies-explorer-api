const Movie = require('../models/movieSchema');
const ForbiddenError = require('../errors/forbidden-err');
const NotFoundError = require('../errors/not-found-err');
const BadRequestError = require('../errors/bad-request-err');

const deleteMovie = (req, res, next) => {
  Movie.findById(req.params.movieId)
    .then((movie) => {
      if (movie) {
        if (movie.owner.toString() === req.user._id) {
          return Movie.findByIdAndRemove(req.params.movieId)
            .then(() => res.status(200).send(movie));
        }
        throw new ForbiddenError('ошибка доступа');
      } else {
        throw new NotFoundError('Карточка не найдена');
      }
    })
    .catch(next);
};

const createMovie = (req, res, next) => {
  const owner = req.user._id;
  const {
    country, director, duration, year,
    description, image, trailerLink, thumbnail, movieId,
    nameRU, nameEN,
  } = req.body;
  Movie.create({
    owner,
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    thumbnail,
    movieId,
    nameRU,
    nameEN,
  })
    .then((movie) => res.status(201).send(movie))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new BadRequestError('Некорректные данные фильма'));
      } else {
        next(err);
      }
    });
};

const getMovies = (req, res, next) => {
  Movie.find({ owner: req.user._id })
    .then((movies) => res.status(200).send(movies))
    .catch(next);
};

module.exports = {
  deleteMovie,
  createMovie,
  getMovies,
};
