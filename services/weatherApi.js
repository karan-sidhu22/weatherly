const API_KEY = process.env.NEXT_PUBLIC_WEATHER_API_KEY;

export async function getWeatherByCity(city) {
  if (!city) return null;

  try {
    console.log("API_KEY:", API_KEY); // ✅ Add this line to debug

    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`;
    console.log("Request URL:", url); // Optional: to verify full URL

    const res = await fetch(url);
    const data = await res.json();

    if (!res.ok) {
      console.error("Error from API:", data);
      throw new Error(data?.message || "Something went wrong");
    }

    return data;
  } catch (error) {
    console.error("Fetch error:", error.message);
    throw error;
  }
}
