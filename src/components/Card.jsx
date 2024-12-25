import PropTypes from "prop-types"

function Card(props) {
  /* 
        title, data (for each item will create on col)
    */
  const columnCount = Object.keys(props.data).length
  return (
    <div className="p-4 bg-background rounded">
      <h2 className="text-amber-300 text-xl font-semibold m-1 text-center uppercase">
        {props.title}
      </h2>
      <div
        className={`grid gap-2`}
        style={{
          gridTemplateColumns: `repeat(${columnCount}, minmax(0, 1fr))`,
        }}
      >
        {Object.entries(props.data).map(([key, value]) => (
          <div
            key={key}
            className="flex flex-col items-center p-2 bg-gradient-to-b from-offBackground to-background rounded"
          >
            <span className="text-xs uppercase tracking-wide text-amber-200 mb-1">
              {key}
            </span>
            <span className="text-sm text-amber-50 font-medium">{value}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

Card.propTypes = {
  title: PropTypes.any,
  data: PropTypes.any,
}
export default Card
