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
    const [activeTab, setActiveTab] = useState("My request");

    const tabs = ["My request", "Pending with me", "Overall request"];

    // Map API fields (total, completed, pending, overdue)
    const statItems = [
        { label: "Total Tasks", value: stats.total || 0, color: "#2196f3" },
        { label: "Completed", value: stats.completed || 0, color: "#4caf50" },
        { label: "Pending", value: stats.pending || 0, color: "#ff9800" },
        { label: "Overdue", value: stats.overdue || 0, color: "#f44336" },
    ];

    return (
        <div className="card shadow-sm border-0 p-4 h-100" style={{ borderRadius: "16px" }}>
            <ul className="nav nav-tabs border-0 mb-4 gap-4">
                {tabs.map((tab) => (
                    <li className="nav-item" key={tab}>
                        <button 
                            className={`nav-link border-0 px-0 fw-bold ${activeTab === tab ? "text-primary border-bottom border-primary border-2" : "text-muted"}`}
                            onClick={() => setActiveTab(tab)}
                            style={{ background: "none" }}
                        >
                            {tab}
                        </button>
                    </li>
                ))}
            </ul>

            <div className="row g-4 justify-content-between text-center">
                {statItems.map((item, idx) => (
                    <div className="col-6 col-sm-3" key={idx}>
                        <div className="d-flex flex-column align-items-center">
                            <h2 className="fw-bold mb-1" style={{ fontSize: "2.8rem", letterSpacing: "-1.5px" }}>{item.value}</h2>
                            <div className="d-flex align-items-center gap-2">
                                <span className="rounded-circle shadow-sm" style={{ width: "10px", height: "10px", backgroundColor: item.color }}></span>
                                <span className="small text-muted fw-bold" style={{ fontSize: "11px", textTransform: "uppercase", letterSpacing: "0.5px" }}>{item.label}</span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default StatsCard;
