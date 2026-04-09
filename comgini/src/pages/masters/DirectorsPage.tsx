import { useState, useEffect } from "react"
import { useParams, useNavigate } from "react-router-dom"
import DirectorForm from "../../components/masters/DirectorForm"
import mastersService from "../../services/mastersService"
import type { Director } from "../../types/masters.types"

export default function DirectorsPage() {
    const { companyId } = useParams()
    const navigate = useNavigate()
    const [directors, setDirectors] = useState<Director[]>([])
    const [isLoading, setIsLoading] = useState(false)
    const [searchQuery, setSearchQuery] = useState("")

    const [isFormOpen, setIsFormOpen] = useState(false)
    const [selectedDirector, setSelectedDirector] = useState<Director | null>(null)

    const fetchDirectors = async () => {
        setIsLoading(true)
        try {
            if (companyId) {
                const data = await mastersService.getDirectors(Number(companyId))
                setDirectors(data)
            } else {
                const data = await mastersService.getDirectors({})
                setDirectors(data)
            }
        } catch (error) {
            console.error("Failed to fetch directors", error)
        } finally {
            setIsLoading(false)
        }
    }

    useEffect(() => {
        fetchDirectors()
    }, [companyId])

    const handleAdd = () => {
        setSelectedDirector(null)
        setIsFormOpen(true)
    }

    const handleEdit = (director: Director) => {
        setSelectedDirector(director)
        setIsFormOpen(true)
    }

    const filteredDirectors = directors.filter(d =>
        (d.name || "").toLowerCase().includes(searchQuery.toLowerCase()) ||
        (d.din || "").toLowerCase().includes(searchQuery.toLowerCase())
    )

    return (
        <div className="container-fluid py-3 px-4 bg-white" style={{ minHeight: "100vh" }}>

            {/* ================= BREADCRUMB ================= */}
            <div className="mb-4">
                <small className="text-secondary" style={{ fontSize: "12px" }}>
                    Home / Director List
                </small>
            </div>

            {/* ================= HEADER SECTION ================= */}
            <div className="d-flex justify-content-between align-items-center mb-4">
                <h5 className="fw-bold m-0" style={{ color: "#333" }}>Director / KMP Master</h5>
                <div className="d-flex gap-2">
                    <button
                        className="btn btn-sm text-white px-3 d-flex align-items-center"
                        style={{ background: "#2E388E", borderRadius: "4px", fontSize: "13px" }}
                        onClick={() => navigate("/masters/company-master")}
                    >
                        <i className="bi bi-arrow-left me-1"></i> Back to Companies
                    </button>
                    <button
                        className="btn btn-sm text-white px-3 d-flex align-items-center"
                        style={{ background: "#2E388E", borderRadius: "4px", fontSize: "13px" }}
                        onClick={handleAdd}
                    >
                        <i className="bi bi-plus-circle me-1"></i> Add Director
                    </button>
                </div>
            </div>

            {/* ================= TOOLBAR ================= */}
            <div className="d-flex justify-content-end mb-3">
                <div className="d-flex align-items-center bg-white border rounded px-2" style={{ width: "250px" }}>
                    <input
                        className="form-control form-control-sm border-0 shadow-none px-1"
                        placeholder="Search Name or DIN"
                        style={{ fontSize: "12px" }}
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                    <i className="bi bi-search text-secondary" style={{ fontSize: "14px" }}></i>
                </div>
            </div>

            {/* ================= TABLE ================= */}
            <div className="table-responsive border rounded shadow-sm bg-white text-center">
                <table className="table table-hover mb-0" style={{ minWidth: "1000px", fontSize: "13px" }}>
                    <thead style={{ backgroundColor: "#f8f9fa" }}>
                        <tr>
                            <th className="fw-semibold text-secondary py-3" style={{ width: "60px" }}>#</th>
                            <th className="fw-semibold text-secondary py-3">Name</th>
                            <th className="fw-semibold text-secondary py-3">DIN</th>
                            <th className="fw-semibold text-secondary py-3">Designation</th>
                            <th className="fw-semibold text-secondary py-3">Appointment Date</th>
                            <th className="fw-semibold text-secondary py-3">Tenure (Years)</th>
                            <th className="fw-semibold text-secondary py-3">Status</th>
                            <th className="fw-semibold text-secondary py-3">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {isLoading ? (
                            <tr>
                                <td colSpan={8} className="text-center py-5">
                                    <div className="spinner-border spinner-border-sm text-primary" role="status"></div>
                                    <p className="mt-2 mb-0 small text-muted">Loading directors...</p>
                                </td>
                            </tr>
                        ) : filteredDirectors.length === 0 ? (
                            <tr>
                                <td colSpan={8} className="text-center py-5 text-muted">
                                    No directors found.
                                </td>
                            </tr>
                        ) : (
                            filteredDirectors.map((d, index) => (
                                <tr key={index}>
                                    <td className="py-3 text-secondary align-middle">{index + 1}.</td>
                                    <td className="py-3 fw-medium align-middle">{d.name}</td>
                                    <td className="py-3 text-secondary align-middle">{d.din}</td>
                                    <td className="py-3 text-secondary align-middle">{d.designation}</td>
                                    <td className="py-3 text-secondary align-middle">{d.appointment_date}</td>
                                    <td className="py-3 text-secondary align-middle">{d.tenure_years}</td>
                                    <td className="py-3 align-middle">
                                        <span className={`badge ${d.is_active ? 'bg-success-subtle text-success' : 'bg-danger-subtle text-danger'} border-0 px-3 py-2`} style={{ borderRadius: "20px" }}>
                                            {d.is_active ? 'Active' : 'Inactive'}
                                        </span>
                                    </td>
                                    <td className="py-3 align-middle">
                                        <div className="d-flex justify-content-center gap-2">
                                            <button
                                                className="btn btn-outline-info btn-sm rounded-circle d-flex align-items-center justify-content-center shadow-sm"
                                                style={{ width: "32px", height: "32px" }}
                                                title="Edit"
                                                onClick={() => handleEdit(d)}
                                            >
                                                <i className="bi bi-pencil" style={{ fontSize: "14px" }}></i>
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>

            <DirectorForm
                open={isFormOpen}
                onClose={() => setIsFormOpen(false)}
                onSuccess={fetchDirectors}
                companyId={Number(companyId)}
                director={selectedDirector}
            />
        </div>
    )
}
