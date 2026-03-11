import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import AuthLayout from "../../layouts/AuthLayout"
import GoogleIcon from "../../assets/icons/google.svg"
import AppleIcon from "../../assets/icons/apple.svg"
import FingerprintIcon from "../../assets/icons/fingerprint.svg"
import { useAuth } from "../../context/AuthContext"

export default function Login() {
  const navigate = useNavigate()
  const { login } = useAuth()

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setIsLoading(true)

    try {
      console.log("Attempting login for:", email)
      await login({ email, password })
      console.log("Login successful, navigating to dashboard...")
      navigate("/dashboard")
    } catch (err: any) {
      console.error("Login error:", err.response?.data)
      const message = err.response?.data?.message || "Login failed. Please check your credentials."
      const errors = err.response?.data?.errors

      if (errors && typeof errors === 'object') {
        const errorDetails = Object.entries(errors)
          .map(([key, val]) => `${key}: ${typeof val === 'object' ? JSON.stringify(val) : val}`)
          .join(". ")
        setError(`${message}: ${errorDetails}`)
      } else {
        setError(message)
      }
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <AuthLayout>

      {/* ⭐ CENTERED WRAPPER INSIDE AUTHLAYOUT */}
      <div className="w-100 d-flex justify-content-center align-items-center">

        <div
          className="
            card
            shadow-sm
            w-100
            mx-auto
            px-3 px-sm-4 px-md-5
            py-4
          "
          style={{
            maxWidth: 460,
            borderRadius: 12
          }}
        >

          {/* TITLE */}
          <h4 className="fw-bold text-center mb-1 auth-title">
            Welcome back!
          </h4>

          <p className="text-center text-muted small mb-4">
            Please login to your account
          </p>

          {error && (
            <div className="alert alert-danger small py-2" role="alert">
              {error}
            </div>
          )}

          {/* ================= SOCIAL LOGIN ================= */}

          <div className="d-flex flex-column flex-sm-row gap-2 mb-3">

            <button className="btn btn-outline-secondary w-100 d-flex align-items-center justify-content-center gap-2">
              <img src={GoogleIcon} alt="Google" width={18} />
              <span className="small">Continue with Google</span>
            </button>

            <button className="btn btn-outline-secondary w-100 d-flex align-items-center justify-content-center gap-2">
              <img src={AppleIcon} alt="Apple" width={18} />
              <span className="small">Continue with Apple</span>
            </button>

          </div>

          <div className="text-center text-muted small my-3">OR</div>

          <form onSubmit={handleLogin}>
            {/* ================= EMAIL ================= */}
            <div className="mb-3">
              <label className="form-label small">Email Address</label>
              <input
                type="email"
                className="form-control"
                placeholder="Enter your registered email"
                style={{ minHeight: 46, borderRadius: 8 }}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            {/* ================= PASSWORD ================= */}
            <div className="mb-3">
              <label className="form-label small">Password</label>
              <input
                type="password"
                className="form-control"
                placeholder="Enter your password"
                style={{ minHeight: 46, borderRadius: 8 }}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            {/* ================= SIGN IN BUTTON ================= */}
            <button
              type="submit"
              disabled={isLoading}
              className="btn btn-gradient w-100 py-2"
              style={{ minHeight: 46, borderRadius: 8, fontWeight: 500 }}
            >
              {isLoading ? (
                <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
              ) : null}
              {isLoading ? "Signing in..." : "Sign in"}
            </button>
          </form>

          {/* ================= LINKS ================= */}

          <div className="d-flex flex-column flex-sm-row justify-content-between mt-3 small text-center text-sm-start">
            <span>
              Don’t have an account? <Link to="/signup">Sign up</Link>
            </span>
            <Link to="/forgot-password">Forgot password?</Link>
          </div>

          <div className="text-center text-muted small my-3">OR</div>

          {/* ================= FINGERPRINT LOGIN ================= */}

          <div className="d-flex flex-column align-items-center justify-content-center gap-2">

            <div
              style={{
                width: 36,
                height: 36,
                borderRadius: 8,
                backgroundColor: "#2b4cb3",
                display: "flex",
                alignItems: "center",
                justifyContent: "center"
              }}
            >
              <img src={FingerprintIcon} alt="Fingerprint" width={20} />
            </div>

            <span style={{ fontSize: 14 }}>
              Login with Fingerprint
            </span>

          </div>

        </div>
      </div>

    </AuthLayout>
  )
}
