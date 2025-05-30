import { Route, Routes } from "react-router-dom"
import { Home, SummaryPage } from "./pages"

function App() {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/summary" element={<SummaryPage />} />
        </Routes>
    )
}

export default App
