import { Routes, Route, Navigate } from "react-router-dom"
import ProtectedRoute from "./components/common/ProtectedRoute"

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

/* ================= REQUESTED DOCUMENTS ================= */
import RequestedDocuments from "./pages/dashboard/requestedDocuments/RequestedDocuments"

/* ================= BULK SENDER ================= */
import BulkSenderLayout from "./pages/dashboard/bulkSender/BulkSenderLayout"
import BulkWhatsApp from "./pages/dashboard/bulkSender/BulkWhatsapp"
import BulkGmail from "./pages/dashboard/bulkSender/BulkGmail"

/* ================= LEADS ================= */
import LeadsLayout from "./pages/dashboard/leads/LeadsLayout"
import LeadsList from "./pages/dashboard/leads/LeadsList"
import LeadsKanban from "./pages/dashboard/leads/LeadsKanban"

/* ================= MASTERS ================= */
import MastersLayout from "./pages/dashboard/masters/MastersLayout"
// {deleted}
import InactiveCompanies from "./pages/dashboard/masters/companyMaster/InactiveCompanies"
import AddCompanyLLP from "./pages/dashboard/masters/companyMaster/AddCompanyLLP"

/* ⭐ DIRECTOR/KMP */
// {deleted}
import CompanyWiseDirectors from "./pages/dashboard/masters/directorKMP/CompanyWiseDirectors"
import DIR8MBP1 from "./pages/dashboard/masters/directorKMP/DIR8MBP1"
import InactiveDirectors from "./pages/dashboard/masters/directorKMP/InactiveDirectors"
import AddDirector from "./pages/dashboard/masters/directorKMP/AddDirector"
import AddKMP from "./pages/dashboard/masters/directorKMP/AddKMP"

/* ⭐ SHAREHOLDER MASTER (NEW) */
import ShareholderList from "./pages/dashboard/masters/shareholderMaster/ShareholderList"
import CompanyWiseShareholder from "./pages/dashboard/masters/shareholderMaster/CompanyWiseShareholder"
import AddShareholder from "./pages/dashboard/masters/shareholderMaster/AddShareholder"

/* ⭐ DEBENTURE HOLDER MASTER */
import DebentureHolderList from "./pages/dashboard/masters/debentureHolder/DebentureHolderList"
import CompanyWiseDebentureHolder from "./pages/dashboard/masters/debentureHolder/CompanyWiseDebentureHolder"
import AddDebentureHolder from "./pages/dashboard/masters/debentureHolder/AddDebentureHolder"

// {deleted}
import AddPCSCAFirm from "./pages/dashboard/masters/pcsFirmMaster/AddPCSCAFirm"

// {deleted}
import CompanyWiseRTA from "./pages/dashboard/masters/rtaMaster/CompanyWiseRTA"
import AddRTA from "./pages/dashboard/masters/rtaMaster/AddRTA"

import ClientGroups from "./pages/dashboard/masters/clientGroups/ClientGroups"

import MISReportLayout from "./pages/dashboard/masters/misReport/MISReportLayout"
import MISCompany from "./pages/dashboard/masters/misReport/MISCompany"
import MISLLP from "./pages/dashboard/masters/misReport/MISLLP"
/* ================= NEW MASTERS INTEGRATION ================= */
import CompaniesPage from "./pages/masters/CompaniesPage"
import DirectorsPage from "./pages/masters/DirectorsPage"
import RTAPage from "./pages/masters/RTAPage"
import PCSFirmsPage from "./pages/masters/PCSFirmsPage"

/* ================= AUDITOR MASTER ================= */
import AuditorLayout from "./pages/dashboard/masters/auditorMaster/AuditorLayout"

/* STATUTORY */
import StatutoryAuditors from "./pages/dashboard/masters/auditorMaster/statutory/StatutoryAuditors"
import AddStatutoryAuditor from "./pages/dashboard/masters/auditorMaster/statutory/AddStatutoryAuditor"
import CompanyWiseStatutory from "./pages/dashboard/masters/auditorMaster/statutory/CompanyWiseStatutory"

/* SECRETARIAL */
import SecretarialAuditors from "./pages/dashboard/masters/auditorMaster/secretarial/SecretarialAuditors"
import AddSecretarialAuditor from "./pages/dashboard/masters/auditorMaster/secretarial/AddSecretarialAuditor"

/* COST */
import CostAuditors from "./pages/dashboard/masters/auditorMaster/cost/CostAuditors"
import AddCostAuditor from "./pages/dashboard/masters/auditorMaster/cost/AddCostAuditor"

/* INTERNAL */
import InternalAuditors from "./pages/dashboard/masters/auditorMaster/internal/InternalAuditors"
import AddInternalAuditor from "./pages/dashboard/masters/auditorMaster/internal/AddInternalAuditor"

import IncorporationLayout from "./pages/dashboard/incorporation/layout/IncorporationLayout"
import IncorporationTabsLayout from "./pages/dashboard/incorporation/layout/IncorporationTabsLayout"

import RunLLPList from "./pages/dashboard/incorporation/runllp/RunLLPList"
import RunLLPDeleted from "./pages/dashboard/incorporation/runllp/DeletedForms"

import FillipLayout from "./pages/dashboard/incorporation/fillip/layout/FillipLayout"

import FillipInProgress from "./pages/dashboard/incorporation/fillip/tabs/FillipInProgress"
import FillipCompleted from "./pages/dashboard/incorporation/fillip/tabs/FillipCompleted"
import FillipCancelled from "./pages/dashboard/incorporation/fillip/tabs/FillipCancelled"

import FillipDeletedForms from "./pages/dashboard/incorporation/fillip/deleted/FillipDeletedForms"
/* ================= SPICE ================= */
import SpiceLayout from "./pages/dashboard/incorporation/spice/layout/SpiceLayout"

import SpiceInProgress from "./pages/dashboard/incorporation/spice/tabs/SpiceInProgress"
import SpiceCompleted from "./pages/dashboard/incorporation/spice/tabs/SpiceCompleted"
import SpiceCancelled from "./pages/dashboard/incorporation/spice/tabs/SpiceCancelled"

import SpiceDeletedForms from "./pages/dashboard/incorporation/spice/deleted/SpiceDeletedForms"
import CheckCompanyName from "./pages/dashboard/incorporation/checkCompany/CheckCompanyName"


/* ================= CHECKLIST ================= */
import ChecklistLayout from "./pages/dashboard/checklist/layout/ChecklistLayout"

import StandardChecklist from "./pages/dashboard/checklist/standard/StandardChecklist"
import AddChecklist from "./pages/dashboard/checklist/add/AddChecklist"

import AssignChecklistLayout from "./pages/dashboard/checklist/assign/AssignChecklistLayout"
import AssignPending from "./pages/dashboard/checklist/assign/AssignPending"
import AssignCompleted from "./pages/dashboard/checklist/assign/AssignCompleted"

import BusinessLayout from "./pages/dashboard/businessManager/layout/BusinessLayout"
import RegistrationList from "./pages/dashboard/businessManager/registration/RegistrationList"
import InsuranceList from "./pages/dashboard/businessManager/insurance/InsuranceList"
import AgreementList from "./pages/dashboard/businessManager/agreement/AgreementList"

/* ================= FINANCE ================= */

/* ⭐ FINANCE ROOT */
import FinanceLayout from "./pages/dashboard/finance/layout/FinanceLayout"

/* ⭐ INVOICES */
import InvoiceLayout from "./pages/dashboard/finance/invoices/layout/InvoiceLayout"
import InvoiceMonthly from "./pages/dashboard/finance/invoices/monthly/InvoiceMonthly"
import InvoiceYearly from "./pages/dashboard/finance/invoices/yearly/InvoiceYearly"
import InvoiceCustom from "./pages/dashboard/finance/invoices/custom/InvoiceCustom"
import InvoiceRecurring from "./pages/dashboard/finance/invoices/recurring/InvoiceRecurring"

/* ⭐ PAYMENTS */
import PaymentsLayout from "./pages/dashboard/finance/payments/layout/PaymentsLayout"
import PaymentsMonthly from "./pages/dashboard/finance/payments/monthly/PaymentsMonthly"
import PaymentsYearly from "./pages/dashboard/finance/payments/yearly/PaymentsYearly"
import PaymentsCustom from "./pages/dashboard/finance/payments/custom/PaymentsCustom"

/* ⭐ EXPENSES */
import ExpensesList from "./pages/dashboard/finance/expenses/ExpensesList"

/* ⭐ INCOME vs EXPENSES */
import IncomeExpenseLayout from "./pages/dashboard/finance/incomeExpense/IncomeExpenseLayout"
import IncomeExpenseChart from "./pages/dashboard/finance/incomeExpense/IncomeExpenseChart"
import IncomeExpenseSummary from "./pages/dashboard/finance/incomeExpense/IncomeExpenseSummary"

/* ================= ASSIGNMENTS ================= */
import AssignmentLayout from "./pages/dashboard/assignments/layout/AssignmentLayout"
import CallLogs from "./pages/dashboard/assignments/CallLogs"
import TimesheetLayout from "./pages/dashboard/assignments/layout/TimesheetLayout"
import TaskList from "./pages/dashboard/assignments/tabs/tasks/TaskList"
import StarredTask from "./pages/dashboard/assignments/tabs/tasks/StarredTask"
import CompletedTask from "./pages/dashboard/assignments/tabs/tasks/CompletedTask"
import CancelledTask from "./pages/dashboard/assignments/tabs/tasks/CancelledTask"
import Kanban from "./pages/dashboard/assignments/tabs/tasks/Kanban"
import PieChart from "./pages/dashboard/assignments/tabs/tasks/PieChart"
import TaskSummaryReport from "./pages/dashboard/assignments/tabs/tasks/TaskSummaryReport"
import TimesheetDetails from "./pages/dashboard/assignments/tabs/timesheets/TimesheetDetails"
import TimesheetSummary from "./pages/dashboard/assignments/tabs/timesheets/TimesheetSummary"

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
/* ================= EXPIRY MANAGER ================= */
import ExpiryLayout from "./pages/dashboard/businessManager/expiry/layout/ExpiryLayout"
import DueExpiryList from "./pages/dashboard/businessManager/expiry/due/DueExpiryList"
import ExpiryList from "./pages/dashboard/businessManager/expiry/expirytab/ExpiryList"
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

/* ================= HRMS ================= */
import TeamMember from "./pages/dashboard/hrms/TeamMember"
import TimeCards from "./pages/dashboard/hrms/TimeCards"
import Leave from "./pages/dashboard/hrms/Leave"
import Salary from "./pages/dashboard/hrms/Salary"


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

      {/* ⭐ DASHBOARD ROOT (PROTECTED) */}
      <Route element={<ProtectedRoute />}>
        <Route path="/" element={<DashboardLayout />}>

          <Route index element={<Navigate to="dashboard" replace />} />

          <Route path="dashboard" element={<DashboardHome />} />
          <Route path="clients" element={<ClientsPage />} />

          <Route path="requested-documents" element={<RequestedDocuments />} />

          {/* ================= LEADS MODULE ================= */}
          <Route path="leads" element={<LeadsLayout />}>
            <Route index element={<LeadsList />} />
            <Route path="kanban" element={<LeadsKanban />} />
          </Route>

          {/* ================= BULK SENDER ================= */}
          <Route path="bulk-sender" element={<BulkSenderLayout />}>
            <Route index element={<Navigate to="whatsapp" replace />} />
            <Route path="whatsapp" element={<BulkWhatsApp />} />
            <Route path="gmail" element={<BulkGmail />} />
          </Route>

          {/* ================= MASTERS MODULE ================= */}
          <Route path="masters" element={<MastersLayout />}>

            <Route index element={<Navigate to="company-master" replace />} />

            {/* COMPANY MASTER */}
            <Route path="company-master" element={<CompaniesPage />} />
            <Route path="inactive-companies" element={<InactiveCompanies />} />
            <Route path="add-company" element={<AddCompanyLLP />} />

            {/* DIRECTOR/KMP MASTER */}
            <Route path="director-kmp" element={<DirectorsPage />} />
            <Route path="directors/:companyId" element={<DirectorsPage />} />
            <Route path="director-kmp/company-wise" element={<CompanyWiseDirectors />} />
            <Route path="director-kmp/dir8-mbp1" element={<DIR8MBP1 />} />
            <Route path="director-kmp/inactive" element={<InactiveDirectors />} />
            <Route path="director-kmp/add-director" element={<AddDirector />} />
            <Route path="director-kmp/add-kmp" element={<AddKMP />} />

            {/* ⭐ SHAREHOLDER MASTER (NEW) */}
            <Route path="shareholder" element={<ShareholderList />} />
            <Route path="shareholder/company-wise" element={<CompanyWiseShareholder />} />
            <Route path="shareholder/add" element={<AddShareholder />} />

            <Route path="debenture-holder" element={<DebentureHolderList />} />
            <Route path="debenture-holder/company-wise" element={<CompanyWiseDebentureHolder />} />
            <Route path="debenture-holder/add" element={<AddDebentureHolder />} />

            <Route path="auditors" element={<AuditorLayout />}>

              {/* DEFAULT TAB */}
              <Route index element={<Navigate to="statutory" replace />} />

              {/* STATUTORY */}
              <Route path="statutory" element={<StatutoryAuditors />} />
              <Route path="statutory/add" element={<AddStatutoryAuditor />} />
              <Route path="statutory/company-wise" element={<CompanyWiseStatutory />} />

              {/* SECRETARIAL */}
              <Route path="secretarial" element={<SecretarialAuditors />} />
              <Route path="secretarial/add" element={<AddSecretarialAuditor />} />

              {/* COST */}
              <Route path="cost" element={<CostAuditors />} />
              <Route path="cost/add" element={<AddCostAuditor />} />

              {/* INTERNAL */}
              <Route path="internal" element={<InternalAuditors />} />
              <Route path="internal/add" element={<AddInternalAuditor />} />

            </Route>

            {/* PCS FIRM MASTER */}
            <Route path="pcs-firm-master" element={<PCSFirmsPage />} />
            <Route path="pcs-firm-master/add" element={<AddPCSCAFirm />} />

            <Route path="rta-master" element={<RTAPage />} />
            <Route path="rta-master/company-wise" element={<CompanyWiseRTA />} />
            <Route path="rta-master/add" element={<AddRTA />} />

            <Route path="client-groups" element={<ClientGroups />} />

            {/* ================= MIS REPORT ================= */}
            <Route path="mis" element={<MISReportLayout />}>
              <Route index element={<Navigate to="company" replace />} />
              <Route path="company" element={<MISCompany />} />
              <Route path="llp" element={<MISLLP />} />
            </Route>


          </Route>

          {/* ================= CLIENT DASHBOARD ================= */}
          <Route path="clients/:clientId" element={<ClientDashboardLayout />}>

            <Route index element={<Navigate to="info/details" replace />} />

            <Route path="compliance" element={<ComplianceManager />} />

            <Route path="info" element={<ClientInfoLayout />}>
              <Route index element={<Navigate to="details" replace />} />
              <Route path="details" element={<ClientDetailsTab />} />
              <Route path="directors" element={<DirectorsKMP />} />
              <Route path="past-directors" element={<PastDirectorsKMP />} />
              <Route path="shareholders" element={<ShareholderDetails />} />
              <Route path="charges" element={<IndexOfCharges />} />
              <Route path="mca-transaction" element={<MCATransaction />} />
            </Route>

            <Route path="portal" element={<ClientPortal />} />
            <Route path="primary-contact" element={<PrimaryContact />} />
            <Route path="assignments" element={<Assignments />} />
            <Route path="invoice" element={<InvoiceTab />} />
            <Route path="payments" element={<PaymentsTab />} />
            <Route path="notes" element={<NotesTab />} />
            <Route path="files" element={<FilesTab />} />
            <Route path="events" element={<EventsTab />} />

            <Route path="business-manager" element={<BusinessManagerLayout />}>
              <Route index element={<Navigate to="registration" replace />} />
              <Route path="registration" element={<RegistrationLicense />} />
              <Route path="insurance" element={<Insurance />} />
              <Route path="contract-agreement" element={<ContractAgreement />} />
            </Route>

            <Route path="expiry-manager" element={<ExpiryManager />} />
            <Route path="expenses" element={<Expenses />} />

          </Route>
          <Route path="incorporation" element={<IncorporationLayout />}>

            <Route path="run-llp" element={<IncorporationTabsLayout title="RUN LLP" />}>
              <Route index element={<RunLLPList />} />
              <Route path="deleted" element={<RunLLPDeleted />} />
            </Route>



            <Route path="fillip" element={<FillipLayout />}>

              {/* ⭐ DEFAULT TAB */}
              <Route index element={<FillipInProgress />} />
              <Route path="completed" element={<FillipCompleted />} />
              <Route path="cancelled" element={<FillipCancelled />} />

              {/* Deleted is FULL PAGE */}
              <Route path="deleted" element={<FillipDeletedForms />} />
            </Route>



            <Route path="spice" element={<SpiceLayout />}>
              <Route index element={<SpiceInProgress />} />
              <Route path="completed" element={<SpiceCompleted />} />
              <Route path="cancelled" element={<SpiceCancelled />} />
              <Route path="deleted" element={<SpiceDeletedForms />} />
            </Route>

            <Route path="check-company" element={<CheckCompanyName />} />

          </Route>

          {/* ================= CHECKLIST ================= */}
          <Route path="checklist" element={<ChecklistLayout />}>

            {/* Standard Checklist */}
            <Route index element={<StandardChecklist />} />

            {/* Add Checklist */}
            <Route path="add" element={<AddChecklist />} />

            {/* Assign Checklist with Tabs */}
            <Route path="assign" element={<AssignChecklistLayout />}>
              <Route index element={<AssignPending />} />
              <Route path="completed" element={<AssignCompleted />} />
            </Route>



          </Route>

          <Route path="/business-manager" element={<BusinessLayout />}>

            <Route
              index
              element={<Navigate to="registration" replace />}
            />

            <Route
              path="registration"
              element={<RegistrationList />}
            />

            <Route
              path="insurance"
              element={<InsuranceList />}
            />

            <Route
              path="agreement"
              element={<AgreementList />}
            />

            {/* ⭐ EXPIRY MODULE */}
            <Route path="expiry" element={<ExpiryLayout />}>

              <Route index element={<DueExpiryList />} />
              <Route path="history" element={<ExpiryList />} />

            </Route>


          </Route>
          {/* ================= FINANCE ================= */}
          <Route path="finance" element={<FinanceLayout />}>

            {/* ⭐ DEFAULT REDIRECT */}
            <Route index element={<Navigate to="invoices" replace />} />

            {/* ================= INVOICES ================= */}
            <Route path="invoices" element={<InvoiceLayout />}>
              <Route index element={<Navigate to="monthly" replace />} />
              <Route path="monthly" element={<InvoiceMonthly />} />
              <Route path="yearly" element={<InvoiceYearly />} />
              <Route path="custom" element={<InvoiceCustom />} />
              <Route path="recurring" element={<InvoiceRecurring />} />
            </Route>

            {/* ================= PAYMENTS ================= */}
            <Route path="payments" element={<PaymentsLayout />}>
              <Route index element={<Navigate to="monthly" replace />} />
              <Route path="monthly" element={<PaymentsMonthly />} />
              <Route path="yearly" element={<PaymentsYearly />} />
              <Route path="custom" element={<PaymentsCustom />} />
            </Route>

            {/* ================= EXPENSES ================= */}
            <Route path="expenses" element={<ExpensesList />} />

            {/* ================= INCOME vs EXPENSES ================= */}
            <Route path="income-expense" element={<IncomeExpenseLayout />}>
              <Route index element={<IncomeExpenseChart />} />
              <Route path="summary" element={<IncomeExpenseSummary />} />
            </Route>

          </Route>

          {/* ================= ASSIGNMENTS ================= */}
          <Route path="assignments">

            {/* TASKS */}
            <Route path="tasks" element={<AssignmentLayout />}>
              <Route index element={<TaskList />} />
              <Route path="starred-task" element={<StarredTask />} />
              <Route path="completed-task" element={<CompletedTask />} />
              <Route path="cancelled-task" element={<CancelledTask />} />
              <Route path="kanban" element={<Kanban />} />
              <Route path="pie-chart" element={<PieChart />} />
              <Route path="task-summary-report" element={<TaskSummaryReport />} />
            </Route>

            {/* CALL LOGS */}
            <Route path="call-logs" element={<CallLogs />} />

            {/* TIMESHEETS */}
            <Route path="timesheets" element={<TimesheetLayout />}>
              <Route index element={<TimesheetDetails />} />
              <Route path="summary" element={<TimesheetSummary />} />
            </Route>

          </Route>

          {/* ================= HRMS MODULE ================= */}
          <Route path="hrms">
            <Route index element={<Navigate to="team-member" replace />} />
            <Route path="team-member" element={<TeamMember />} />
            <Route path="time-cards" element={<TimeCards />} />
            <Route path="leave" element={<Leave />} />
            <Route path="salary" element={<Salary />} />
          </Route>

        </Route>
      </Route>

      <Route path="*" element={<Navigate to="/login" replace />} />

    </Routes>
  )
}