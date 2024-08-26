import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Weather.sass'
import { Row, Col } from 'antd';

const api = {
  key: '8000755a6df01f6a6f6d660fab222742',
  base: 'https://api.openweathermap.org/data/2.5/'
};

const Weather = () => {
  const [weather, setWeather] = useState({});
  const CITY_NAME = 'Ankara';

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
      } catch (error) {
        console.error("Error fetching weather data:", error);
      }
    };

    fetchWeatherData();
  }, []);

  return (
    <div className="Weather">
      <header className="weather-header">
        {typeof weather.main !== "undefined" ? (
          <Row gutter={[16, 16]} align="middle">
            <Col xs={24} sm={16} className='weather-details'>
              <p className='name'>{weather.name}</p>
              <p className='detail'>{weather.weather[0].main}</p>
              <p className='detail'>({weather.weather[0].description})</p>
              <p className='degree'>{weather.main.temp}°C</p>
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
    </div>
  );
}

export default Weather;