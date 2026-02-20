import { Routes, Route, Navigate } from "react-router-dom"

/* AUTH */
import Login from "../pages/auth/Login"
import Signup from "../pages/auth/Signup"
import ForgotPassword from "../pages/auth/ForgotPassword"
import VerifyOTP from "../pages/auth/VerifyOTP"
import ResetPassword from "../pages/auth/ResetPassword"

/* LAYOUT */
import DashboardLayout from "../layouts/DashboardLayout"

/* PAGES */
import DashboardHome from "../pages/dashboard/DashboardHome"
import ClientsPage from "../pages/dashboard/clients/ClientsPage"
import ClientDashboardLayout from "../pages/dashboard/clients/clientDashboard/ClientDashboardLayout"
import ClientDashboardPage from "../pages/dashboard/clients/clientDashboard/ClientDashboardPage"

export default function AppRoutes() {
  return (
    <Routes>

      {/* ================= AUTH ================= */}
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/verify-otp" element={<VerifyOTP />} />
      <Route path="/reset-password" element={<ResetPassword />} />

      {/* ⭐ DASHBOARD ROOT */}
      <Route path="/" element={<DashboardLayout />}>

        {/* ⭐ DEFAULT DASHBOARD PAGE */}
        <Route index element={<Navigate to="dashboard" />} />

        <Route path="dashboard" element={<DashboardHome />} />

        <Route path="clients" element={<ClientsPage />} />

        <Route path="clients/:clientId" element={<ClientDashboardLayout />}>
          <Route index element={<ClientDashboardPage />} />
        </Route>

      </Route>

      {/* FALLBACK */}
      <Route path="*" element={<Navigate to="/login" />} />

    </Routes>
  )
}
