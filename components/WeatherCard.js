export default function WeatherCard({ weather }) {
  return (
    <div style={{
      marginTop: '2rem',
      background: '#fff',
      padding: '1rem',
      borderRadius: '10px',
      boxShadow: '0 0 10px rgba(0,0,0,0.1)'
    }}>
      <h2>{weather.name}</h2>
      <p>{weather.weather[0].description}</p>
      <p>Temperature: {weather.main.temp}°C</p>
      <p>Humidity: {weather.main.humidity}%</p>
      <p>Wind: {weather.wind.speed} m/s</p>
    </div>
  );
}
