import React, { useContext } from 'react';
import CurrentUserContext from '../contexts/CurrentUserContext';

function Card({ card, onCardClick, onCardLike, onCardDelete }) {
  const { user } = useContext(CurrentUserContext);
  const isLiked = card.likes.some((likeHolder) => likeHolder._id === user._id);
  const cardLikeButtonClassName = `card__like-button ${isLiked && 'card__like-button_active'}`;
  const isOwn = true;
  const cardDeleteButtonClassName = `card__delete-button ${
    isOwn ? 'card__delete-button_visible' : 'card__delete-button_hidden'
  }`;

  return (
    <li className="card">
      <img className="card__image" src={card.link} alt={card.name} />
      <div
        role="presentation"
        className="card__overlay"
        onClick={() => {
          onCardClick({ src: card.link, title: card.name });
        }}
      />
      <button
        className={cardDeleteButtonClassName}
        type="button"
        onClick={() => {
          onCardDelete(card);
        }}
      />
      <div className="card__items">
        <h2 className="card__caption">{card.name}</h2>
        <div className="card__like-block">
          <button
            className={cardLikeButtonClassName}
            type="button"
            onClick={() => {
              onCardLike(card, isLiked);
            }}
          />
          <p className="card__like-counter">{card.likes.length}</p>
        </div>
      </div>
    </li>
  );
}

export default Card;
