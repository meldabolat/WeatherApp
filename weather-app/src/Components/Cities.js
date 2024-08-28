import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Cities.sass';
import { Row, Col } from 'antd';

const api = {
  key: '8000755a6df01f6a6f6d660fab222742',
  base: 'https://api.openweathermap.org/data/2.5/'
};

const citiesList = ['Istanbul', 'Ankara', 'Izmir', 'Bursa', 'Adana', 'Antalya', 'Gaziantep', 'Konya', 'Kayseri'];

const Cities = () => {
  const [citiesWeather, setCitiesWeather] = useState([]);

  useEffect(() => {
    const fetchCitiesWeatherData = async () => {
      try {
        // Tüm şehirlerin hava durumu verilerini aynı anda almak için Promise.all kullanıyoruz.
        const promises = citiesList.map(city =>
          axios.get(`${api.base}weather`, {
            params: {
              q: city,
              units: 'metric',
              appid: api.key
            }
          })
        );
        
        const responses = await Promise.all(promises);
        setCitiesWeather(responses.map(response => response.data));
      } catch (error) {
        console.error("Error fetching cities weather data:", error);
      }
    };

    fetchCitiesWeatherData();
  }, []);

  return (
    <div className="Cities">
      <h2>Daily Weather</h2>
      <Row gutter={[16, 16]}>
        {citiesWeather.map((cityWeather, index) => (
          <Col xs={24} sm={12} md={8} key={index}>
            <div className="city-weather-card">
              <h3 className="city-name">{cityWeather.name}</h3>
              <p className="weather-description">{cityWeather.weather[0].description}</p>
              <p className="temperature">{Math.round(cityWeather.main.temp)}°C</p>
              <div className="weather-icon-container">
                <img
                  src={`http://openweathermap.org/img/wn/${cityWeather.weather[0].icon}@2x.png`}
                  alt={cityWeather.weather[0].description}
                  className="weather-icon"
                />
              </div>
              <p className="additional-info">Humidity: {cityWeather.main.humidity}%</p>
              <p className="additional-info">Wind: {cityWeather.wind.speed} km/h</p>
            </div>
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default Cities;
