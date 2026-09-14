import Container from "react-bootstrap/Container"
import Nav from "react-bootstrap/Nav"
import Navbar from "react-bootstrap/Navbar"
import NavDropdown from "react-bootstrap/NavDropdown"

import { Link, useLocation } from "react-router-dom"

const WNavBar = () => {
  const location = useLocation()

  const isForecastActive = location.pathname === "/forecast" || location.pathname.includes("/forecast")

  return (
    <Navbar expand="lg" className="weather-nav" sticky="top">
      <Container>
        <Navbar.Brand as={Link} to="/" className="weather-brand">
          <img src="/logoW.JPG" alt="Weather App" className="weather-logo" />
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="main-nav" />

        <Navbar.Collapse id="main-nav">
          <Nav className="ms-auto align-items-lg-center gap-lg-2">
            <Nav.Link as={Link} to="/" className={location.pathname === "/" ? "active" : ""}>
              Home
            </Nav.Link>

            <Nav.Link as={Link} to="/forecast" className={isForecastActive ? "active" : ""}>
              Forecast
            </Nav.Link>

            <NavDropdown
              align="end"
              id="account-dropdown"
              title={
                <span className="account-icon">
                  <i className="bi bi-person-circle"></i>
                </span>
              }
            >
              <NavDropdown.Item as={Link} to="/profile">
                <i className="bi bi-person me-2"></i>
                Profile
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}

export default WNavBar
