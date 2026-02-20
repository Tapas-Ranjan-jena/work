import "../assets/bg-circles.css"
import comginiLogo from "../assets/comgini-logo.png"
import type { ReactNode } from "react"

type AuthLayoutProps = {
  children: ReactNode
}

export default function AuthLayout({ children }: AuthLayoutProps) {
  return (
    <div
      className="container-fluid"
      style={{
        height: "calc(100vh - 10px)",   // ⭐ reduce total height by 10px
        paddingTop: "5px",              // ⭐ uniform gap top
        paddingBottom: "5px",           // ⭐ uniform gap bottom
        background: "#f4f6fb"
      }}
    >
      <div
        className="row g-0 h-100"
      >

        {/* ================= LEFT PANEL ================= */}
        <div className="col-md-6 d-none d-md-flex auth-left text-white">

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

        {/* ================= RIGHT SIDE ================= */}
        <div
          className="
            col-12
            col-md-6
            d-flex
            align-items-center
            justify-content-center
            bg-white
            px-3 px-sm-4
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
