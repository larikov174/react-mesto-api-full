import React, { useState } from 'react';
import PopupWithForm from './PopupWithForm';

function EditAvatarPopup({ isOpen, onClose, onAddPlace }) {
  const [name, setName] = useState('');
  const [link, setLink] = useState('');
  const [buttonTitle, setButtonTitle] = useState('Создать');
  const errorShow = (err) => console.error(err);
  const handleNameChange = (e) => setName(e.target.value);
  const handleLinkChange = (e) => setLink(e.target.value);
  const resetInput = () => {
    setName('');
    setLink('');
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    setButtonTitle('Обработка...');
    try {
      onAddPlace({ name, link })
    }
    catch (err) {
      errorShow(err)
    }
    finally {
      setButtonTitle('Сохранить')
      resetInput()
    }
  }

  return (
    <PopupWithForm
      name="placeForm"
      title="Новое место"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      btnCaption={buttonTitle}
    >
      <input
        id="inputPlaceName"
        className="popup__input"
        name="name"
        type="text"
        value={name || ''}
        onChange={handleNameChange}
        title="назовите место"
        placeholder="Название"
        minLength="2"
        maxLength="30"
        required
      />
      <input
        id="inputPlaceLink"
        className="popup__input"
        name="link"
        type="url"
        value={link || ''}
        onChange={handleLinkChange}
        title="укажите путь"
        placeholder="Ссылка на картинку"
        required
      />
    </PopupWithForm>
  );
}

export default EditAvatarPopup;
