import React, { useState, useEffect, useContext } from 'react';
import { Link, useLocation } from 'react-router-dom';
import CurrentUserContext from '../contexts/CurrentUserContext';

function Header({ onSignOut }) {
  const location = useLocation().pathname;
  const { user } = useContext(CurrentUserContext);
  const [linkDest, setLinkDest] = useState('/sign-up');
  const [linkTitle, setLinkTitle] = useState('Регистрация');
  const [menuOpened, setMenuOpened] = useState(false);

  const email = user ? user.email : '';

  const handleSignOut = () => {
    setMenuOpened(false);
    onSignOut();
  };
  const renderBurger = () => setMenuOpened(!menuOpened);
  const renderLink = () => {
    if (!user && location === '/sign-in') {
      setLinkTitle('Регистрация');
      setLinkDest('/sign-up');
    } else if (!user && location === '/sign-up') {
      setLinkTitle('Войти');
      setLinkDest('/sign-in');
    } else {
      setLinkTitle('Выйти');
      setLinkDest('/sign-in');
    }
  };

  useEffect(() => {
    renderLink();
  });

  return (
    <>
      <div className={`burger ${menuOpened ? 'burger_type_active' : ''}`}>
        <p className="burger__text">{email}&nbsp;</p>
        <Link className="burger__link" to={linkDest} onClick={user && handleSignOut}>
          {linkTitle}
        </Link>
      </div>
      <header className="header">
        <div className="header__logo" title="Mesto" />
        <div className="header__actions">
          <p className="header__text">{email}&nbsp;</p>
          <Link
            to={linkDest}
            className={`header__link ${user && 'header__link_idle-on-mobile'}`}
            onClick={user && handleSignOut}
          >
            {linkTitle}
          </Link>
          <button
            className={`${user ? 'header__burger' : 'header__burger_idle'} ${
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
