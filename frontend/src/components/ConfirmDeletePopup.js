import React from "react";
import PopupWithForm from "./PopupWithForm";

function ConfirmDeletePopup({ isOpen, onClose, onDeletePlace }) {
  function handleSubmit(e) {
    e.preventDefault();
    onDeletePlace();
  }

  return (
    <PopupWithForm
      title="Вы уверены?"
      name="profile-delete"
      buttonText="Да"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
    ></PopupWithForm>
  );
}

export default ConfirmDeletePopup;
