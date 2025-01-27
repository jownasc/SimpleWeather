const apiKey = "yGl3SRNlOCD1fUnGPPBCfuIu9AdZQk6n";
const baseUrl = "https://dataservice.accuweather.com";
const searchEndpoint = "/locations/v1/cities/search";
const weatherEndpoint = "/currentconditions/v1/";

const searchCity = async (city) => {
  try {
    const response = await fetch(`${baseUrl}${searchEndpoint}?apikey=${apiKey}&q=${city}`);
    if (!response.ok) throw new Error("City not found");
    const data = await response.json();
    return data[0];
  } catch (error) {
    console.error("Error fetching city:", error);
    alert("City not found. Please try again.");
  }
};

const getWeather = async (locationKey) => {
  try {
    const response = await fetch(`${baseUrl}${weatherEndpoint}${locationKey}?apikey=${apiKey}`);
    if (!response.ok) throw new Error("Weather data not found");
    const data = await response.json();
    return data[0];
  } catch (error) {
    console.error("Error fetching weather:", error);
    alert("Unable to fetch weather data.");
  }
};

document.querySelector("#cityInput").addEventListener("keypress", async (e) => {
  if (e.key === "Enter") {
    const city = e.target.value.trim();
    if (!city) return;

    const cityDetails = await searchCity(city);
    if (!cityDetails) return;

    const weatherDetails = await getWeather(cityDetails.Key);
    if (!weatherDetails) return;

    // Update the DOM with the weather data
    document.querySelector("#cityName").textContent = cityDetails.LocalizedName;
    document.querySelector("#temperature").textContent = `${weatherDetails.Temperature.Metric.Value}°C`;
    document.querySelector("#condition").textContent = weatherDetails.WeatherText;

    // Display day or night emoji
    document.querySelector("#dayNightEmoji").textContent = weatherDetails.IsDayTime ? "☀️" : "🌙";
  }
});
