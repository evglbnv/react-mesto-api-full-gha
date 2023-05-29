import React from "react";
import { Routes, Route, Link } from "react-router-dom";
import vector from "../images/Vector.svg";

function Header(props) {
  return (
    <header className="header">
      <img className="header__logo" src={vector} alt="Логотип" />
      <div className="header__container">
        <Routes>
          <Route
            path="/"
            element={
              <>
                <span className="header__email">{props.userEmail}</span>
                <Link
                  className="header__link"
                  to="/signin"
                  onClick={props.signOut}
                >
                  Выйти
                </Link>
              </>
            }
          ></Route>
          <Route
            path="/signin"
            element={
              <Link className="header__link" to="/signup">
                Регистрация
              </Link>
            }
          ></Route>
          <Route
            path="/signup"
            element={
              <Link className="header__link" to="/signin">
                Войти
              </Link>
            }
          ></Route>
        </Routes>
      </div>
    </header>
  );
}

export default Header;
