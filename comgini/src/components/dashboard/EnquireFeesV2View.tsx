import React from "react";

interface EnquireFeesV2ViewProps {
    onBack: () => void;
}

const EnquireFeesV2View: React.FC<EnquireFeesV2ViewProps> = ({ onBack }) => {
    return (
        <div className="card shadow-sm border-0 p-4" style={{ borderRadius: "16px", backgroundColor: "#fff" }}>
            {/* ⭐ HEADER */}
            <div className="d-flex justify-content-between align-items-center mb-4 border-bottom pb-3">
                <div>
                    <h5 className="fw-bold mb-0 text-dark">MCA V2 Fee Calculator For Company</h5>
                </div>
                <div className="d-flex align-items-center gap-3">
                    <span className="text-danger fw-bold small">*Indicative Fees</span>
                    <button className="btn btn-primary btn-sm d-flex align-items-center gap-2" onClick={onBack} style={{ backgroundColor: "#2b4cb3", border: "none" }}>
                        <i className="bi bi-arrow-left-circle"></i> Back
                    </button>
                </div>
            </div>

            {/* ⭐ EFILING SECTION */}
            <div className="mb-4">
                <div className="bg-light p-2 text-center fw-bold small mb-3 border">eFiling</div>
                <div className="row justify-content-center align-items-center g-3">
                    <div className="col-auto">
                        <label className="fw-bold small">Select the Company Form <span className="text-danger">*</span> :</label>
                    </div>
                    <div className="col-md-4">
                        <select className="form-select form-select-sm">
                            <option>--Select--</option>
                        </select>
                    </div>
                </div>
                <div className="d-flex justify-content-center gap-2 mt-4">
                    <button className="btn btn-light btn-sm border px-4">Calculate Fee</button>
                    <button className="btn btn-light btn-sm border px-4">Clear All</button>
                </div>
            </div>

            {/* ⭐ TABLES SECTION */}
            <div className="row g-0 border mb-4 text-center small">
                <div className="col-md-4 border-end">
                    <div className="bg-light p-2 fw-bold border-bottom">Inspection of Company / LLP Documents</div>
                    <div className="p-3 text-start">
                        <div className="d-flex justify-content-between mb-2">
                            <span>Viewing Company Documents on Portal -</span>
                            <span className="fw-bold">Rs 100.00 per Company</span>
                        </div>
                        <div className="d-flex justify-content-between">
                            <span>Viewing LLP Documents on Portal -</span>
                            <span className="fw-bold">Rs 50.00 per LLP</span>
                        </div>
                    </div>
                </div>
                <div className="col-md-4 border-end">
                    <div className="bg-light p-2 fw-bold border-bottom">Certified Copy of Company / LLP Documents</div>
                    <div className="p-3 text-start">
                        <div className="d-flex justify-content-between mb-2">
                            <span>Certificate of Incorporation -</span>
                            <span className="fw-bold text-nowrap">Rs 100.00 per copy</span>
                        </div>
                        <div className="d-flex justify-content-between mb-2">
                            <span>Certificate of Incorporation / Conversion for LLP -</span>
                            <span className="fw-bold text-nowrap">Rs 50.00 per copy</span>
                        </div>
                        <div className="d-flex justify-content-between mb-2">
                            <span>Any other public document -</span>
                            <span className="fw-bold text-nowrap">Rs 25.00 per page per document</span>
                        </div>
                        <div className="d-flex justify-content-between">
                            <span>Any other LLP document -</span>
                            <span className="fw-bold text-nowrap">Rs 5.00 per page per document</span>
                        </div>
                    </div>
                </div>
                <div className="col-md-4">
                    <div className="bg-light p-2 fw-bold border-bottom">Transfer Deeds</div>
                    <div className="p-3 text-start">
                        <div className="d-flex justify-content-between mb-2">
                            <span>Nominal Face value of shares is upto Rs. 5000 -</span>
                            <span className="fw-bold">Rs 50.00 per deed</span>
                        </div>
                        <div className="d-flex justify-content-between">
                            <span>Nominal Face value of shares is more than Rs. 5000 -</span>
                            <span className="fw-bold text-nowrap">Rs 100.00 per deed</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* ⭐ NOTES SECTION */}
            <div className="bg-light p-4 rounded-3 small">
                <div className="d-flex gap-2 mb-3">
                    <i className="bi bi-hand-thumbs-up"></i>
                    <span>Kindly note that in case of change of cost auditor caused by the death of existing cost auditor; companies are allowed to file fresh e-form 23C, without any additional fee, within 90 days of the date of death.</span>
                </div>
                <div className="d-flex gap-2 mb-3">
                    <i className="bi bi-hand-thumbs-up"></i>
                    <span>Kindly note that in case of financial year 2011-2012 (i.e. Financial year commencing on or after 01.04.2011) for Form 23AC-XBRL and Form 23ACA- XBRL, no additional fees will be charged in case the filing is done on or before 28th February, 2013 or due date of filing, whichever is later.</span>
                </div>
                <div className="d-flex gap-2 mb-3">
                    <i className="bi bi-hand-thumbs-up"></i>
                    <div>
                        <p className="mb-2">Kindly note that the Ministry vide circular number 30/2012 dated 28/09/2012 has further extended the due date for filing Form 23AC and Form 23ACA in non XBRL mode in the following manner:</p>
                        <p className="mb-2">- Company holding AGM or whose due date of holding AGM is on or before 20.09.2012, time limit will be 3rd November, 2012 or due date of filing, whichever is later.</p>
                        <p>- Company holding AGM or whose due date of holding AGM is on or after 21.09.2012, time limit will be 24th November, 2012 or due date of filing, whichever is later.</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EnquireFeesV2View;
