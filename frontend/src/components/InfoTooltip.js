import React from 'react';

export default function InfoTooltip({ isOpen, onClose, noteType }) {
  const titles = {
    pass: 'Вы успешно зарегистрировались!',
    fail: 'Что-то пошло не так! Попробуйте ещё раз.',
  };
  const handleOverlayClick = (evt) => evt.target === evt.currentTarget && onClose();

  return (
    <div
      id="infoTooltip"
      className={`popup ${isOpen ? 'popup_opened' : ''}`}
      role="presentation"
      onClick={handleOverlayClick}
    >
      <div className="popup__container popup__container_data">
        <div className="popup__window">
          <button
            className="popup__close-button"
            type="button"
            name="closePopup"
            onClick={onClose}
          />
          <div className={`popup__toolTip-image ${!noteType && 'popup__toolTip-image_fail'}`} />
          <h2 className="popup__title popup__toolTip-title">
            {noteType ? titles.pass : titles.fail}
          </h2>
        </div>
      </div>
    </div>
  );
}
