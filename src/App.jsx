import { Routes, Route } from "react-router-dom"
import { Welcome, Home, Login, Register } from "./pages"

function App() {
  return (
    <div className="container py-4">
      <Routes>
        <Route path="/" element={<Welcome />} />
        <Route path="/home" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </div>
  )
}

export default App
