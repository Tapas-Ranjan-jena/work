import { Link, useNavigate } from "react-router-dom"
import { useState } from "react"
import type { ChangeEvent } from "react"
import AuthLayout from "../../layouts/AuthLayout"

export default function ForgotPassword() {

  const navigate = useNavigate()

  const [email, setEmail] = useState<string>("")
  const [error, setError] = useState<string>("")

  const handleSend = () => {

    if (!email.trim()) {
      setError("Please enter your email")
      return
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      setError("Enter a valid email address")
      return
    }

    setError("")
    navigate("/verify-otp")
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
            maxWidth: 460,
            borderRadius: 12
          }}
        >

          {/* TITLE */}
          <h4 className="fw-bold text-center mb-2 auth-title">
            Forgot Password?
          </h4>

          {/* SUBTITLE */}
          <p className="text-center text-muted small mb-4">
            Please enter your registered email to request a password reset.
          </p>

          {/* EMAIL FIELD */}
          <div className="mb-3">
            <label className="form-label small">Email</label>

            <input
              type="email"
              value={email}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setEmail(e.target.value)
              }
              className="form-control"
              placeholder="Enter your email"
              style={{
                minHeight: 46,
                borderRadius: 8
              }}
            />

            {error && (
              <small className="text-danger">{error}</small>
            )}
          </div>

          {/* BUTTON */}
          <button
            type="button"
            className="btn btn-gradient w-100 py-2"
            style={{
              minHeight: 46,
              borderRadius: 8,
              fontWeight: 500
            }}
            onClick={handleSend}
          >
            Send
          </button>

          {/* LOGIN LINK */}
          <p className="text-center small mt-3">
            Wait, I remember my password.
            <Link to="/login"> Login</Link>
          </p>

        </div>
      </div>

    </AuthLayout>
  )
}
