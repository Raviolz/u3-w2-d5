import { useEffect, useState } from "react"

import { useNavigate } from "react-router-dom"

import Container from "react-bootstrap/Container"
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"
import Card from "react-bootstrap/Card"
import Button from "react-bootstrap/Button"
import Form from "react-bootstrap/Form"
import Spinner from "react-bootstrap/Spinner"

import { getCurrentWeatherByCity, getCurrentWeatherByCoords } from "../services/weatherApi"

import { addRecentSearch, getFavorites, getRecentSearches } from "../utils/storageUtils"

const cities = ["San Francisco,US", "Mexico City,MX", "New York,US", "Milan,IT", "Moscow,RU", "New Delhi,IN", "Perth,AU", "Tokyo,JP"]

const WHomepage = ({ unit }) => {
  const navigate = useNavigate()

  const [weatherList, setWeatherList] = useState([])

  const [query, setQuery] = useState("")

  const [loading, setLoading] = useState(true)

  const [searchLoading, setSearchLoading] = useState(false)

  const [locationLoading, setLocationLoading] = useState(false)

  const [searchError, setSearchError] = useState("")

  const [citiesError, setCitiesError] = useState("")

  const [favorites, setFavorites] = useState([])

  const [recentSearches, setRecentSearches] = useState([])

  const [homeCity, setHomeCity] = useState("")

  useEffect(() => {
    setFavorites(getFavorites())

    setRecentSearches(getRecentSearches())

    setHomeCity(localStorage.getItem("weatherHomeCity") || "")
  }, [])

  useEffect(() => {
    const loadCities = async () => {
      try {
        setLoading(true)
        setCitiesError("")

        const results = await Promise.allSettled(cities.map((city) => getCurrentWeatherByCity(city, unit)))

        const availableCities = results.filter((result) => result.status === "fulfilled").map((result) => result.value)

        setWeatherList(availableCities)

        if (availableCities.length === 0) {
          setCitiesError("We couldn't load the cities right now.")
        }
      } finally {
        setLoading(false)
      }
    }

    loadCities()
  }, [unit])

  const openSearchResult = (cityData) => {
    const city = {
      id: cityData.id,
      name: cityData.name,
      country: cityData.sys.country,
    }

    const updated = addRecentSearch(city)

    setRecentSearches(updated)

    navigate(`/city/${cityData.id}`)
  }

  const searchCity = async (cityName) => {
    try {
      setSearchLoading(true)
      setSearchError("")

      const data = await getCurrentWeatherByCity(cityName, unit)

      openSearchResult(data)
    } catch (error) {
      setSearchError(error.message)
    } finally {
      setSearchLoading(false)
    }
  }

  const handleSearch = async (event) => {
    event.preventDefault()

    const city = query.trim()

    if (!city) {
      setSearchError("Write the name of a city first.")

      return
    }

    await searchCity(city)
  }

  const handleLocation = () => {
    setSearchError("")

    if (!navigator.geolocation) {
      setSearchError("Geolocation is not supported by your browser.")

      return
    }

    setLocationLoading(true)

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        try {
          const { latitude, longitude } = position.coords

          const data = await getCurrentWeatherByCoords(latitude, longitude, unit)

          openSearchResult(data)
        } catch (error) {
          setSearchError(error.message)

          setLocationLoading(false)
        }
      },

      (error) => {
        if (error.code === error.PERMISSION_DENIED) {
          setSearchError("Location permission was denied. You can still search for a city manually.")
        } else if (error.code === error.POSITION_UNAVAILABLE) {
          setSearchError("Your location is currently unavailable.")
        } else if (error.code === error.TIMEOUT) {
          setSearchError("Finding your location took too long. Please try again.")
        } else {
          setSearchError("We couldn't access your location.")
        }

        setLocationLoading(false)
      },

      {
        enableHighAccuracy: false,
        timeout: 10000,
        maximumAge: 300000,
      },
    )
  }

  return (
    <div className="home-page w-100">
      <Container className="py-5">
        <section className="home-hero">
          <div className="hero-content">
            <span className="hero-label">Weather App</span>

            <h1>
              Discover the weather
              <br />
              around the world.
            </h1>

            <p>Check the weather in your favourite city and discover what the next days will look like.</p>

            <Form className="weather-search" onSubmit={handleSearch}>
              <div className="search-input-wrapper">
                <i className="bi bi-search" aria-hidden="true"></i>

                <Form.Control
                  type="search"
                  value={query}
                  placeholder="Search a city..."
                  aria-label="Search a city"
                  onChange={(event) => setQuery(event.target.value)}
                />
              </div>

              <Button type="submit" className="weather-search-btn" disabled={searchLoading || locationLoading}>
                {searchLoading ? <Spinner animation="border" size="sm" /> : "Search"}
              </Button>
            </Form>

            <button type="button" className="location-button" onClick={handleLocation} disabled={locationLoading || searchLoading}>
              {locationLoading ? (
                <>
                  <Spinner animation="border" size="sm" />
                  Finding your location...
                </>
              ) : (
                <>
                  <i className="bi bi-geo-alt-fill" aria-hidden="true"></i>
                  Use my location
                </>
              )}
            </button>

            {searchError && (
              <div className="search-error" role="alert" aria-live="polite">
                <i className="bi bi-exclamation-circle me-2" aria-hidden="true"></i>

                {searchError}
              </div>
            )}

            {(homeCity || favorites.length > 0 || recentSearches.length > 0) && (
              <div className="quick-weather-links">
                {homeCity && (
                  <button type="button" className="quick-city home-city-chip" onClick={() => searchCity(homeCity)}>
                    <i className="bi bi-house-fill" aria-hidden="true"></i>

                    {homeCity}
                  </button>
                )}

                {favorites.slice(0, 3).map((city) => (
                  <button type="button" className="quick-city" key={`favorite-${city.id}`} onClick={() => navigate(`/city/${city.id}`)}>
                    <i className="bi bi-star-fill" aria-hidden="true"></i>

                    {city.name}
                  </button>
                ))}

                {recentSearches.slice(0, 3).map((city) => (
                  <button type="button" className="quick-city recent-city-chip" key={`recent-${city.id}`} onClick={() => navigate(`/city/${city.id}`)}>
                    <i className="bi bi-clock-history" aria-hidden="true"></i>

                    {city.name}
                  </button>
                ))}
              </div>
            )}
          </div>

          <div className="hero-weather-art" aria-hidden="true">
            <div className="hero-sun"></div>

            <i className="bi bi-cloud-sun-fill hero-weather-icon"></i>

            <span className="hero-temp">{unit === "metric" ? "24°" : "75°"}</span>
          </div>
        </section>

        <section className="world-weather-section">
          <div className="section-heading">
            <div>
              <span className="section-label">Explore</span>

              <h2>Weather around the world</h2>
            </div>

            <i className="bi bi-globe-americas section-globe" aria-hidden="true"></i>
          </div>

          {loading && (
            <div className="loading-weather">
              <Spinner animation="border" />

              <span>Loading weather...</span>
            </div>
          )}

          {!loading && citiesError && (
            <div className="weather-message" role="alert">
              {citiesError}
            </div>
          )}

          {!loading && !citiesError && (
            <Row className="g-4">
              {weatherList.map((cityData) => {
                const weather = cityData.weather[0]

                const iconUrl = `https://openweathermap.org/img/wn/${weather.icon}@2x.png`

                return (
                  <Col md={6} lg={3} key={cityData.id}>
                    <Card className="weather-card h-100">
                      <div className="weather-card-top">
                        <span>{cityData.sys.country}</span>

                        <img src={iconUrl} alt={weather.description} />
                      </div>

                      <Card.Body className="d-flex flex-column">
                        <Card.Title className="card-title">{cityData.name}</Card.Title>

                        <div className="card-temperature">{Math.round(cityData.main.temp)}°</div>

                        <Card.Text className="weather-description">{weather.description}</Card.Text>

                        <div className="small-weather-data">
                          <span>
                            <i className="bi bi-droplet-fill" aria-hidden="true"></i>
                            {cityData.main.humidity}%
                          </span>

                          <span>Feels {Math.round(cityData.main.feels_like)}°</span>
                        </div>

                        <Button
                          className="weather-btn mt-auto"
                          onClick={() => navigate(`/city/${cityData.id}`)}
                          aria-label={`View weather details for ${cityData.name}`}
                        >
                          Show more
                          <i className="bi bi-arrow-right ms-2" aria-hidden="true"></i>
                        </Button>
                      </Card.Body>
                    </Card>
                  </Col>
                )
              })}
            </Row>
          )}
        </section>
      </Container>
    </div>
  )
}

export default WHomepage
