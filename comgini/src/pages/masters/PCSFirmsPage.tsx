import { useState, useEffect } from "react"
import PCSForm from "../../components/masters/PCSForm"
import mastersService from "../../services/mastersService"
import type { PCSFirm } from "../../types/masters.types"

export default function PCSFirmsPage() {
    const [firms, setFirms] = useState<PCSFirm[]>([])
    const [isLoading, setIsLoading] = useState(false)
    const [searchQuery, setSearchQuery] = useState("")
    const [isFormOpen, setIsFormOpen] = useState(false)

    const fetchFirms = async () => {
        setIsLoading(true)
        try {
            const data = await mastersService.getPCSFirms()
            setFirms(data)
        } catch (error) {
            console.error("Failed to fetch PCS firms", error)
        } finally {
            setIsLoading(false)
        }
    }

    useEffect(() => {
        fetchFirms()
    }, [])

    const filteredFirms = firms.filter(firm =>
        firm.firm_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        firm.urn.toLowerCase().includes(searchQuery.toLowerCase())
    )

    return (
        <div className="container-fluid py-3 px-4 bg-white" style={{ minHeight: "100vh" }}>

            {/* ================= BREADCRUMB ================= */}
            <div className="mb-4">
                <small className="text-secondary" style={{ fontSize: "12px" }}>
                    Home / PCS Firm List
                </small>
            </div>

            {/* ================= HEADER SECTION ================= */}
            <div className="d-flex justify-content-between align-items-center mb-4">
                <h5 className="fw-bold m-0" style={{ color: "#333" }}>PCS Firm Master</h5>
                <button
                    className="btn btn-sm text-white px-3 d-flex align-items-center"
                    style={{ background: "#2E388E", borderRadius: "4px", fontSize: "13px" }}
                    onClick={() => setIsFormOpen(true)}
                >
                    <i className="bi bi-plus-circle me-1"></i> Add PCS Firm
                </button>
            </div>

            {/* ================= TOOLBAR ================= */}
            <div className="d-flex justify-content-end mb-3">
                <div className="d-flex align-items-center bg-white border rounded px-2" style={{ width: "250px" }}>
                    <input
                        className="form-control form-control-sm border-0 shadow-none px-1"
                        placeholder="Search Name or URN"
                        style={{ fontSize: "12px" }}
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                    <i className="bi bi-search text-secondary" style={{ fontSize: "14px" }}></i>
                </div>
            </div>

            {/* ================= TABLE ================= */}
            <div className="table-responsive border rounded shadow-sm bg-white">
                <table className="table table-hover mb-0" style={{ minWidth: "1200px", fontSize: "13px" }}>
                    <thead style={{ backgroundColor: "#f8f9fa" }}>
                        <tr>
                            <th className="fw-semibold text-secondary py-3 text-center" style={{ width: "60px" }}>#</th>
                            <th className="fw-semibold text-secondary py-3">Firm Name</th>
                            <th className="fw-semibold text-secondary py-3">URN</th>
                            <th className="fw-semibold text-secondary py-3">Contact Person</th>
                            <th className="fw-semibold text-secondary py-3">Phone</th>
                            <th className="fw-semibold text-secondary py-3">Email</th>
                            <th className="fw-semibold text-secondary py-3 text-center">GSTIN / PAN</th>
                            <th className="fw-semibold text-secondary py-3">Address</th>
                        </tr>
                    </thead>
                    <tbody>
                        {isLoading ? (
                            <tr>
                                <td colSpan={8} className="text-center py-5">
                                    <div className="spinner-border spinner-border-sm text-primary" role="status"></div>
                                    <p className="mt-2 mb-0 small text-muted">Loading firms...</p>
                                </td>
                            </tr>
                        ) : filteredFirms.length === 0 ? (
                            <tr>
                                <td colSpan={8} className="text-center py-5 text-muted">
                                    No PCS firms found.
                                </td>
                            </tr>
                        ) : (
                            filteredFirms.map((firm, index) => (
                                <tr key={firm.id}>
                                    <td className="py-3 text-secondary align-middle text-center">{index + 1}.</td>
                                    <td className="py-3 fw-medium align-middle" style={{ color: "#2E388E" }}>{firm.firm_name}</td>
                                    <td className="py-3 text-secondary align-middle">{firm.urn}</td>
                                    <td className="py-3 text-secondary align-middle">{firm.contact_person}</td>
                                    <td className="py-3 text-secondary align-middle">{firm.phone}</td>
                                    <td className="py-3 text-secondary align-middle">{firm.email}</td>
                                    <td className="py-3 align-middle text-center">
                                        <div className="small">G: {firm.gstin}</div>
                                        <div className="small text-muted">P: {firm.pan}</div>
                                    </td>
                                    <td className="py-3 text-secondary align-middle">{firm.address}</td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>

            <PCSForm
                open={isFormOpen}
                onClose={() => setIsFormOpen(false)}
                onSuccess={fetchFirms}
            />
        </div>
    )
}
