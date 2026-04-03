import { NavLink, useLocation } from "react-router-dom";
import { useState, useEffect, useMemo } from "react";

type NavItem = {
  label: string;
  path?: string;
  icon: string;
  children?: { label: string; path: string; icon?: string }[];
};

type Props = {
  open: boolean;
  setOpen: (val: boolean) => void;
};

const navItems: NavItem[] = [
  { label: "Dashboard", path: "/dashboard", icon: "bi-speedometer2" },
  {
    label: "Bulk Sender",
    icon: "bi-send",
    children: [
      { label: "Bulk WhatsApp", path: "/bulk-sender/whatsapp", icon: "bi-whatsapp" },
      { label: "Bulk Gmail", path: "/bulk-sender/gmail", icon: "bi-google" },
    ],
  },
  { label: "Clients", path: "/clients", icon: "bi-folder2-open" },
  { label: "Requested Documents", path: "/requested-documents", icon: "bi-file-earmark-text" },
  {
    label: "Masters",
    icon: "bi-diagram-3",
    children: [
      { label: "Company Master", path: "/masters/company-master", icon: "bi-building-fill" },
      { label: "Director/KMP Master", path: "/masters/director-kmp", icon: "bi-person-badge" },
      { label: "Shareholder Master", path: "/masters/shareholder", icon: "bi-people" },
      { label: "Debenture holder Master", path: "/masters/debenture-holder", icon: "bi-journal-text" },
      { label: "Auditor Master", path: "/masters/auditors", icon: "bi-person-check" },
      { label: "PCS Firm Master", path: "/masters/pcs-firm-master", icon: "bi-building" },
      { label: "RTA Master", path: "/masters/rta-master", icon: "bi-building" },
      { label: "Client groups", path: "/masters/client-groups", icon: "bi-building" },
      { label: "MIS Report", path: "/masters/mis", icon: "bi-graph-up" },
    ],
  },
  {
    label: "Incorporation",
    icon: "bi-folder2-open",
    children: [
      { label: "RUN LLP", path: "/incorporation/run-llp" },
      { label: "FILLIP", path: "/incorporation/fillip" },
      { label: "SPICE", path: "/incorporation/spice" },
      { label: "Check Company Name", path: "/incorporation/check-company" },
    ],
  },
  {
    label: "Secretarial Practice",
    icon: "bi-briefcase",
    children: [
      { label: "Check Annual Filing Status", path: "/secretarial-practice/check-annual-filing" },
      { label: "Tenure Tracker", path: "/secretarial-practice/tenure-tracker" },
      { label: "E-form Filing Mgmt.", path: "/secretarial-practice/e-form-filing" },
      { label: "Upcoming Compliances", path: "/secretarial-practice/upcoming-compliances" },
      { label: "DSC Management", path: "/secretarial-practice/dsc-management" },
      { label: "DIR-3-KYC", path: "/secretarial-practice/dir3-kyc" },
      { label: "MCA V2 & V3 User", path: "/secretarial-practice/mca-v2-v3-user" },
      { label: "MCA Transaction", path: "/secretarial-practice/mca-transaction" },
      { label: "MCA V3 A/C Creation", path: "/secretarial-practice/mca-v3-ac-creation" },
      { label: "LLP MCA Credentials", path: "/secretarial-practice/llp-mca-credentials" },
      { label: "Company MCA Credentials", path: "/secretarial-practice/company-mca-credentials" },
      { label: "Director MCA Credentials", path: "/secretarial-practice/director-mca-credentials" },
      { label: "DIN Information", path: "/secretarial-practice/din-information" },
      { label: "Particulars of forms", path: "/secretarial-practice/particulars-of-forms" },
      { label: "Prepare DIR-2", path: "/secretarial-practice/prepare-dir2" },
      { label: "Search Report", path: "/secretarial-practice/search-report" },
      { label: "Banker's PAN Database", path: "/secretarial-practice/bankers-pan-database" },
      { label: "CSR Calculation", path: "/secretarial-practice/csr-calculation" },
    ],
  },
  {
    label: "Resolutions Master",
    icon: "bi-journal-check",
    children: [
      { label: "Board Resolutions", path: "/resolutions-master/board-resolutions" },
      { label: "General Meeting Resolutions", path: "/resolutions-master/general-meeting-resolutions" },
    ],
  },
  {
    label: "Checklist",
    icon: "bi-check2-square",
    children: [
      { label: "Standard Checklist", path: "/checklist" },
      { label: "Assign Checklist", path: "/checklist/assign" },
    ],
  },
  {
    label: "Assignments",
    icon: "bi-kanban",
    children: [
      { label: "Tasks", path: "/assignments/tasks" },
      { label: "Call Logs", path: "/assignments/call-logs" },
      { label: "Timesheets", path: "/assignments/timesheets" },
    ],
  },
  {
    label: "HRMS",
    icon: "bi-people",
    children: [
      { label: "Team member", path: "/hrms/team-member" },
      { label: "Time cards", path: "/hrms/time-cards" },
      { label: "Leave", path: "/hrms/leave" },
      { label: "Salary", path: "/hrms/salary" },
    ],
  },
  {
    label: "Business Manager",
    icon: "bi-person-badge",
    children: [
      { label: "Registration/Licence", path: "/business-manager/registration" },
      { label: "Insurance", path: "/business-manager/insurance" },
      { label: "Contract/Agreement", path: "/business-manager/agreement" },
      { label: "Expiry Manager", path: "/business-manager/expiry" },
    ],
  },
  {
    label: "Finance",
    icon: "bi-cash-stack",
    children: [
      { label: "Invoices", path: "/finance/invoices/monthly", icon: "bi-receipt" },
      { label: "Payments", path: "/finance/payments/monthly", icon: "bi-credit-card" },
      { label: "Expenses", path: "/finance/expenses", icon: "bi-wallet2" },
      { label: "Income vs Expenses", path: "/finance/income-expense", icon: "bi-bar-chart-line" },
    ],
  },
  {
    label: "Help & Support",
    icon: "bi-question-circle",
    children: [
      { label: "Updates", path: "/help-support/updates" },
      { label: "User Manual", path: "/help-support/user-manual" },
      { label: "Help Videos", path: "/help-support/help-videos" },
      { label: "Help Center", path: "/help-support/help-center" },
    ],
  },
  { label: "Announcements", path: "/announcements", icon: "bi-megaphone" },
  { label: "Leads", path: "/leads", icon: "bi-person-lines-fill" },
  { label: "Settings", path: "/settings", icon: "bi-gear" },
];

export default function Sidebar({ open, setOpen }: Props) {
  const location = useLocation();
  const [openMenus, setOpenMenus] = useState<string[]>([]);

  // Memoize the active menu search to prevent recalculation on every render
  const activeParentLabel = useMemo(() => {
    const parent = navItems.find((item) =>
      item.children?.some((child) => 
        location.pathname === child.path || 
        location.pathname.startsWith(child.path + "/")
      )
    );
    return parent?.label || null;
  }, [location.pathname]);

  useEffect(() => {
    if (activeParentLabel && !openMenus.includes(activeParentLabel)) {
      setOpenMenus((prev) => [...prev, activeParentLabel]);
    }
  }, [activeParentLabel]);

  const toggleMenu = (label: string) => {
    setOpenMenus((prev) =>
      prev.includes(label) ? prev.filter((i) => i !== label) : [...prev, label]
    );
  };

  const handleNavClick = () => {
    if (window.innerWidth < 992) {
      setOpen(false);
    }
  };

  return (
    <>
      {open && <div className="sidebar-backdrop d-lg-none" onClick={() => setOpen(false)} />}

      <div className={`sidebar ${open ? "open" : ""}`}>
        <div className="sidebar-menu">
          {navItems.map((item) => {
            const hasChildren = item.children && item.children.length > 0;
            const isMenuOpen = openMenus.includes(item.label);
            const isParentActive = hasChildren && item.children?.some(c => location.pathname === c.path);

            return (
              <div key={item.label} className="nav-group">
                {hasChildren ? (
                  <div
                    className={`sidebar-item ${isMenuOpen || isParentActive ? "parent-active" : ""}`}
                    onClick={() => toggleMenu(item.label)}
                    style={{ cursor: "pointer" }}
                  >
                    <span className="sidebar-left">
                      <i className={`bi ${item.icon}`}></i>
                      {item.label}
                    </span>
                    <i className={`bi ${isMenuOpen ? "bi-chevron-down" : "bi-chevron-right"} sidebar-arrow`}></i>
                  </div>
                ) : (
                  <NavLink
                    to={item.path!}
                    onClick={handleNavClick}
                    className={({ isActive }) => `sidebar-item ${isActive ? "active" : ""}`}
                  >
                    <span className="sidebar-left">
                      <i className={`bi ${item.icon}`}></i>
                      {item.label}
                    </span>
                    <i className="bi bi-chevron-right sidebar-arrow"></i>
                  </NavLink>
                )}

                {hasChildren && isMenuOpen && (
                  <div className="sidebar-sub-menu">
                    {item.children!.map((child) => (
                      <NavLink
                        key={child.path}
                        to={child.path}
                        end
                        onClick={handleNavClick}
                        className={({ isActive }) => `sub-item ${isActive ? "active" : ""}`}
                      >
                        <span className="sidebar-left">
                          {child.icon && <i className={`bi ${child.icon}`}></i>}
                          {child.label}
                        </span>
                      </NavLink>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}
