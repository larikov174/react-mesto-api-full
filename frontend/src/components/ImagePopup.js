import React from 'react';

function ImagePopup({ card, isOpen, onClose }) {
  const handleOverlayClick = (evt) => evt.target === evt.currentTarget && onClose();

  return (
    <div
      id="imageWindow"
      className={`popup ${isOpen ? 'popup_opened' : ''}`}
      role="presentation"
      onClick={handleOverlayClick}
    >
      <div className="popup__container">
        <button className="popup__close-button" type="button" onClick={onClose} />
        <figure className="popup__figure">
          <img className="popup__pic" src={card.src} alt={card.title} />
          <figcaption className="popup__figcaption">{card.title}</figcaption>
        </figure>
      </div>
    </div>
  );
}

export default ImagePopup;
