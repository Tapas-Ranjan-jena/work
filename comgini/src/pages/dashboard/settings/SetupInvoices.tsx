import { useState } from "react";

export default function SetupInvoices() {
    const [activeTab, setActiveTab] = useState("Prefix & Suffix");

    const tabs = [
        "Prefix & Suffix",
        "Invoice sequence",
        "Tax settings",
        "Bank accounts",
    ];

    return (
        <div className="setup-invoices-page text-start">
            <h5 className="fw-bold mb-4">Invoices Setup</h5>

            {/* ⭐ TABS - Scrollable on mobile */}
            <div className="d-flex gap-4 mb-4 border-bottom overflow-auto pb-1 flex-nowrap scrollbar-hidden" style={{ WebkitOverflowScrolling: "touch" }}>
                {tabs.map((tab) => (
                    <div
                        key={tab}
                        onClick={() => setActiveTab(tab)}
                        className="flex-shrink-0"
                        style={{
                            cursor: "pointer",
                            fontSize: "14px",
                            paddingBottom: "12px",
                            borderBottom: activeTab === tab ? "3px solid #3346a8" : "3px solid transparent",
                            color: activeTab === tab ? "#3346a8" : "#64748b",
                            fontWeight: activeTab === tab ? "600" : "500",
                            whiteSpace: "nowrap",
                            userSelect: "none"
                        }}
                    >
                        {tab}
                    </div>
                ))}
            </div>

            <div className="card shadow-sm border-0 border-radius-12 overflow-hidden">
                <div className="card-body p-4 p-md-5">
                    {activeTab === "Prefix & Suffix" ? (
                        <div className="row g-4 max-width-600">
                             <div className="col-12">
                                <label className="form-label fw-semibold text-dark mb-2" style={{ fontSize: "14px" }}>Invoice Prefix</label>
                                <input type="text" className="form-control py-2 px-3 bg-light border-0" defaultValue="INV-" style={{ borderRadius: "8px", fontSize: "14px" }} />
                             </div>
                             <div className="col-12">
                                <label className="form-label fw-semibold text-dark mb-2" style={{ fontSize: "14px" }}>Invoice Suffix</label>
                                <input type="text" className="form-control py-2 px-3 bg-light border-0" placeholder="e.g. /2026" style={{ borderRadius: "8px", fontSize: "14px" }} />
                             </div>
                             <div className="col-12 mt-4">
                                <button className="btn btn-primary d-flex align-items-center justify-content-center gap-2 px-5 py-3 shadow-sm border-0 w-100 w-sm-auto" style={{ borderRadius: "10px", background: "#3b82f6", fontWeight: "600" }}>
                                    <i className="bi bi-save fs-5"></i>
                                    Save Prefix Details
                                </button>
                             </div>
                        </div>
                    ) : (
                        <div className="text-center py-5 text-muted">
                            {activeTab} configuration coming soon.
                        </div>
                    )}
                </div>
            </div>

            <style>{`
                .max-width-600 { max-width: 600px; }
                .border-radius-12 { border-radius: 12px; }
                .scrollbar-hidden::-webkit-scrollbar { display: none; }
                .scrollbar-hidden { -ms-overflow-style: none; scrollbar-width: none; }
            `}</style>
        </div>
    );
}
