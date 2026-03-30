import { NavLink, Outlet } from "react-router-dom";
import { useState } from "react";

export default function SettingsLayout() {
  const [openCategories, setOpenCategories] = useState<string[]>(["app-settings"]);

  const toggleCategory = (id: string) => {
    setOpenCategories(prev => 
      prev.includes(id) ? prev.filter(c => c !== id) : [...prev, id]
    );
  };

  const navItems = [
    {
      id: "app-settings",
      label: "App Settings",
      icon: "bi-laptop",
      items: [
        { label: "General", path: "/settings/general" },
        { label: "Email", path: "/settings/email" },
        { label: "Notifications", path: "/settings/notifications" },
        { label: "Document", path: "/settings/document" },
        { label: "Date Format", path: "/settings/date-format" },
      ]
    },
    {
      id: "client",
      label: "Client",
      icon: "bi-people",
      items: [
        { label: "Client permissions", path: "/settings/client-permissions" },
        { label: "Client groups", path: "/masters/client-groups" },
      ]
    },
    {
      id: "setup",
      label: "Setup",
      icon: "bi-gear-wide-connected",
      items: [
        { label: "Tasks", path: "/settings/setup-tasks" },
        { label: "Leave types", path: "/settings/setup-leave-types" },
        { label: "Expense Categories", path: "/settings/setup-expense-categories" },
        { label: "Invoices", path: "/settings/setup-invoices" },
        { label: "Payment methods", path: "/settings/setup-payment-methods" },
        { label: "Company / Firm", path: "/settings/setup-company-firm" },
        { label: "Taxes", path: "/settings/setup-taxes" },
        { label: "Leads", path: "/settings/setup-leads" },
        { label: "Login Authentication", path: "/settings/setup-login-authentication" },
        { label: "Project Assignment", path: "/settings/setup-project-assignment" },
      ]
    },
    {
      id: "access-permission",
      label: "Access Permission",
      icon: "bi-shield-lock",
      items: [
        { label: "Roles", path: "/settings/roles" },
      ]
    }
  ];

  return (
    <div className="settings-layout d-flex h-100 bg-white rounded shadow-sm overflow-hidden" style={{ minHeight: "calc(100vh - 100px)" }}>
      {/* ⭐ LEFT SUB-SIDEBAR */}
      <div 
        className="settings-sidebar border-end d-flex flex-column" 
        style={{ width: "260px", background: "#f8f9fa" }}
      >
        <div className="p-3 border-bottom bg-white">
          <h6 className="mb-0 fw-bold text-dark">Settings</h6>
        </div>
        <div className="settings-nav py-2 flex-grow-1 overflow-y-auto">
          {navItems.map((cat) => (
            <div key={cat.id} className="category-group mb-1">
              <div 
                className="d-flex align-items-center justify-content-between px-3 py-2 text-dark fw-semibold"
                style={{ cursor: "pointer", fontSize: "14px" }}
                onClick={() => toggleCategory(cat.id)}
              >
                <div className="d-flex align-items-center gap-2">
                  <span className="text-secondary">{cat.label}</span>
                </div>
                <i className={`bi ${openCategories.includes(cat.id) ? "bi-dash-square" : "bi-plus-square"} text-muted`} style={{ fontSize: "12px" }}></i>
              </div>
              
              {openCategories.includes(cat.id) && cat.items.length > 0 && (
                <div className="sub-items d-flex flex-column">
                  {cat.items.map((item) => (
                    <NavLink
                      key={item.path}
                      to={item.path}
                      className={({ isActive }) => 
                        `px-4 py-2 text-decoration-none border-start border-4 ${isActive ? "active-link bg-light border-primary text-primary fw-medium" : "text-secondary border-transparent"}`
                      }
                      style={{ fontSize: "13px" }}
                    >
                      {item.label}
                    </NavLink>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* ⭐ MAIN CONTENT AREA */}
      <div className="settings-content flex-grow-1 overflow-auto p-4 bg-white">
        <Outlet />
      </div>

      <style>{`
        .settings-sidebar .active-link {
          background-color: #eef2ff !important;
        }
        .border-transparent {
          border-color: transparent !important;
        }
        .nav-link:hover {
          background-color: #f1f3f5;
        }
        .settings-nav .NavLink {
           transition: all 0.2s ease;
        }
      `}</style>
    </div>
  );
}
