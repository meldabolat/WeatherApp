import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Weather.sass';
import { Row, Col } from 'antd';

const api = {
  key: '8000755a6df01f6a6f6d660fab222742',
  base: 'https://api.openweathermap.org/data/2.5/'
};

const Weather = () => {
  const [weather, setWeather] = useState({});
  const [forecast, setForecast] = useState([]);
  const CITY_NAME = 'Madrid';

  useEffect(() => {
    const fetchWeatherData = async () => {
      try {
        const response = await axios.get(`${api.base}weather`, {
          params: {
            q: CITY_NAME,
            units: 'metric',
            appid: api.key
          }
        });
        setWeather(response.data);
        console.log("Current weather data:", response.data);

        const forecastResponse = await axios.get(`${api.base}forecast`, {
          params: {
            q: CITY_NAME,
            units: 'metric',
            appid: api.key
          }
        });
        console.log("Forecast data:", forecastResponse.data);
        
        const dailyForecast = forecastResponse.data.list.filter((reading, index) => index % 8 === 0);
        setForecast(dailyForecast);
      } catch (error) {
        console.error("Error fetching weather data:", error);
      }
    };

    fetchWeatherData();
  }, []);

  const getDayName = (dateStr) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', { weekday: 'short' });
  };

  return (
    <div className="Weather">
      <Row gutter={[16, 16]}>
        <Col xs={24} md={18}>
          <header className="weather-header">
            {typeof weather.main !== "undefined" ? (
              <Row gutter={[16, 16]} align="middle">
                <Col xs={24} sm={16} className='weather-details'>
                  <h1 className='name'>{weather.name}</h1>
                  <p className='chance-of-rain'>Chance of rain: {weather.clouds ? `${weather.clouds.all}%` : '0%'}</p>
                  <p className='degree'>{Math.round(weather.main.temp)}°</p>
                </Col>
                <Col xs={24} sm={8} className='weather-icon-container'>
                  <img
                    src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
                    alt={weather.weather[0].description}
                    className='weather-icon'
                  />
                </Col>
              </Row>
            ) : (
              <p>Loading...</p>
            )}
          </header>

          <section className="today-forecast">
            <h2>TODAY'S FORECAST</h2>
            <div className="forecast-hours">
              {[6, 9, 12, 15, 18, 21].map((hour, index) => (
                <div key={index} className="forecast-hour">
                  <p>{`${hour}:00`}</p>
                  <img src={`http://openweathermap.org/img/wn/${weather.weather ? weather.weather[0].icon : '01d'}@2x.png`} alt="Weather icon" />
                  <p>{Math.round(weather.main ? weather.main.temp + (index - 2) : 0)}°</p>
                </div>
              ))}
            </div>
          </section>

          <section className="air-conditions">
            <h2>AIR CONDITIONS</h2>
            <div className="conditions-grid">
              <div className="condition">
                <p>Real Feel</p>
                <p>{weather.main ? `${Math.round(weather.main.feels_like)}°` : '--'}</p>
              </div>
              <div className="condition">
                <p>Wind</p>
                <p>{weather.wind ? `${weather.wind.speed} km/h` : '--'}</p>
              </div>
              <div className="condition">
                <p>Chance of rain</p>
                <p>{weather.clouds ? `${weather.clouds.all}%` : '0%'}</p>
              </div>
              <div className="condition">
                <p>UV Index</p>
                <p>3</p>
              </div>
            </div>
          </section>
        </Col>
        
        <Col xs={24} md={6}>
          <section className="five-day-forecast">
            <h2>5-DAY FORECAST</h2>
            {forecast.length > 0 ? (
              <div className="forecast-days">
                {forecast.map((day, index) => (
                  <div key={index} className="forecast-day">
                    <p>{getDayName(day.dt_txt)}</p>
                    <img 
                      src={`http://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png`} 
                      alt={day.weather[0].description} 
                    />
                    <p>{day.weather[0].main}</p>
                    <p>{Math.round(day.main.temp_max)}°/{Math.round(day.main.temp_min)}°</p>
                  </div>
                ))}
              </div>
            ) : (
              <p>Loading forecast data...</p>
            )}
          </section>
        </Col>
      </Row>
    </div>
  );
}

export default Weather;