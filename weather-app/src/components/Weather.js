import React from "react";
import "./weather.style.css";

function Weather(props) {
  function roundoff(num) {
    return Math.round(num * 100) / 100;
  }
  return (
    <div className="container">
      <div className="cards pt-4">
        <h1>{props.city}</h1>
        <h5 className="py-4">
          <i className={`wi ${props.weather_icon} display-1`}></i>
        </h5>
        {props.temp_celsius ? (
          <h1 className="py-2">{roundoff(props.temp_celsius - 273.15)}&deg;</h1>
        ) : null}

        {/*show max and min temp*/}
        {minmaxTemp(
          Math.max(props.temp_max, props.temp_celsius),
          Math.min(props.temp_min, props.temp_celsius)
        )}
        <h4 className="py-3">{props.description}</h4>
      </div>
    </div>
  );
}

function minmaxTemp(max, min) {
  function roundoff(num) {
    return Math.round(num * 100) / 100;
  }
  if (min && max) {
    return (
      <h3>
        <span className="px-4">{roundoff(max - 273.15)}&deg;</span>
        <span className="px-4">{roundoff(min - 273.15)}&deg;</span>
      </h3>
    );
  }
}

export default Weather;
