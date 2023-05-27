import React, { useState } from "react";
import { Route, Routes, Navigate, useNavigate } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import Main from "./Main";
import ImagePopup from "./ImagePopup";
import EditProfilePopup from "./EditProfilePopup";
import { api } from "../utils/Api";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import EditAvatarPopup from "./EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup";
import ConfirmDeletePopup from "./ConfirmDeletePopup";
import InfoToolTip from "./InfoToolTip";
import Login from "./Login";
import Register from "./Register";
import ProtectedRoute from "./ProtectedRoute";
import * as appAuth from "../utils/appAuth";
import unionBlack from "../images/UnionBlack.svg";
import unionRed from "../images/UnionRed.svg";

function App() {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] =
    React.useState(false);
  const [isAddCardPopupOpen, setIsAddCardPopupOpen] = React.useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] =
    React.useState(false);
  const [isDeletePopupOpen, setIsDeletePopupOpen] = React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState(null);
  const [currentUser, setCurrentUser] = React.useState(null);
  const [cards, setCards] = useState([]);
  const [confirmedDeleteCard, setConfirmedDeleteCard] = useState({});
  const [isRegistrationInfoPopupOpen, setIsRegistrationPopupOpen] =
    useState(false);
  const [registrationInfoDataPopup, setRegistrationInfoDataPopup] = useState({
    text: "",
    image: "",
  });

  const navigate = useNavigate();
  const [loggedIn, setLoggedIn] = useState(false);
  const [userEmail, setUserEmail] = useState("");

  React.useEffect(() => {
    checkAuthorization();
  }, []);

  function handleRegister(data) {
    appAuth
      .register(data)
      .then(() => {
        setRegistrationInfoDataPopup({
          text: "Вы успешно зарегистрировались!",
          image: unionBlack,
        });
        setIsRegistrationPopupOpen(true);
        navigate("/sign-in");
      })
      .catch((err) => {
        setRegistrationInfoDataPopup({
          text: "Что-то пошло не так! Попробуйте еще раз!",
          image: unionRed,
        });
        setIsRegistrationPopupOpen(true);
        console.log(err);
      });
  }

  function handleLogin(data) {
    appAuth
      .authorize(data)
      .then((res) => {
        localStorage.setItem("token", res.token);
        setUserEmail(data.email);
        setLoggedIn(true);
        navigate("/");
      })
      .catch((err) => {
        setRegistrationInfoDataPopup({
          text: "Что-то пошло не так! Попробуйте еще раз!",
          image: unionRed,
        });
        setIsRegistrationPopupOpen(true);
      });
  }

  function checkAuthorization() {
    const token = localStorage.getItem("token");
    if (token) {
      appAuth
        .getContent(token)
        .then((res) => {
          setUserEmail(res.data.email);
          setLoggedIn(true);
          navigate("/");
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }

  function handleCardLike(card) {
    const isLiked = card.likes.some((i) => i._id === currentUser._id);

    api
      .changeLikeCardStatus(card._id, !isLiked)
      .then((newCard) => {
        setCards((state) =>
          state.map((c) => (c._id === card._id ? newCard : c))
        );
      })
      .catch((err) => console.log(err));
  }

  function handleCardDelete(card) {
    api
      .deleteCardRequest(card._id)
      .then(() => {
        setCards((state) => state.filter((c) => c._id !== card._id));
      }, closeAllPopups())
      .catch((err) => console.log(err));
  }

  React.useEffect(() => {
    if (loggedIn) {
      api
        .getInitialCards()
        .then((cards) => setCards(cards))
        .catch((err) => console.log(err));
    }
  }, [loggedIn]);

  React.useEffect(() => {
    if (loggedIn) {
      api
        .getUserInfo()
        .then((data) => setCurrentUser(data))
        .catch((err) => console.log(err));
    }
  }, [loggedIn]);

  function handleCardClick(card) {
    setSelectedCard(card);
  }

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }

  function handleAddPlaceClick() {
    setIsAddCardPopupOpen(true);
  }

  function handleAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  }

  function handleTrashClick(card) {
    setConfirmedDeleteCard(card);
    setIsDeletePopupOpen(true);
  }

  function handleConfirmDelete() {
    handleCardDelete(confirmedDeleteCard);
  }

  function closeAllPopups() {
    setIsEditProfilePopupOpen(false);
    setIsAddCardPopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setSelectedCard(null);
    setIsDeletePopupOpen(false);
    setIsRegistrationPopupOpen(false);
  }

  function handleUpdateUser(data) {
    api
      .userEditInfo(data)
      .then(
        (res) =>
          setCurrentUser({
            ...currentUser,
            name: res.name,
            about: res.about,
          }),
        closeAllPopups()
      )
      .catch((err) => console.log(err));
  }

  function handleUpdateAvatar(data) {
    api
      .setUserAvatar(data)
      .then((newAvatar) => setCurrentUser(newAvatar), closeAllPopups())
      .catch((err) => console.log(err));
  }

  function handleAddPlaceSubmit(data) {
    api
      .addCardRequest(data)
      .then((newCard) => setCards([newCard, ...cards]), closeAllPopups())
      .catch((err) => console.log(err));
  }

  const isOpen =
    isEditAvatarPopupOpen || isAddCardPopupOpen || isEditProfilePopupOpen;

  function signOut() {
    localStorage.removeItem("token");
    setLoggedIn(false);
    navigate("/sign-in");
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="root">
        <Header signOut={signOut} userEmail={userEmail} />
        <Routes>
          <Route
            path="/sign-up"
            element={<Register handleRegister={handleRegister}></Register>}
          />
          <Route
            path="/sign-in"
            element={<Login handleLogin={handleLogin}></Login>}
          />
          <Route
            path="/"
            element={
              <ProtectedRoute
                loggedIn={loggedIn}
                userEmail={userEmail}
                component={Main}
                path={"/"}
                onEditProfile={handleEditProfileClick}
                onAddPlace={handleAddPlaceClick}
                onEditAvatar={handleAvatarClick}
                onCardClick={handleCardClick}
                onCardLike={handleCardLike}
                onCardDelete={handleCardDelete}
                cards={cards}
                onTrashClick={handleTrashClick}
              />
            }
          />
        </Routes>

        <InfoToolTip
          isOpen={isRegistrationInfoPopupOpen}
          onClose={closeAllPopups}
          info={registrationInfoDataPopup}
        ></InfoToolTip>
        <ImagePopup card={selectedCard} onClose={closeAllPopups} />
        <EditProfilePopup
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
          onUpdateUser={handleUpdateUser}
        />
        <EditAvatarPopup
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
          onUpdateAvatar={handleUpdateAvatar}
        />
        <AddPlacePopup
          isOpen={isAddCardPopupOpen}
          onClose={closeAllPopups}
          onAddPlace={handleAddPlaceSubmit}
        />
        <ConfirmDeletePopup
          isOpen={isDeletePopupOpen}
          onClose={closeAllPopups}
          onDeletePlace={handleConfirmDelete}
        ></ConfirmDeletePopup>
        <Footer />
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
