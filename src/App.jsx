import "./App.css"

import { useState } from "react"

import { BrowserRouter, Routes, Route } from "react-router-dom"

import WNavBar from "./Components/WNavBar"
import WFooter from "./Components/WFooter"
import WHomepage from "./Components/WHomepage"
import CityDetails from "./Components/CityDetails"
import Forecasts from "./Components/Forecasts"
import ForecastSearch from "./Components/ForecastSearch"
import Profile from "./Components/Profile"
import NotFound from "./Components/NotFound"

import { getSavedUnit, saveUnit } from "./utils/storageUtils.js"

function App() {
  const [unit, setUnit] = useState(getSavedUnit)

  const handleUnitChange = (newUnit) => {
    setUnit(newUnit)

    saveUnit(newUnit)
  }

  return (
    <BrowserRouter>
      <div className="d-flex flex-column min-vh-100">
        <WNavBar unit={unit} onUnitChange={handleUnitChange} />

        <main className="flex-grow-1 d-flex app-main">
          <Routes>
            <Route path="/" element={<WHomepage unit={unit} />} />

            <Route path="/city/:cityId" element={<CityDetails unit={unit} />} />

            <Route path="/city/:cityId/forecast" element={<Forecasts unit={unit} />} />

            <Route path="/forecast" element={<ForecastSearch unit={unit} />} />

            <Route path="/profile" element={<Profile unit={unit} onUnitChange={handleUnitChange} />} />

            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>

        <WFooter />
      </div>
    </BrowserRouter>
  )
}

export default App
