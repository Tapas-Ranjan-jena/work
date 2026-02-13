import { useNavigate } from "react-router-dom"
import { useState } from "react"
import type { ChangeEvent } from "react"
import AuthLayout from "../layouts/AuthLayout"

export default function VerifyOTP() {

  const navigate = useNavigate()

  // OTP digits
  const [otp, setOtp] = useState<string[]>(["","","","","",""])
  const [error, setError] = useState<string>("")

  const handleChange = (value: string, index: number) => {

    if (!/^\d?$/.test(value)) return

    const newOtp = [...otp]
    newOtp[index] = value
    setOtp(newOtp)
  }

  const handleVerify = () => {

    if (otp.some((digit) => digit === "")) {
      setError("Please enter complete OTP")
      return
    }

    setError("")
    navigate("/reset-password")
  }

  const handleResend = () => {
    navigate("/forgot-password")
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
            text-center
          "
          style={{
            maxWidth:460,
            borderRadius:12
          }}
        >

          {/* TITLE */}
          <h4 className="fw-bold mb-2 auth-title">
            Verify OTP
          </h4>

          <p className="text-muted small mb-2">
            We have sent a 6-digit verification code to your
            registered email/mobile.
          </p>

          <p className="small mb-4">
            Code sent to <b>ni***@gmail.com</b>
          </p>

          {/* OTP INPUTS */}
          <div className="d-flex flex-wrap justify-content-center gap-2 mb-2">

            {otp.map((digit, index)=>(
              <input
                key={index}
                value={digit}
                maxLength={1}
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  handleChange(e.target.value, index)
                }
                className="form-control text-center"
                style={{
                  width:"14%",
                  minWidth:42,
                  height:46,
                  borderRadius:10,
                  fontSize:18
                }}
              />
            ))}

          </div>

          {/* ERROR */}
          {error && (
            <small className="text-danger">{error}</small>
          )}

          {/* VERIFY BUTTON */}
          <button
            type="button"
            onClick={handleVerify}
            className="btn btn-gradient w-100 py-2 mt-3"
            style={{
              minHeight:46,
              borderRadius:8,
              fontWeight:500
            }}
          >
            Verify & Continue
          </button>

          {/* RESEND */}
          <p className="small mt-3">
            Haven’t got the email yet?{" "}
            <span
              onClick={handleResend}
              style={{
                color:"#2f6bff",
                cursor:"pointer",
                fontWeight:500
              }}
            >
              Resend email
            </span>
          </p>

        </div>
      </div>

    </AuthLayout>
  )
}
