import { useNavigate } from "react-router-dom"

import Container from "react-bootstrap/Container"
import Button from "react-bootstrap/Button"

const NotFound = () => {
  const navigate = useNavigate()

  return (
    <Container className="not-found-page py-5 flex-grow-1">
      <div className="not-found-content">
        <div className="not-found-weather" aria-hidden="true">
          <div className="not-found-sun"></div>

          <i className="bi bi-cloud-fill"></i>

          <span>404</span>
        </div>

        <span className="section-label">Lost in the clouds</span>

        <h1>We can't find this page.</h1>

        <p>The forecast is clear: there's nothing here. Let's get you back somewhere useful.</p>

        <Button className="weather-search-btn" onClick={() => navigate("/")}>
          <i className="bi bi-house-fill me-2" aria-hidden="true"></i>
          Back home
        </Button>
      </div>
    </Container>
  )
}

export default NotFound
