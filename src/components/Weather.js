import React from 'react';
import WeatherIcon from './WeatherIcon';


function Weather({ city }) {
  return (
    <div className="weather">
      <div className="weather__item">
        <WeatherIcon icon={city.weather[0].icon}/>
      </div>
      <p className="weather__cityName">{city.name} </p>
      <p className="weather__temp">{Math.floor(city.main.temp)}&deg;С</p>
      <div className="weather__other_info">
        <div className="weather__otherInfoLeft">
          <p className="weather__otherInfo-wind">Ветер {city.wind.speed} м/с</p>
        </div>
        <div className="weather__otherInfoRight"></div>
      </div>
    </div>
  );
}

export default Weather;
