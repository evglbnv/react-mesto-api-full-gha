import React, { useEffect } from "react";
import { useForm } from "../hooks/useForm";
import PopupWithForm from "./PopupWithForm";

function AddPlacePopup({ isOpen, onClose, onAddPlace }) {
  const { values, handleChange, setValues } = useForm({});

  function handleSubmit(e) {
    e.preventDefault();

    onAddPlace(values);
  }

  React.useEffect(() => {
    if (!isOpen) {
      setValues({});
    }
  }, [isOpen]);

  return (
    <PopupWithForm
      title="Новое место"
      name="add-place"
      isOpen={isOpen}
      onClose={onClose}
      buttonText="Сохранить"
      onSubmit={handleSubmit}
    >
      <label className="popup__field">
        <input
          value={values.name || ""}
          onChange={handleChange}
          className="popup__input popup__input_place_name"
          type="text"
          name="name"
          id="add-name"
          placeholder="Название"
          minLength="2"
          maxLength="30"
          required
        />
        <span className="error error_visible" id="add-name-error"></span>
      </label>
      <label className="popup__field">
        <input
          value={values.link || ""}
          onChange={handleChange}
          className="popup__input popup__input_place_link"
          type="url"
          name="link"
          id="add-link"
          placeholder="Ссылка на картинку"
          required
        />
        <span className="error error_visible" id="add-link-error"></span>
      </label>
    </PopupWithForm>
  );
}

export default AddPlacePopup;
