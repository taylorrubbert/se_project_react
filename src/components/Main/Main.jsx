import React, { useContext } from "react";
import "./main.css";
import WeatherCard from "../WeatherCard/WeatherCard";
import ItemCard from "../ItemCard/ItemCard";
import CurrentTempUnitContext from "../../Contexts/CurrentTempUnitContext";
function Main({ weatherData, onCardClick, clothingItems, handleCardLike }) {
  const { currentTempUnit } = useContext(CurrentTempUnitContext);
  const displayTemp =
    currentTempUnit === "F" ? weatherData.temp.F : weatherData.temp.C;

  const filteredItems = clothingItems.filter(
    (item) => item.weather === weatherData.type
  );

  return (
    <main>
      <WeatherCard weatherData={weatherData} />
      <section className="cards">
        <p className="cards__text">
          Today is {weatherData.temp[currentTempUnit]} &deg; {currentTempUnit} /
          You may want to wear:
        </p>
        <ul className="cards__list">
          {clothingItems
            .filter((item) => {
              return item.weather === weatherData.type;
            })
            .map((item) => {
              return (
                <ItemCard
                  key={item._id}
                  item={item}
                  onCardClick={onCardClick}
                  handleCardLike={handleCardLike}
                />
              );
            })}
        </ul>
      </section>
    </main>
  );
}

export default Main;
