import React from 'react';

function PopupWithForm({ title, name, children, isOpen, onClose, btnCaption, onSubmit }) {
  const handleOverlayClick = (evt) => evt.target === evt.currentTarget && onClose();

  return (
    <div
      id={name}
      className={`popup ${isOpen ? 'popup_opened' : ''}`}
      role="presentation"
      onClick={handleOverlayClick}
    >
      <form className="popup__container popup__container_data" name={name} onSubmit={onSubmit}>
        <div className="popup__window">
          <button
            className="popup__close-button"
            type="button"
            name="closePopup"
            onClick={onClose}
          />
          <h2 className="popup__title">{title}</h2>
          {children}
          <button className="popup__submit-button" type="submit" name="submitPopup">
            {btnCaption}
          </button>
        </div>
      </form>
    </div>
  );
}

export default PopupWithForm;
