import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import Container from "react-bootstrap/Container"
import Card from "react-bootstrap/Card"
import Button from "react-bootstrap/Button"
import { useNavigate } from "react-router-dom"

const apiKey = "10006716088e501331dec8ba55214e5f"
const baseUrl = "https://api.openweathermap.org/data/2.5/weather"

const CityDetails = () => {
  const { cityId } = useParams()
  const [cityData, setCityData] = useState(null)
  const navigate = useNavigate()

  useEffect(() => {
    const url = `${baseUrl}?id=${cityId}&units=metric&lang=en&appid=${apiKey}`

    fetch(url)
      .then((response) => {
        if (response.ok) {
          return response.json()
        } else {
          throw new Error("Errore nella response")
        }
      })
      .then((data) => {
        setCityData(data)
        console.log("dati", data)
      })
      .catch((error) => console.log(error))
  }, [cityId])
  if (!cityData) {
    // finche non carica rimane null e non va niente
    return (
      <Container className="py-5 text-center flex-grow-1">
        <p className="text-muted">Loading city details...</p>
      </Container>
    )
  }

  const weather = cityData.weather[0]

  return (
    <Container className="py-5 d-flex justify-content-center flex-grow-1">
      <Card className="weather-card shadow-lg details-card text-center d-flex">
        <Card.Body className="d-flex flex-column">
          <Card.Title className="city-title fs-2 fw-bold mb-3">{cityData.name}</Card.Title>

          <div className="fs-1 fw-bold mb-2">{Math.round(cityData.main.temp)}°C</div>

          <Card.Text className="text-capitalize text-muted mb-4">{weather.description}</Card.Text>

          <div className="d-flex justify-content-center gap-4 flex-wrap mt-4">
            <div>
              <div className="text-muted small">Min</div>
              <div className="fw-semibold">{Math.round(cityData.main.temp_min)}°C</div>
            </div>

            <div>
              <div className="text-muted small">Max</div>
              <div className="fw-semibold">{Math.round(cityData.main.temp_max)}°C</div>
            </div>

            <div>
              <div className="text-muted small">Humidity</div>
              <div className="fw-semibold">{cityData.main.humidity}%</div>
            </div>

            <div>
              <div className="text-muted small">Wind</div>
              <div className="fw-semibold">{cityData.wind.speed} m/s</div>
            </div>
          </div>

          <Button className="weather-btn mt-auto mb-4 w-50 align-self-center" onClick={() => navigate("/")}>
            Back
          </Button>
        </Card.Body>
      </Card>
    </Container>
  )
}

export default CityDetails
