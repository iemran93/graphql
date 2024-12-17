/* 
    toast notification
    take the msg and status(error, success)
*/
import PropTypes from "prop-types"
import { useEffect } from "react"
import "../assets/index.css"

function Toast({ msg, status, clearToast }) {
  useEffect(() => {
    if (msg) {
      const timer = setTimeout(() => {
        clearToast()
      }, 3000)
      return () => clearTimeout(timer)
    }
  }, [msg, clearToast])

  if (!msg) return null

  const statusStyles =
    status === "success"
      ? "bg-green-500 text-white" // Success styles
      : "bg-red-500 text-white" // Error styles

  return (
    <div
      className={`fixed flex items-center w-full 
      max-w-xs p-4 space-x-4 divide-x rtl:divide-x-reverse 
      divide-gray-200 rounded-lg shadow right-5 bottom-5
      ${statusStyles}`}
      role="alert"
    >
      <div className="text-sm font-normal">{msg}</div>
    </div>
  )
}

Toast.propTypes = {
  msg: PropTypes.string.isRequired,
  status: PropTypes.string.isRequired,
  clearToast: PropTypes.func.isRequired,
}

export default Toast
