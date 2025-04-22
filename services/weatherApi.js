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
      // Try to get more specific error from API
      let errorMessage = `"${trimmedCity}" not found. Please check the spelling.`;
      try {
        const errorData = await response.json();
        if (errorData.message) {
          errorMessage = errorData.message;
        }
      } catch (e) {
        console.error("Error parsing error response:", e);
      }

      return {
        error: errorMessage,
        city: trimmedCity,
      };
    }

    const data = await response.json();
    return { data };
  } catch (error) {
    console.error("API request failed:", error);
    return {
      error: error.message.includes("Failed to fetch")
        ? "Network error. Please check your internet connection."
        : "Unable to fetch weather data. Please try again later.",
    };
  }
}
