export default function BulkWhatsapp() {

    return (
        <div className="container-fluid">

            {/* ⭐ BUTTON + GREEN STYLES */}
            <style>{`
                .primary-btn{
                    background:#2E388E;
                    color:white;
                    border:none;
                    transition:all .2s ease;
                }
                .primary-btn:hover{
                    background:#242e73;
                    color:white;
                }
                .dark-green{
                    background:#056221;
                    color:white;
                }
            `}</style>


            {/* ================= HEADER ================= */}
            <div className="d-flex justify-content-between align-items-center mb-2 flex-wrap gap-2">

                <h6 className="m-0 d-flex align-items-center gap-2">
                    <i className="bi bi-whatsapp text-success"></i>
                    Bulk WhatsApp Sender
                </h6>

                <div className="d-flex gap-2">
                    <button className="btn btn-sm primary-btn">Generate QR Code</button>
                    <button className="btn btn-sm primary-btn">Logout</button>
                </div>

            </div>

            {/* WARNING TEXT */}
            <div className="text-danger small mb-3">
                Using bulk messaging services on WhatsApp is against WhatsApp’s policies.
                Engaging in this activity may result in your number being blocked by WhatsApp.
                Please proceed with caution and understand the risks involved.
            </div>


            {/* ================= MAIN CARD ================= */}
            <div className="card mb-3">

                <div className="row g-0">

                    {/* LEFT PANEL */}
                    <div className="col-lg-6 p-3">

                        <div className="dark-green p-2 rounded mb-2">
                            Upload Excel of Phone Number
                        </div>

                        <div className="row g-2 align-items-center">
                            <div className="col-9">
                                <input type="file" className="form-control" />
                            </div>
                            <div className="col-3">
                                <button className="btn btn-sm w-100 primary-btn">
                                    Add Manually
                                </button>
                            </div>
                        </div>

                        <div className="d-flex gap-2 mt-3">
                            <button className="btn btn-sm primary-btn">
                                <i className="bi bi-download me-1"></i>
                                Excel Template
                            </button>

                            <button className="btn btn-sm primary-btn">
                                Clear Contacts
                            </button>
                        </div>

                    </div>


                    {/* RIGHT PANEL */}
                    <div className="col-lg-6 border-start p-3">

                        <div className="d-flex justify-content-between align-items-center dark-green p-2 rounded mb-2">

                            <span>Message</span>

                            <div className="d-flex gap-2">
                                <select
                                    className="form-select form-select-sm"
                                    style={{ width: "120px", height: "30px", paddingTop: "2px", paddingBottom: "2px" }}
                                >
                                    <option>Select</option>
                                </select>

                                <button
                                    className="btn btn-sm primary-btn"
                                    style={{ height:"30px", fontSize:"12px", padding:"2px 8px" }}
                                >
                                    Import from Template
                                </button>

                            </div>

                        </div>

                        <textarea
                            className="form-control mb-3"
                            rows={6}
                            placeholder="Type your message here..."
                        />

                        {/* ATTACHMENT */}
                        <div className="dark-green p-2 rounded mb-2">
                            Attachment
                        </div>

                        <div style={{ position: "relative", width: "100%" }}>

                            <input
                                type="file"
                                className="form-control pe-5"
                            />

                            <button
                                className="btn btn-sm primary-btn"
                                style={{
                                    position: "absolute",
                                    right: "6px",
                                    top: "50%",
                                    transform: "translateY(-50%)",
                                    height: "30px",
                                    width: "34px",
                                    padding: "0"
                                }}
                            >
                                +
                            </button>

                        </div>

                    </div>

                </div>

            </div>


            {/* ================= FOOTER BUTTONS ================= */}
            <div className="d-flex justify-content-end gap-2 mb-3">
                <button className="btn btn-sm primary-btn">Generate QR Code</button>
                <button className="btn btn-sm primary-btn">Logout</button>
            </div>


            {/* CENTER TEXT */}
            <div className="text-center small mb-3">
                10/10 Free WhatsApp Campaign Available.
            </div>


            {/* ================= TABLE ================= */}
            <div className="card p-3">

                <h6 className="mb-2">Previous WhatsApp Campaigns</h6>

                <div className="d-flex justify-content-between align-items-center flex-wrap gap-2 mb-2">

                    <div className="d-flex gap-2">
                        <button className="btn btn-sm primary-btn">Show 10 rows</button>
                        <button className="btn btn-sm primary-btn">Excel</button>
                        <button className="btn btn-sm primary-btn">Column Visibility</button>
                    </div>

                    <input
                        className="form-control form-control-sm"
                        placeholder="Search"
                        style={{ width: "180px" }}
                    />

                </div>

                <div style={{ overflowX: "auto" }}>
                    <table className="table table-bordered mb-0">
                        <thead>
                            <tr>
                                <th>Sr. No</th>
                                <th>Date of Sending Message</th>
                                <th>Sent By</th>
                                <th>Total Contacts</th>
                                <th>Sent</th>
                                <th>Failed</th>
                                <th>Message</th>
                                <th>Attachment</th>
                                <th>Export Result</th>
                            </tr>
                        </thead>

                        <tbody>
                            <tr>
                                <td colSpan={9} className="text-center">
                                    No data available in table
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>

            </div>

        </div>
    )
}
