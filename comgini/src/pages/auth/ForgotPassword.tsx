import { Link } from "react-router-dom"
import { useState } from "react"
import type { ChangeEvent } from "react"
import AuthLayout from "../../layouts/AuthLayout"
import { useAuth } from "../../context/AuthContext"
import axios from "axios"

export default function ForgotPassword() {
  const { forgotPassword } = useAuth()

  const [email, setEmail] = useState<string>("")
  const [error, setError] = useState<string>("")
  const [success, setSuccess] = useState<string>("")
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const handleSend = async () => {
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
    setSuccess("")
    setIsLoading(true)

    try {
      const response = await forgotPassword(email)
      if (response.success) {
        setSuccess(response.message || "Password reset link sent to your email")
        setEmail("")
      } else {
        setError(response.message || "Failed to send reset link")
      }
    } catch (err: unknown) {
      if (axios.isAxiosError(err)) {
        setError(err.response?.data?.message || err.message || "An error occurred")
      } else {
        setError("An unexpected error occurred")
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

          {/* SUCCESS MESSAGE */}
          {success && (
            <div className="alert alert-success small py-2 text-center" role="alert">
              {success}
            </div>
          )}

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
              disabled={isLoading}
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
            disabled={isLoading}
            style={{
              minHeight: 46,
              borderRadius: 8,
              fontWeight: 500
            }}
            onClick={handleSend}
          >
            {isLoading ? (
              <>
                <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                Sending...
              </>
            ) : (
              "Send"
            )}
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
