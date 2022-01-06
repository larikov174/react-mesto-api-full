import React, { useState, useEffect } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import CurrentUserContext from '../contexts/CurrentUserContext';
import AuthContext from '../contexts/AuthContext';
import ProtectedRoute from './ProtectedRoute';
import api from '../utils/api';
import useAuth from '../utils/useAuth';
import useApi from '../utils/useApi';
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
  const [isInfoTooltipState, setIsInfoTooltipState] = useState(false);
  const [isAuthOk, setIsAuthOk] = useState(false);
  const [selectedCard, setSelectedCard] = useState({});
  const [currentUser, setCurrentUser] = useState({});
  const [cards, setCards] = useState([]);
  const errorShow = (err) => console.error(err);
  const { signIn, signUp, signOut } = useAuth();
  const { getUser } = useApi();
  const [authed, setAuthed] = useState(false);
  const loggedUser = localStorage.getItem('email');
  const navigate = useNavigate();
  const onLoadUserCheck = async () => {
    await getUser().then((userData) => {
      setCurrentUser(()=> userData)
    });
  };

  const closeAllPopups = () => {
    setIsEditProfilePopupState(false);
    setIsAddPlacePopupState(false);
    setIsEditAvatarPopupState(false);
    setIsImgPopupState(false);
    setIsDeletePlacePopupState(false);
    setIsInfoTooltipState(false);
  };

  useEffect(() => {

    if (loggedUser) {
      onLoadUserCheck();
      // eslint-disable-next-line
      console.log(currentUser);
      // getUser()
      //   .then((userData) => {
      //     setCurrentUser(userData)

      //   });

      // getCards()
      //   .then((cardData) => {
      //     setCards(cardData);
      //     setAuthed(true);
      //   })
      //   .then(() => {
      //     navigate('/main');
      //   })
      //   .catch(errorShow);
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
      ? api.removeLike(card).then(update).catch(errorShow)
      : api.setLike(card).then(update).catch(errorShow);
  };

  const handleUpdateUser = async (newInfo) => {
    await api
      .setUserInfo(newInfo)
      .then((data) => {
        setCurrentUser(data);
        closeAllPopups();
      })
      .catch(errorShow);
  };

  const handleUpdateAvatar = async ({ avatar }) => {
    await api
      .uploadAvatar(avatar)
      .then((data) => {
        setCurrentUser(data);
        closeAllPopups();
      })
      .catch(errorShow);
  };

  const handleAddPlaceSubmit = async (card) => {
    await api
      .postCard(card)
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
    await api
      .removeCard(selectedCard)
      .then(() => {
        setCards((data) => data.filter((card) => card._id !== selectedCard._id));
        closeAllPopups();
      })
      .catch(errorShow);
  };

  const handleSignIn = async ({ password, email }) => {
    await signIn({ password, email })
      .then(() => {
        localStorage.setItem('email', email);
        setAuthed(true);
        navigate('/main');
      })
      .catch(() => {
        setAuthed(false);
        setIsAuthOk(false);
        setIsInfoTooltipState(true);
      });
  };

  const handleSignUp = async ({ password, email }) => {
    await signUp({ password, email })
      .then(() => {
        setIsAuthOk(true);
        setIsInfoTooltipState(true);
        navigate('/sign-in');
      })
      .catch(() => {
        setAuthed(false);
        setIsAuthOk(false);
        setIsInfoTooltipState(true);
      });
  };

  const handleSignOut = async () => {
    await signOut();
    try {
      localStorage.removeItem('email');
      setAuthed(false);
      navigate('/sign-in');
    }
    catch (error) {
      errorShow(error);
    }
  }

  return (
    <div className="body">
      <div className="page">
        <CurrentUserContext.Provider value={currentUser}>
          <AuthContext.Provider value={authed}>
            <Header onSignOut={handleSignOut} />
            <Routes>
              <Route path="/sign-in" element={<Login onLogin={handleSignIn} />} />
              <Route path="/sign-up" element={<Register onSignUp={handleSignUp} />} />
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
            <InfoTooltip isOpen={isInfoTooltipState} onClose={closeAllPopups} noteType={isAuthOk} />
          </AuthContext.Provider>
        </CurrentUserContext.Provider>
      </div>
    </div>
  );
}

export default App;
