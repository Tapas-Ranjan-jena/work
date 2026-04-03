import React from "react";

interface DashboardTabsProps {
    activeTab: string;
    onTabChange: (tab: string) => void;
    onAddTask: () => void;
}

const DashboardTabs: React.FC<DashboardTabsProps> = ({ activeTab, onTabChange, onAddTask }) => {
    const tabs = [
        "Dashboard",
        "Log in",
        "Notes",
        "Add Task",
        "RTA Services",
        "MCA Services",
        "Annual Filing",
        "Compliance Calendar",
        "Free of 7 days"
    ];

    return (
        <div className="d-flex align-items-center gap-2 mb-4 overflow-auto pb-2 px-1 custom-tab-scroll" style={{ flexWrap: "nowrap", scrollBehavior: "smooth", WebkitOverflowScrolling: "touch" }}>
            {tabs.map((tab) => (
                <button
                    key={tab}
                    onClick={() => {
                        if (tab === "Add Task") {
                            onAddTask();
                        } else {
                            onTabChange(tab);
                        }
                    }}
                    className={`btn px-3 py-2 rounded-pill fw-medium transition-all ${
                        activeTab === tab 
                        ? "btn-primary shadow-sm" 
                        : tab === "Add Task"
                            ? "btn-outline-primary"
                            : "btn-light text-muted border-0 shadow-none"
                    }`}
                    style={{ 
                        fontSize: "12px", 
                        whiteSpace: "nowrap",
                        backgroundColor: activeTab === tab ? "#2b4cb3" : (tab === "Add Task" ? "transparent" : "#fff"),
                        color: activeTab === tab ? "#fff" : (tab === "Add Task" ? "#2b4cb3" : "#6c757d"),
                        border: tab === "Add Task" ? "1.5px solid #2b4cb3" : "none",
                        boxShadow: activeTab === tab ? "0 4px 10px rgba(43, 76, 179, 0.2)" : "none"
                    }}
                >
                    {tab}
                    {(tab === "MCA Services" || tab === "Annual Filing") && (
                        <span className="badge rounded-pill bg-danger ms-2" style={{ fontSize: "9px", padding: "2px 5px", verticalAlign: "middle" }}>NEW</span>
                    )}
                </button>
            ))}
            <style>{`
                .custom-tab-scroll::-webkit-scrollbar {
                    height: 4px;
                }
                .custom-tab-scroll::-webkit-scrollbar-track {
                    background: transparent;
                }
                .custom-tab-scroll::-webkit-scrollbar-thumb {
                    background: rgba(0,0,0,0.05);
                    border-radius: 10px;
                }
                .custom-tab-scroll:hover::-webkit-scrollbar-thumb {
                    background: rgba(0,0,0,0.1);
                }
            `}</style>
        </div>
    );
};

export default DashboardTabs;
