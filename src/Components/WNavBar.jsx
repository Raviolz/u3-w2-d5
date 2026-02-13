import Container from "react-bootstrap/Container"
import Nav from "react-bootstrap/Nav"
import Navbar from "react-bootstrap/Navbar"
import NavDropdown from "react-bootstrap/NavDropdown"
const WNavBar = () => {
  return (
    <Navbar expand="lg" className="bg-white weather-nav">
      <Container fluid>
        <Navbar.Brand href="#home" className="d-flex align-items-center gap-2">
          <img src="/logoW.JPG" width="40" height="40" alt="Weather App Logo" />
        </Navbar.Brand>

        {/* DESKTOP:  */}
        <Navbar.Collapse id="main-nav" className="order-3 order-lg-2">
          <Nav className="me-auto">
            <Nav.Link href="#home">Home</Nav.Link>
            <Nav.Link href="#previsioni">Forecasts</Nav.Link>
          </Nav>
        </Navbar.Collapse>

        {/*  Account + Burger */}
        <div className="d-flex align-items-center gap-2 order-2 order-lg-3">
          <NavDropdown align="end" id="account-dropdown" title={<i className="bi bi-person-circle fs-4"></i>}>
            <NavDropdown.Item href="#profile">Profile</NavDropdown.Item>
            <NavDropdown.Item href="#settings">Settings</NavDropdown.Item>
            <NavDropdown.Divider />
            <NavDropdown.Item href="#logout">Logout</NavDropdown.Item>
          </NavDropdown>

          <Navbar.Toggle aria-controls="main-nav" />
        </div>
      </Container>
    </Navbar>
  )
}

export default WNavBar
