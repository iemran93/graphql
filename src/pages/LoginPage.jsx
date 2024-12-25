import Login from "../components/Login"

function LoginPage() {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-background rounded-xl shadow-lg p-8">
        <h1 className="text-3xl font-bold text-white mb-6 text-center">
          Sign In
        </h1>
        <Login />
      </div>
    </div>
  )
}

export default LoginPage
