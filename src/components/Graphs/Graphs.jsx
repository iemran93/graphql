import { useQuery } from "@apollo/client"
import { getProgressTime } from "../../apollo/queries"
import { getProgress } from "../../utils/helper"
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts"

function XpProgression() {
  const { loading, data, error } = useQuery(getProgressTime)
  if (loading) {
    return (
      <div className="loading">
        <p>Loading ...</p>
      </div>
    )
  }
  if (error) {
    return (
      <div className="error">
        <p>{error}</p>
      </div>
    )
  }
  const progressTimeData = data?.transaction
    ? getProgress(data.transaction)
    : []

  const styling = {
    width: "100%",
    height: 400,
    background: "#1a1a1a",
    padding: "30px",
    borderRadius: "8px",
  }
  return (
    <div style={styling}>
      <h2 style={{ color: "#fff", marginBottom: "10px", textAlign: "center" }}>
        XP Progression
      </h2>
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={progressTimeData}>
          <CartesianGrid strokeDasharray="3 3" stroke="#444" />
          <XAxis dataKey="name" stroke="#888" />
          <YAxis stroke="#888" />
          <Tooltip />
          <Legend />
          <Line
            type="monotone"
            dataKey="amount"
            stroke="#8884d8"
            strokeWidth={2}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}

export default XpProgression
