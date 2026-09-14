import { useEffect, useState } from "react"

import { useParams, useNavigate } from "react-router-dom"

import Container from "react-bootstrap/Container"
import Button from "react-bootstrap/Button"
import Spinner from "react-bootstrap/Spinner"

import { getForecastById } from "../services/weatherApi"

import { buildDailyForecast, formatForecastDay, formatForecastHour } from "../utils/weatherUtils"

const Forecasts = () => {
  const { cityId } = useParams()
  const navigate = useNavigate()

  const [forecastData, setForecastData] = useState(null)

  const [loading, setLoading] = useState(true)

  const [error, setError] = useState("")

  useEffect(() => {
    const loadForecast = async () => {
      try {
        setLoading(true)
        setError("")

        const data = await getForecastById(cityId)

        setForecastData(data)
      } catch (error) {
        setError(error.message)
      } finally {
        setLoading(false)
      }
    }

    loadForecast()
  }, [cityId])

  if (loading) {
    return (
      <Container className="py-5 flex-grow-1">
        <div className="loading-weather">
          <Spinner animation="border" />

          <span>Loading forecast...</span>
        </div>
      </Container>
    )
  }

  if (error) {
    return (
      <Container className="py-5 flex-grow-1">
        <div className="weather-message">
          <h2>We couldn't load the forecast</h2>

          <p>{error}</p>

          <Button className="weather-btn mt-2" onClick={() => navigate(`/city/${cityId}`)}>
            <i className="bi bi-arrow-left me-2"></i>
            Current weather
          </Button>
        </div>
      </Container>
    )
  }

  if (!forecastData) {
    return null
  }

  const timezone = forecastData.city.timezone

  const hourlyForecast = forecastData.list.slice(0, 8)

  const dailyForecast = buildDailyForecast(forecastData.list, timezone)

  return (
    <div className="forecast-page w-100">
      <Container className="py-5">
        <section className="forecast-hero">
          <div>
            <span className="forecast-hero-label">Weather forecast</span>

            <h1>{forecastData.city.name}</h1>

            <p>
              {forecastData.city.country}
              <span>•</span>
              Next 5 days
            </p>
          </div>

          <div className="forecast-hero-art">
            <div className="forecast-hero-sun">
              <i className="bi bi-sun-fill"></i>
            </div>

            <i className="bi bi-cloud-fill forecast-hero-cloud"></i>
          </div>
        </section>

        <section className="hourly-section">
          <div className="forecast-section-heading">
            <div>
              <span className="section-label">Next hours</span>

              <h2>Next 24 hours</h2>
            </div>

            <span className="forecast-section-note">Updated every 3 hours</span>
          </div>

          <div className="hourly-forecast-list">
            {hourlyForecast.map((item, index) => {
              const weather = item.weather[0]

              const iconUrl = `https://openweathermap.org/img/wn/${weather.icon}@2x.png`

              const precipitation = Math.round((item.pop || 0) * 100)

              return (
                <article className={index === 0 ? "hourly-card hourly-card-current" : "hourly-card"} key={item.dt}>
                  <span className="hourly-time">{index === 0 ? "Next" : formatForecastHour(item.dt, timezone)}</span>

                  <img src={iconUrl} alt={weather.description} />

                  <strong className="hourly-temperature">{Math.round(item.main.temp)}°</strong>

                  <span className="hourly-condition">{weather.description}</span>

                  <div className="hourly-rain">
                    <i className="bi bi-droplet-fill"></i>
                    {precipitation}%
                  </div>
                </article>
              )
            })}
          </div>
        </section>

        <section className="daily-section">
          <div className="forecast-section-heading">
            <div>
              <span className="section-label">This week</span>

              <h2>5 day forecast</h2>
            </div>
          </div>

          <div className="daily-forecast-list">
            {dailyForecast.map((day) => {
              const iconUrl = `https://openweathermap.org/img/wn/${day.weather.icon}@2x.png`

              const precipitation = Math.round(day.precipitationProbability * 100)

              return (
                <article className="daily-forecast-card" key={day.dateKey}>
                  <div className="daily-date">{formatForecastDay(day.timestamp, timezone)}</div>

                  <div className="daily-condition">
                    <img src={iconUrl} alt={day.weather.description} />

                    <span>{day.weather.description}</span>
                  </div>

                  <div className="daily-rain">
                    <i className="bi bi-droplet-fill"></i>
                    {precipitation}%
                  </div>

                  <div className="daily-temperatures">
                    <span>
                      <i className="bi bi-arrow-down"></i>
                      {Math.round(day.minTemperature)}°
                    </span>

                    <strong>
                      <i className="bi bi-arrow-up"></i>
                      {Math.round(day.maxTemperature)}°
                    </strong>
                  </div>
                </article>
              )
            })}
          </div>
        </section>

        <div className="forecast-actions">
          <Button className="weather-btn" onClick={() => navigate(`/city/${cityId}`)}>
            <i className="bi bi-arrow-left me-2"></i>
            Current weather
          </Button>

          <Button className="weather-btn" onClick={() => navigate("/")}>
            Home
          </Button>
        </div>
      </Container>
    </div>
  )
}

export default Forecasts
