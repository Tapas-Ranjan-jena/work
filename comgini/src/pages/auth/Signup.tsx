import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import AuthLayout from "../../layouts/AuthLayout"
import GoogleIcon from "../../assets/icons/google.svg"
import AppleIcon from "../../assets/icons/apple.svg"
import { useAuth } from "../../context/AuthContext"

export default function Signup() {
  const navigate = useNavigate()
  const { register } = useAuth()

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    role: "employee" // Default to employee based on your postman
  })
  const [error, setError] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match.")
      return
    }

    setIsLoading(true)
    try {
      const { confirmPassword, ...registerData } = formData
      await register(registerData)
      navigate("/login")
    } catch (err: any) {
      console.error("Signup error:", err.response?.data)
      const message = err.response?.data?.message || "Registration failed. Please try again."
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

      {/* ⭐ RESPONSIVE WRAPPER */}
      <div className="w-100 d-flex justify-content-center px-3 px-sm-4">

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
            maxWidth: 520,
            borderRadius: 12
          }}
        >

          {/* TITLE */}
          <h4 className="fw-bold text-center auth-title">
            Sign up
          </h4>

          <p className="text-center text-muted small mb-4">
            Create an account as a new user
          </p>

          {error && (
            <div className="alert alert-danger small py-2" role="alert">
              {error}
            </div>
          )}

          <form onSubmit={handleSignup}>

            {/* ================= NAME ================= */}
            <div className="row g-3 mb-3">
              <div className="col-12 col-sm-6">
                <label className="form-label small">First name</label>
                <input
                  name="firstName"
                  className="form-control"
                  style={{ minHeight: 46, borderRadius: 8 }}
                  value={formData.firstName}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="col-12 col-sm-6">
                <label className="form-label small">Last name</label>
                <input
                  name="lastName"
                  className="form-control"
                  style={{ minHeight: 46, borderRadius: 8 }}
                  value={formData.lastName}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            {/* ================= EMAIL / PHONE ================= */}
            <div className="row g-3 mb-3">
              <div className="col-12 col-sm-6">
                <label className="form-label small">Email</label>
                <input
                  name="email"
                  type="email"
                  className="form-control"
                  style={{ minHeight: 46, borderRadius: 8 }}
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="col-12 col-sm-6">
                <label className="form-label small">Phone Number</label>
                <input
                  name="phone"
                  className="form-control"
                  style={{ minHeight: 46, borderRadius: 8 }}
                  value={formData.phone}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            {/* ================= ROLE ================= */}
            <div className="mb-3">
              <label className="form-label small">Role</label>
              <select
                name="role"
                className="form-select"
                style={{ minHeight: 46, borderRadius: 8 }}
                value={formData.role}
                onChange={handleChange}
                required
              >
                <option value="employee">Employee</option>
                <option value="admin">Admin</option>
                <option value="client">Client</option>
              </select>
            </div>

            {/* ================= PASSWORD ================= */}
            <div className="mb-3">
              <label className="form-label small">Password</label>
              <input
                name="password"
                type="password"
                className="form-control"
                style={{ minHeight: 46, borderRadius: 8 }}
                value={formData.password}
                onChange={handleChange}
                required
              />
            </div>

            <div className="mb-4">
              <label className="form-label small">Re-type password</label>
              <input
                name="confirmPassword"
                type="password"
                className="form-control"
                style={{ minHeight: 46, borderRadius: 8 }}
                value={formData.confirmPassword}
                onChange={handleChange}
                required
              />
            </div>

            {/* ================= SIGNUP BUTTON ================= */}
            <button
              type="submit"
              disabled={isLoading}
              className="btn btn-gradient w-100 py-2"
              style={{ minHeight: 46, borderRadius: 8, fontWeight: 500 }}
            >
              {isLoading ? (
                <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
              ) : null}
              {isLoading ? "Creating account..." : "Sign up"}
            </button>
          </form>

          {/* ================= LINKS ================= */}
          <div className="d-flex flex-column flex-sm-row justify-content-between mt-3 small text-center text-sm-start">
            <span>
              Already have an account? <Link to="/login">Sign in</Link>
            </span>
            <Link to="/forgot-password">Forgot password?</Link>
          </div>

          {/* ================= SOCIAL ================= */}
          <div className="text-center my-3 text-muted small">OR</div>

          <button className="btn btn-outline-secondary w-100 mb-2 d-flex align-items-center justify-content-center gap-2">
            <img src={GoogleIcon} alt="Google" width={18} />
            <span>Continue with Google</span>
          </button>

          <button className="btn btn-outline-secondary w-100 d-flex align-items-center justify-content-center gap-2">
            <img src={AppleIcon} alt="Apple" width={18} />
            <span>Continue with Apple</span>
          </button>

        </div>
      </div>

    </AuthLayout>
  )
}
