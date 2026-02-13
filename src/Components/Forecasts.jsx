import { useEffect, useState } from "react"
import { useParams, useNavigate } from "react-router-dom"
import Container from "react-bootstrap/Container"
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"
import Card from "react-bootstrap/Card"
import Button from "react-bootstrap/Button"

const apiKey = "10006716088e501331dec8ba55214e5f"
const baseUrl = "https://api.openweathermap.org/data/2.5/forecast"

const Forecasts = () => {
  const { cityId } = useParams()
  const navigate = useNavigate()

  const [cityName, setCityName] = useState("")
  const [dailyForecast, setDailyForecast] = useState([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const url = `${baseUrl}?id=${cityId}&units=metric&lang=en&appid=${apiKey}`

    fetch(url)
      .then((response) => {
        if (response.ok) {
          return response.json()
        } else {
          throw new Error("Errore ")
        }
      })
      .then((data) => {
        console.log("DATA:", data)

        setCityName(data.city?.name || "")

        const fiveDays = data.list.filter((item) => item.dt_txt.includes("15:00:00")) // tot 40 risultati...prendo meta' giornata per tutti
        console.log(fiveDays)
        setDailyForecast(fiveDays)
      })
      .catch((err) => console.log(err))
      .finally(() => setLoading(false)) // trovato finally online ancora non sicura se lo sto usando giusto
  }, [cityId])

  return (
    <Container fluid className="py-5 flex-grow-1">
      <div className="text-center mb-4">
        <h1 className="fw-bold weather-title">{cityName ? `Forecast for ${cityName}` : ""}</h1>
        <p className="text-muted">Do you need an umbrella?</p>
      </div>

      <div className="d-flex justify-content-center mb-4 gap-2">
        <Button className="weather-btn" onClick={() => navigate(`/city/${cityId}`)}>
          Back to Details
        </Button>

        <Button className="weather-btn" onClick={() => navigate("/")}>
          Home
        </Button>
      </div>

      {loading && <div className="text-center text-muted">Loading forecast...</div>}

      {!loading && (
        <Row className="g-4 justify-content-center">
          {dailyForecast.map((item) => {
            const weather = item.weather?.[0]
            const iconUrl = `https://openweathermap.org/img/wn/${weather.icon}@2x.png`

            const dateLabel = new Date(item.dt_txt).toLocaleDateString("en-US", {
              weekday: "short",
              month: "short",
              day: "numeric",
            })

            return (
              <Col key={item.dt} xs={12} md={6} lg={3} xl={2}>
                <Card className="weather-card shadow-sm h-100 text-center">
                  <Card.Body>
                    <Card.Title className="fw-bold mb-2">{dateLabel}</Card.Title>

                    <img src={iconUrl} alt={weather.description} />

                    <div className="fs-3 fw-bold">{Math.round(item.main.temp)}°C</div>

                    <div className="text-muted text-capitalize">{weather.description}</div>
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
