import { getSkills } from "../../apollo/queries"
import { useQuery } from "@apollo/client"
import { getSkillsData } from "../../utils/helper"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts"

import PropTypes from "prop-types"

function Skills({ dataType }) {
  const { loading, data, error } = useQuery(getSkills)
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

  const { technicalSkillsData, technologiessData } = getSkillsData(
    data.transaction_type
  )
  const graphData =
    dataType == "Technical" ? technicalSkillsData : technologiessData

  const styling = {
    width: "100%",
    height: 500,
    background: "#1a1a1a",
    padding: "30px",
    borderRadius: "8px",
    marginBottom: "10px",
  }
  return (
    <div style={styling}>
      <h2 style={{ color: "#fff", marginBottom: "10px", textAlign: "center" }}>
        {`${dataType} Skills`}
      </h2>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={graphData}
          margin={{
            top: 20,
            right: 30,
            left: 20,
            bottom: 20,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="type" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="count" fill="#8884d8" name="Completed" />
          <Bar dataKey="max" fill="#82ca9d" name="Maximum" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}

Skills.propTypes = {
  dataType: PropTypes.any,
}

export default Skills
