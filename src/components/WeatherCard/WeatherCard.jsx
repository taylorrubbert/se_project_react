//shows current temp
//weather data is sent here in addition to Header as props
// weather data not stored in Main, need to pass it down from App component

//weather card receives data from its parent (props chain example: App → Main → WeatherCard)
import "./weathercard.css";
import sunny from "../../images/sunny.png";
function WeatherCard() {
  return (
    <section className="weather-card">
      <p className="weather-card__temp"></p>
      <img className="weather-card__image" src={sunny} alt="sunny" />
    </section>
  );
}

export default WeatherCard;
