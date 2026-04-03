import { NavLink, Outlet } from "react-router-dom";
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

export default function SettingsLayout() {
  const [openCategories, setOpenCategories] = useState<string[]>(["app-settings"]);
  const [showMobileNav, setShowMobileNav] = useState(false);
  const location = useLocation();

  // ⭐ Automatically close mobile nav on route change
  useEffect(() => {
    setShowMobileNav(false);
  }, [location.pathname]);

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

  const activeLabel = navItems.flatMap(cat => cat.items).find(item => item.path === location.pathname)?.label || "Settings";

  return (
    <div className="settings-layout d-flex flex-column flex-md-row h-100 bg-white rounded shadow-sm overflow-hidden" style={{ minHeight: "calc(100vh - 100px)" }}>
      
      {/* ⭐ MOBILE SELECTOR (VISIBLE ONLY ON SMALL SCREENS) */}
      <div className="d-md-none border-bottom p-3 bg-white d-flex justify-content-between align-items-center position-sticky top-0" style={{ zIndex: 900 }}>
        <div>
           <span className="small text-muted d-block" style={{ fontSize: '10px', textTransform: 'uppercase', letterSpacing: '1px' }}>Settings Menu</span>
           <h6 className="mb-0 fw-bold text-primary">{activeLabel}</h6>
        </div>
        <button 
          className="btn btn-outline-primary btn-sm d-flex align-items-center gap-2"
          onClick={() => setShowMobileNav(true)}
          style={{ borderRadius: '6px' }}
        >
          <i className="bi bi-list fs-5"></i>
          <span>Modules</span>
        </button>
      </div>

      {/* ⭐ LEFT SUB-SIDEBAR (DESKTOP) & MOBILE OVERLAY */}
      <div 
        className={`settings-sidebar border-end d-flex flex-column transition-all ${showMobileNav ? "show-mobile" : "hide-mobile"}`} 
        style={{ 
          width: "260px", 
          background: "#f8f9fa",
          zIndex: 1100
        }}
      >
        <div className="p-3 border-bottom bg-white d-flex justify-content-between align-items-center">
          <h6 className="mb-0 fw-bold text-dark">Settings</h6>
          <button className="btn btn-sm btn-light d-md-none" onClick={() => setShowMobileNav(false)}>
            <i className="bi bi-x-lg"></i>
          </button>
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

      {/* ⭐ MOBILE OVERLAY BACKDROP */}
      {showMobileNav && (
        <div 
          className="d-md-none position-fixed top-0 start-0 w-100 h-100 bg-dark opacity-50" 
          style={{ zIndex: 999 }}
          onClick={() => setShowMobileNav(false)}
        ></div>
      )}

      {/* ⭐ MAIN CONTENT AREA */}
      <div className="settings-content flex-grow-1 overflow-auto p-3 p-md-4 bg-white text-start">
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
        
        /* Mobile Specific Transitions */
        @media (max-width: 767.98px) {
          .settings-sidebar {
            position: fixed;
            top: 0;
            left: 0;
            bottom: 0;
            width: 85% !important;
            max-width: 320px;
            transition: transform 0.3s ease-in-out;
            box-shadow: 10px 0 30px rgba(0,0,0,0.1);
          }
          .hide-mobile {
            transform: translateX(-100%);
          }
          .show-mobile {
            transform: translateX(0);
          }
        }
      `}</style>
    </div>
  );
}
