import { useEffect, useState } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";

import "./App.css";
import { coordinates, APIkey } from "../../utils/constants";
import { getItems, addItem, deleteItem } from "../../utils/api.js";
import { getWeather, filterWeatherData } from "../../utils/weatherAPI";
import {
  register,
  logIn,
  getUserProfile,
  editUserProfile,
  addCardLike,
  removeCardLike,
} from "../../utils/auth";

import Header from "../Header/Header";
import Main from "../Main/Main";
import Footer from "../Footer/Footer";
import Profile from "../Profile/Profile";
import ProtectedRoute from "./ProtectedRoute.jsx";

import ItemModal from "../ItemModal/ItemModal";
import AddItemModal from "../AddItemModal/AddItemModal";
import DeleteModal from "../DeleteModal/DeleteModal";
import RegisterModal from "../RegisterModal/RegisterModal";
import LoginModal from "../LoginModal/LoginModal";
import EditProfileModal from "../EditProfileModal/EditProfileModal";

import CurrentTempUnitContext from "../../Contexts/CurrentTempUnitContext";
import CurrentUserContext from "../../Contexts/CurrentUserContext";

function App() {
  const [weatherData, setWeatherData] = useState({
    type: "",
    temp: { F: 999, C: 999 },
    city: "",
  });
  const [activeModal, setActiveModal] = useState("");
  const [selectedCard, setSelectedCard] = useState({});
  const [currentTempUnit, setCurrentTempUnit] = useState("F");
  const [clothingItems, setClothingItems] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const navigate = useNavigate();

  //handlers
  const handleAddClick = () => {
    setActiveModal("add-garment");
  };
  const handleCardClick = (card) => {
    setActiveModal("preview");
    setSelectedCard(card);
  };
  const handleModalClose = () => {
    setActiveModal("");
    setSelectedCard({});
  };
  const handleModalOpen = (modal) => setActiveModal(modal);
  const handleAddItem = (newItem) => {
    const token = localStorage.getItem("jwt");
    addItem(newItem, token)
      .then((addedItem) => {
        setClothingItems((prevItems) => [addedItem.data, ...prevItems]);
        handleModalClose();
      })
      .catch((err) => {
        console.error("Error adding item:", err);
      });
  };
  const handleDeleteCard = () => {
    const token = localStorage.getItem("jwt");
    deleteItem(selectedCard._id, token)
      .then(() => {
        setClothingItems((prevItems) =>
          prevItems.filter((item) => item._id !== selectedCard._id)
        );
        handleModalClose();
      })
      .catch((err) => console.error(err));
  };
  const handleDeleteCardClick = () => {
    setActiveModal("delete-confirmation");
  };
  const handleCardLike = ({ id, isLiked }) => {
    const token = localStorage.getItem("jwt");
    const cardAction = isLiked ? removeCardLike : addCardLike;
    cardAction(id, token)
      .then((updatedCard) => {
        setClothingItems((cards) =>
          cards.map((item) => (item._id === id ? updatedCard : item))
        );
      })
      .catch(console.error);
  };
  const handleToggleSwitchChange = () => {
    if (currentTempUnit === "C") setCurrentTempUnit("F");
    if (currentTempUnit === "F") setCurrentTempUnit("C");
  };
  const handleLogin = ({ email, password }) => {
    logIn({ email, password })
      .then((data) => {
        if (!data.token) throw new Error("Token not received");
        localStorage.setItem("jwt", data.token);
        return getUserProfile(data.token);
      })
      .then((user) => {
        setCurrentUser(user);
        setIsLoggedIn(true);
        navigate("/profile");
        handleModalClose();
      })
      .catch((err) => console.error("Login error:", err));
  };
  const handleRegister = (userData) => {
    register(userData)
      .then(() =>
        handleLogin({ email: userData.email, password: userData.password })
      )
      .catch(console.error);
  };
  const handleEditProfile = (profileData) => {
    const token = localStorage.getItem("jwt");
    editUserProfile(profileData, token)
      .then((updatedUser) => {
        setCurrentUser(updatedUser);
        handleModalClose();
      })
      .catch((err) => console.error("Edit profile error:", err));
  };
  const handleSignout = () => {
    localStorage.removeItem("jwt");
    setIsLoggedIn(false);
    setCurrentUser(null);
    navigate("/");
  };

  //effects
  useEffect(() => {
    const token = localStorage.getItem("jwt");
    if (token) {
      getUserProfile(token)
        .then((userData) => {
          setCurrentUser(userData);
          setIsLoggedIn(true);
        })
        .catch(() => {
          setIsLoggedIn(false);
          setCurrentUser(null);
        });
    }
  }, []);

  useEffect(() => {
    getWeather(coordinates, APIkey)
      .then((data) => {
        const filteredData = filterWeatherData(data);
        setWeatherData(filteredData);
      })
      .catch((error) => {
        console.error("Failed to fetch weather data:", error);
      });
  }, []);

  useEffect(() => {
    getItems()
      .then((items) => {
        setClothingItems(items);
      })
      .catch(console.error);
  }, []);

  useEffect(() => {
    function handleCloseMethods(evt) {
      if (evt.key === "Escape" || evt.key === "esc" || evt.keyCode === 27) {
        handleModalClose();
      }

      if (evt.type === "click" && evt.target.classList.contains("modal")) {
        handleModalClose();
      }
    }

    if (activeModal !== "") {
      document.addEventListener("keydown", handleCloseMethods);
      document.addEventListener("click", handleCloseMethods);
    }

    return () => {
      document.removeEventListener("keydown", handleCloseMethods);
      document.removeEventListener("click", handleCloseMethods);
    };
  }, [activeModal]);

  return (
    <div className="page">
      <CurrentUserContext.Provider value={currentUser}>
        <CurrentTempUnitContext.Provider
          value={{ currentTempUnit, handleToggleSwitchChange }}
        >
          <div className="page__content">
            <Header
              handleAddClick={handleAddClick}
              weatherData={weatherData}
              clothingItems={clothingItems}
              isLoggedIn={isLoggedIn}
              handleLoginModal={() => handleModalOpen("login")}
              handleRegisterModal={() => handleModalOpen("signup")}
            />
            <Routes>
              <Route
                path="/"
                element={
                  <Main
                    key={clothingItems.length}
                    weatherData={weatherData}
                    onCardClick={handleCardClick}
                    clothingItems={clothingItems}
                    handleCardLike={handleCardLike}
                    isLoggedIn={isLoggedIn}
                  />
                }
              />
              <Route
                path="/profile"
                element={
                  <ProtectedRoute isLoggedIn={isLoggedIn}>
                    <Profile
                      key={clothingItems.length}
                      weatherData={weatherData}
                      onCardClick={handleCardClick}
                      clothingItems={clothingItems}
                      handleAddClick={handleAddClick}
                      handleCardLike={handleCardLike}
                      handleSignout={handleSignout}
                      handleModalOpen={handleModalOpen}
                      handleEditProfile={handleEditProfile}
                    />
                  </ProtectedRoute>
                }
              />
            </Routes>
            <Footer />
          </div>
          <AddItemModal
            handleModalClose={handleModalClose}
            isOpen={activeModal === "add-garment"}
            handleAddItem={handleAddItem}
            currentWeatherType={weatherData.type}
          />
          <ItemModal
            activeModal={activeModal}
            card={selectedCard}
            handleModalClose={handleModalClose}
            confirmDeleteModal={handleDeleteCardClick}
          />
          <DeleteModal
            activeModal={activeModal}
            handleModalClose={handleModalClose}
            handleDeleteCard={handleDeleteCard}
            selectedCard={selectedCard}
          />
          <RegisterModal
            isOpen={activeModal === "signup"}
            handleModalClose={handleModalClose}
            onRegister={handleRegister}
            openLoginModal={() => handleModalOpen("login")}
          />
          <LoginModal
            isOpen={activeModal === "login"}
            handleModalClose={handleModalClose}
            handleRegisterModal={() => handleModalOpen("signup")}
            onLogIn={handleLogin}
          />
          <EditProfileModal
            isOpen={activeModal === "edit"}
            handleModalClose={handleModalClose}
            handleEditProfile={handleEditProfile}
            handleModalOpen={handleModalOpen}
          />
        </CurrentTempUnitContext.Provider>
      </CurrentUserContext.Provider>
    </div>
  );
}

export default App;

//add clothingitems from utils
