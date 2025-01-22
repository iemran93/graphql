import PropTypes from "prop-types"

function NavBar({ user, onLogout }) {
  return (
    <>
      <nav className="bg-offBackground p-4">
        <div className="container mx-auto flex justify-between items-center">
          <div className="text-white text-lg font-bold">GraphQL</div>
          <div className="space-x-4">
            {user && (
              <button
                onClick={onLogout}
                className="text-gray-300 hover:text-white"
              >
                Logout
              </button>
            )}
          </div>
        </div>
      </nav>
    </>
  )
}

NavBar.propTypes = {
  user: PropTypes.any,
  onLogout: PropTypes.any,
}

export default NavBar
