"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import {
  getWeatherByCity,
  getFiveDayForecast,
} from "../../services/weatherApi";

const WeatherCard = dynamic(() => import("../../components/WeatherCard"), {
  loading: () => (
    <div className="h-96 bg-white/80 rounded-xl animate-pulse"></div>
  ),
});

const FiveDayForecast = dynamic(
  () => import("../../components/FiveDayForecast"),
  {
    loading: () => (
      <div className="h-64 bg-white/80 rounded-xl animate-pulse mt-8"></div>
    ),
  }
);

export default function WeatherPage() {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [forecast, setForecast] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSearch = async () => {
    if (!city.trim()) {
      setError("Please enter a city name");
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const [currentWeather, fiveDayForecast] = await Promise.all([
        getWeatherByCity(city),
        getFiveDayForecast(city),
      ]);

      if (currentWeather.error) throw new Error(currentWeather.error);
      if (fiveDayForecast.error) throw new Error(fiveDayForecast.error);

      setWeather(currentWeather.data);
      setForecast(fiveDayForecast.data);
    } catch (err) {
      setError(err.message);
      setWeather(null);
      setForecast(null);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main
      className="min-h-screen bg-cover bg-center flex flex-col items-center justify-center px-4 py-8"
      style={{ backgroundImage: `url('/wea1.jpg')` }}
    >
      <div className="bg-white bg-opacity-80 backdrop-blur-md p-8 rounded-2xl shadow-2xl w-full max-w-4xl">
        <h1 className="text-3xl font-bold text-blue-800 mb-6 text-center">
          WeatherSphere
        </h1>
        <div className="bg-white bg-opacity-80 backdrop-blur-md p-8 rounded-2xl shadow-2xl w-full max-w-4xl">
          {/* Search Section */}
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <input
              type="text"
              placeholder="Enter city name"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSearch()}
              className="flex-1 p-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 text-gray-800"
            />
            <button
              onClick={handleSearch}
              disabled={isLoading}
              className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-xl hover:bg-blue-700 transition-colors disabled:opacity-50 min-w-[120px]"
            >
              {isLoading ? "Searching..." : "Search"}
            </button>
          </div>
          {/* Error Display */}
          {error && (
            <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-6 rounded">
              <p>{error}</p>
            </div>
          )}
          {weather && (
            <WeatherCard
              weather={weather}
              city={city}
              timezone={weather.timezone}
            />
          )}
          {forecast && <FiveDayForecast forecastData={forecast} />}
        </div>
      </div>
    </main>
  );
}
