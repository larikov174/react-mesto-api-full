import React, {useState, useRef} from 'react';
import PopupWithForm from './PopupWithForm';

function EditAvatarPopup({ isOpen, onClose, onUpdateAvatar }) {
  const [buttonTitle, setButtonTitle] = useState('Сохранить');
  const errorShow = (err) => console.error(err);
  const link = useRef();
  const resetInput = () => link.current.value = '';
  const handleSubmit = (e) => {
    e.preventDefault();
    setButtonTitle('Обработка...');
    try {
      onUpdateAvatar({
        avatar: link.current.value,
      })
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
