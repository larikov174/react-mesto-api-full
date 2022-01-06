const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

const { NODE_ENV, JWT_SECRET } = process.env;
const CustomError = require('../utils/CustomError');

module.exports.getUsers = (req, res, next) => {
  User.find({})
    .then((users) => res.status(200).send(users))
    .catch(next);
};

module.exports.getUser = (req, res, next) => {
  console.log(req.user);
  User.findById(req.user._id)
    .orFail(new CustomError(404, 'Данный пользователь не найден'))
    .then((user) => res.status(200).send(user))
    .catch(next);
};

module.exports.getUserById = (req, res, next) => {
  User.findById(req.params.id)
    .orFail(new CustomError(404, 'Данный пользователь не найден'))
    .then((user) => res.status(200).send(user))
    .catch(next);
};

module.exports.createUser = (req, res, next) => {
  const {
    email, password, name, about, avatar,
  } = req.body;
  bcrypt.hash(password, 10).then((hashPassword) => {
    User.init()
      .then(() => User.create({
        password: hashPassword, email, name, about, avatar,
      }))
      .then((user) => res.status(200).send({ _id: user._id }))
      .catch((err) => {
        if (err.code === 11000) {
          next(new CustomError(409, `db err code ${err.code} (email уже зарегистрирован)`));
        } else if (err.name === 'ValidationError') {
          next(new CustomError(400, 'Переданы невалидные данные.'));
        } else { next(err); }
      });
  });
};

module.exports.login = (req, res, next) => {
  const { email, password } = req.body;
  User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign(
        { _id: user._id },
        NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret',
        { expiresIn: '7d' },
      );
      res.cookie('jwt', token, {
        maxAge: 604800,
        httpOnly: true,
        sameSite: true,
      })
        .end();
    })
    .catch(next);
};

module.exports.logout = (req, res) => {
  const token = req.cookies.jwt;
  res.clearCookie('jwt', token, {
    maxAge: 604800,
    httpOnly: true,
    sameSite: true,
  });
  return res.status(200).send('сессия закрыта');
};

module.exports.updateUserData = (req, res, next) => {
  const { name, about } = req.body;
  User.findByIdAndUpdate(
    req.user._id,
    { name, about },
    { new: true, runValidators: true },
  )
    .orFail(new CustomError(404, 'Данный пользователь не найден'))
    .then((user) => res.status(200).send({
      name: user.name,
      about: user.about,
    }))
    .catch(next);
};

module.exports.updateUserAvatar = (req, res, next) => {
  const { avatar } = req.body;
  User.findByIdAndUpdate(
    req.user._id,
    { avatar },
    { new: true, runValidators: true },
  )
    .orFail(new CustomError(404, 'Данный пользователь не найден'))
    .then((user) => res.status(200).send({
      avatar: user.avatar,
    }))
    .catch(next);
};
