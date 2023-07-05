const Movie = require('../models/movieSchema');
const ForbiddenError = require('../errors/forbidden-err');
const NotFoundError = require('../errors/not-found-err');

const deleteMovie = (req, res, next) => {
  Movie.findById(req.params.movieId)
    .then((movie) => {
      if (movie) {
        if (movie.owner.toString() === req.user._id) {
          return Movie.findByIdAndRemove(req.params.movieId)
            .then(() => res.status(200).send(movie));
        }
        throw new ForbiddenError('сначала сохраните фильм');
      } else {
        throw new NotFoundError('Карточка не найдена');
      }
    })
    .catch(next);
};

module.exports = {
  deleteMovie,
};
