import React from "react";

function ImagePopup(props) {
  return (
    <div
      className={`popup popup_type_show-image ${
        props.card ? "popup_opened" : ""
      }`}
    >
      <figure className="popup__figure">
        <img
          className="popup__image"
          src={props.card?.link}
          alt={props.card?.name}
        />
        <figcaption className="popup__figcaption">
          {props.card?.name}
        </figcaption>
        <button
          type="button"
          className="popup__close"
          id="popupShowCloseBtn"
          onClick={props.onClose}
        ></button>
      </figure>
    </div>
  );
}

export default ImagePopup;
