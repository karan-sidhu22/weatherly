'use client';

import { useState } from 'react';
import WeatherCard from '../../components/WeatherCard';
import { getWeatherByCity } from '../../services/weatherApi';

export default function WeatherPage() {
  const [city, setCity] = useState('');
  const [weather, setWeather] = useState(null);

  const handleSearch = async () => {
    const data = await getWeatherByCity(city);
    setWeather(data);
  };

  return (
    <main style={{ textAlign: 'center', padding: '2rem' }}>
      <h1>Weather App</h1>
      <input
        type="text"
        placeholder="Enter city"
        value={city}
        onChange={(e) => setCity(e.target.value)}
      />
      <button onClick={handleSearch}>Search</button>

      {weather && <WeatherCard weather={weather} />}
    </main>
  );
}
