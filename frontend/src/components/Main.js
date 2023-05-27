import React from "react";
import Card from "./Card";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function Main({
  onAddPlace,
  onEditProfile,
  onEditAvatar,
  onCardClick,
  cards,
  onCardLike,
  onCardDelete,
  onTrashClick,
}) {
  const currentUser = React.useContext(CurrentUserContext);

  // const [userInfo, setUserInfo] = useState({
  //   userName: "",
  //   userAbout: "",
  //   userAvatar: "",
  // });

  // const [cards, setCards] = useState([]);

  // React.useEffect(() => {
  //   api
  //     .getUserInfo()
  //     .then((data) =>
  //       setUserInfo({
  //         userName: data.name,
  //         userAbout: data.about,
  //         userAvatar: data.avatar,
  //       })
  //     )
  //     .catch((err) => console.log(err));
  // }, []);

  // React.useEffect(() => {
  //   api
  //     .getInitialCards()
  //     .then((cards) => setCards(cards))
  //     .catch((err) => console.log(err));
  // }, []);

  return (
    <main>
      <section className="profile">
        <div className="profile__container">
          <img
            className="profile__avatar"
            src={currentUser?.avatar}
            alt="Аватар"
          />
          <div className="profile__avatar-overlay" onClick={onEditAvatar}></div>
          <h1 className="profile__name">{currentUser?.name}</h1>
          <p className="profile__profession">{currentUser?.about}</p>
          <button
            className="profile__edit"
            type="button"
            id="editButton"
            onClick={onEditProfile}
          ></button>

          <button className="profile__add" type="button" onClick={onAddPlace} />
        </div>
      </section>

      <section className="element">
        {cards.map((card) => {
          return (
            <Card
              key={card._id}
              card={card}
              onCardClick={onCardClick}
              onCardLike={onCardLike}
              onTrashClick={onTrashClick}
            />
          );
        })}
      </section>
    </main>
  );
}

export default Main;
