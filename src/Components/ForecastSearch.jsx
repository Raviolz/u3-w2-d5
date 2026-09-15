import { useState } from "react"

import { useNavigate } from "react-router-dom"

import Container from "react-bootstrap/Container"
import Form from "react-bootstrap/Form"
import Button from "react-bootstrap/Button"
import Spinner from "react-bootstrap/Spinner"

import { getCurrentWeatherByCity } from "../services/weatherApi"

import { addRecentSearch } from "../utils/storageUtils"

const ForecastSearch = ({ unit }) => {
  const navigate = useNavigate()

  const [query, setQuery] = useState("")

  const [loading, setLoading] = useState(false)

  const [error, setError] = useState("")

  const handleSubmit = async (event) => {
    event.preventDefault()

    const city = query.trim()

    if (!city) {
      setError("Write the name of a city first.")

      return
    }

    try {
      setLoading(true)
      setError("")

      const data = await getCurrentWeatherByCity(city, unit)

      addRecentSearch({
        id: data.id,
        name: data.name,
        country: data.sys.country,
      })

      navigate(`/city/${data.id}/forecast`)
    } catch (error) {
      setError(error.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <Container className="forecast-search-page py-5 flex-grow-1">
      <div className="forecast-search-box">
        <div className="forecast-icon-circle">
          <i className="bi bi-cloud-sun-fill"></i>
        </div>

        <span className="section-label">Forecast</span>

        <h1>What's coming next?</h1>

        <p>Search a city to check its upcoming weather forecast.</p>

        <Form onSubmit={handleSubmit} className="forecast-search-form">
          <Form.Control type="search" placeholder="Search a city..." value={query} onChange={(event) => setQuery(event.target.value)} />

          <Button type="submit" className="weather-search-btn" disabled={loading}>
            {loading ? (
              <Spinner animation="border" size="sm" />
            ) : (
              <>
                Check forecast
                <i className="bi bi-arrow-right ms-2"></i>
              </>
            )}
          </Button>
        </Form>

        {error && (
          <div className="search-error mt-3">
            <i className="bi bi-exclamation-circle me-2"></i>
            {error}
          </div>
        )}
      </div>
    </Container>
  )
}

export default ForecastSearch
