import Container from "react-bootstrap/Container"

const WFooter = () => {
  return (
    <footer className="bg-white  py-4 mt-auto weather-footer">
      <Container className="text-center text-muted">
        <p className="mb-1 fw-semibold text-primary">Weather App ☀️</p>

        <p className="mb-2 small">Accurate and real-time weather forecasts.</p>

        <div className="small">© Weather App. All rights reserved.</div>
      </Container>
    </footer>
  )
}

export default WFooter
