import React, { useState, useEffect, useRef } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import CurrentUserContext from '../contexts/CurrentUserContext';
import ProtectedRoute from './ProtectedRoute';
import useAuth from '../utils/useAuth';
import useApiUser from '../utils/useApiUser';
import useApiCard from '../utils/useApiCard';
import Header from './Header';
import Main from './Main';
import Login from './Login';
import Register from './Register';
import Footer from './Footer';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';
import DeletePlacePopup from './DeletePlacePopup';
import ImagePopup from './ImagePopup';
import InfoTooltip from './InfoTooltip';

function App() {
  const [isEditProfilePopupState, setIsEditProfilePopupState] = useState(false);
  const [isAddPlacePopupState, setIsAddPlacePopupState] = useState(false);
  const [isDeletePlacePopupState, setIsDeletePlacePopupState] = useState(false);
  const [isEditAvatarPopupState, setIsEditAvatarPopupState] = useState(false);
  const [isImgPopupState, setIsImgPopupState] = useState(false);
  const [isInfoTooltipState, setIsInfoTooltipState] = useState({visible: false, queryApproved: false});
  const [selectedCard, setSelectedCard] = useState({});
  const [cards, setCards] = useState([]);
  const errorShow = (err) => console.error(err);
  const { signup, signin, signout } = useAuth();
  const { checkToken, getUserInfo, setUserInfo, uploadAvatar } = useApiUser();
  const { getCards, postCard, removeCard, setLike, removeLike } = useApiCard();
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [userChecked, setUserChecked] = useState(null);
  const start = useRef(null)

  const onLoadCheck = () => {
    checkToken().then((res) => start.current = res)
  }

  const closeAllPopups = () => {
    setIsEditProfilePopupState(false);
    setIsAddPlacePopupState(false);
    setIsEditAvatarPopupState(false);
    setIsImgPopupState(false);
    setIsDeletePlacePopupState(false);
    setIsInfoTooltipState(false);
  };

  useEffect(() => {
    if (start === null) {
      onLoadCheck();
    }

    if (start !== null) {
      getUserInfo()
        .then(res => {
          if (res) {
            setUser(res);
          }
        })
        .then(() => {
          getCards()
            .then(initCards => {
              setCards(initCards)
            })
        })
        .then(() => {
          setUserChecked(true);
        })
        .finally(() => {
          navigate('/')
        });
    }


    if (!userChecked) {
      return (
        <div>Check user login...</div>
      )
    }

    const escHandler = (evt) => evt.key === 'Escape' && closeAllPopups();
    document.addEventListener('keydown', escHandler);

    return () => {
      document.removeEventListener('keydown', escHandler);
    };
  }, []);


  const openEditProfilePopup = () => {
    setIsEditProfilePopupState(true);
  };

  const openAddPlacePopup = () => {
    setIsAddPlacePopupState(true);
  };

  const openEditAvatarPopup = () => {
    setIsEditAvatarPopupState(true);
  };

  const handleCardClick = (card) => {
    setSelectedCard(card);
    setIsImgPopupState(true);
  };

  const handleLikeClick = (card, isLiked) => {
    const update = (newCard) => {
      setCards(cards.map((mappedCard) => (mappedCard._id === card._id ? newCard : mappedCard)));
    };
    return isLiked
      ? removeLike(card).then(update).catch(errorShow)
      : setLike(card).then(update).catch(errorShow);
  };

  const handleUpdateUser = async (newInfo) => {
    await setUserInfo(newInfo)
      .then(() => {
        getUserInfo()
          .then(data => {
            setUser(data);
          })
      })
      .then(() => {
        closeAllPopups();
      })
      .catch(errorShow);
  };

  const handleUpdateAvatar = async ({ avatar }) => {
    await uploadAvatar(avatar)
    .then(() => {
      getUserInfo()
        .then(data => {
          setUser(data);
        })
    })
    .then(() => {
      closeAllPopups();
    })
    .catch(errorShow);
};

  const handleAddPlaceSubmit = async (card) => {
    await postCard(card)
      .then((data) => {
        setCards([data, ...cards]);
        closeAllPopups();
      })
      .catch(errorShow);
  };

  const handleDeleteClick = (card) => {
    setSelectedCard(card);
    setIsDeletePlacePopupState(true);
  };

  const handleDeletePlaceSubmit = async () => {
    await removeCard(selectedCard)
      .then(() => {
        setCards((data) => data.filter((card) => card._id !== selectedCard._id));
        closeAllPopups();
      })
      .catch(errorShow);
  };

  const handleLogin = ({ password, email }) => {
    signin({ password, email })
      .then(res => {
        if (res.login === 'ok') {
          getUserInfo()
            .then(data => {
              setUser(data);
            })
            .then(() => {
              getCards()
                .then(initCards => {
                  setCards(initCards)
                })
            })
            .finally(() => {
              navigate('/')
            })
        }
      })
      .catch((error) => {
        errorShow(error);
        setIsInfoTooltipState({visible: true, queryApproved: false});
      })
  }


  const handleRegistration = async ({ password, email }) => {
    signup({ password, email })
      .then(() => {
        navigate('/signin');
        setIsInfoTooltipState({visible: true, queryApproved: true});
      })
      .catch((error) => {
        errorShow(error)
        setIsInfoTooltipState({visible: true, queryApproved: false});
      });
  };

  const handleLogout = () => {
    signout()
      .then(() => {
        setUser(null);
      })
      .catch((error) => {
        errorShow(error);
      });
  }

  return (
    <div className="body">
      <div className="page">
        <CurrentUserContext.Provider value={{ user }}>
          <Header onLogout={handleLogout} />
          <Routes>
            <Route path="/signin" element={<Login onLogin={handleLogin} />} />
            <Route path="/signup" element={<Register onRegistration={handleRegistration} />} />
            <Route
              path="/*"
              element={
                <ProtectedRoute>
                  <Main
                    onEditProfile={openEditProfilePopup}
                    onAddPlace={openAddPlacePopup}
                    onEditAvatar={openEditAvatarPopup}
                    onCardClick={handleCardClick}
                    onCardLike={handleLikeClick}
                    onCardDelete={handleDeleteClick}
                    cards={cards}
                  />
                </ProtectedRoute>
              }
            />
          </Routes>
          <Footer />
          <EditProfilePopup
            isOpen={isEditProfilePopupState}
            onUpdateUser={handleUpdateUser}
            onClose={closeAllPopups}
          />
          <EditAvatarPopup
            isOpen={isEditAvatarPopupState}
            onUpdateAvatar={handleUpdateAvatar}
            onClose={closeAllPopups}
          />
          <AddPlacePopup
            isOpen={isAddPlacePopupState}
            onAddPlace={handleAddPlaceSubmit}
            onClose={closeAllPopups}
          />
          <DeletePlacePopup
            isOpen={isDeletePlacePopupState}
            onCardDelete={handleDeletePlaceSubmit}
            onClose={closeAllPopups}
          />
          <ImagePopup card={selectedCard} isOpen={isImgPopupState} onClose={closeAllPopups} />
          <InfoTooltip isOpen={isInfoTooltipState} onClose={closeAllPopups} />
        </CurrentUserContext.Provider>
      </div>
    </div>
  );
}

export default App;
