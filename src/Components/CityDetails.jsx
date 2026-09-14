import { useEffect, useState } from "react"

import { useNavigate, useParams } from "react-router-dom"

import Container from "react-bootstrap/Container"
import Card from "react-bootstrap/Card"
import Button from "react-bootstrap/Button"
import Spinner from "react-bootstrap/Spinner"

import { getCurrentWeatherById } from "../services/weatherApi"

const CityDetails = () => {
  const { cityId } = useParams()
  const navigate = useNavigate()

  const [cityData, setCityData] = useState(null)

  const [loading, setLoading] = useState(true)

  const [error, setError] = useState("")

  useEffect(() => {
    const loadCity = async () => {
      try {
        setLoading(true)
        setError("")

        const data = await getCurrentWeatherById(cityId)

        setCityData(data)
      } catch (error) {
        setError(error.message)
      } finally {
        setLoading(false)
      }
    }

    loadCity()
  }, [cityId])

  if (loading) {
    return (
      <Container className="py-5 text-center flex-grow-1">
        <Spinner animation="border" />

        <p className="mt-3">Loading city details...</p>
      </Container>
    )
  }

  if (error) {
    return (
      <Container className="py-5 text-center flex-grow-1">
        <h2>Something went wrong</h2>

        <p>{error}</p>

        <Button className="weather-btn" onClick={() => navigate("/")}>
          Back home
        </Button>
      </Container>
    )
  }

  if (!cityData) {
    return null
  }

  const weather = cityData.weather[0]

  const iconUrl = `https://openweathermap.org/img/wn/${weather.icon}@2x.png`

  return (
    <Container className="py-5 d-flex justify-content-center flex-grow-1">
      <Card className="weather-card details-card">
        <Card.Body className="p-4 p-md-5 d-flex flex-column">
          <div className="details-country">{cityData.sys.country}</div>

          <Card.Title className="city-title">{cityData.name}</Card.Title>

          <img src={iconUrl} alt={weather.description} className="details-weather-icon" />

          <div className="details-temperature">
            {Math.round(cityData.main.temp)}
            °C
          </div>

          <Card.Text className="weather-description fs-5">{weather.description}</Card.Text>

          <div className="details-data">
            <div>
              <span>Min</span>
              <strong>{Math.round(cityData.main.temp_min)}°</strong>
            </div>

            <div>
              <span>Max</span>
              <strong>{Math.round(cityData.main.temp_max)}°</strong>
            </div>

            <div>
              <span>Humidity</span>
              <strong>{cityData.main.humidity}%</strong>
            </div>

            <div>
              <span>Wind</span>
              <strong>{cityData.wind.speed} m/s</strong>
            </div>
          </div>

          <div className="d-flex flex-column flex-sm-row gap-3 mt-5">
            <Button className="weather-btn flex-grow-1" onClick={() => navigate("/")}>
              <i className="bi bi-arrow-left me-2"></i>
              Back
            </Button>

            <Button className="weather-btn weather-btn-primary flex-grow-1" onClick={() => navigate(`/city/${cityId}/forecast`)}>
              View forecast
              <i className="bi bi-arrow-right ms-2"></i>
            </Button>
          </div>
        </Card.Body>
      </Card>
    </Container>
  )
}

export default CityDetails
