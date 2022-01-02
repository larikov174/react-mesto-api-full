import React from 'react';
import Card from './Card';
import CurrentUserContext from '../contexts/CurrentUserContext';

function Main({
  cards,
  onEditProfile,
  onAddPlace,
  onEditAvatar,
  onCardClick,
  onCardLike,
  onCardDelete,
}) {
  const { name, about, avatar } = React.useContext(CurrentUserContext);

  return (
    <>
      <main>
        <section className="profile">
          <div className="profile__avatar-overlay" onClick={onEditAvatar} role="presentation">
            <img className="profile__avatar" src={avatar} alt="Аватар" />
          </div>
          <div className="profile__info">
            <h1 className="profile__title">{name}</h1>
            <p className="profile__subtitle">{about}</p>
            <button className="profile__edit-button" type="button" onClick={onEditProfile} />
          </div>
          <button className="profile__add-button" type="button" onClick={onAddPlace} />
        </section>

        <section>
          <ul className="cards">
            {cards.map((item) => (
              <Card
                card={item}
                key={item._id}
                cardId={item._id}
                onCardClick={onCardClick}
                onCardLike={onCardLike}
                onCardDelete={onCardDelete}
              />
            ))}
          </ul>
        </section>
      </main>
    </>
  );
}

export default Main;
