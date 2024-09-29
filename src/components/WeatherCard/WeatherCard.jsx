//shows current temp
//weather data is sent here in addition to Header as props
// weather data not stored in Main, need to pass it down from App component

//weather card receives data from its parent (props chain example: App → Main → WeatherCard)
import "./weathercard.css";
import { weatherOptions, defaultWeatherOptions } from "../../utils/constants";
import currentTempUnitContext from "../../Contexts/CurrentTempUnitContext";
import { useContext } from "react";
function WeatherCard({ weatherData }) {
  const { currentTempUnit } = useContext(currentTempUnitContext);
  const filteredOptions = weatherOptions.filter((option) => {
    return (
      option.day === weatherData.isDay &&
      option.condition === weatherData.condition
    );
  });

  let weatherOption;
  if (filteredOptions.length === 0) {
    weatherOption = defaultWeatherOptions[weatherData.isDay ? "day" : "night"];
  } else {
    weatherOption = filteredOptions[0];
  }

  return (
    <section className="weather-card">
      <p className="weather-card__temp">
        {weatherData.temp[currentTempUnit]}&deg; {currentTempUnit}
      </p>
      <img
        className="weather-card__image"
        src={weatherOption?.url}
        alt={`Card showing ${weatherOption?.day ? "day" : "night"}time ${
          weatherOption?.condition
        } weather`}
      />
    </section>
  );
}

export default WeatherCard;
