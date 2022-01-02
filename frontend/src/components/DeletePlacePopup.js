import React from 'react';
import PopupWithForm from './PopupWithForm';

function DeletePlacePopup({ isOpen, onClose, onCardDelete }) {
  const [buttonTitle, setButtonTitle] = React.useState('Да');
  const handleSubmit = (e) => {
    e.preventDefault();
    setButtonTitle('Обработка...');
    onCardDelete()
      .then(() => setButtonTitle('Да'))
      .catch(() => setButtonTitle('Ошибка!'));
  };

  return (
    <PopupWithForm
      name="cardDeleteForm"
      title="Вы уверены?"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      btnCaption={buttonTitle}
    />
  );
}

export default DeletePlacePopup;
