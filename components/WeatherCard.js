"use client";

const WeatherCard = ({ weather, city }) => {
  const StatCard = ({ title, value, icon }) => (
    <div className="flex flex-col items-center justify-center bg-white/80 rounded-xl p-6 shadow-md w-full h-48 transition-all hover:shadow-xl hover:bg-white/90">
      <span className="text-4xl mb-3">{icon}</span>
      <h3 className="text-lg font-semibold text-gray-700">{title}</h3>
      <p className="text-2xl font-bold text-gray-900">{value}</p>
    </div>
  );

  return (
    <div className="space-y-6 max-w-3xl mx-auto px-4 py-8 rounded-3xl bg-gradient-to-br from-blue-50 to-blue-100 shadow-2xl">
      <h2 className="text-3xl font-bold text-center text-blue-800 tracking-wide mb-2">
        {city}, {weather.sys?.country}
      </h2>

      {/* Main Weather Card */}
      <div className="bg-white/80 rounded-xl shadow-md p-6">
        <div className="flex flex-col md:flex-row items-center justify-between">
          <div className="flex items-center mb-4 md:mb-0">
            <img
              src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
              alt={weather.weather[0].description}
              className="w-20 h-20"
            />
            <div className="ml-4">
              <h3 className="text-lg font-semibold capitalize text-gray-700">
                {weather.weather[0].description}
              </h3>
              <p className="text-5xl font-bold text-gray-900">
                {Math.round(weather.main.temp)}°C
              </p>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4 text-center">
            <div>
              <p className="text-gray-600">Feels Like</p>
              <p className="text-xl font-semibold text-blue-700">
                {Math.round(weather.main.feels_like)}°C
              </p>
            </div>
            <div>
              <p className="text-gray-600">Humidity</p>
              <p className="text-xl font-semibold text-blue-700">
                {weather.main.humidity}%
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
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
        <StatCard
          title="Visibility"
          value={`${(weather.visibility / 1000).toFixed(1)} km`}
          icon="👁️"
        />
        <StatCard
          title="Cloudiness"
          value={`${weather.clouds?.all}%`}
          icon="☁️"
        />
      </div>
    </div>
  );
};

export default WeatherCard;
