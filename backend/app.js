require('dotenv').config();
const express = require('express');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const helmet = require('helmet');
const { celebrate, Joi, errors } = require('celebrate');
const { createUser, login, logout } = require('./controllers/users');
const CustomError = require('./utils/CustomError');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const auth = require('./middlewares/auth');
const cors = require('./middlewares/cors');
const cards = require('./routes/cards');
const users = require('./routes/users');

const { PORT = 3000 } = process.env;
const db = 'mongodb://localhost:27017/mestodb';

mongoose
  .connect(db, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log('Connected to DB'))
  .catch((error) => console.log(error));

const app = express();

app.use(helmet());
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(requestLogger);

app.use(cors);

app.post(
  '/login',
  celebrate({
    body: Joi.object().keys({
      email: Joi.string().required().email(),
      password: Joi.string().required().min(3),
    }),
  }),
  login,
);

app.post(
  '/register',
  celebrate({
    body: Joi.object().keys({
      email: Joi.string().required().email(),
      password: Joi.string().required().min(3),
      name: Joi.string().min(2).max(40),
      about: Joi.string().min(2).max(200),
      avatar: Joi.string().pattern(/^(https?:\/\/(www\.)?)[\w-]+\.[\w./():,-]+#?$/),
    }),
  }),
  createUser,
);

app.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Сервер сейчас упадёт');
  }, 0);
});

app.use(auth);
app.use('/cards', cards);
app.use('/users', users);
app.get('/logout', logout);

app.use(errorLogger);
app.use(errors());

app.use(() => {
  throw new CustomError(404, 'Запрашиваемый ресурс не найден');
});

// eslint-disable-next-line
app.use((err, req, res, next) => {
  const { statusCode = 500, message } = err;
  res.status(statusCode).send({
    message: !message ? 'На сервере произошла ошибка' : message,
  });
});

app.listen(PORT, (error) => {
  // eslint-disable-next-line
  error ? console.log(error) : console.log(`listening port ${PORT}`);
});
