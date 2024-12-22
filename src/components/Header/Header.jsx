//'add clothes' button that opens modalwithform
import { Link } from "react-router-dom";

import "./header.css";
import logo from "../../images/logo.svg";
import ToggleSwitch from "../ToggleSwitch/ToggleSwitch";
import CurrentUserContext from "../../Contexts/CurrentUserContext";
import { useContext } from "react";
function Header({
  handleAddClick,
  weatherData,
  handleRegisterModal,
  handleLoginModal,
  isLoggedIn,
}) {
  const currentDate = new Date().toLocaleString("default", {
    month: "long",
    day: "numeric",
  });
  const currentUser = useContext(CurrentUserContext);
  return (
    <header className="header">
      <div className="header__wrapper wrapper__date-and-location">
        <Link to="/">
          <img className="header__logo" src={logo} alt="logo" />
        </Link>

        <p className="header__current-date">
          {currentDate}, {weatherData.city}
        </p>
      </div>
      <div className="header__wrapper wrapper__profile-and-buttons">
        <ToggleSwitch />
        {isLoggedIn ? (
          <>
            <button
              className="header__add-clothes-btn"
              type="button"
              onClick={handleAddClick}
            >
              +Add clothes
            </button>
            <div className="header__user-container">
              <Link to="/profile" className="header__link">
                <p className="header__user-name">{currentUser.name}</p>
              </Link>
              {currentUser.avatar ? (
                <img
                  src={currentUser.avatar}
                  alt={currentUser.name || "User Avatar"}
                  className="header__user-avatar"
                />
              ) : (
                <div>{currentUser.name.charAt(0).toUpperCase()}</div>
              )}
            </div>
          </>
        ) : (
          <div className="header__btns">
            <button
              onClick={handleRegisterModal}
              className="header__signup"
              type="button"
            >
              Sign Up
            </button>
            <button
              onClick={handleLoginModal}
              className="header__login"
              type="button"
            >
              Log In
            </button>
          </div>
        )}
      </div>
    </header>
  );
}

export default Header;
