import React from "react";

import PopupWithForm from "./PopupWithForm";

function EditAvatarPopup({ isOpen, onClose, onUpdateAvatar }) {
  const inputRef = React.useRef();

  function handleSubmit(e) {
    e.preventDefault();

    onUpdateAvatar(inputRef.current.value);
  }

  return (
    <PopupWithForm
      title="Обновить аватар"
      name="avatar-update"
      isOpen={isOpen}
      onClose={onClose}
      buttonText="Сохранить"
      onSubmit={handleSubmit}
    >
      <label className="popup__field">
        <input
          ref={inputRef}
          className="popup__input popup__input_avatar_link"
          type="url"
          name="avatarLink"
          id="avatar-link"
          placeholder="Ссылка на аватар"
          required
        />
        <span className="error error_visible" id="avatar-link-error"></span>
      </label>
    </PopupWithForm>
  );
}

export default EditAvatarPopup;
