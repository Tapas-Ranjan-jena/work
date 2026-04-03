import React from "react";

interface EnquireFeesV3ViewProps {
    onBack: () => void;
}

const EnquireFeesV3View: React.FC<EnquireFeesV3ViewProps> = ({ onBack }) => {
    const feeStructure = [
        { sr: 1, field: "Inspection of Company/LLP Documents", fee: "" },
        { sr: "", field: "(i) Viewing Company Documents on Portal", fee: "INR 100.00" },
        { sr: "", field: "(ii) Viewing LLP Documents on Portal", fee: "INR 50.00" },
        { sr: 2, field: "Certified Copy of Company/LLP Documents", fee: "" },
        { sr: "", field: "(i) Certificate of Incorporation", fee: "INR 100.00 per copy" },
        { sr: "", field: "(ii) Certificate of Incorporation/Conversion for LLP", fee: "INR 50.00 per copy" },
        { sr: "", field: "(iii) Any other public document", fee: "INR 25.00 page per document" },
        { sr: "", field: "(iv) Any other LLP document", fee: "INR 5.00 page per document" },
        { sr: 3, field: "Transfer Deeds", fee: "" },
        { sr: "", field: "(i) Nominal Face value of shares is upto Rs. 5000", fee: "INR 50.00 per deed" },
        { sr: "", field: "(ii) Nominal Face value of shares is more than Rs. 5000", fee: "INR 100.00 per deed" }
    ];

    return (
        <div className="card shadow-sm border-0 p-4" style={{ borderRadius: "16px", backgroundColor: "#fff" }}>
            {/* ⭐ HEADER */}
            <div className="d-flex justify-content-between align-items-center mb-4 border-bottom pb-3">
                <h5 className="fw-bold mb-0 text-dark">MCA V3 Enquire Fees</h5>
                <div className="d-flex align-items-center gap-3">
                    <span className="text-danger fw-bold small">*Indicative fees</span>
                    <button className="btn btn-primary btn-sm d-flex align-items-center gap-2" onClick={onBack} style={{ backgroundColor: "#2b4cb3", border: "none" }}>
                        <i className="bi bi-arrow-left-circle"></i> Back
                    </button>
                </div>
            </div>

            {/* ⭐ FEE STRUCTURE TABLE */}
            <div className="table-responsive mb-5">
                <table className="table table-bordered align-middle">
                    <thead className="bg-light bg-opacity-50">
                        <tr>
                            <th className="fw-bold small py-3" style={{ width: "80px" }}>Sr. No.</th>
                            <th className="fw-bold small py-3">Field Name</th>
                            <th className="fw-bold small py-3" style={{ width: "300px" }}>Fee Applicable</th>
                        </tr>
                    </thead>
                    <tbody>
                        {feeStructure.map((item, idx) => (
                            <tr key={idx} className={item.sr ? "bg-light bg-opacity-10" : ""}>
                                <td className="text-center small py-3 fw-bold">{item.sr}</td>
                                <td className={`small py-3 ${item.sr ? "fw-bold" : "ps-4"}`}>{item.field}</td>
                                <td className="small py-3">
                                    {item.fee && (
                                        <div className="p-2 bg-light border-0" style={{ borderRadius: "4px", backgroundColor: "#f0f2f5" }}>
                                            {item.fee}
                                        </div>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* ⭐ FEE DETAILS SECTION */}
            <div className="bg-light bg-opacity-10 p-4 rounded-3 border" style={{ backgroundColor: "#f8fbfe" }}>
                <h6 className="fw-bold text-muted small mb-4 text-uppercase border-bottom pb-2" style={{ borderBottomColor: "#eee" }}>Fee Details</h6>
                <div className="row g-4">
                    <div className="col-md-4">
                        <label className="form-label fw-bold small text-dark">Enquire fee for <span className="text-danger">*</span></label>
                        <select className="form-select" style={{ height: "45px", borderRadius: "8px" }}>
                            <option>Select</option>
                        </select>
                    </div>
                    <div className="col-md-4">
                        <label className="form-label fw-bold small text-dark">Nature of Service <span className="text-danger">*</span></label>
                        <select className="form-select" style={{ height: "45px", borderRadius: "8px" }}>
                            <option>Select Nature</option>
                        </select>
                    </div>
                    <div className="col-md-4">
                        <label className="form-label fw-bold small text-dark">Sub-service <span className="text-danger">*</span></label>
                        <select className="form-select" style={{ height: "45px", borderRadius: "8px" }}>
                            <option>Select Sub-service</option>
                        </select>
                    </div>
                </div>
                <div className="d-flex justify-content-end gap-3 mt-5">
                    <button className="btn btn-light px-4 border" style={{ height: "40px", borderRadius: "6px" }}>Clear All</button>
                    <button className="btn btn-primary px-4" style={{ height: "40px", borderRadius: "6px", backgroundColor: "#2b4cb3", border: "none" }}>Calculate Fee</button>
                </div>
            </div>
        </div>
    );
};

export default EnquireFeesV3View;
