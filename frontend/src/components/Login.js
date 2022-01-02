import React, { useState } from 'react';
import AuthForm from './AuthForm';

export default function Login({ onLogin }) {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [buttonTitle, setButtonTitle] = useState('Войти');
  const onEmailChange = (e) => setEmail(e.target.value);
  const onPassChange = (e) => setPassword(e.target.value);
  const handleLogin = (e) => {
    e.preventDefault();
    setButtonTitle('Обработка...');
    onLogin({ password, email })
  };

  return (
    <>
      <AuthForm className="login" onSubmit={handleLogin}>
        <h2 className="login__title">Вход</h2>
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
    </>
  );
}
