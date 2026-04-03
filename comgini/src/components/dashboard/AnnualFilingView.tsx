import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const AnnualFilingView: React.FC = () => {
    const navigate = useNavigate();
    const [view, setView] = useState<"menu" | "client-data" | "status-check">("menu");

    if (view === "client-data") {
        return (
            <div className="card shadow-sm border-0 p-4" style={{ borderRadius: "16px", backgroundColor: "#fff" }}>
                <div className="d-flex justify-content-between align-items-center mb-4">
                    <nav aria-label="breadcrumb">
                        <ol className="breadcrumb small mb-0">
                            <li className="breadcrumb-item text-primary" style={{ cursor: "pointer" }} onClick={() => setView("menu")}>Home</li>
                            <li className="breadcrumb-item active" aria-current="page">Annual Filing Client Data</li>
                        </ol>
                    </nav>
                    <div className="d-flex gap-2">
                        <button className="btn btn-success btn-sm px-3">Help Kit</button>
                        <button className="btn btn-primary btn-sm px-3">Generate Link</button>
                    </div>
                </div>

                <div className="d-flex justify-content-between align-items-center mb-3">
                    <div className="d-flex align-items-center gap-2">
                        <button className="btn btn-outline-secondary btn-sm">Show 10 rows</button>
                    </div>
                    <div className="d-flex align-items-center gap-2">
                        <span className="small text-muted">Search:</span>
                        <input className="form-control form-control-sm" style={{ width: "200px" }} />
                    </div>
                </div>

                <div className="table-responsive">
                    <table className="table table-bordered align-middle text-center small">
                        <thead className="bg-secondary text-white">
                            <tr>
                                <th>#</th>
                                <th>Client Name</th>
                                <th>CIN</th>
                                <th>Submitted At</th>
                                <th>Submitted From</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td colSpan={6} className="text-center py-4 text-muted small">
                                    No data available in table
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                <div className="d-flex justify-content-between align-items-center mt-3">
                    <div className="small text-muted">Showing 0 to 0 of 0 entries</div>
                    <div className="btn-group btn-group-sm">
                        <button className="btn btn-outline-secondary px-3 border-0">Previous</button>
                        <button className="btn btn-outline-secondary px-3 border-0">Next</button>
                    </div>
                </div>
            </div>
        );
    }

    if (view === "status-check") {
        return (
            <div className="card shadow-sm border-0 p-4" style={{ borderRadius: "16px", backgroundColor: "#fff" }}>
                <div className="d-flex justify-content-between align-items-center mb-4">
                    <nav aria-label="breadcrumb">
                        <ol className="breadcrumb small mb-0">
                            <li className="breadcrumb-item text-primary" style={{ cursor: "pointer" }} onClick={() => setView("menu")}>Home</li>
                            <li className="breadcrumb-item active" aria-current="page">Check Annual Filing Status</li>
                        </ol>
                    </nav>
                    <button className="btn btn-primary btn-sm px-3">Search CIN</button>
                </div>

                <div className="mt-4">
                    <h6 className="fw-bold text-dark mb-4 ps-2">Check Annual Filing Status of any company from MCA</h6>
                    <div className="row g-3 px-2 align-items-end">
                        <div className="col-md-4">
                            <select className="form-select form-select-sm" style={{ height: "45px", borderRadius: "8px" }}>
                                <option>Select MCA User</option>
                            </select>
                        </div>
                        <div className="col-md-4">
                            <select className="form-select form-select-sm" style={{ height: "45px", borderRadius: "8px" }}>
                                <option>Select Company</option>
                            </select>
                        </div>
                        <div className="col-md-3">
                            <input className="form-control form-control-sm" placeholder="CIN (Corporate Identity Number)" style={{ height: "45px", borderRadius: "8px" }} />
                        </div>
                        <div className="col-md-1">
                            <button className="btn btn-primary w-100 fw-bold" style={{ height: "45px", borderRadius: "8px", background: "#2b4cb3", border: "none" }}>Submit</button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="card shadow-sm border-0 p-4" style={{ borderRadius: "16px", backgroundColor: "#fff" }}>
            <nav aria-label="breadcrumb">
                <ol className="breadcrumb small mb-4">
                    <li className="breadcrumb-item text-primary" style={{ cursor: "pointer" }}>Home</li>
                    <li className="breadcrumb-item active" aria-current="page">Annual Filing</li>
                </ol>
            </nav>

            <div className="row g-3">
                <div className="col-12 col-md-4">
                    <button 
                        className="btn btn-primary w-100 py-4 shadow-sm fw-bold border-0" 
                        style={{ height: "120px", display: "flex", alignItems: "center", justifyContent: "center", borderRadius: "12px", background: "#0056b3" }}
                        onClick={() => setView("client-data")}
                    >
                        Data Collection <br /> From Client
                    </button>
                </div>
                <div className="col-12 col-md-4">
                    <button 
                        className="btn btn-primary w-100 py-4 shadow-sm fw-bold border-0" 
                        style={{ height: "120px", display: "flex", alignItems: "center", justifyContent: "center", borderRadius: "12px", background: "#0056b3" }}
                        onClick={() => navigate("/secretarial-practice/e-form-filing")}
                    >
                        E-form Filing <br /> Management
                    </button>
                </div>
                <div className="col-12 col-md-4">
                    <button 
                        className="btn btn-primary w-100 py-4 shadow-sm fw-bold border-0" 
                        style={{ height: "120px", display: "flex", alignItems: "center", justifyContent: "center", borderRadius: "12px", background: "#0056b3" }}
                        onClick={() => setView("status-check")}
                    >
                        Check Annual Filing <br /> Status
                    </button>
                </div>
            </div>
        </div>
    );
};

export default AnnualFilingView;
