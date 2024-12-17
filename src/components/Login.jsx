/* 
    form
    username, password, submit button
    onSubmit => get JWT and store it in local storage
*/
import React from "react"
import Toast from "./Toast"
import { setToken } from "../utils/auth"
import { useNavigate } from "react-router-dom"

function Login() {
  const [uname, setUname] = React.useState("")
  const [pass, setPass] = React.useState("")
  const [toast, setToast] = React.useState({ msg: "", status: "" })
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    console.log(uname, pass)
    /* 
            make a POST request to the api to validate the data (base64 encoding)
            and retreive the JWT
        */
    const credentials = btoa(`${uname}:${pass}`)
    const res = await fetch(import.meta.env.VITE_SIGNIN_URI, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Basic ${credentials}`,
      },
    })

    const result = await res.json()
    if (res.ok) {
      setToast({ msg: "Logged in", status: "success" })
      console.log(result)
      setToken(result)
      setTimeout(() => {
        navigate("/")
      }, 2000)
    } else {
      /* 
            pop up a toaster with the err msg
        */
      const err = result.error
      setToast({ msg: err, status: "error" })
      console.log(err)
    }
  }

  const clearToast = () => {
    setToast({ msg: "", status: "" })
  }

  return (
    <div>
      <form className="form--main" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Username/Email"
          name="username"
          value={uname}
          onChange={(e) => setUname(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          name="password"
          value={pass}
          onChange={(e) => setPass(e.target.value)}
          required
        />
        <button type="submit">Login</button>
      </form>
      <Toast msg={toast.msg} status={toast.status} clearToast={clearToast} />
    </div>
  )
}

export default Login
