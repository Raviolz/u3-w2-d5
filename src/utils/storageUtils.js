const FAVORITES_KEY = "weatherFavorites"
const RECENT_KEY = "weatherRecentSearches"
const UNIT_KEY = "weatherUnit"

const readArray = (key) => {
  try {
    const saved = localStorage.getItem(key)

    return saved ? JSON.parse(saved) : []
  } catch {
    return []
  }
}

export const getFavorites = () => {
  return readArray(FAVORITES_KEY)
}

export const isFavoriteCity = (cityId) => {
  return getFavorites().some((city) => city.id === cityId)
}

export const addFavoriteCity = (city) => {
  const favorites = getFavorites()

  const alreadyExists = favorites.some((savedCity) => savedCity.id === city.id)

  if (alreadyExists) {
    return favorites
  }

  const updatedFavorites = [...favorites, city]

  localStorage.setItem(FAVORITES_KEY, JSON.stringify(updatedFavorites))

  return updatedFavorites
}

export const removeFavoriteCity = (cityId) => {
  const updatedFavorites = getFavorites().filter((city) => city.id !== cityId)

  localStorage.setItem(FAVORITES_KEY, JSON.stringify(updatedFavorites))

  return updatedFavorites
}

export const getRecentSearches = () => {
  return readArray(RECENT_KEY)
}

export const addRecentSearch = (city) => {
  const previousSearches = getRecentSearches().filter((savedCity) => savedCity.id !== city.id)

  const updatedSearches = [city, ...previousSearches].slice(0, 5)

  localStorage.setItem(RECENT_KEY, JSON.stringify(updatedSearches))

  return updatedSearches
}

export const clearRecentSearches = () => {
  localStorage.removeItem(RECENT_KEY)
}

export const getSavedUnit = () => {
  const savedUnit = localStorage.getItem(UNIT_KEY)

  return savedUnit === "imperial" ? "imperial" : "metric"
}

export const saveUnit = (unit) => {
  localStorage.setItem(UNIT_KEY, unit)
}
