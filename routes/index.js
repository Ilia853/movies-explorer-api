// eslint-disable-next-line import/no-extraneous-dependencies
const router = require('express').Router();
const NotFoundError = require('../errors/not-found-err');
// const { celebrate, Joi } = require('celebrate');

const userRouter = require('./users');
// const movieRouter = require('./movies');

router.use('/users', userRouter);
// outer.use('/movies', movieRouter);

router.all('*', (req, res, next) => {
  next(new NotFoundError('Станица не найдена'));
});

module.exports = router;
