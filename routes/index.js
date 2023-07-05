// eslint-disable-next-line import/no-extraneous-dependencies
const router = require('express').Router();
// eslint-disable-next-line import/no-extraneous-dependencies
const { celebrate, Joi } = require('celebrate');
const { auth } = require('../middlewares/auth');
const NotFoundError = require('../errors/not-found-err');
const { createUser, login } = require('../controllers/usersControllers');
const { requestLogger } = require('../middlewares/logger');

const userRouter = require('./users');
const movieRouter = require('./movies');

router.use(requestLogger);

router.post('/signin', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(6),
  }),
}), login);

router.post('/signup', celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).alphanum().max(30),
    email: Joi.string().required().email(),
    password: Joi.string().required().min(6),
  }),
}), createUser);

router.use(auth);

router.use('/users', userRouter);
router.use('/movies', movieRouter);

router.all('*', (req, res, next) => {
  next(new NotFoundError('Станица не найдена'));
});

module.exports = router;
