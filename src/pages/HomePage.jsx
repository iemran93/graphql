import Profile from "../components/Profile"
import { logout } from "../utils/auth"
import { useNavigate } from "react-router-dom"

function HomePage() {
  const navigate = useNavigate()
  return (
    <div className="bg-slate-800 min-h-screen flex flex-col">
      <div className="bg-gray-500 text-white p-4 shadow-md">
        <button
          onClick={() => {
            logout()
            navigate("/login")
          }}
        >
          Logout
        </button>
        <h1>Home Page</h1>
      </div>
      <Profile />
    </div>
  )
}

export default HomePage
