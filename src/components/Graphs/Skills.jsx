import { getSkills } from "../../apollo/queries"
import { useQuery } from "@apollo/client"
import { getSkillsData } from "../../utils/helper"
import {
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
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
        <RadarChart data={graphData}>
          <PolarGrid gridType="circle" stroke="#444" />
          <PolarAngleAxis dataKey="type" tick={{ fill: "#fff" }} />
          <PolarRadiusAxis tick={{ fill: "#888" }} />
          <Radar
            name="Skills"
            dataKey="count"
            stroke="#8884d8"
            fill="#8884d8"
            fillOpacity={0.6}
          />
        </RadarChart>
      </ResponsiveContainer>
    </div>
  )
}

Skills.propTypes = {
  dataType: PropTypes.any,
}

export default Skills
