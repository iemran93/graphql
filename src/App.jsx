import { useEffect, useState } from "react"
import { Routes, Route, useNavigate, createBrowserRouter, RouterProvider, Navigate, redirect, Outlet } from "react-router-dom"
import HomePage from "./pages/HomePage"
import LoginPage from "./pages/LoginPage"
import NavBar from "./components/NavBar"
import { getToken, logout } from "./utils/auth"

function App() {
  const [isLogged, setIsLogged] = useState(!!getToken())
  
  const authLoader = () => {
    const token = getToken()
    if (!token) {
      throw redirect("/login")
    }
    return null
  }

  const handleLogout = () => {
    logout()
    setIsLogged(false)
    window.location.href = "/"
  }

  // for not access login page by logged user
  const PublicRoute = () => {
    const token = getToken()
    return !token ? <Outlet /> : <Navigate to="/" /> 
  }
  
  const router = createBrowserRouter([
    {
      element: <>
        <NavBar user={isLogged} onLogout={handleLogout} />
        <Outlet />
      </>,
      children : [
        {
          path: "/",
          element: <HomePage />,
          loader: authLoader,
          errorElement: "Somthing went wrong!",
        },
        {
          element: <PublicRoute />,
          children : [
            {
              path: "/login",
              element: <LoginPage />
            }
          ]
        }
      ]
    },
    {
      path: "*",
      element: "404-Page Not Found!"
    }
  ])
  return (
    <RouterProvider router={router}/>
  )
}

export default App
