import React, { useState } from "react";

interface Stats {
    pending_approval: number;
    pending_review: number;
    in_request: number;
    executed: number;
    pending_signature: number;
    further_processing: number;
}

interface StatsCardProps {
    stats: Stats;
}

const StatsCard: React.FC<StatsCardProps> = ({ stats }) => {
    const [activeTab, setActiveTab] = useState("My request");

    const tabs = ["My request", "Pending with me", "Overall request"];

    const statItems = [
        { label: "Pending Approval", value: stats.pending_approval, color: "#f44336" },
        { label: "Pending Review", value: stats.pending_review, color: "#ff9800" },
        { label: "In Request", value: stats.in_request, color: "#2196f3" },
        { label: "Executed", value: stats.executed, color: "#4caf50" },
        { label: "Pending Signature", value: stats.pending_signature, color: "#795548" },
        { label: "Further Processing", value: stats.further_processing, color: "#00bcd4" },
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

            <div className="row g-4">
                {statItems.map((item, idx) => (
                    <div className="col-6 col-md-3" key={idx}>
                        <div className="d-flex flex-column">
                            <h3 className="fw-bold mb-1">{item.value}</h3>
                            <div className="d-flex align-items-center gap-2">
                                <span className="rounded-circle" style={{ width: "8px", height: "8px", backgroundColor: item.color }}></span>
                                <span className="small text-muted fw-medium">{item.label}</span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default StatsCard;
