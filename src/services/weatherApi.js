const API_KEY = import.meta.env.VITE_OPENWEATHER_API_KEY
const BASE_URL = "https://api.openweathermap.org/data/2.5"

const requestWeather = async (endpoint, params = {}) => {
  if (!API_KEY) {
    throw new Error("Missing OpenWeather API key. Add VITE_OPENWEATHER_API_KEY to your .env file.")
  }

  const url = new URL(`${BASE_URL}/${endpoint}`)

  Object.entries({
    ...params,
    units: "metric",
    lang: "en",
    appid: API_KEY,
  }).forEach(([key, value]) => {
    url.searchParams.set(key, value)
  })

  const response = await fetch(url)

  if (!response.ok) {
    if (response.status === 404) {
      throw new Error("City not found. Check the spelling and try again.")
    }

    throw new Error("Weather data is temporarily unavailable. Please try again.")
  }

  return response.json()
}

export const getCurrentWeatherByCity = (city) => {
  return requestWeather("weather", { q: city })
}

export const getCurrentWeatherById = (cityId) => {
  return requestWeather("weather", { id: cityId })
}

export const getForecastById = (cityId) => {
  return requestWeather("forecast", { id: cityId })
}

export const getCurrentWeatherByCoords = (lat, lon) => {
  return requestWeather("weather", { lat, lon })
}
