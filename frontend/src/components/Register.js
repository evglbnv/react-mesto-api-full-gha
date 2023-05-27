import React, { useState } from "react";
import { Link } from "react-router-dom";

function Register({ handleRegister }) {
  const [userData, setUserData] = useState({
    email: "",
    password: "",
  });

  function handleChange(e) {
    const { name, value } = e.target;

    setUserData({
      ...userData,
      [name]: value,
    });
  }

  function handleSubmit(e) {
    e.preventDefault();
    handleRegister(userData);
  }

  return (
    <div className="login">
      <h2 className="login__title">Регистрация</h2>
      <form className="login__form" onSubmit={handleSubmit}>
        <input
          className="login__form_input"
          placeholder="Email"
          name="email"
          value={userData.email || ""}
          onChange={handleChange}
        />
        <input
          className="login__form_input"
          placeholder="Пароль"
          name="password"
          type="password"
          value={userData.password || ""}
          onChange={handleChange}
        />
        <button className="login__form_submit" type="submit">
          Зарегистрироваться
        </button>
      </form>

      <Link to="/sign-in" className="login__link">
        Уже зарегистрированы? Войти
      </Link>
    </div>
  );
}

export default Register;
