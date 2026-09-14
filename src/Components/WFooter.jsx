import Container from "react-bootstrap/Container"

const WFooter = () => {
  return (
    <footer className="weather-footer mt-auto">
      <Container className="py-4 d-flex flex-column flex-md-row align-items-center justify-content-between gap-2">
        <div className="footer-brand">
          Weather
          <span>App</span>
        </div>

        <div className="footer-copy">Weather data provided by OpenWeather</div>
      </Container>
    </footer>
  )
}

export default WFooter
