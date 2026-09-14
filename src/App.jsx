import "./App.css"

import { BrowserRouter, Routes, Route } from "react-router-dom"

import WNavBar from "./Components/WNavBar"
import WFooter from "./Components/WFooter"
import WHomepage from "./Components/WHomepage"
import CityDetails from "./Components/CityDetails"
import Forecasts from "./Components/Forecasts"
import ForecastSearch from "./Components/ForecastSearch"
import Profile from "./Components/Profile"
import NotFound from "./Components/NotFound"

function App() {
  return (
    <BrowserRouter>
      <div className="d-flex flex-column min-vh-100">
        <WNavBar />

        <main className="flex-grow-1 d-flex app-main">
          <Routes>
            <Route path="/" element={<WHomepage />} />

            <Route path="/city/:cityId" element={<CityDetails />} />

            <Route path="/city/:cityId/forecast" element={<Forecasts />} />

            <Route path="/forecast" element={<ForecastSearch />} />

            <Route path="/profile" element={<Profile />} />

            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>

        <WFooter />
      </div>
    </BrowserRouter>
  )
}

export default App
