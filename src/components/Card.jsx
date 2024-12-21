import PropTypes from "prop-types"

function Card(props) {
  /* 
        title, item (for each item will create on col)
    */
  const columnCount = Object.keys(props.data).length
  return (
    <div className="p-4 bg-white rounded shadow-md">
      <h2 className="text-primary text-xl font-semibold m-0 text-center uppercase">
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
            className="flex flex-col items-center p-2 bg-gray-100 rounded"
          >
            <span className="text-xs uppercase tracking-wide text-accent mb-1">
              {key}
            </span>
            <span className="text-sm text-primary font-medium">{value}</span>
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
