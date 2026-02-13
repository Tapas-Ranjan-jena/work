import { useState } from "react"
import { useNavigate, Link } from "react-router-dom"

export default function ForgotPasswordForm() {

  const navigate = useNavigate()

  const [email, setEmail] = useState("")
  const [error, setError] = useState("")

  const handleSend = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (!email.trim()) {
      setError("Please enter your email")
      return
    }

    setError("")
    navigate("/verify-otp")
  }

  return (
    <div className="card shadow-sm w-100 mx-auto px-4 py-4 px-sm-5" style={{ maxWidth:460, borderRadius:12 }}>
      <h4 className="fw-bold text-center mb-2">Forgot Password?</h4>

      <p className="text-center text-muted small mb-4">
        Please enter your registered email to request a password reset.
      </p>

      <form onSubmit={handleSend}>
        <div className="mb-3">
          <label className="form-label small">Email</label>
          <input
            type="email"
            className="form-control"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={{ height:46, borderRadius:8 }}
          />

          {error && <small className="text-danger">{error}</small>}
        </div>

        <button
          type="submit"
          className="btn btn-gradient w-100 py-2"
          style={{ minHeight:46, borderRadius:8, fontWeight:500 }}
        >
          Send OTP
        </button>
      </form>

      <p className="text-center small mt-3">
        Wait, I remember my password.
        <Link to="/login"> Login</Link>
      </p>
    </div>
  )
}
