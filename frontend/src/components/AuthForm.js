import React from 'react';
import { useLocation, Link } from 'react-router-dom';

export default function AuthForm({ children, onSubmit }) {
  const location = useLocation().pathname;
  const renderSignInLink = (
    <div className="login__actions">
      <p className="login__text">Уже зарегистрированы?&nbsp;</p>
      <Link className="login__link" to="/login">
        Войти
      </Link>
    </div>
  );

  return (
    <form className="login" onSubmit={onSubmit}>
      {children}
      {location === '/register' && renderSignInLink}
    </form>
  );
}
