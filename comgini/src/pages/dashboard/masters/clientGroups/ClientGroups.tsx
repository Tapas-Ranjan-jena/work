import { useState, useEffect } from "react"
import AddClientGroupModal from "./AddClientGroupModal"
import mastersService from "../../../../services/mastersService"
import type { ClientGroup } from "../../../../types/masters.types"
import toast from "react-hot-toast"

export default function ClientGroups() {

    const [openModal, setOpenModal] = useState(false)
    const [groups, setGroups] = useState<ClientGroup[]>([])
    const [loading, setLoading] = useState(true)
    const [page, setPage] = useState(1)
    const [limit] = useState(20)
    const [totalRows, setTotalRows] = useState(0)

    useEffect(() => {
        fetchGroups()
    }, [page])

    const fetchGroups = async () => {
        setLoading(true)
        try {
            const resp = await mastersService.getClientGroups(page, limit)
            setGroups(resp.data)
            setTotalRows(resp.pagination.total)
        } catch (error: any) {
            console.error("Failed to fetch client groups:", error)
            toast.error("Failed to load client groups")
        } finally {
            setLoading(false)
        }
    }

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
                        {loading ? (
                            <tr>
                                <td colSpan={5} className="text-center py-4">
                                    <div className="spinner-border spinner-border-sm text-primary me-2" role="status"></div>
                                    Loading...
                                </td>
                            </tr>
                        ) : groups.length === 0 ? (
                            <tr>
                                <td colSpan={5} className="text-center py-4 text-muted">
                                    No record found.
                                </td>
                            </tr>
                        ) : (
                            groups.map((g) => (
                                <tr key={g.id}>
                                    <td className="fw-bold text-dark">{g.title}</td>
                                    <td>{g.contact_name}</td>
                                    <td>{g.contact_no}</td>
                                    <td>{g.email}</td>
                                    <td className="text-center">
                                        <button className="btn btn-sm btn-light border-0">...</button>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>

            {/* ===== FOOTER ===== */}
            <div
                className="d-flex justify-content-between align-items-center mt-2 pt-2"
                style={{ borderTop: "1px solid #e5e7eb" }}
            >

                <small className="text-muted">
                    {totalRows > 0 ? `${(page - 1) * limit + 1}–${Math.min(page * limit, totalRows)} / ${totalRows}` : "0–0 / 0"}
                </small>

                <div className="d-flex gap-1">

                    {/* ⭐ Grey pagination buttons */}
                    <button 
                        className="btn btn-sm px-2" 
                        style={softBtn}
                        onClick={() => setPage(p => Math.max(1, p - 1))}
                        disabled={page === 1 || loading}
                    >
                        <i className="bi bi-chevron-double-left"></i>
                    </button>

                    <button 
                        className="btn btn-sm px-2" 
                        style={softBtn}
                        onClick={() => setPage(p => Math.min(Math.ceil(totalRows / limit), p + 1))}
                        disabled={page >= Math.ceil(totalRows / limit) || loading}
                    >
                        <i className="bi bi-chevron-double-right"></i>
                    </button>

                </div>

            </div>

            {/* ===== MODAL ===== */}
            {openModal && (
                <AddClientGroupModal 
                    onClose={() => setOpenModal(false)}
                    onSuccess={() => {
                        setOpenModal(false)
                        fetchGroups()
                    }}
                />
            )}

        </div>
    )
}