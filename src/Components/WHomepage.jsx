import Container from "react-bootstrap/Container"
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"
import Card from "react-bootstrap/Card"
import { useEffect, useState } from "react"

const apiKey = "10006716088e501331dec8ba55214e5f"
const baseUrl = "https://api.openweathermap.org/data/2.5/weather"

const cities = ["San Francisco,US", "New York,US", "Milan,IT", "Sydney,AU"]

const WHomepage = () => {
  const [weatherList, setWeatherList] = useState([]) // per settare stato

  useEffect(() => {
    // per did mount

    // piu fetch insieme con citta' dall array con il map
    Promise.all(
      cities.map((city) => {
        const url = `${baseUrl}?q=${city}&units=metric&lang=en&appid=${apiKey}` // parametro per gradi non in kelvin e lingua

        console.log("Fetch per", city)

        return fetch(url).then((response) => {
          console.log(response.status)

          if (response.ok) {
            return response.json()
          } else {
            throw new Error("Errore 400")
          }
        })
      }),
    )
      .then((dataArray) => {
        console.log("Tutte e quattro le risposte", dataArray)
        setWeatherList(dataArray) // PER ME : Occhio che e' un array con 4 risposte oggetto
      })
      .catch((error) => {
        console.log("Errore ", error)
      })
  }, [])

  return (
    <Container fluid className="py-5 page-bg flex-grow-1">
      <div className="text-center my-5">
        <h1 className="fw-bold weather-title">Discover the Weather Around the World 🌍</h1>
        <p className="fw-bold fs-5">What's the weather like today in your favorite city?</p>
      </div>

      <Row className="g-4 ">
        {weatherList.map((cityData) => (
          <Col md={6} lg={3} key={cityData.id}>
            <Card className="weather-card shadow-sm h-100 text-center">
              <Card.Body>
                <Card.Title className="fw-semibold">{cityData.name}</Card.Title>
                <div className="fs-2 fw-bold">{Math.round(cityData.main.temp)}°C</div> {/*  arrotondamento */}
                <Card.Text className="text-capitalize text-muted mb-2">{cityData.weather[0].description}</Card.Text> {/*  ha un array */}
                <div className="small">
                  <span className="me-2">Min: {Math.round(cityData.main.temp_min)}°C</span>
                  <span>Max: {Math.round(cityData.main.temp_max)}°C</span>
                </div>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  )
}

export default WHomepage
