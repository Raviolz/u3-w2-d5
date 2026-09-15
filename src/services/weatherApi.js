const API_KEY = import.meta.env.VITE_OPENWEATHER_API_KEY
const BASE_URL = "https://api.openweathermap.org/data/2.5"

const requestWeather = async (endpoint, params = {}, units = "metric") => {
  if (!API_KEY) {
    throw new Error("Missing OpenWeather API key. Add it to your .env file.")
  }

  const url = new URL(`${BASE_URL}/${endpoint}`)

  const allParams = {
    ...params,
    units,
    lang: "en",
    appid: API_KEY,
  }

  Object.entries(allParams).forEach(([key, value]) => {
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

export const getCurrentWeatherByCity = (city, units = "metric") => {
  return requestWeather("weather", { q: city }, units)
}

export const getCurrentWeatherById = (cityId, units = "metric") => {
  return requestWeather("weather", { id: cityId }, units)
}

export const getForecastById = (cityId, units = "metric") => {
  return requestWeather("forecast", { id: cityId }, units)
}

export const getCurrentWeatherByCoords = (lat, lon, units = "metric") => {
  return requestWeather(
    "weather",
    {
      lat,
      lon,
    },
    units,
  )
}
