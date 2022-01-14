import React, { useState } from 'react';
import AuthForm from './AuthForm';

export default function Register({ onRegistration }) {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [buttonTitle, setButtonTitle] = useState('Зарегистрироваться');
  const errorShow = (err) => console.error(err);
  const onEmailChange = (e) => setEmail(e.target.value);
  const onPassChange = (e) => setPassword(e.target.value);

  const handleRegistration = (e) => {
    e.preventDefault();
    setButtonTitle('Обработка...');
    try {
      onRegistration({ password, email })
    }
    catch (err) {
      errorShow(err)
    }
    finally {
      setButtonTitle('Зарегистрироваться');
    }
  };

  return (
    <AuthForm className="login" onSubmit={handleRegistration}>
      <h2 className="login__title">Регистрация</h2>
      <input
        className="login__input"
        onChange={onEmailChange}
        name="email"
        type="email"
        title="email"
        value={email || ''}
        placeholder="Email"
        required
      />
      <input
        className="login__input"
        onChange={onPassChange}
        name="password"
        type="password"
        title="Пароль"
        value={password || ''}
        placeholder="Пароль"
        required
      />
      <button className="login__button" type="submit">
        {buttonTitle}
      </button>
    </AuthForm>
  );
}
