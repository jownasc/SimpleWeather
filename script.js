const cityInput = document.querySelector("#cityInput");
const searchButton = document.querySelector("#searchButton");
const cityName = document.querySelector("#cityName");
const temperature = document.querySelector("#temperature");
const condition = document.querySelector("#condition");
const dayNightEmoji = document.querySelector("#dayNightEmoji");
const historyList = document.querySelector("#historyList");

const apiKey = "yGl3SRNlOCD1fUnGPPBCfuIu9AdZQk6n";
const baseUrl = "https://dataservice.accuweather.com";
const searchEndpoint = "/locations/v1/cities/search";
const weatherEndpoint = "/currentconditions/v1/";

const handleSearch = async () => {
  const city = cityInput.value.trim();
  if (!city) return;

  const cityDetails = await searchCity(city);
  if (!cityDetails) return;

  const weatherDetails = await getWeather(cityDetails.Key);
  if (!weatherDetails) return;

  cityName.textContent = cityDetails.LocalizedName;
  temperature.textContent = `${weatherDetails.Temperature.Metric.Value}°C`;
  condition.textContent = weatherDetails.WeatherText;
  dayNightEmoji.textContent = weatherDetails.IsDayTime ? "☀️" : "🌙";

  cityName.style.display = "block";
  temperature.style.display = "block";
  condition.style.display = "block";
  dayNightEmoji.style.display = "block";

  addToHistory(cityDetails.LocalizedName);
};

const searchCity = async (city) => {
  try {
    const response = await fetch(`${baseUrl}${searchEndpoint}?apikey=${apiKey}&q=${city}`);
    if (!response.ok) throw new Error("City not found");
    const data = await response.json();
    return data[0];
  } catch (error) {
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
    alert("Unable to fetch weather data.");
  }
};

const addToHistory = (city) => {
  const listItem = document.createElement("li");
  listItem.textContent = city;
  historyList.appendChild(listItem);
};

cityInput.addEventListener("keypress", (e) => {
  if (e.key === "Enter") handleSearch();
});

searchButton.addEventListener("click", handleSearch);
