"use client";

import { useEffect, useState } from "react";

const WeatherCard = ({ weather, city, timezone }) => {
  const [localTime, setLocalTime] = useState("");

  useEffect(() => {
    if (weather?.dt && timezone) {
      // Correct local time calculation using timezone offset
      const localTimestamp = (weather.dt + timezone) * 1000;
      const options = {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        timeZone: "UTC",
      };
      setLocalTime(
        new Date(localTimestamp).toLocaleTimeString("en-US", options)
      );
    }
  }, [weather, timezone]);

  const StatCard = ({ title, value, icon }) => (
    <div className="flex flex-col items-center justify-center bg-white/80 rounded-xl p-6 shadow-md w-full h-48">
      <span className="text-4xl mb-3">{icon}</span>
      <h3 className="text-lg font-semibold text-gray-700">{title}</h3>
      <p className="text-2xl font-bold text-gray-900">{value}</p>
    </div>
  );

  return (
    <div className="space-y-6">
      <div className="bg-white/80 rounded-xl shadow-md p-6">
        <div className="flex flex-col md:flex-row items-center justify-between">
          <div className="flex items-center mb-4 md:mb-0">
            <img
              src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
              alt={weather.weather[0].description}
              className="w-20 h-20"
            />
            <div className="ml-4">
              <h2 className="text-2xl font-bold text-gray-800">
                {city}, {weather.sys?.country}
              </h2>
              <p className="text-lg capitalize text-gray-600">
                {weather.weather[0].description}
              </p>
              <p className="text-5xl font-bold text-gray-900 mt-2">
                {Math.round(weather.main.temp)}°C
              </p>
              {localTime && (
                <p className="text-gray-500 mt-1">Local Time: {localTime}</p>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Weather Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Feels Like"
          value={`${Math.round(weather.main.feels_like)}°C`}
          icon="🌡️"
        />
        <StatCard
          title="Humidity"
          value={`${weather.main.humidity}%`}
          icon="💧"
        />
        <StatCard
          title="Wind Speed"
          value={`${weather.wind.speed} m/s`}
          icon="💨"
        />
        <StatCard
          title="Pressure"
          value={`${weather.main.pressure} hPa`}
          icon="📊"
        />
      </div>
    </div>
  );
};

export default WeatherCard;
