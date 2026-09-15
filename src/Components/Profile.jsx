import { useEffect, useState } from "react"

import { useNavigate } from "react-router-dom"

import Container from "react-bootstrap/Container"
import Form from "react-bootstrap/Form"
import Button from "react-bootstrap/Button"

import { clearRecentSearches, getFavorites, getRecentSearches, removeFavoriteCity } from "../utils/storageUtils"

const Profile = ({ unit, onUnitChange }) => {
  const navigate = useNavigate()

  const [name, setName] = useState(() => localStorage.getItem("weatherProfileName") || "")

  const [homeCity, setHomeCity] = useState(() => localStorage.getItem("weatherHomeCity") || "")

  const [favorites, setFavorites] = useState([])

  const [recentSearches, setRecentSearches] = useState([])

  const [saved, setSaved] = useState(false)

  useEffect(() => {
    setFavorites(getFavorites())

    setRecentSearches(getRecentSearches())
  }, [])

  const handleSubmit = (event) => {
    event.preventDefault()

    localStorage.setItem("weatherProfileName", name.trim())

    localStorage.setItem("weatherHomeCity", homeCity.trim())

    setSaved(true)

    setTimeout(() => {
      setSaved(false)
    }, 2000)
  }

  const handleRemoveFavorite = (cityId) => {
    const updated = removeFavoriteCity(cityId)

    setFavorites(updated)
  }

  const handleClearRecent = () => {
    clearRecentSearches()

    setRecentSearches([])
  }

  return (
    <Container className="profile-page py-5 flex-grow-1">
      <div className="profile-dashboard">
        <section className="profile-header">
          <div className="profile-avatar">
            <i className="bi bi-person-fill"></i>
          </div>

          <div>
            <span className="section-label">Your profile</span>

            <h1>{name ? `Hi, ${name}.` : "Make the weather app yours."}</h1>

            <p>Manage your home city, favourite places and weather preferences.</p>
          </div>
        </section>

        <div className="profile-grid">
          <Form className="profile-form" onSubmit={handleSubmit}>
            <h2>Preferences</h2>

            <Form.Group className="mb-4">
              <Form.Label>Your name</Form.Label>

              <Form.Control type="text" value={name} placeholder="Your name" onChange={(event) => setName(event.target.value)} />
            </Form.Group>

            <Form.Group className="mb-4">
              <Form.Label>Home city</Form.Label>

              <Form.Control type="text" value={homeCity} placeholder="e.g. Bergamo" onChange={(event) => setHomeCity(event.target.value)} />
            </Form.Group>

            <Form.Group className="mb-4">
              <Form.Label>Temperature unit</Form.Label>

              <div className="profile-unit-options">
                <button type="button" className={unit === "metric" ? "profile-unit active" : "profile-unit"} onClick={() => onUnitChange("metric")}>
                  Celsius °C
                </button>

                <button type="button" className={unit === "imperial" ? "profile-unit active" : "profile-unit"} onClick={() => onUnitChange("imperial")}>
                  Fahrenheit °F
                </button>
              </div>
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

          <div className="profile-lists">
            <section className="profile-list-section">
              <div className="profile-list-heading">
                <div>
                  <span className="section-label">Saved</span>

                  <h2>Favourite cities</h2>
                </div>

                <i className="bi bi-star-fill"></i>
              </div>

              {favorites.length === 0 ? (
                <p className="empty-profile-list">You haven't saved any cities yet.</p>
              ) : (
                <div className="saved-city-list">
                  {favorites.map((city) => (
                    <div className="saved-city-row" key={city.id}>
                      <button type="button" className="saved-city-name" onClick={() => navigate(`/city/${city.id}`)}>
                        <strong>{city.name}</strong>

                        <span>{city.country}</span>
                      </button>

                      <button type="button" className="remove-city-button" onClick={() => handleRemoveFavorite(city.id)} aria-label={`Remove ${city.name}`}>
                        <i className="bi bi-x-lg"></i>
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </section>

            <section className="profile-list-section">
              <div className="profile-list-heading">
                <div>
                  <span className="section-label">History</span>

                  <h2>Recent searches</h2>
                </div>

                {recentSearches.length > 0 && (
                  <button type="button" className="clear-history-button" onClick={handleClearRecent}>
                    Clear
                  </button>
                )}
              </div>

              {recentSearches.length === 0 ? (
                <p className="empty-profile-list">No recent searches yet.</p>
              ) : (
                <div className="saved-city-list">
                  {recentSearches.map((city) => (
                    <button type="button" className="recent-profile-city" key={city.id} onClick={() => navigate(`/city/${city.id}`)}>
                      <i className="bi bi-clock-history"></i>

                      <div>
                        <strong>{city.name}</strong>

                        <span>{city.country}</span>
                      </div>

                      <i className="bi bi-arrow-right"></i>
                    </button>
                  ))}
                </div>
              )}
            </section>
          </div>
        </div>
      </div>
    </Container>
  )
}

export default Profile
