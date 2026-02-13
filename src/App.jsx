import "./App.css"

import WNavBar from "./Components/WNavBar"
import WFooter from "./Components/WFooter"
import WHomepage from "./Components/WHomepage"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import CityDetails from "./Components/CityDetails"
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
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
        <WFooter />
      </div>
    </BrowserRouter>
  )
}

export default App
