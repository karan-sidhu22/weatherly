"use client";

import { useState } from "react";
import WeatherCard from "../../components/WeatherCard";
import { getWeatherByCity } from "../../services/weatherApi";

export default function WeatherPage() {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState(null);

  const handleSearch = async () => {
    if (!city.trim()) {
      setError("Please enter a city name");
      setWeather(null);
      return;
    }

    try {
      const result = await getWeatherByCity(city);
      if (result.error) {
        setError(result.error);
        setWeather(null);
      } else {
        setWeather(result.data);
        setError(null);
      }
    } catch (err) {
      setError("Failed to fetch weather data");
      setWeather(null);
    }
  };

  return (
    <main
      className="min-h-screen bg-cover bg-center flex flex-col items-center justify-center px-4"
      style={{
        backgroundImage: `url('/wea1.jpg')`,
      }}
    >
      <div className="bg-white bg-opacity-90 backdrop-blur-md p-8 rounded-2xl shadow-2xl w-full max-w-4xl text-center">
        <h1 className="text-4xl font-bold text-blue-800 mb-6">WeatherSphere</h1>

        {/* Search Section */}
        <div className="flex gap-2 mb-6">
          <input
            type="text"
            placeholder="Enter city"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            onClick={(e) => e.key === "Enter" && handleSearch()}
            className="w-full p-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 text-black"
          />
          <button
            onClick={handleSearch}
            className="px-5 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-all"
          >
            Search
          </button>
        </div>

        {/* Error Display */}
        {error && (
          <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-6 rounded">
            <p>{error}</p>
          </div>
        )}

        {/* Weather Display */}
        {weather && <WeatherCard weather={weather} city={city} />}
      </div>
    </main>
  );
}
