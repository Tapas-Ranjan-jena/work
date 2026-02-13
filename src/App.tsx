import { Routes, Route, Navigate } from "react-router-dom"

// Existing Pages
import Login from "./pages/Login"
import Signup from "./pages/Signup"
import ForgotPassword from "./pages/ForgotPassword"

// ⭐ New Pages
import VerifyOTP from "./pages/VerifyOTP"
import ResetPassword from "./pages/ResetPassword"

export default function App() {
  return (
    <Routes>

      {/* Default Route */}
      <Route path="/" element={<Navigate to="/login" />} />

      {/* Auth Pages */}
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />

      {/* ⭐ OTP + RESET FLOW */}
      <Route path="/verify-otp" element={<VerifyOTP />} />
      <Route path="/reset-password" element={<ResetPassword />} />

      {/* Fallback Route */}
      <Route path="*" element={<Navigate to="/login" />} />

    </Routes>
  )
}
