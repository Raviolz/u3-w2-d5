import { Button, Container } from "react-bootstrap"
import { useNavigate } from "react-router-dom"

const NotFound = () => {
  const navigate = useNavigate()

  return (
    <Container className="py-5 text-center">
      <h2>404 - Page not found</h2>
      <p className="text-muted">Looks like you're lost.</p>
      <Button
        variant="warning"
        onClick={() => {
          navigate("/")
        }}
      >
        Back to Home
      </Button>
    </Container>
  )
}

export default NotFound
