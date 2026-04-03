import React from "react";

interface StuckOffCompanyViewProps {
    onBack: () => void;
}

const StuckOffCompanyView: React.FC<StuckOffCompanyViewProps> = ({ onBack }) => {
    return (
        <div className="card shadow-sm border-0 p-4" style={{ borderRadius: "16px" }}>
            <div className="d-flex justify-content-between align-items-center mb-4">
                <div className="d-flex align-items-center gap-2">
                    <button className="btn btn-light btn-sm rounded-circle" onClick={onBack}>
                        <i className="bi bi-arrow-left"></i>
                    </button>
                    <h5 className="fw-bold mb-0">Check Struck-off Companies</h5>
                </div>
            </div>

            {/* ⭐ SEARCH INPUTS */}
            <div className="row g-3 mb-4 p-3 border rounded-3 bg-light bg-opacity-10">
                <div className="col-md-5">
                    <label className="form-label fw-bold small">Search by Name</label>
                    <input 
                        className="form-control form-control-sm pe-5" 
                        placeholder="Type Your Company Name here..." 
                        style={{ height: "45px", borderRadius: "10px" }}
                    />
                </div>
                <div className="col-md-1 d-flex align-items-center justify-content-center text-muted small pt-4">
                    OR
                </div>
                <div className="col-md-5">
                    <label className="form-label fw-bold small">CIN / LLPIN</label>
                    <input 
                        className="form-control form-control-sm" 
                        placeholder="Type Your Company CIN here..." 
                        style={{ height: "45px", borderRadius: "10px" }}
                    />
                </div>
                
                <div className="col-md-5 mt-4">
                    <label className="form-label fw-bold small">File upload</label>
                    <div className="input-group input-group-sm">
                        <input type="file" className="form-control" id="inputGroupFile04" aria-describedby="inputGroupFileAddon04" aria-label="Upload" />
                        <button className="btn btn-primary px-4" style={{ background: "#2b4cb3", border: "none" }} type="button" id="inputGroupFileAddon04">Upload</button>
                    </div>
                    <small className="text-primary mt-1 d-block" style={{ cursor: "pointer", fontSize: "11px" }}>Template For CIN Search</small>
                </div>

                <div className="col-12 mt-4">
                    <button 
                        className="btn btn-primary px-4 fw-bold" 
                        style={{ background: "#2b4cb3", border: "none", height: "40px", borderRadius: "8px" }}
                    >
                        Get Details
                    </button>
                </div>
            </div>

            {/* ⭐ SEARCH HISTORY TABLE */}
            <div className="mt-5">
                <h6 className="fw-bold text-primary mb-3 text-uppercase border-bottom pb-2" style={{ borderBottomColor: "#2b4cb3 !important" }}>Search History</h6>
                
                <div className="d-flex justify-content-between align-items-center mb-3">
                    <div className="d-flex gap-2">
                        <button className="btn btn-outline-secondary btn-sm">Show 10 rows</button>
                        <button className="btn btn-outline-secondary btn-sm">Excel</button>
                    </div>
                    <div className="d-flex align-items-center gap-2">
                        <span className="small text-muted">Search:</span>
                        <input className="form-control form-control-sm" style={{ width: "150px" }} />
                    </div>
                </div>

                <div className="table-responsive">
                    <table className="table table-bordered align-middle text-center small">
                        <thead className="bg-secondary text-white">
                            <tr>
                                <th>Sr. No.</th>
                                <th>Reference ID</th>
                                <th>File Name</th>
                                <th>No. of Companies</th>
                                <th>Search Date</th>
                                <th>Status</th>
                                <th>Mode</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td colSpan={8} className="text-center py-4 text-muted small">
                                    No data available in table
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                <div className="d-flex justify-content-between align-items-center mt-3">
                    <div className="small text-muted">Showing 0 to 0 of 0 entries</div>
                    <div className="btn-group btn-group-sm">
                        <button className="btn btn-outline-secondary px-3">Previous</button>
                        <button className="btn btn-outline-secondary px-3">Next</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default StuckOffCompanyView;
