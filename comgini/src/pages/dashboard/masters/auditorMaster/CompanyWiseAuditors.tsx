import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import mastersService from "../../../../services/mastersService"
import type { Company } from "../../../../types/masters.types"
import toast from "react-hot-toast"

export default function CompanyWiseAuditors() {
  const navigate = useNavigate()
  const [companies, setCompanies] = useState<Company[]>([])
  const [selectedCompany, setSelectedCompany] = useState<number>(0)
  const [auditors, setAuditors] = useState<any[]>([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    fetchCompanies()
  }, [])

  const fetchCompanies = async () => {
    try {
      const resp = await mastersService.getCompanies(1, 100)
      setCompanies(resp.data)
    } catch (error) {
      console.error("Failed to fetch companies:", error)
    }
  }

  const handleCompanyChange = async (companyId: number) => {
    setSelectedCompany(companyId)
    if (!companyId) {
      setAuditors([])
      return
    }

    setLoading(true)
    try {
      const data = await mastersService.getCompanyWiseAuditors(companyId)
      setAuditors(data)
    } catch (error: any) {
      toast.error(error.message || "Failed to fetch auditors")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="container-fluid py-3">
      {/* ===== HEADER ===== */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h5 className="m-0 fw-bold text-dark">Company wise Auditor's List</h5>
        <button
          onClick={() => navigate(-1)}
          className="btn btn-sm btn-outline-secondary px-3 shadow-sm"
        >
          <i className="bi bi-arrow-left me-1"></i> Back
        </button>
      </div>

      {/* ===== FILTERS ===== */}
      <div className="card border-0 shadow-sm p-3 mb-4 bg-light">
        <div className="row align-items-end g-3">
          <div className="col-md-6">
            <label className="form-label small fw-bold text-muted mb-1">Select Company</label>
            <select
              className="form-select shadow-sm"
              value={selectedCompany}
              onChange={(e) => handleCompanyChange(Number(e.target.value))}
            >
              <option value={0}>-- Choose Company --</option>
              {companies.map(c => (
                <option key={c.id} value={c.id}>{c.name}</option>
              ))}
            </select>
          </div>
          <div className="col-md-6 d-flex justify-content-end gap-2">
            <button className="btn btn-light btn-sm border shadow-sm px-3">Excel</button>
            <button className="btn btn-light btn-sm border shadow-sm px-3">Show 10 rows</button>
          </div>
        </div>
      </div>

      {/* ===== TABLE ===== */}
      <div className="card border-0 shadow-sm overflow-hidden">
        <div className="table-responsive">
          <table className="table table-hover align-middle mb-0">
            <thead className="bg-light">
              <tr>
                <th className="px-3" style={{ width: "50px" }}>#</th>
                <th>Company Name</th>
                <th>Category</th>
                <th>Auditor's Name</th>
                <th>FRN</th>
                <th>M. No / COP</th>
                <th>PAN</th>
                <th>Email</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan={8} className="text-center py-5">
                    <div className="spinner-border spinner-border-sm text-primary me-2" role="status"></div>
                    Loading...
                  </td>
                </tr>
              ) : auditors.length === 0 ? (
                <tr>
                  <td colSpan={8} className="text-center py-5 text-muted">
                    {selectedCompany ? "No auditors found for this company." : "Select a company to view its auditors."}
                  </td>
                </tr>
              ) : (
                auditors.map((auditor, index) => (
                  <tr key={index}>
                    <td className="px-3 text-muted small">{index + 1}</td>
                    <td className="fw-bold text-dark">{auditor.company_name}</td>
                    <td>
                      <span className={`badge rounded-pill text-capitalize px-3 py-1 ${
                        auditor.category === 'statutory' ? 'bg-primary text-white' : 
                        auditor.category === 'secretarial' ? 'bg-success text-white' :
                        auditor.category === 'cost' ? 'bg-warning text-dark' : 'bg-info text-white'
                      }`} style={{ fontSize: "11px" }}>
                        {auditor.category}
                      </span>
                    </td>
                    <td>{auditor.auditor_name}</td>
                    <td className="text-muted small">{auditor.FRN}</td>
                    <td className="text-muted small">{auditor.membership_no}</td>
                    <td className="text-muted small">{auditor.pan}</td>
                    <td className="small">{auditor.email}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* ===== FOOTER ===== */}
      <div className="d-flex justify-content-between align-items-center mt-3">
        <small className="text-muted">Showing {auditors.length} entries</small>
        <div className="d-flex gap-2">
          <button className="btn btn-light btn-sm border shadow-sm px-3" disabled>Previous</button>
          <button className="btn btn-light btn-sm border shadow-sm px-3" disabled>Next</button>
        </div>
      </div>
    </div>
  )
}
