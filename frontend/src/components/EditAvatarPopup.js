import React from 'react';
import PopupWithForm from './PopupWithForm';

function EditAvatarPopup({ isOpen, onClose, onUpdateAvatar }) {
  const [buttonTitle, setButtonTitle] = React.useState('Сохранить');
  const link = React.useRef();
  const resetInput = () => {
    link.current.value = '';
    setButtonTitle('Сохранить');
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    setButtonTitle('Обработка...');
    onUpdateAvatar({
      avatar: link.current.value,
    })
      .then(() => resetInput())
      .catch(() => setButtonTitle('Ошибка!'));
  };

  return (
    <PopupWithForm
      name="avatarForm"
      title="Обновить аватар"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      btnCaption={buttonTitle}
    >
      <input
        id="inputLink"
        className="popup__input"
        name="link"
        type="url"
        title="укажите путь"
        ref={link}
        placeholder="Ссылка на картинку"
        required
      />
    </PopupWithForm>
  );
}

export default EditAvatarPopup;
