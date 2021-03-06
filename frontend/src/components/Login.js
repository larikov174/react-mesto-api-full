import React, { useState, useRef, useEffect } from 'react';
import AuthForm from './AuthForm';

export default function Login({ onLogin }) {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [buttonTitle, setButtonTitle] = useState('Войти');
  const errorShow = (err) => console.error(err);
  const buttonRef = useRef();
  const onEmailChange = (e) => setEmail(e.target.value);
  const onPassChange = (e) => setPassword(e.target.value);
  const handleLogin = (e) => {
    e.preventDefault();
    setButtonTitle('Обработка...');
    try {
      onLogin({ password, email })
    }
    catch (err) {
      errorShow(err)
    }
    finally {
      setButtonTitle('Войти');
    }
  };

  useEffect(() =>{
    if(email && password){
      buttonRef.current.disabled = false;
    }else {
      buttonRef.current.disabled = true;
    }
  })

  return (
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
      <button ref={buttonRef} className="login__button" type="submit">
        {buttonTitle}
      </button>
    </AuthForm>
  );
}
