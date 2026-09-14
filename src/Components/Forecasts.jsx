import { useEffect, useState } from "react"

import { useParams, useNavigate } from "react-router-dom"

import Container from "react-bootstrap/Container"
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"
import Card from "react-bootstrap/Card"
import Button from "react-bootstrap/Button"
import Spinner from "react-bootstrap/Spinner"

import { getForecastById } from "../services/weatherApi"

const Forecasts = () => {
  const { cityId } = useParams()
  const navigate = useNavigate()

  const [cityName, setCityName] = useState("")

  const [dailyForecast, setDailyForecast] = useState([])

  const [loading, setLoading] = useState(true)

  const [error, setError] = useState("")

  useEffect(() => {
    const loadForecast = async () => {
      try {
        setLoading(true)
        setError("")

        const data = await getForecastById(cityId)

        setCityName(data.city?.name || "")

        const fiveDays = data.list.filter((item) => item.dt_txt.includes("15:00:00"))

        setDailyForecast(fiveDays)
      } catch (error) {
        setError(error.message)
      } finally {
        setLoading(false)
      }
    }

    loadForecast()
  }, [cityId])

  return (
    <Container className="forecast-page py-5 flex-grow-1">
      <div className="forecast-heading">
        <span className="section-label">5 day forecast</span>

        <h1>{cityName || "Forecast"}</h1>

        <p>Do you need an umbrella?</p>
      </div>

      <div className="forecast-actions">
        <Button className="weather-btn" onClick={() => navigate(`/city/${cityId}`)}>
          <i className="bi bi-arrow-left me-2"></i>
          Current weather
        </Button>

        <Button className="weather-btn" onClick={() => navigate("/")}>
          Home
        </Button>
      </div>

      {loading && (
        <div className="loading-weather">
          <Spinner animation="border" />
          <span>Loading forecast...</span>
        </div>
      )}

      {!loading && error && <div className="weather-message">{error}</div>}

      {!loading && !error && (
        <Row className="g-4 justify-content-center mt-2">
          {dailyForecast.map((item) => {
            const weather = item.weather[0]

            const iconUrl = `https://openweathermap.org/img/wn/${weather.icon}@2x.png`

            const dateLabel = new Date(item.dt_txt).toLocaleDateString("en-US", {
              weekday: "short",
              month: "short",
              day: "numeric",
            })

            return (
              <Col key={item.dt} xs={12} sm={6} lg>
                <Card className="weather-card forecast-card h-100">
                  <Card.Body className="text-center">
                    <Card.Title className="forecast-date">{dateLabel}</Card.Title>

                    <img src={iconUrl} alt={weather.description} className="forecast-icon" />

                    <div className="forecast-temperature">{Math.round(item.main.temp)}°</div>

                    <div className="weather-description">{weather.description}</div>
                  </Card.Body>
                </Card>
              </Col>
            )
          })}
        </Row>
      )}
    </Container>
  )
}

export default Forecasts
