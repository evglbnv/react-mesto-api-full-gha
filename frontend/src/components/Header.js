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
                  to="/sign-in"
                  onClick={props.signOut}
                >
                  Выйти
                </Link>
              </>
            }
          ></Route>
          <Route
            path="/sign-in"
            element={
              <Link className="header__link" to="/sign-up">
                Регистрация
              </Link>
            }
          ></Route>
          <Route
            path="/sign-up"
            element={
              <Link className="header__link" to="/sign-in">
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
