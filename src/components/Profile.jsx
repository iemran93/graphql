import { getUser, getProgress, getXps } from "../apollo/queries"
import { useQuery } from "@apollo/client"
import { logout } from "../utils/auth"
import { useNavigate } from "react-router-dom"
import { getXpsGrouped, getRecent } from "../utils/helper"
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
  const {
    loading: xpsLoading,
    error: xpsError,
    data: xpsData,
  } = useQuery(getXps)
  const naviagte = useNavigate()

  // logout if the JWT is expired and navigate to the login page

  if (userLoading || progressLoading || xpsLoading)
    return (
      <div className="loading">
        <p>Loading ...</p>
      </div>
    )
  if (userError || progressError || xpsError) {
    if (userError.message == "Could not verify JWT: JWTExpired") {
      logout()
      naviagte("/")
    }
    const error =
      userError?.message || progressError?.message || xpsError?.message
    return (
      <div className="error">
        <p>{error}</p>
      </div>
    )
  }

  /* 
    basic info: user info, audit ratio, xp for each module
  */
  const { attrs, login, auditRatio } = userData.user[0]
  const initials = `${attrs.firstName.charAt(0)}${attrs.lastName.charAt(
    0
  )}`.toUpperCase()
  const { firstName, lastName, email, employment, Degree, gender } = attrs
  const groupedXps = getXpsGrouped(xpsData.transaction)
  const recentProject = getRecent(progressData.progress[0])
  return (
    <div className="flex flex-1 m-1">
      <div className="w-1/5 bg-offBackground p-4 shadow-md">
        <div className="flex flex-col items-center mb-10">
          <div
            className="px-2 py-2 w-30 h-30 bg-button rounded-full 
            flex items-center justify-center text-white font-bold text-2xl mb-5"
          >
            {initials}
          </div>
          <h2 className="text-white text-xl font-semibold m-0">{login}</h2>
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
              className="flex flex-col p-4 bg-gradient-to-r from-off2Background to-offBackground rounded-lg transition-transform duration-200 hover:-translate-y-1"
            >
              <span className="text-sm uppercase tracking-wide text-amber-300 mb-1 font-bold">
                {key}
              </span>
              <span className="text-sm text-amber-50 font-medium">{value}</span>
            </div>
          ))}
        </div>
      </div>
      <div className="flex-1 p-4">
        <div className="grid gap-4 mb-6">
          <Card
            title="audits ratio"
            data={{ "%": `${auditRatio.toFixed(2)}` }}
          />
          <Card title="xps" data={groupedXps} />
          <Card title="recent project" data={recentProject} />
        </div>
        <hr className="border-gray-700 my-4"></hr>
        <div className="p-4 rounded bg-background">
          <h2 className="text-amber-300 text-xl font-semibold m-1 text-center uppercase">
            Graphs
          </h2>
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
