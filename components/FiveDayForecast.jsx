"use client";

import { useEffect, useState } from "react";

const FiveDayForecast = ({ forecastData }) => {
  const [dailyForecasts, setDailyForecasts] = useState([]);

  useEffect(() => {
    if (forecastData?.list) {
      const forecasts = forecastData.list.reduce((acc, item) => {
        const date = new Date(item.dt * 1000).toLocaleDateString('en-US', {
          weekday: 'short'
        });
        
        // Get midday forecast (12PM)
        const hour = new Date(item.dt * 1000).getHours();
        if (!acc[date] || (hour >= 11 && hour <= 13)) {
          acc[date] = {
            date,
            temp: Math.round(item.main.temp),
            icon: item.weather[0].icon,
            description: item.weather[0].description,
          };
        }
        return acc;
      }, {});
      
      setDailyForecasts(Object.values(forecasts).slice(0, 5));
    }
  }, [forecastData]);

  if (dailyForecasts.length === 0) return null;

  return (
    <div className="mt-8">
      <h3 className="text-2xl font-bold text-blue-800 mb-6">5-Day Forecast</h3>
      <div className="grid grid-cols-1 sm:grid-cols-5 gap-4">
        {dailyForecasts.map((day, index) => (
          <div key={index} className="bg-white/80 rounded-xl p-4 shadow text-center">
            <p className="font-semibold text-gray-700 mb-2">{day.date}</p>
            <img 
              src={`https://openweathermap.org/img/wn/${day.icon}.png`}
              alt={day.description}
              className="mx-auto w-12 h-12"
              loading="lazy"
            />
            <p className="text-xl font-bold text-gray-900 mt-2">
              {day.temp}°C
            </p>
            <p className="text-sm text-gray-600 capitalize mt-1">
              {day.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FiveDayForecast;