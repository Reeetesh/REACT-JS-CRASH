import "./App.css";
import React from "react";
import "weather-icons/css/weather-icons.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Weather from "./components/Weather";
import Form from "./components/Form";

const key = "0c333110b7af297a529f4dfd3a487d99";

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      city: undefined,
      country: undefined,
      icon: undefined,
      main: undefined,
      celsius: undefined,
      temp_max: undefined,
      temp_min: undefined,
      description: "",
      error: false,
    };

    this.weather_icon = {
      Thunderstorm: "wi-thunderstorm",
      Drizzle: "wi-sleet",
      Rain: "wi-storm-showers",
      Snow: "wi-snow",
      Atmosphere: "wi-fog",
      Clear: "wi-day-sunny",
      Clouds: "wi-day-fog",
    };
  }

  getWeatherIcon(icons, range) {
    switch (true) {
      case range >= 200 && range <= 232:
        this.setState({ icon: this.weather_icon.Thunderstorm });
        break;
      case range >= 300 && range <= 321:
        this.setState({ icon: this.weather_icon.Drizzle });
        break;
      case range >= 500 && range <= 531:
        this.setState({ icon: this.weather_icon.Rain });
        break;
      case range >= 600 && range <= 622:
        this.setState({ icon: this.weather_icon.Snow });
        break;
      case range >= 701 && range <= 781:
        this.setState({ icon: this.weather_icon.Atmosphere });
        break;
      case range === 800:
        this.setState({ icon: this.weather_icon.Clear });
        break;
      case range >= 801 && range <= 804:
        this.setState({ icon: this.weather_icon.Clouds });
        break;
      default:
        this.setState({ icon: this.weather_icon.Clouds });
    }
  }

  getWeather = async (e) => {
    e.preventDefault();
    const city = e.target.elements.city.value;
    const country = e.target.elements.country.value;

    if (city && country) {
      const api_call = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city},${country}&appid=${key}`
      );

      const response = await api_call.json();

      console.log(response);

      this.setState({
        city: `${response.name},${response.sys.country}`,
        icon: undefined,
        main: undefined,
        celsius: response.main.temp,
        temp_max: response.main.temp_max,
        temp_min: response.main.temp_max,
        description: response.weather[0].description,
      });
      this.getWeatherIcon(this.weather_icon, response.weather[0].id);
    } else {
      this.setState({ error: true });
    }
  };

  render() {
    return (
      <div className="App">
        <Form loadweather={this.getWeather} error={this.state.error}></Form>
        <Weather
          city={this.state.city}
          country={this.state.country}
          temp_celsius={this.state.celsius}
          temp_max={this.state.temp_max}
          temp_min={this.state.temp_min}
          description={this.state.description}
          weather_icon={this.state.icon}
        ></Weather>
      </div>
    );
  }
}

export default App;
