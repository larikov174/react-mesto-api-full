/* eslint-disable no-console */
import React, { useState, useEffect, useContext } from 'react';
import { Link, useLocation } from 'react-router-dom';
import CurrentUserContext from '../contexts/CurrentUserContext';

function Header({ onLogout }) {
  const location = useLocation().pathname;
  const { user } = useContext(CurrentUserContext);
  const [linkDest, setLinkDest] = useState('/register');
  const [linkTitle, setLinkTitle] = useState('Регистрация');
  const [menuOpened, setMenuOpened] = useState(false);
  const obj = {};
  if(user !== null) {
    obj.email = user.email
    obj._id = user.id
    obj.logged = true;
  }

  // const email = loggedIn ? user.email : '';

  const handleLogout = () => {
    setMenuOpened(false);
    onLogout();
  };
  const renderBurger = () => setMenuOpened(!menuOpened);
  const renderLink = () => {
    if (!!user && location === '/login') {
      setLinkTitle('Регистрация');
      setLinkDest('/register');
    } else if (!!user && location === '/register') {
      setLinkTitle('Войти');
      setLinkDest('/login');
    } else {
      setLinkTitle('Выйти');
      setLinkDest('/login');
    }
  };

  useEffect(() => {
    renderLink();
  });

  return (
    <>
      <div className={`burger ${menuOpened ? 'burger_type_active' : ''}`}>
        <p className="burger__text">{obj.email}&nbsp;</p>
        <Link className="burger__link" to={linkDest} onClick={obj.logged ? handleLogout : ''}>
          {linkTitle}
        </Link>
      </div>
      <header className="header">
        <div className="header__logo" title="Mesto" />
        <div className="header__actions">
          <p className="header__text">{obj.email}&nbsp;</p>
          <Link
            to={linkDest}
            className={`header__link ${user && 'header__link_idle-on-mobile'}`}
            onClick={obj.logged ? handleLogout : ''}
          >
            {linkTitle}
          </Link>
          <button
            className={`${obj._id ? 'header__burger' : 'header__burger_idle'} ${
              menuOpened ? 'header__burger_type_close' : ''
            }
            `}
            type="button"
            onClick={renderBurger}
          />
        </div>
      </header>
    </>
  );
}

export default Header;
