import "../assets/bg-circles.css"
import comginiLogo from "../assets/comgini-logo.png"
import type { ReactNode } from "react"

type AuthLayoutProps = {
  children: ReactNode
}

export default function AuthLayout({ children }: AuthLayoutProps) {
  return (
    <div className="container-fluid min-vh-100">
      <div className="row min-vh-100">

        {/* ================= LEFT PANEL ================= */}
        <div className="col-md-6 d-none d-md-flex auth-left text-white">

          {/* Accent circles */}
          <div className="accent-circle top-left"></div>
          <div className="accent-circle bottom-left"></div>

          {/* Concentric rings */}
          <div className="circle-ring outer"></div>
          <div className="circle-ring middle"></div>
          <div className="circle-ring inner"></div>

          <div className="auth-left-content">

            <div className="logo-block">
              <img src={comginiLogo} alt="Comgini logo" />
              <div className="logo-underline"></div>
            </div>

            <h1 className="auth-heading">
              Stay Compliant.<br />
              Stay Relaxed.
            </h1>

            <p className="auth-subtext">
              Manage all your statutory compliances <br />
              in one secure platform.
            </p>

            <ul className="auth-features">
              <li>MCA V3 Ready</li>
              <li>Smart Compliance Alerts</li>
              <li>Secure & ISO Certified</li>
            </ul>

          </div>

          <small className="auth-footer">
            © 2025 All Rights Reserved
          </small>
        </div>

        {/* ================= RIGHT SIDE (FORMS) ================= */}

        <div
          className="
            col-12
            col-md-6
            d-flex
            align-items-center
            justify-content-center
            bg-white
            px-3
            px-sm-4
          "
        >
          <div className="w-100 d-flex justify-content-center">
            {children}
          </div>
        </div>

      </div>
    </div>
  )
}
