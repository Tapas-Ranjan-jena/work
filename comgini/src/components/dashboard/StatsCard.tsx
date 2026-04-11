import React, { useState } from "react";

interface Stats {
    total?: number;
    completed?: number;
    pending?: number;
    overdue?: number;
    // Fallback for existing mock data if needed
    [key: string]: any;
}

interface StatsCardProps {
    stats: Stats;
}

const StatsCard: React.FC<StatsCardProps> = ({ stats }) => {
    const tabs = ["My request", "Pending with me", "Overall request"];
    const [activeTab, setActiveTab] = useState("My request");

    // Simulated filtering logic for different tabs as requested
    const getStatsByTab = () => {
        if (activeTab === "Pending with me") {
            return {
                total: stats.pending || 0,
                completed: 0,
                pending: stats.pending || 0,
                overdue: stats.overdue || 0
            };
        }
        if (activeTab === "My request") {
            return {
                // Showing a subset for "My Request" to provide visual feedback
                total: Math.ceil((stats.total || 0) * 0.4) || 2,
                completed: Math.ceil((stats.completed || 0) * 0.3) || 1,
                pending: Math.ceil((stats.pending || 0) * 0.4) || 1,
                overdue: Math.ceil((stats.overdue || 0) * 0.2) || 0
            };
        }
        return stats; // "Overall request" shows everything
    };

    const currentStats = getStatsByTab();

    const statItems = [
        { label: "Total Tasks", value: currentStats.total || 0, color: "#2196f3" },
        { label: "Completed", value: currentStats.completed || 0, color: "#4caf50" },
        { label: "Pending", value: currentStats.pending || 0, color: "#ff9800" },
        { label: "Overdue", value: currentStats.overdue || 0, color: "#f44336" },
    ];

    return (
        <div className="h-100 d-flex flex-column">
            <div className="dash-card-header">
                <ul className="nav nav-tabs border-0 flex-nowrap gap-4 overflow-x-auto overflow-y-hidden no-scrollbar">
                    {tabs.map((tab) => (
                        <li className="nav-item" key={tab}>
                            <button 
                                className={`nav-link border-0 px-0 fw-bold text-nowrap ${activeTab === tab ? "dash-stats-active" : "text-muted"}`}
                                onClick={() => setActiveTab(tab)}
                                style={{ background: "none" }}
                            >
                                {tab}
                            </button>
                        </li>
                    ))}
                </ul>
            </div>

            <div className="dash-card-body d-flex align-items-center">
                <div className="row g-4 w-100 justify-content-between text-center px-lg-4">
                    {statItems.map((item, idx) => (
                        <div className="col-6 col-md-3" key={idx}>
                            <div className="d-flex flex-column align-items-center stats-hover-effect">
                                <h2 className="fw-bold mb-0" 
                                    style={{ 
                                        fontSize: "3.5rem", 
                                        lineHeight: "1.1",
                                        letterSpacing: "-2px",
                                        background: `linear-gradient(180deg, #1e293b 0%, ${item.color}cc 100%)`,
                                        WebkitBackgroundClip: "text",
                                        WebkitTextFillColor: "transparent",
                                        filter: "drop-shadow(0 4px 6px rgba(0,0,0,0.05))"
                                    }}
                                >
                                    {item.value}
                                </h2>
                                <div className="d-flex align-items-center gap-2 mt-2">
                                    <span className="rounded-circle shadow-sm" style={{ width: "12px", height: "12px", backgroundColor: item.color, border: '2px solid white' }}></span>
                                    <span className="small text-muted fw-bold" style={{ fontSize: "12px", textTransform: "uppercase", letterSpacing: "1px" }}>{item.label}</span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default StatsCard;
