const Card = require('../models/card');
const CustomError = require('../utils/CustomError');

module.exports.getCards = (req, res, next) => {
  Card.find({})
    .populate(['owner', 'likes'])
    .then((Cards) => res.status(200).send(Cards.sort((a, b) => b.createdAt - a.createdAt)))
    .catch(next);
};

module.exports.createCard = (req, res, next) => {
  const { name, link } = req.body;
  Card.create({ name, link, owner: req.user._id })
    .then((card) => Card.findById(card._id)
      .populate(['owner'])
      .orFail(new CustomError(404, 'Карточка по указанному _id не найдена'))
      .then((newCard) => res.status(200).send(newCard)))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new CustomError(400, 'Переданы невалидные данные.'));
      } else { next(err); }
    });
};

module.exports.deleteCard = (req, res, next) => {
  Card.findById(req.params.id)
    .orFail(new CustomError(404, 'Карточка по указанному _id не найдена'))
    .then((card) => {
      if (card.owner.equals(req.user._id)) {
        Card.findByIdAndDelete(req.params.id)
          .populate(['owner', 'likes'])
          .orFail(new CustomError(404, 'Карточка по указанному _id не найдена'))
          .then((deletedCard) => res.status(200).send(deletedCard));
      } else {
        throw new CustomError(403, 'У вас нет прав на это действие');
      }
    })
    .catch(next);
};

module.exports.likeCard = (req, res, next) => Card.findByIdAndUpdate(
  req.params.id,
  { $addToSet: { likes: req.user._id } },
  { new: true },
)
  .populate(['owner', 'likes'])
  .orFail(new CustomError(404, 'Карточка по указанному _id не найдена'))
  .then((card) => res.status(200).send(card))
  .catch(next);

module.exports.dislikeCard = (req, res, next) => Card.findByIdAndUpdate(
  req.params.id,
  { $pull: { likes: req.user._id } },
  { new: true },
)
  .populate(['owner', 'likes'])
  .orFail(new CustomError(404, 'Карточка по указанному _id не найдена'))
  .then((card) => res.status(200).send(card))
  .catch(next);
