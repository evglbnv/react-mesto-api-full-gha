import React from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function Card({ card, onCardClick, onCardLike, onTrashClick }) {
  const currentUser = React.useContext(CurrentUserContext);

  const isOwn = card.owner === currentUser?._id;

  const isLiked = card.likes.some(id => id === currentUser?._id);
  const cardLikeButtonClassName = `element__like ${
    isLiked && "element__like_active"
  }`;

  function handleDeleteClick() {
    onTrashClick(card);
  }

  function handleLikeClick() {
    onCardLike(card);
  }

  function handleClick() {
    onCardClick(card);
  }

  return (
    <div className="cards__template">
      <article className="element__card">
        <img
          className="element__image"
          src={card.link}
          onClick={handleClick}
          alt={card.name}
        />
        <div className="element__container">
          <h2 className="element__text">{card.name}</h2>
          <div className="element__like-container">
            <button
              className={cardLikeButtonClassName}
              onClick={handleLikeClick}
              type="button"
            ></button>
            <span className="element__like-counter">{card.likes.length}</span>
          </div>
        </div>
        {isOwn && (
          <button
            className="element__delete"
            onClick={handleDeleteClick}
            type="button"
          />
        )}
      </article>
    </div>
  );
}

export default Card;
