import { getProgressTime } from "../../apollo/queries"
import { useQuery } from "@apollo/client"

function Graphs() {
  const { loading, data, error } = useQuery(getProgressTime)

  if (loading) return <p>Loading...</p>
  if (error) return <p>Error: {error.message}</p>

  // Extract and process the data
  const transactions = data.transaction

  // Group amounts by project name
  const projectAmounts = transactions.reduce((acc, transaction) => {
    const projectName = transaction.object.name

    if (!acc[projectName]) {
      acc[projectName] = 0 // Initialize amount for the project
    }

    acc[projectName] += transaction.amount // Add the transaction amount
    return acc
  }, {})

  // Transform grouped data into an array for easier graph rendering
  const graphData = Object.entries(projectAmounts).map(([name, amount]) => ({
    name,
    amount,
  }))

  // Find the maximum amount for scaling the graph
  const maxAmount = Math.max(...graphData.map((data) => data.amount))

  // Graph dimensions
  const graphWidth = 500
  const graphHeight = 300
  const barWidth = graphWidth / graphData.length

  return (
    <div className="p-4 bg-white rounded shadow-md">
      <h2 className="text-lg font-bold mb-4">Amount Earned by Project</h2>
      <svg viewBox={`0 0 ${graphWidth} ${graphHeight}`} className="w-full">
        {graphData.map((data, index) => {
          const barHeight = (data.amount / maxAmount) * graphHeight

          return (
            <g key={data.name}>
              {/* Bar */}
              <rect
                x={index * barWidth}
                y={graphHeight - barHeight}
                width={barWidth - 10} // Leave some space between bars
                height={barHeight}
                fill="#3b82f6"
              />
              {/* Project Name */}
              <text
                x={index * barWidth + barWidth / 2}
                y={graphHeight - barHeight - 5}
                textAnchor="middle"
                fontSize="10"
                fill="black"
              >
                {data.name}
              </text>
              {/* Amount */}
              <text
                x={index * barWidth + barWidth / 2}
                y={graphHeight - 5}
                textAnchor="middle"
                fontSize="10"
                fill="black"
              >
                {data.amount}
              </text>
            </g>
          )
        })}
      </svg>
    </div>
  )
}

export default Graphs
