import React, { useState, useContext, useEffect } from 'react';
import PopupWithForm from './PopupWithForm';
import CurrentUserContext from '../contexts/CurrentUserContext';

function EditProfilePopup({ isOpen, onClose, onUpdateUser }) {
  const currentUser = useContext(CurrentUserContext);
  const [buttonTitle, setButtonTitle] = useState('Сохранить');
  const [name, setName] = useState(currentUser.name);
  const [description, setDescription] = useState(currentUser.about);
  const handleNameChange = (e) => setName(e.target.value);
  const handleDescrChange = (e) => setDescription(e.target.value);
  const handleSubmit = (e) => {
    e.preventDefault();
    setButtonTitle('Обработка...');
    onUpdateUser({
      name,
      about: description,
    })
      .then(() => setButtonTitle('Сохранить'))
      .catch(() => setButtonTitle('Ошибка!'));
  };
  useEffect(() => {
    setName(currentUser.name);
    setDescription(currentUser.about);
  }, [currentUser, isOpen]);

  return (
    <PopupWithForm
      name="profileForm"
      title="Редактировать профиль"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      btnCaption={buttonTitle}
    >
      <input
        id="inputProfileName"
        className="popup__input"
        name="name"
        value={name || ''}
        onChange={handleNameChange}
        type="text"
        title="имя автора"
        placeholder="введите имя автора"
        minLength="2"
        maxLength="40"
        required
      />
      <input
        id="inputProfileWork"
        className="popup__input"
        name="work"
        value={description || ''}
        onChange={handleDescrChange}
        type="text"
        title="вид деятельности"
        placeholder="введите вид деятельности"
        minLength="2"
        maxLength="200"
        required
      />
    </PopupWithForm>
  );
}

export default EditProfilePopup;
