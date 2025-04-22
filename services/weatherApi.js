const API_KEY = process.env.NEXT_PUBLIC_WEATHER_API_KEY;

export async function getWeatherByCity(city) {
  if (!city || typeof city !== "string" || city.trim() === "") {
    return { error: "Please enter a city name" };
  }

  const trimmedCity = city.trim();

  try {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(
      trimmedCity
    )}&appid=${API_KEY}&units=metric`;
    const response = await fetch(url);

    if (!response.ok) {
      let errorData;
      try {
        errorData = await response.json();
      } catch (e) {
        errorData = {};
      }
      return {
        error: `"${trimmedCity}" not found. Please check the spelling.`,
        city: trimmedCity,
      };
    }

    const data = await response.json();
    return { data };
  } catch (error) {
    return {
      error: "Unable to fetch weather data. Please try again later.",
    };
  }
}

export async function getFiveDayForecast(city) {
  if (!city || typeof city !== "string" || city.trim() === "") {
    return { error: "Please enter a city name" };
  }

  const trimmedCity = city.trim();

  try {
    const url = `https://api.openweathermap.org/data/2.5/forecast?q=${encodeURIComponent(
      trimmedCity
    )}&appid=${API_KEY}&units=metric`;
    const response = await fetch(url);

    if (!response.ok) {
      return {
        error: `"${trimmedCity}" not found. Please check the spelling.`,
        city: trimmedCity,
      };
    }

    const data = await response.json();
    return { data };
  } catch (error) {
    return {
      error: "Unable to fetch forecast. Please try again later.",
    };
  }
}
