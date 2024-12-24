import { useEffect, useState } from "react"
import { Routes, Route, useNavigate } from "react-router-dom"
import HomePage from "./pages/HomePage"
import LoginPage from "./pages/LoginPage"
import NavBar from "./components/NavBar"
import { getToken } from "./utils/auth"
import { logout } from "./utils/auth"

function App() {
  const [user, setUser] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    const token = getToken()
    if (token) {
      setUser(true)
    } else {
      navigate("/login")
    }
  }, [navigate])

  const handleLogout = () => {
    logout()
    navigate("/login")
    setUser(false)
  }

  return (
    <>
      <NavBar user={user} onLogout={handleLogout} />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
      </Routes>
    </>
  )
}

export default App
