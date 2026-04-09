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
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setIsLoading(true)

    try {
      await login({ email, password })
      navigate("/dashboard")
    } catch (err: any) {
      setError(err.response?.data?.message || "Login failed. Please check your credentials.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <AuthLayout>
      <div className="w-100 py-5" style={{ maxWidth: 420 }}>
        
        {/* ⭐ LOGO / WELCOME */}
        <div className="text-center mb-5">
            <h2 className="fw-bold text-dark mb-2">Welcome Back</h2>
            <p className="text-muted small">Please enter your details to sign in</p>
        </div>

        {error && (
            <div className="alert alert-danger border-0 small py-2 mb-4" style={{ borderRadius: "10px", backgroundColor: "#fff5f5", color: "#c53030" }}>
                <i className="bi bi-exclamation-circle-fill me-2"></i>
                {error}
            </div>
        )}

        <form onSubmit={handleLogin}>
            <div className="mb-4">
                <label className="form-label small fw-semibold text-secondary mb-1">Email Address</label>
                <div className="position-relative">
                    <input
                        type="email"
                        className="form-control border-0 bg-light px-3"
                        placeholder=""
                        style={{ height: 48, borderRadius: "10px" }}
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
            </div>

            <div className="mb-4">
                <div className="d-flex justify-content-between align-items-center mb-1">
                    <label className="form-label small fw-semibold text-secondary mb-0">Password</label>
                    <Link to="/forgot-password" style={{ fontSize: "12px", textDecoration: "none", color: "#2b4cb3" }}>Forgot password?</Link>
                </div>
                <div className="position-relative">
                    <input
                        type={showPassword ? "text" : "password"}
                        className="form-control border-0 bg-light px-3 pe-5"
                        placeholder=""
                        style={{ height: 48, borderRadius: "10px" }}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                    <button
                        type="button"
                        className="btn position-absolute top-50 end-0 translate-middle-y me-2 border-0 shadow-none text-muted"
                        onClick={() => setShowPassword(!showPassword)}
                        style={{ background: "transparent" }}
                    >
                        <i className={`bi bi-eye${showPassword ? "-slash" : ""}`}></i>
                    </button>
                </div>
            </div>

            <button
                type="submit"
                disabled={isLoading}
                className="btn btn-primary w-100 border-0 shadow-sm py-2 mb-4"
                style={{ 
                    height: 48, 
                    borderRadius: "10px", 
                    fontWeight: 600,
                    background: "linear-gradient(135deg, #2b4cb3 0%, #3f51b5 100%)"
                }}
            >
                {isLoading ? (
                    <span className="spinner-border spinner-border-sm me-2" role="status"></span>
                ) : "Sign In"}
            </button>
        </form>

        <div className="text-center position-relative mb-4">
            <hr className="bg-light border-0" style={{ height: "1px", opacity: 0.1 }} />
            <span 
                className="position-absolute top-50 start-50 translate-middle bg-white px-3 text-muted"
                style={{ fontSize: "12px" }}
            >
                OR CONTINUE WITH
            </span>
        </div>

        <div className="row g-3 mb-5">
            <div className="col-6">
                <button className="btn btn-light w-100 d-flex align-items-center justify-content-center gap-2 border-0" style={{ height: 44, borderRadius: "10px", backgroundColor: "#f8f9fa", fontSize: "14px" }}>
                    <img src={GoogleIcon} alt="Google" width={18} />
                    Google
                </button>
            </div>
            <div className="col-6">
                <button className="btn btn-light w-100 d-flex align-items-center justify-content-center gap-2 border-0" style={{ height: 44, borderRadius: "10px", backgroundColor: "#f8f9fa", fontSize: "14px" }}>
                    <img src={AppleIcon} alt="Apple" width={18} />
                    Apple
                </button>
            </div>
        </div>

        <div className="text-center mt-5">
            <p className="small text-muted mb-4">
                Don’t have an account? <Link to="/signup" className="fw-bold d-block mt-1" style={{ color: "#2b4cb3", textDecoration: "none", fontSize: "14px" }}>Create one now</Link>
            </p>
            
            <div className="d-flex flex-column align-items-center gap-2 opacity-75">
                <div className="p-2 border border-2 rounded-3 text-primary" style={{ cursor: "pointer" }}>
                    <img src={FingerprintIcon} alt="Biometric" width={24} style={{ filter: "invert(30%) sepia(80%) saturate(1000%) hue-rotate(210deg)" }} />
                </div>
                <span className="text-muted" style={{ fontSize: "11px" }}>Biometric Login</span>
            </div>
        </div>

      </div>
    </AuthLayout>
  )
}
