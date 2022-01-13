import React, { useState, useEffect, useContext } from 'react';
import { Link, useLocation } from 'react-router-dom';
import CurrentUserContext from '../contexts/CurrentUserContext';

export default function Header({ onLogout }) {
  const location = useLocation().pathname;
  const { user } = useContext(CurrentUserContext);
  const [linkDest, setLinkDest] = useState('/signup');
  const [linkTitle, setLinkTitle] = useState('Регистрация');
  const [menuOpened, setMenuOpened] = useState(false);
  const email = user ? user.email : '';

  const handleLogout = () => {
    onLogout();
    setMenuOpened(false);
  };
  const renderBurger = () => setMenuOpened(!menuOpened);
  const renderLink = () => {
    switch (location) {
      case '/signin':
        setLinkTitle('Регистрация');
        setLinkDest('/signup');
        break;
      case '/signup':
        setLinkTitle('Войти');
        setLinkDest('/signin');
        break;
      case '/':
        setLinkTitle('Выйти');
        setLinkDest('/signin');
        break;
      default:
        setLinkTitle('Регистрация');
        setLinkDest('/signup');
        break;
    }
  };

  useEffect(() => {
    renderLink();
  });

  return (
    <>
      <div className={`burger ${menuOpened ? 'burger_type_active' : ''}`}>
        <p className="burger__text">{user ? email : ''}&nbsp;</p>
        <Link className="burger__link" to={linkDest}
          onClick={() => location === '/' ? handleLogout() : ''}>
          {linkTitle}
        </Link>
      </div>
      <header className="header">
        <div className="header__logo" title="Mesto" />
        <div className="header__actions">
          <p className="header__text">{user ? email : ''}&nbsp;</p>
          <Link
            to={linkDest}
            className={`header__link ${user && 'header__link_idle-on-mobile'}`}
            onClick={() => location === '/' ? handleLogout() : '' }
          >
            {linkTitle}
          </Link>
          <button
            className={`${user ? 'header__burger'
              : 'header__burger_idle'} ${menuOpened ? 'header__burger_type_close' : ''}
            `}
            type="button"
            onClick={renderBurger}
          />
        </div>
      </header>
    </>
  );
}
