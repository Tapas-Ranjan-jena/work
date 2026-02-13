import { useState } from "react"
import { useNavigate } from "react-router-dom"
import type { ChangeEvent } from "react"
import AuthLayout from "../layouts/AuthLayout"

export default function ResetPassword() {

  const navigate = useNavigate()

  // 👁 Toggle states
  const [showNew, setShowNew] = useState<boolean>(false)
  const [showConfirm, setShowConfirm] = useState<boolean>(false)

  // Password states
  const [newPassword, setNewPassword] = useState<string>("")
  const [confirmPassword, setConfirmPassword] = useState<string>("")
  const [error, setError] = useState<string>("")

  const handleSave = () => {

    if (!newPassword || !confirmPassword) {
      setError("Please fill all fields")
      return
    }

    if (newPassword.length < 6) {
      setError("Password must be at least 6 characters")
      return
    }

    if (newPassword !== confirmPassword) {
      setError("Passwords do not match")
      return
    }

    setError("")
    navigate("/login")
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
            Reset Password
          </h4>

          {/* SUBTITLE */}
          <p className="text-center text-muted small mb-4">
            Please enter your new passwords to secure your account.
          </p>

          {/* NEW PASSWORD */}
          <div className="mb-3 position-relative">
            <label className="form-label small mb-1">New Password</label>

            <input
              type={showNew ? "text" : "password"}
              value={newPassword}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setNewPassword(e.target.value)
              }
              className="form-control"
              placeholder="Enter your password"
              style={{
                minHeight:46,
                borderRadius:8,
                paddingRight:40
              }}
            />

            <span
              onClick={() => setShowNew(!showNew)}
              style={{
                position:"absolute",
                right:12,
                top:38,
                cursor:"pointer",
                opacity:0.6
              }}
            >
              👁
            </span>
          </div>

          {/* CONFIRM PASSWORD */}
          <div className="mb-2 position-relative">
            <label className="form-label small mb-1">Confirm Password</label>

            <input
              type={showConfirm ? "text" : "password"}
              value={confirmPassword}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setConfirmPassword(e.target.value)
              }
              className="form-control"
              placeholder="Confirm new password"
              style={{
                minHeight:46,
                borderRadius:8,
                paddingRight:40
              }}
            />

            <span
              onClick={() => setShowConfirm(!showConfirm)}
              style={{
                position:"absolute",
                right:12,
                top:38,
                cursor:"pointer",
                opacity:0.6
              }}
            >
              👁
            </span>
          </div>

          {/* ERROR */}
          {error && (
            <small className="text-danger">{error}</small>
          )}

          {/* SAVE BUTTON */}
          <button
            type="button"
            className="btn btn-gradient w-100 py-2 mt-3"
            style={{
              minHeight:46,
              borderRadius:8,
              fontWeight:500
            }}
            onClick={handleSave}
          >
            Save New Password
          </button>

        </div>
      </div>

    </AuthLayout>
  )
}
