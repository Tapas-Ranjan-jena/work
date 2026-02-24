import { useState } from "react"
import AddClientGroupModal from "./AddClientGroupModal"

export default function ClientGroups() {

    const [openModal, setOpenModal] = useState(false)

    const softBtn = {
        background: "#f3f4f6",
        border: "1px solid #e5e7eb",
        color: "#374151"
    }

    return (
        <div className="container-fluid">

            {/* ===== HEADER ===== */}
            <div className="d-flex justify-content-between align-items-center mb-3">

                <h6 className="m-0">Client groups</h6>

                <button
                    onClick={() => setOpenModal(true)}
                    className="btn btn-sm"
                    style={{ background: "#fff", border: "1px solid #ccc" }}
                >
                    <i className="bi bi-plus-circle me-1"></i>
                    Add Client group
                </button>

            </div>

            {/* ===== CONTROLS ===== */}
            <div className="d-flex justify-content-between mb-2 flex-wrap gap-2">

                <div className="d-flex gap-2">

                    {/* ⭐ Grey 100 button */}
                    <button className="btn btn-sm" style={softBtn}>
                        100
                    </button>

                    {/* ⭐ EYE BUTTON (replaced search icon) */}
                    <button className="btn btn-sm" style={softBtn}>
                        <i className="bi bi-eye"></i>
                    </button>

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
                            color: "#888"
                        }}
                    />
                    <input
                        className="form-control form-control-sm"
                        placeholder="Search"
                        style={{ width: "180px", paddingLeft: "28px" }}
                    />
                </div>

            </div>

            {/* ===== TABLE ===== */}
            <div style={{ overflowX: "auto" }}>
                <table className="table table-bordered">
                    <thead>
                        <tr>
                            <th>Title</th>
                            <th>Contact Name</th>
                            <th>Contact No</th>
                            <th>Email ID</th>
                            <th style={{ width: "50px" }}></th>
                        </tr>
                    </thead>

                    <tbody>
                        <tr>
                            <td colSpan={5} className="text-center">
                                No record found.
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>

            {/* ===== FOOTER ===== */}
            <div
                className="d-flex justify-content-between align-items-center mt-2 pt-2"
                style={{ borderTop: "1px solid #e5e7eb" }}
            >

                <small className="text-muted">
                    0–0 / 0
                </small>

                <div className="d-flex gap-1">

                    {/* ⭐ Grey pagination buttons */}
                    <button className="btn btn-sm px-2" style={softBtn}>
                        <i className="bi bi-chevron-double-left"></i>
                    </button>

                    <button className="btn btn-sm px-2" style={softBtn}>
                        <i className="bi bi-chevron-double-right"></i>
                    </button>

                </div>

            </div>

            {/* ===== MODAL ===== */}
            {openModal && (
                <AddClientGroupModal onClose={() => setOpenModal(false)} />
            )}

        </div>
    )
}