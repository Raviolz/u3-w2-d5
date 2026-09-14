import { useState } from "react"

import Container from "react-bootstrap/Container"
import Form from "react-bootstrap/Form"
import Button from "react-bootstrap/Button"

const Profile = () => {
  const [name, setName] = useState(() => localStorage.getItem("weatherProfileName") || "")

  const [homeCity, setHomeCity] = useState(() => localStorage.getItem("weatherHomeCity") || "")

  const [saved, setSaved] = useState(false)

  const handleSubmit = (event) => {
    event.preventDefault()

    localStorage.setItem("weatherProfileName", name.trim())

    localStorage.setItem("weatherHomeCity", homeCity.trim())

    setSaved(true)

    setTimeout(() => {
      setSaved(false)
    }, 2000)
  }

  return (
    <Container className="profile-page py-5 flex-grow-1">
      <div className="profile-layout">
        <div className="profile-intro">
          <div className="profile-avatar">
            <i className="bi bi-person-fill"></i>
          </div>

          <span className="section-label">Your profile</span>

          <h1>Make the weather app yours.</h1>

          <p>Save a name and your home city. Later we'll use this page for favourites and weather preferences too.</p>
        </div>

        <Form className="profile-form" onSubmit={handleSubmit}>
          <Form.Group className="mb-4">
            <Form.Label>Your name</Form.Label>

            <Form.Control type="text" value={name} placeholder="Your name" onChange={(event) => setName(event.target.value)} />
          </Form.Group>

          <Form.Group className="mb-4">
            <Form.Label>Home city</Form.Label>

            <Form.Control type="text" value={homeCity} placeholder="e.g. Bergamo" onChange={(event) => setHomeCity(event.target.value)} />
          </Form.Group>

          <Button type="submit" className="weather-search-btn">
            Save profile
          </Button>

          {saved && (
            <div className="profile-saved">
              <i className="bi bi-check-circle-fill me-2"></i>
              Profile saved
            </div>
          )}
        </Form>
      </div>
    </Container>
  )
}

export default Profile
