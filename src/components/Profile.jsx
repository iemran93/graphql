import { getUser, getProgress } from "../apollo/queries"
import { useQuery } from "@apollo/client"
import { logout } from "../utils/auth"
import { useNavigate } from "react-router-dom"
import { getXps, getRecent } from "../utils/helper"
import Card from "./Card"
import XpProgression from "./Graphs/XpProgression"
import Skills from "./Graphs/Skills"

function Profile() {
  // queries
  const {
    loading: userLoading,
    error: userError,
    data: userData,
  } = useQuery(getUser)
  const {
    loading: progressLoading,
    error: progressError,
    data: progressData,
  } = useQuery(getProgress)
  const naviagte = useNavigate()

  // logout if the JWT is expired and navigate to the login page

  if (userLoading || progressLoading)
    return (
      <div className="loading">
        <p>Loading ...</p>
      </div>
    )
  if (userError || progressError) {
    if (userError.message == "Could not verify JWT: JWTExpired") {
      logout()
      naviagte("/")
    }
    const error = userError?.message || progressError?.message
    return (
      <div className="error">
        <p>{error}</p>
      </div>
    )
  }

  /* 
    basic info: user info, audit ratio, xp for each module
  */
  const { attrs, login, auditRatio, xps: module_xps } = userData.user[0]
  const initials = `${attrs.firstName.charAt(0)}${attrs.lastName.charAt(
    0
  )}`.toUpperCase()
  const { firstName, lastName, email, employment, Degree, gender } = attrs
  const groupedXps = getXps(module_xps)
  const recentProject = getRecent(progressData.progress[0])
  return (
    <div className="flex flex-1 my-5">
      <div className="w-1/5 bg-offBackground p-4 shadow-md">
        <div className="flex flex-col items-center mb-10">
          <div className="px-2 py-2 w-30 h-30 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold text-4xl mb-5">
            {initials}
          </div>
          <h2 className="text-primary text-xl font-semibold m-0">{login}</h2>
        </div>
        <div className="grid gap-5 overflow-hidden">
          {Object.entries({
            firstName,
            lastName,
            email,
            employment,
            Degree,
            gender,
          }).map(([key, value]) => (
            <div
              key={key}
              className="flex flex-col p-4 bg-gray-200 rounded-lg transition-transform duration-200 hover:-translate-y-1"
            >
              <span className="text-xs uppercase tracking-wide text-accent mb-1 font-bold">
                {key}
              </span>
              <span className="text-sm text-primary font-medium">{value}</span>
            </div>
          ))}
        </div>
      </div>
      <div className="flex-1 p-4">
        <div className="grid gap-4 mb-6">
          <Card title="audits ratio" data={{ "%": `${auditRatio}` }} />
          <Card title="xps" data={groupedXps} />
          <Card title="recent project" data={recentProject} />
        </div>
        <div className="p-4 bg-white rounded shadow-md">
          <h2 className="text-lg font-bold mb-4 text-center">Graphs</h2>
          <XpProgression />
          <Skills dataType="Technical" />
          <Skills dataType="Technologies" />
        </div>
      </div>
      <div className="graphs--container"></div>
    </div>
  )
}

export default Profile
