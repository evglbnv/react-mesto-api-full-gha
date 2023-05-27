import React from "react";

function InfoToolTip(props) {
  return (
    <div className={`popup ${props.isOpen ? "popup_opened" : ""}`}>
      <div className="popup__container">
        <button
          className="popup__close"
          type="button"
          onClick={props.onClose}
        ></button>
        <img src={props.info.image} className="popup-authinfo__image"></img>
        <h2 className="popup-authinfo__title">{props.info.text}</h2>
      </div>
    </div>
  );
}

export default InfoToolTip;
