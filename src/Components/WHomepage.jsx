import Container from "react-bootstrap/Container"
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"
import Card from "react-bootstrap/Card"

const WHomepage = () => {
  return (
    <Container fluid className="py-5 page-bg">
      <div className="text-center mb-5">
        <h1 className="fw-bold weather-title">Discover the Weather Around the World 🌍</h1>
        <p className="text-muted fs-5">What's the weather like today in your favorite city?</p>
      </div>

      <Row className="g-4">
        <Col md={6} lg={3}>
          <Card className="weather-card shadow-sm h-100 text-center">
            <Card.Img variant="top" src="https://placecats.com/300/200" />
            <Card.Body>
              <Card.Title>San Francisco</Card.Title>
              <Card.Text>Coastal breeze and golden sunsets await.</Card.Text>
            </Card.Body>
          </Card>
        </Col>

        <Col md={6} lg={3}>
          <Card className="weather-card shadow-sm h-100 text-center">
            <Card.Img variant="top" src="https://placecats.com/300/200" />
            <Card.Body>
              <Card.Title>New York</Card.Title>
              <Card.Text>The city that never sleeps — under any sky.</Card.Text>
            </Card.Body>
          </Card>
        </Col>

        <Col md={6} lg={3}>
          <Card className="weather-card shadow-sm h-100 text-center">
            <Card.Img variant="top" src="https://placecats.com/300/200" />
            <Card.Body>
              <Card.Title>Milan</Card.Title>
              <Card.Text>Style, culture, and changing skies.</Card.Text>
            </Card.Body>
          </Card>
        </Col>

        <Col md={6} lg={3}>
          <Card className="weather-card shadow-sm h-100 text-center">
            <Card.Img variant="top" src="https://placecats.com/300/200" />
            <Card.Body>
              <Card.Title>Sydney</Card.Title>
              <Card.Text>Sunshine, ocean waves, and open horizons.</Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  )
}

export default WHomepage
