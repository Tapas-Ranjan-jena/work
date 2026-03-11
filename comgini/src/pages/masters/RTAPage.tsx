import { useState, useEffect } from "react"
import RTAForm from "../../components/masters/RTAForm"
import mastersService from "../../services/mastersService"
import type { RTA } from "../../types/masters.types"

export default function RTAPage() {
    const [rtas, setRtas] = useState<RTA[]>([])
    const [isLoading, setIsLoading] = useState(false)
    const [searchQuery, setSearchQuery] = useState("")
    const [isFormOpen, setIsFormOpen] = useState(false)

    const fetchRTAs = async () => {
        setIsLoading(true)
        try {
            const data = await mastersService.getRTAs()
            setRtas(data)
        } catch (error) {
            console.error("Failed to fetch RTAs", error)
        } finally {
            setIsLoading(false)
        }
    }

    useEffect(() => {
        fetchRTAs()
    }, [])

    const filteredRTAs = rtas.filter(rta =>
        rta.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        rta.isin_code.toLowerCase().includes(searchQuery.toLowerCase())
    )

    return (
        <div className="container-fluid py-3 px-4 bg-white" style={{ minHeight: "100vh" }}>

            {/* ================= BREADCRUMB ================= */}
            <div className="mb-4">
                <small className="text-secondary" style={{ fontSize: "12px" }}>
                    Home / RTA List
                </small>
            </div>

            {/* ================= HEADER SECTION ================= */}
            <div className="d-flex justify-content-between align-items-center mb-4">
                <h5 className="fw-bold m-0" style={{ color: "#333" }}>RTA Master</h5>
                <button
                    className="btn btn-sm text-white px-3 d-flex align-items-center"
                    style={{ background: "#2E388E", borderRadius: "4px", fontSize: "13px" }}
                    onClick={() => setIsFormOpen(true)}
                >
                    <i className="bi bi-plus-circle me-1"></i> Add RTA
                </button>
            </div>

            {/* ================= TOOLBAR ================= */}
            <div className="d-flex justify-content-end mb-3">
                <div className="d-flex align-items-center bg-white border rounded px-2" style={{ width: "250px" }}>
                    <input
                        className="form-control form-control-sm border-0 shadow-none px-1"
                        placeholder="Search Name or ISIN"
                        style={{ fontSize: "12px" }}
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                    <i className="bi bi-search text-secondary" style={{ fontSize: "14px" }}></i>
                </div>
            </div>

            {/* ================= TABLE ================= */}
            <div className="table-responsive border rounded shadow-sm bg-white">
                <table className="table table-hover mb-0" style={{ minWidth: "1000px", fontSize: "13px" }}>
                    <thead style={{ backgroundColor: "#f8f9fa" }}>
                        <tr>
                            <th className="fw-semibold text-secondary py-3 text-center" style={{ width: "60px" }}>#</th>
                            <th className="fw-semibold text-secondary py-3">RTA Name</th>
                            <th className="fw-semibold text-secondary py-3">Contact Person</th>
                            <th className="fw-semibold text-secondary py-3">Phone</th>
                            <th className="fw-semibold text-secondary py-3">Email</th>
                            <th className="fw-semibold text-secondary py-3">ISIN Code</th>
                            <th className="fw-semibold text-secondary py-3">Address</th>
                        </tr>
                    </thead>
                    <tbody>
                        {isLoading ? (
                            <tr>
                                <td colSpan={7} className="text-center py-5">
                                    <div className="spinner-border spinner-border-sm text-primary" role="status"></div>
                                    <p className="mt-2 mb-0 small text-muted">Loading RTAs...</p>
                                </td>
                            </tr>
                        ) : filteredRTAs.length === 0 ? (
                            <tr>
                                <td colSpan={7} className="text-center py-5 text-muted">
                                    No RTAs found.
                                </td>
                            </tr>
                        ) : (
                            filteredRTAs.map((rta, index) => (
                                <tr key={rta.id}>
                                    <td className="py-3 text-secondary align-middle text-center">{index + 1}.</td>
                                    <td className="py-3 fw-medium align-middle" style={{ color: "#2E388E" }}>{rta.name}</td>
                                    <td className="py-3 text-secondary align-middle">{rta.contact_person}</td>
                                    <td className="py-3 text-secondary align-middle">{rta.phone}</td>
                                    <td className="py-3 text-secondary align-middle">{rta.email}</td>
                                    <td className="py-3 text-secondary align-middle">{rta.isin_code}</td>
                                    <td className="py-3 text-secondary align-middle">{rta.address}</td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>

            <RTAForm
                open={isFormOpen}
                onClose={() => setIsFormOpen(false)}
                onSuccess={fetchRTAs}
            />
        </div>
    )
}
