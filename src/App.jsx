import "./App.css"

import WNavBar from "./Components/WNavBar"
import WFooter from "./Components/WFooter"
import WHomepage from "./Components/WHomepage"

function App() {
  return (
    <div className="d-flex flex-column min-vh-100">
      <WNavBar />
      <main className="flex-grow-1 d-flex">
        <WHomepage />
      </main>
      <WFooter />
    </div>
  )
}

export default App
