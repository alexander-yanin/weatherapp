import React from 'react';


function WeatherIcon({ icon }) {
  const src = `icons/${icon}.svg`
  return <img src={src} className="weather__item-icon" alt={icon}/>;
}

export default WeatherIcon;
