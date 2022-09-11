import axios from "axios";
import React, { useState, useEffect } from "react";
import "./Weather.css";
import "./FontLibrary";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function WeatherApi() {
  let [weather, setWeather] = useState("");
  let [search, setSearch] = useState();
  let [myCity, setMycity] = useState("bengaluru");
  let [errormeg, setErrorMeg] = useState("enter city");
  const apiKey = "d095c179725e019a320c379132bcd69f";

  const searchButton = <FontAwesomeIcon icon="search" size="lg" />;
  let citySubmit = (event) => {
    event.preventDefault();
    setMycity(search);
  };

  useEffect(() => {
    let fetchData = async () => {
      try {
        let weathers = await axios.get(
          `https://api.openweathermap.org/data/2.5/weather?q=${myCity}&units=metric&APPID=${apiKey}`
        );
        setWeather({
          temperature: weathers.data.main.temp,
          min_temperature: weathers.data.main.temp_min,
          max_temperature: weathers.data.main.temp_max,
          description: weathers.data.weather[0].description,
          country: weathers.data.sys.country,
          icons: weathers.data.weather[0].icon,
          wname: weathers.data.name,
        });
        setErrorMeg(null);
      } catch (error) {
        console.log(error);
        console.log(error.response.data.message);
        setErrorMeg(error.response.data.message);
      }
    };
    fetchData();
  }, [myCity]);
  return (
    <div className="weather-app">
      <div className="weather-container">
        {/* {<h1 className="error-message">{errormeg}</h1> ? ( */}
        {/* <div className="weather-content"> */}
        <h1 id="heading">Check your area weather</h1>
        <form id="weather-form" onSubmit={citySubmit}>
          <input
            onChange={(e) => setSearch(e.target.value)}
            placeholder="enter the city"
          />
          <button
            type="submit"
            style={{ background: "transparent", border: "none" }}
          >
            {searchButton}
          </button>
        </form>
        {errormeg?.length > 0 ? (
          <h1 className="error-message">{errormeg}</h1>
        ) : (
          <div className="weather-information">
            <h1>{weather?.wname}</h1>
            <h1>{weather?.country}</h1>
            {weather.temperature ? (
              <h1>
                {weather.temperature}
                <span>&#8451;</span>
              </h1>
            ) : null}
            <div
              className="min-max"
              style={{
                width: "100%",
                display: "flex",
                justifyContent: "space-evenly",
                fontSize: "25px",
                margin: "20px ",
              }}
            >
              <h3>
                min:{weather?.min_temperature} <span>&#8451;</span>{" "}
              </h3>
              <h3>
                max:{weather?.max_temperature} <span>&#8451;</span>
              </h3>
            </div>
            <h2 style={{ fontSize: "30px", marginBottom: "0" }}>
              {weather?.description}
            </h2>
            <img
              src={`http://openweathermap.org/img/wn/${weather.icons}@4x.png`}
              alt="weather"
              style={{ border: "none", width: "150px" }}
            />
          </div>
        )}
      </div>
      {/* // ) : null} */}
      {/* </div> */}
    </div>
  );
}

export default WeatherApi;
