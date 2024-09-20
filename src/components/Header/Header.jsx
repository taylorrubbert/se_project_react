//'add clothes' button that opens modalwithform
import "./header.css";
import logo from "../../images/logo.svg";
import avatar from "../../images/avatar.png";
import ToggleSwitch from "../ToggleSwitch/ToggleSwitch";
function Header({ handleAddClick, weatherData }) {
  const currentDate = new Date().toLocaleString("default", {
    month: "long",
    day: "numeric",
  });

  return (
    <header className="header">
      <div className="header__wrapper wrapper__date-and-location">
        <img className="header__logo" src={logo} alt="logo" />
        <p className="header__current-date-and-location">
          {currentDate}, {weatherData.city}
        </p>
      </div>
      <div className="header__wrapper wrapper__profile-and-buttons">
        <ToggleSwitch />
        <button
          className="header__add-clothes-btn"
          type="button"
          onClick={handleAddClick}
        >
          +Add clothes
        </button>
        <div className="header__user-container">
          <p className="header__user-name">Terrence Tegegne</p>
          <img
            src={avatar}
            alt="Terrence Tegegne"
            className="header__user-avatar"
          />
        </div>
      </div>
    </header>
  );
}

export default Header;
