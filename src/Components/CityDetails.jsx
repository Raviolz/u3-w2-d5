import { useEffect, useState } from "react"

import { useNavigate, useParams } from "react-router-dom"

import Container from "react-bootstrap/Container"
import Button from "react-bootstrap/Button"
import Spinner from "react-bootstrap/Spinner"

import { getCurrentWeatherById } from "../services/weatherApi"

import { formatLocalDate, formatLocalTime, formatVisibility } from "../utils/weatherUtils"

import { addFavoriteCity, isFavoriteCity, removeFavoriteCity } from "../utils/storageUtils"

const CityDetails = ({ unit }) => {
  const { cityId } = useParams()
  const navigate = useNavigate()

  const [cityData, setCityData] = useState(null)

  const [loading, setLoading] = useState(true)

  const [error, setError] = useState("")

  const [favorite, setFavorite] = useState(false)

  useEffect(() => {
    const loadCity = async () => {
      try {
        setLoading(true)
        setError("")

        const data = await getCurrentWeatherById(cityId, unit)

        setCityData(data)

        setFavorite(isFavoriteCity(data.id))
      } catch (error) {
        setError(error.message)
      } finally {
        setLoading(false)
      }
    }

    loadCity()
  }, [cityId, unit])

  const toggleFavorite = () => {
    if (!cityData) {
      return
    }

    if (favorite) {
      removeFavoriteCity(cityData.id)

      setFavorite(false)
    } else {
      addFavoriteCity({
        id: cityData.id,
        name: cityData.name,
        country: cityData.sys.country,
      })

      setFavorite(true)
    }
  }

  if (loading) {
    return (
      <Container className="py-5 text-center flex-grow-1">
        <div className="loading-weather">
          <Spinner animation="border" />

          <span>Loading current weather...</span>
        </div>
      </Container>
    )
  }

  if (error) {
    return (
      <Container className="py-5 text-center flex-grow-1">
        <div className="weather-message">
          <h2 className="mb-3">We couldn't load this city</h2>

          <p>{error}</p>

          <Button className="weather-btn mt-2" onClick={() => navigate("/")}>
            <i className="bi bi-arrow-left me-2"></i>
            Back home
          </Button>
        </div>
      </Container>
    )
  }

  if (!cityData) {
    return null
  }

  const weather = cityData.weather[0]

  const iconUrl = `https://openweathermap.org/img/wn/${weather.icon}@4x.png`

  const localDate = formatLocalDate(cityData.dt, cityData.timezone)

  const localTime = formatLocalTime(cityData.dt, cityData.timezone)

  const sunrise = formatLocalTime(cityData.sys.sunrise, cityData.timezone)

  const sunset = formatLocalTime(cityData.sys.sunset, cityData.timezone)

  const windUnit = unit === "metric" ? "m/s" : "mph"

  return (
    <div className="city-details-page w-100">
      <Container className="py-5">
        <section className="current-weather-panel">
          <div className="current-weather-header">
            <div>
              <span className="details-country">{cityData.sys.country}</span>

              <div className="city-title-row">
                <h1>{cityData.name}</h1>

                <button
                  type="button"
                  className={favorite ? "favorite-button active" : "favorite-button"}
                  onClick={toggleFavorite}
                  aria-label={favorite ? "Remove from favorites" : "Add to favorites"}
                  title={favorite ? "Remove from favorites" : "Add to favorites"}
                >
                  <i className={favorite ? "bi bi-star-fill" : "bi bi-star"}></i>
                </button>
              </div>

              <p className="city-local-time">
                {localDate}
                <span>•</span>
                Local time {localTime}
              </p>
            </div>

            <div className="weather-status-badge">
              <i className="bi bi-broadcast"></i>
              Current weather
            </div>
          </div>

          <div className="current-weather-main">
            <div className="temperature-section">
              <div className="details-temperature">
                {Math.round(cityData.main.temp)}
                <sup>°</sup>
              </div>

              <div>
                <div className="weather-description">{weather.description}</div>

                <div className="feels-like">
                  Feels like <strong>{Math.round(cityData.main.feels_like)}°</strong>
                </div>
              </div>
            </div>

            <div className="weather-illustration">
              <div className="details-sun"></div>

              <img src={iconUrl} alt={weather.description} className="details-weather-icon" />
            </div>
          </div>

          <div className="temperature-range">
            <div className="range-item">
              <i className="bi bi-arrow-down"></i>

              <span>Low</span>

              <strong>{Math.round(cityData.main.temp_min)}°</strong>
            </div>

            <div className="range-divider"></div>

            <div className="range-item">
              <i className="bi bi-arrow-up"></i>

              <span>High</span>

              <strong>{Math.round(cityData.main.temp_max)}°</strong>
            </div>
          </div>
        </section>

        <section className="weather-details-section">
          <div className="section-heading details-section-heading">
            <div>
              <span className="section-label">Right now</span>

              <h2>Weather details</h2>
            </div>
          </div>

          <div className="weather-info-grid">
            <article className="weather-info-card">
              <div className="info-icon">
                <i className="bi bi-droplet-fill"></i>
              </div>

              <span className="info-label">Humidity</span>

              <strong className="info-value">{cityData.main.humidity}%</strong>
            </article>

            <article className="weather-info-card">
              <div className="info-icon">
                <i className="bi bi-wind"></i>
              </div>

              <span className="info-label">Wind</span>

              <strong className="info-value">
                {cityData.wind.speed} {windUnit}
              </strong>
            </article>

            <article className="weather-info-card">
              <div className="info-icon">
                <i className="bi bi-speedometer2"></i>
              </div>

              <span className="info-label">Pressure</span>

              <strong className="info-value">{cityData.main.pressure} hPa</strong>
            </article>

            <article className="weather-info-card">
              <div className="info-icon">
                <i className="bi bi-eye-fill"></i>
              </div>

              <span className="info-label">Visibility</span>

              <strong className="info-value">{formatVisibility(cityData.visibility)}</strong>
            </article>

            <article className="weather-info-card">
              <div className="info-icon">
                <i className="bi bi-cloud-fill"></i>
              </div>

              <span className="info-label">Cloud cover</span>

              <strong className="info-value">{cityData.clouds.all}%</strong>
            </article>

            <article className="weather-info-card">
              <div className="info-icon">
                <i className="bi bi-thermometer-half"></i>
              </div>

              <span className="info-label">Feels like</span>

              <strong className="info-value">{Math.round(cityData.main.feels_like)}°</strong>
            </article>
          </div>
        </section>

        <section className="sun-section">
          <div className="sun-card">
            <div className="sun-icon">
              <i className="bi bi-sunrise-fill"></i>
            </div>

            <div>
              <span>Sunrise</span>

              <strong>{sunrise}</strong>
            </div>
          </div>

          <div className="sun-path">
            <div className="sun-path-line"></div>

            <div className="sun-path-sun">
              <i className="bi bi-sun-fill"></i>
            </div>
          </div>

          <div className="sun-card sunset-card">
            <div className="sun-icon">
              <i className="bi bi-sunset-fill"></i>
            </div>

            <div>
              <span>Sunset</span>

              <strong>{sunset}</strong>
            </div>
          </div>
        </section>

        <div className="details-actions">
          <Button className="weather-btn" onClick={() => navigate("/")}>
            <i className="bi bi-arrow-left me-2"></i>
            Back home
          </Button>

          <Button className="weather-btn weather-btn-primary" onClick={() => navigate(`/city/${cityId}/forecast`)}>
            View forecast
            <i className="bi bi-arrow-right ms-2"></i>
          </Button>
        </div>
      </Container>
    </div>
  )
}

export default CityDetails
