import { useNavigate } from "react-router-dom"

export default function CompanyWiseDebentureHolder() {

    const navigate = useNavigate()

    return (
        <div className="container-fluid">

            <div className="card p-3">

                {/* ================= BREADCRUMB ================= */}
                <small className="text-muted d-block border-bottom pb-2 mb-3">
                    <span className="text-primary">Home</span>
                    {" / "}
                    Debenture holder's Master
                    {" / "}
                    Company wise debenture holder list
                </small>

                {/* ================= BACK BUTTON ROW (ABOVE TITLE) ================= */}
                <div className="d-flex justify-content-end mb-1">

                    <button
                        onClick={() => navigate("/masters/debenture-holder")}
                        className="btn btn-sm"
                        style={{ background: "#2E388E", color: "#fff" }}
                    >
                        <i className="bi bi-arrow-left me-1"></i>
                        Back
                    </button>

                </div>

                {/* ================= TITLE ================= */}
                <h6 className="m-0 mb-2">
                    Company wise Debenture holder list
                </h6>

                {/* ================= HEADER ACTIONS ================= */}
                <div className="d-flex justify-content-between align-items-center flex-wrap gap-2 mb-2">

                    <div className="d-flex gap-2">
                        <button className="btn btn-light btn-sm">Show 10 rows</button>
                        <button className="btn btn-light btn-sm">Excel</button>
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
                            style={{ width: "180px", paddingLeft: "28px" }}
                        />
                    </div>

                </div>

                {/* ================= TABLE ================= */}
                <div style={{ overflowX: "auto" }}>
                    <table className="table table-bordered">

                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Company's Name</th>
                                <th>Debenture holder's Name</th>
                                <th>Father's Name</th>
                                <th>Type of Debenture</th>
                                <th>Folio no.</th>
                                <th>No of Debentures</th>
                            </tr>
                        </thead>

                        <tbody>
                            <tr>
                                <td colSpan={7} className="text-center">
                                    No data available in table
                                </td>
                            </tr>
                        </tbody>

                    </table>
                </div>

                {/* ================= FOOTER ================= */}
                <div className="d-flex justify-content-between align-items-center mt-2">

                    <small>Showing 0 to 0 of 0 entries</small>

                    <div className="d-flex gap-2">
                        <button className="btn btn-light btn-sm">Previous</button>
                        <button className="btn btn-light btn-sm">Next</button>
                    </div>

                </div>

                {/* ================= BOTTOM BAR ================= */}
                <div className="mt-2">
                    <div
                        style={{
                            height: "6px",
                            background: "#4b4b67",
                            borderRadius: "4px"
                        }}
                    />
                </div>

            </div>
        </div>
    )
}