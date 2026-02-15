import { Link } from "react-router-dom"
import AuthLayout from "../../layouts/AuthLayout"
import GoogleIcon from "../../assets/icons/google.svg"
import AppleIcon from "../../assets/icons/apple.svg"

export default function Signup() {
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
            Create an account as a new client
          </p>

          {/* ================= NAME ================= */}
          <div className="row g-3 mb-3">
            <div className="col-12 col-sm-6">
              <label className="form-label small">First name</label>
              <input className="form-control" style={{ minHeight: 46, borderRadius: 8 }} />
            </div>
            <div className="col-12 col-sm-6">
              <label className="form-label small">Last name</label>
              <input className="form-control" style={{ minHeight: 46, borderRadius: 8 }} />
            </div>
          </div>

          {/* ================= COMPANY ================= */}
          <div className="row g-3 mb-3">
            <div className="col-12 col-sm-6">
              <label className="form-label small">Company / Firm Name</label>
              <input className="form-control" style={{ minHeight: 46, borderRadius: 8 }} />
            </div>
            <div className="col-12 col-sm-6">
              <label className="form-label small">GST No</label>
              <input className="form-control" style={{ minHeight: 46, borderRadius: 8 }} />
            </div>
          </div>

          {/* ================= EMAIL ================= */}
          <div className="row g-3 mb-3">
            <div className="col-12 col-sm-6">
              <label className="form-label small">Email</label>
              <input type="email" className="form-control" style={{ minHeight: 46, borderRadius: 8 }} />
            </div>
            <div className="col-12 col-sm-6">
              <label className="form-label small">Phone Number</label>
              <input className="form-control" style={{ minHeight: 46, borderRadius: 8 }} />
            </div>
          </div>

          {/* ================= PASSWORD ================= */}
          <div className="mb-3">
            <label className="form-label small">Password</label>
            <input type="password" className="form-control" style={{ minHeight: 46, borderRadius: 8 }} />
          </div>

          <div className="mb-3">
            <label className="form-label small">Re-type password</label>
            <input type="password" className="form-control" style={{ minHeight: 46, borderRadius: 8 }} />
          </div>

          {/* ================= GENDER ================= */}
          <div className="mb-4">
            <label className="form-label small d-block">Gender</label>

            <div className="d-flex gap-3">
              <div className="form-check">
                <input className="form-check-input" type="radio" name="gender" />
                <label className="form-check-label small">Male</label>
              </div>

              <div className="form-check">
                <input className="form-check-input" type="radio" name="gender" />
                <label className="form-check-label small">Female</label>
              </div>
            </div>
          </div>

          {/* ================= SIGNUP BUTTON ================= */}
          <button
            className="btn btn-gradient w-100 py-2"
            style={{ minHeight: 46, borderRadius: 8, fontWeight: 500 }}
          >
            Sign up
          </button>

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
