import { useEffect } from "react"
import { Routes, Route, useNavigate } from "react-router-dom"
import HomePage from "./pages/HomePage"
import LoginPage from "./pages/LoginPage"
import { getToken } from "./utils/auth"

function App() {
  const navigate = useNavigate()

  useEffect(() => {
    const user = getToken()
    if (!user) {
      navigate("/login")
    }
  }, [navigate])

  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/login" element={<LoginPage />} />
    </Routes>
  )
}

export default App
