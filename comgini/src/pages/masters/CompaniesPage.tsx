import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import CompanyForm from "../../components/masters/CompanyForm"
import mastersService from "../../services/mastersService"
import type { Company } from "../../types/masters.types"

export default function CompaniesPage() {
    const navigate = useNavigate()
    const [companies, setCompanies] = useState<Company[]>([])
    const [isLoading, setIsLoading] = useState(false)
    const [pagination, setPagination] = useState({ page: 1, limit: 10, total: 0 })
    const [searchQuery, setSearchQuery] = useState("")

    const [isFormOpen, setIsFormOpen] = useState(false)
    const [selectedCompany, setSelectedCompany] = useState<Company | null>(null)

    const fetchCompanies = async (page = 1) => {
        setIsLoading(true)
        try {
            const response = await mastersService.getCompanies(page, pagination.limit)
            setCompanies(response.data)
            setPagination(response.pagination)
        } catch (error) {
            console.error("Failed to fetch companies", error)
        } finally {
            setIsLoading(false)
        }
    }

    useEffect(() => {
        fetchCompanies()
    }, [])


    const handleEdit = (company: Company) => {
        setSelectedCompany(company)
        setIsFormOpen(true)
    }

    const handleDelete = async (id: number) => {
        if (!window.confirm("Are you sure you want to delete this company?")) return
        try {
            await mastersService.deleteCompany(id)
            fetchCompanies(pagination.page)
        } catch (error: any) {
            alert(error.message || "Failed to delete company")
        }
    }

    const filteredCompanies = companies.filter(c =>
        c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        c.cin.toLowerCase().includes(searchQuery.toLowerCase())
    )

    return (
        <div className="container-fluid py-3 px-4 bg-white" style={{ minHeight: "100vh" }}>

            {/* ================= BREADCRUMB ================= */}
            <div className="mb-4">
                <small className="text-secondary" style={{ fontSize: "12px" }}>
                    Home / Client List
                </small>
            </div>

            {/* ================= HEADER SECTION ================= */}
            <div className="d-flex justify-content-between align-items-center mb-4">
                <h5 className="fw-bold m-0" style={{ color: "#333" }}>Particulars of Companies</h5>
                <div className="d-flex gap-2">
                    <button
                        className="btn btn-sm text-white px-3 d-flex align-items-center"
                        style={{ background: "#2E388E", borderRadius: "4px", fontSize: "13px" }}
                    >
                        <i className="bi bi-slash-circle me-1"></i> Inactive Companies
                    </button>
                    <button
                        className="btn btn-sm text-white px-3 d-flex align-items-center"
                        style={{ background: "#2E388E", borderRadius: "4px", fontSize: "13px" }}
                        onClick={() => navigate("/masters/add-company")}
                    >
                        <i className="bi bi-plus-circle me-1"></i> Add Company/LLP
                    </button>
                </div>
            </div>

            {/* ================= TOOLBAR ================= */}
            <div className="d-flex justify-content-between align-items-center mb-3">
                <div className="d-flex gap-2">
                    <button className="btn btn-outline-secondary btn-sm bg-white text-dark shadow-sm px-3" style={{ fontSize: "12px", borderColor: "#dee2e6" }}>
                        Show 10 rows
                    </button>
                    <button className="btn btn-outline-secondary btn-sm bg-white text-dark shadow-sm px-3" style={{ fontSize: "12px", borderColor: "#dee2e6" }}>
                        Show/Hide
                    </button>
                    <button className="btn btn-outline-secondary btn-sm bg-white text-dark shadow-sm px-3" style={{ fontSize: "12px", borderColor: "#dee2e6" }}>
                        Excel
                    </button>
                </div>

                <div className="d-flex align-items-center bg-white border rounded px-2" style={{ width: "250px" }}>
                    <input
                        className="form-control form-control-sm border-0 shadow-none px-1"
                        placeholder="Search"
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
                            <th className="fw-semibold text-secondary py-3" style={{ width: "60px" }}>#</th>
                            <th className="fw-semibold text-secondary py-3">CIN</th>
                            <th className="fw-semibold text-secondary py-3">Company Name</th>
                            <th className="fw-semibold text-secondary py-3">Email</th>
                            <th className="fw-semibold text-secondary py-3">INC Date</th>
                            <th className="fw-semibold text-secondary py-3">Type of Company</th>
                            <th className="fw-semibold text-secondary py-3">Category</th>
                            <th className="fw-semibold text-secondary py-3 text-center">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {isLoading ? (
                            <tr>
                                <td colSpan={8} className="text-center py-5">
                                    <div className="spinner-border spinner-border-sm text-primary" role="status"></div>
                                    <p className="mt-2 mb-0 small text-muted">Loading companies...</p>
                                </td>
                            </tr>
                        ) : filteredCompanies.length === 0 ? (
                            <tr>
                                <td colSpan={8} className="text-center py-5 text-muted">
                                    No companies found.
                                </td>
                            </tr>
                        ) : (
                            filteredCompanies.map((c, index) => (
                                <tr key={c.id}>
                                    <td className="py-3 text-secondary align-middle">{(pagination.page - 1) * pagination.limit + index + 1}.</td>
                                    <td className="py-3 text-secondary align-middle">{c.cin}</td>
                                    <td
                                        className="py-3 fw-medium align-middle"
                                        style={{ color: "#2E388E", cursor: "pointer" }}
                                        onClick={() => navigate(`/masters/directors/${c.id}`)}
                                    >
                                        {c.name}
                                    </td>
                                    <td className="py-3 text-secondary align-middle">{c.email}</td>
                                    <td className="py-3 text-secondary align-middle">{c.registration_date}</td>
                                    <td className="py-3 text-secondary align-middle">{c.company_type}</td>
                                    <td className="py-3 text-secondary align-middle">Company limited by shares</td>
                                    <td className="py-3 align-middle">
                                        <div className="d-flex justify-content-center gap-2">
                                            <button
                                                className="btn btn-outline-primary btn-sm rounded-circle d-flex align-items-center justify-content-center shadow-sm"
                                                style={{ width: "32px", height: "32px" }}
                                                title="View Directors"
                                                onClick={() => navigate(`/masters/directors/${c.id}`)}
                                            >
                                                <i className="bi bi-people" style={{ fontSize: "14px" }}></i>
                                            </button>
                                            <button
                                                className="btn btn-outline-info btn-sm rounded-circle d-flex align-items-center justify-content-center shadow-sm"
                                                style={{ width: "32px", height: "32px" }}
                                                title="Edit"
                                                onClick={() => handleEdit(c)}
                                            >
                                                <i className="bi bi-pencil" style={{ fontSize: "14px" }}></i>
                                            </button>
                                            <button
                                                className="btn btn-outline-danger btn-sm rounded-circle d-flex align-items-center justify-content-center shadow-sm"
                                                style={{ width: "32px", height: "32px" }}
                                                title="Delete"
                                                onClick={() => handleDelete(c.id)}
                                            >
                                                <i className="bi bi-trash" style={{ fontSize: "14px" }}></i>
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>

            {/* ================= PAGINATION ================= */}
            <div className="d-flex justify-content-between align-items-center mt-3">
                <small className="text-secondary" style={{ fontSize: "12px" }}>
                    Showing {(pagination.page - 1) * pagination.limit + 1} to {Math.min(pagination.page * pagination.limit, pagination.total)} of {pagination.total} entries
                </small>

                <div className="d-flex gap-1 align-items-center">
                    <button
                        className="btn btn-outline-secondary btn-sm px-3"
                        style={{ fontSize: "12px", borderColor: "#dee2e6" }}
                        disabled={pagination.page === 1}
                        onClick={() => fetchCompanies(pagination.page - 1)}
                    >
                        Previous
                    </button>

                    <div
                        className="d-flex align-items-center justify-content-center text-white rounded"
                        style={{ width: "24px", height: "24px", background: "#2E388E", fontSize: "12px" }}
                    >
                        {pagination.page}
                    </div>

                    <button
                        className="btn btn-outline-secondary btn-sm px-3"
                        style={{ fontSize: "12px", borderColor: "#dee2e6" }}
                        disabled={pagination.page * pagination.limit >= pagination.total}
                        onClick={() => fetchCompanies(pagination.page + 1)}
                    >
                        Next
                    </button>
                </div>
            </div>

            <CompanyForm
                open={isFormOpen}
                onClose={() => setIsFormOpen(false)}
                onSuccess={() => fetchCompanies(pagination.page)}
                company={selectedCompany}
            />
        </div>
    )
}
