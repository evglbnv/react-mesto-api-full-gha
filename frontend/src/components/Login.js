import React, { useState } from "react";

function Login({ handleLogin }) {
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
    handleLogin(userData);
  }

  return (
    <div className="login">
      <h2 className="login__title">Вход</h2>
      <form className="login__form" onSubmit={handleSubmit}>
        <input
          className="login__form_input"
          placeholder="Email"
          name="email"
          value={userData.email}
          onChange={handleChange}
        />
        <input
          className="login__form_input"
          placeholder="Пароль"
          name="password"
          type="password"
          value={userData.password}
          onChange={handleChange}
        />
        <button type="submit" className="login__form_submit">
          Войти
        </button>
      </form>
    </div>
  );
}

export default Login;
