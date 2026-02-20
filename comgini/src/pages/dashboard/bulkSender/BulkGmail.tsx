export default function BulkGmail() {

    return (
        <div className="container-fluid">

            {/* ================= HEADER ================= */}
            <div className="d-flex justify-content-between align-items-center mb-3 flex-wrap gap-2">

                <h6 className="m-0 d-flex align-items-center gap-2">

                    {/* ⭐ Gmail M Logo (Embedded) */}
                    <img
                        src="https://upload.wikimedia.org/wikipedia/commons/4/4e/Gmail_Icon.png"
                        alt="gmail"
                        style={{ width: "20px", height: "20px", objectFit: "contain" }}
                    />

                    Bulk Gmail Sender
                </h6>

                <div className="d-flex gap-2 flex-wrap">
                    <button className="btn btn-danger btn-sm">Add Template</button>
                    <button className="btn btn-danger btn-sm">Director Database</button>
                    <button className="btn btn-danger btn-sm">Shareholder Database</button>
                    <button className="btn btn-danger btn-sm">Authentication</button>
                </div>

            </div>


            {/* ================= SINGLE BOX WITH DIVIDER ================= */}
            <div className="card mb-3">

                <div className="row g-0">

                    {/* LEFT SIDE */}
                    <div className="col-lg-6 p-3">

                        <div className="bg-danger text-white p-2 rounded mb-3">
                            Upload Excel of Emails
                        </div>

                        <div className="row align-items-center g-2">

                            <div className="col-lg-10">
                                <input type="file" className="form-control" />
                            </div>

                            <div className="col-lg-2">
                                <button className="btn btn-danger btn-sm w-100">
                                    Add Manually
                                </button>
                            </div>

                        </div>

                        <div className="d-flex gap-2 mt-3">
                            <button className="btn btn-danger btn-sm">
                                <i className="bi bi-download me-1"></i>
                                Excel Template
                            </button>

                            <button className="btn btn-danger btn-sm">
                                Clear Mails
                            </button>
                        </div>

                    </div>


                    {/* RIGHT SIDE */}
                    <div className="col-lg-6 border-start p-3 d-flex justify-content-center">

                        <div className="d-flex justify-content-end align-items-center w-100">
                            <button className="btn btn-danger btn-sm">
                                Clear Contacts
                            </button>
                        </div>

                    </div>

                </div>

            </div>


            {/* ⭐ CENTER TEXT */}
            <div className="text-center mb-3 small">
                10/10 Free Gmail Campaign Available.
            </div>


            {/* ================= TABLE SECTION ================= */}
            <div className="card p-3">

                <h6 className="mb-2">Previous Gmail Campaigns</h6>

                <div className="d-flex justify-content-between align-items-center flex-wrap gap-2 mb-2">

                    <div className="d-flex gap-2 flex-wrap">
                        <button className="btn btn-light btn-sm">Show 10 rows</button>
                        <button className="btn btn-light btn-sm">Excel</button>
                        <button className="btn btn-light btn-sm">Column Visibility</button>
                    </div>

                    <div style={{ position: "relative" }}>
                        <i
                            className="bi bi-search"
                            style={{
                                position: "absolute",
                                left: "10px",
                                top: "50%",
                                transform: "translateY(-50%)",
                                fontSize: "13px",
                                color: "#888",
                                pointerEvents: "none"
                            }}
                        />
                        <input
                            className="form-control form-control-sm"
                            placeholder="Search"
                            style={{
                                width: "180px",
                                paddingLeft: "28px"
                            }}
                        />
                    </div>

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


                <div className="d-flex justify-content-between align-items-center mt-2">

                    <small>Showing 0 to 0 of 0 entries</small>

                    <div className="d-flex gap-2">
                        <button className="btn btn-light btn-sm">Previous</button>
                        <button className="btn btn-light btn-sm">Next</button>
                    </div>

                </div>

            </div>

        </div>
    )
}
