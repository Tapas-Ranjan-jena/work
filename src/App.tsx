import { Routes, Route, Navigate } from "react-router-dom"

/* ================= AUTH ================= */
import Login from "./pages/auth/Login"
import Signup from "./pages/auth/Signup"
import ForgotPassword from "./pages/auth/ForgotPassword"
import VerifyOTP from "./pages/auth/VerifyOTP"
import ResetPassword from "./pages/auth/ResetPassword"

/* ================= DASHBOARD ================= */
import DashboardLayout from "./layouts/DashboardLayout"
import DashboardHome from "./pages/dashboard/DashboardHome"
import ClientsPage from "./pages/dashboard/clients/ClientsPage"

/* ================= BULK SENDER ================= */
import BulkSenderLayout from "./pages/dashboard/bulkSender/BulkSenderLayout"
import BulkWhatsApp from "./pages/dashboard/bulkSender/BulkWhatsapp"
import BulkGmail from "./pages/dashboard/bulkSender/BulkGmail"

/* ================= CLIENT DASHBOARD ================= */
import ClientDashboardLayout from "./pages/dashboard/clients/clientDashboard/ClientDashboardLayout"

/* ⭐ MAIN TAB PAGES */
import ClientPortal from "./pages/dashboard/clients/clientDashboard/tabs/ClientPortal"
import PrimaryContact from "./pages/dashboard/clients/clientDashboard/tabs/PrimaryContactTab"
import InvoiceTab from "./pages/dashboard/clients/clientDashboard/tabs/InvoiceTab"
import PaymentsTab from "./pages/dashboard/clients/clientDashboard/tabs/PaymentsTab"
import NotesTab from "./pages/dashboard/clients/clientDashboard/tabs/NotesTab"
import FilesTab from "./pages/dashboard/clients/clientDashboard/tabs/FilesTab"
import EventsTab from "./pages/dashboard/clients/clientDashboard/tabs/EventsTab"
import Assignments from "./pages/dashboard/clients/clientDashboard/tabs/Assignments"
import Expenses from "./pages/dashboard/clients/clientDashboard/tabs/Expenses"

/* ================= BUSINESS MANAGER ================= */
import BusinessManagerLayout from "./pages/dashboard/clients/clientDashboard/tabs/businessManager/BusinessManagerLayout"
import RegistrationLicense from "./pages/dashboard/clients/clientDashboard/tabs/businessManager/RegistrationLicense"
import Insurance from "./pages/dashboard/clients/clientDashboard/tabs/businessManager/Insurance"
import ContractAgreement from "./pages/dashboard/clients/clientDashboard/tabs/businessManager/ContractAgreement"

/* ================= CLIENT INFO ================= */
import ClientInfoLayout from "./pages/dashboard/clients/clientDashboard/clientInfo/ClientInfoLayout"
import ClientDetailsTab from "./pages/dashboard/clients/clientDashboard/clientInfo/ClientDetailsTab"
import DirectorsKMP from "./pages/dashboard/clients/clientDashboard/clientInfo/DirectorsKMP"
import PastDirectorsKMP from "./pages/dashboard/clients/clientDashboard/clientInfo/PastDirectorsKMP"
import ShareholderDetails from "./pages/dashboard/clients/clientDashboard/clientInfo/ShareholderDetails"
import IndexOfCharges from "./pages/dashboard/clients/clientDashboard/clientInfo/IndexOfCharges"
import MCATransaction from "./pages/dashboard/clients/clientDashboard/clientInfo/MCATransaction"

/* ================= OTHER TABS ================= */
import ExpiryManager from "./pages/dashboard/clients/clientDashboard/tabs/ExpiryManager"

/* ================= PLACEHOLDER ================= */
const ComplianceManager = () => <div />

export default function App() {
  return (
    <Routes>

      {/* ================= AUTH ================= */}
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/verify-otp" element={<VerifyOTP />} />
      <Route path="/reset-password" element={<ResetPassword />} />

      {/* ================= DASHBOARD ROOT ================= */}
      <Route path="/" element={<DashboardLayout />}>

        <Route index element={<Navigate to="dashboard" replace />} />

        <Route path="dashboard" element={<DashboardHome />} />
        <Route path="clients" element={<ClientsPage />} />

        {/* ================= BULK SENDER ================= */}
        <Route path="bulk-sender" element={<BulkSenderLayout />}>
          <Route index element={<Navigate to="whatsapp" replace />} />
          <Route path="whatsapp" element={<BulkWhatsApp />} />
          <Route path="gmail" element={<BulkGmail />} />
        </Route>

        {/* ================= CLIENT DASHBOARD ================= */}
        <Route path="clients/:clientId" element={<ClientDashboardLayout />}>

          <Route index element={<Navigate to="info/details" replace />} />

          <Route path="compliance" element={<ComplianceManager />} />

          {/* ================= CLIENT INFO ================= */}
          <Route path="info" element={<ClientInfoLayout />}>
            <Route index element={<Navigate to="details" replace />} />
            <Route path="details" element={<ClientDetailsTab />} />
            <Route path="directors" element={<DirectorsKMP />} />
            <Route path="past-directors" element={<PastDirectorsKMP />} />
            <Route path="shareholders" element={<ShareholderDetails />} />
            <Route path="charges" element={<IndexOfCharges />} />
            <Route path="mca-transaction" element={<MCATransaction />} />
          </Route>

          {/* ================= MAIN TABS ================= */}
          <Route path="portal" element={<ClientPortal />} />
          <Route path="primary-contact" element={<PrimaryContact />} />
          <Route path="assignments" element={<Assignments />} />
          <Route path="invoice" element={<InvoiceTab />} />
          <Route path="payments" element={<PaymentsTab />} />
          <Route path="notes" element={<NotesTab />} />
          <Route path="files" element={<FilesTab />} />
          <Route path="events" element={<EventsTab />} />

          {/* ================= BUSINESS MANAGER ================= */}
          <Route path="business-manager" element={<BusinessManagerLayout />}>
            <Route index element={<Navigate to="registration" replace />} />
            <Route path="registration" element={<RegistrationLicense />} />
            <Route path="insurance" element={<Insurance />} />
            <Route path="contract-agreement" element={<ContractAgreement />} />
          </Route>

          <Route path="expiry-manager" element={<ExpiryManager />} />
          <Route path="expenses" element={<Expenses />} />

        </Route>

      </Route>

      {/* ================= FALLBACK ================= */}
      <Route path="*" element={<Navigate to="/login" replace />} />

    </Routes>
  )
}

