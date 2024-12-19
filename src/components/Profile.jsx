import { getUser } from "../apollo/queries"
import { useQuery } from "@apollo/client"
import { logout } from "../utils/auth"
import { useNavigate } from "react-router-dom"

function Profile() {
  const { loading, error, data } = useQuery(getUser)
  const naviagte = useNavigate()

  // logout if the JWT is expired and navigate to the login page

  if (loading)
    return (
      <div className="loaing">
        <p>Loading ...</p>
      </div>
    )
  if (error) {
    if (error.message == "Could not verify JWT: JWTExpired") {
      logout()
      naviagte("/")
    }
    return (
      <div className="error">
        <p>{error.message}</p>
      </div>
    )
  }

  /* 
    basic info: user info, audit ratio, xp for each module
  */
  const { attrs, id, login, auditRatio, xps: module_xps } = data.user[0]
  console.log(id, login, attrs, auditRatio, module_xps)
}

export default Profile
