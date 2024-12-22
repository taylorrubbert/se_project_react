import { useContext } from "react";
import "./SideBar.css";
import CurrentUserContext from "../../Contexts/CurrentUserContext";

function SideBar({ handleUpdateClick, handleSignout }) {
  const currentUser = useContext(CurrentUserContext);
  return (
    <div className="sidebar">
      <div className="sidebar__user_details">
        <img
          className="sidebar__avatar"
          src={currentUser.avatar}
          alt="Avatar"
        />
        <p className="sidebar__username">{currentUser.name}</p>
      </div>
      <div className="sidebar__buttons">
        <button
          className="sidebar__button"
          type="button"
          onClick={handleUpdateClick}
        >
          Update Profile
        </button>
        <button
          className="sidebar__button"
          type="button"
          onClick={handleSignout}
        >
          Sign Out
        </button>
      </div>
    </div>
  );
}

export default SideBar;
