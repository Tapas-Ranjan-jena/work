import { useNavigate } from "react-router-dom"
import { useState, useEffect } from "react"
import UploadADTModal from "./UploadADTModal"
import mastersService from "../../../../../services/mastersService"
import type { Auditor } from "../../../../../types/masters.types"
import toast from "react-hot-toast"

export default function StatutoryAuditors() {
  const navigate = useNavigate()
  const [openADTModal, setOpenADTModal] = useState(false)
  const [auditors, setAuditors] = useState<Auditor[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchAuditors()
  }, [])

  const fetchAuditors = async () => {
    setLoading(true)
    try {
      const data = await mastersService.getAuditors("statutory")
      setAuditors(data)
    } catch (error: any) {
      console.error("Failed to fetch auditors:", error)
      toast.error("Failed to load auditors")
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      {/* ===== ACTION ROW ===== */}
      <div className="d-flex justify-content-between align-items-center mb-3">
        {/* LEFT */}
        <div className="d-flex gap-2">
          <button className="btn btn-light btn-sm shadow-sm border">Show 10 rows</button>
          <button className="btn btn-light btn-sm shadow-sm border">Excel</button>
        </div>

        {/* RIGHT */}
        <div className="d-flex gap-2">
          <button
            onClick={() => setOpenADTModal(true)}
            className="btn btn-sm shadow-sm"
            style={{ background: "#2E388E", color: "#fff" }}
          >
            Import from ADT-1
          </button>

          <button
            onClick={() => navigate("add")}
            className="btn btn-sm shadow-sm"
            style={{ background: "#2E388E", color: "#fff" }}
          >
            <i className="bi bi-plus-lg me-1"></i>
            Add Auditor
          </button>
        </div>
      </div>

      {/* ===== SEARCH ===== */}
      <div className="d-flex justify-content-end mb-3">
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
            style={{ width: "220px", paddingLeft: "32px" }}
          />
        </div>
      </div>

      {/* ===== TABLE ===== */}
      <div className="card border-0 shadow-sm overflow-hidden">
        <div className="table-responsive">
          <table className="table table-hover align-middle mb-0">
            <thead className="bg-light">
              <tr>
                <th className="px-3" style={{ width: "50px" }}>#</th>
                <th>Firm Name</th>
                <th>Auditor Name</th>
                <th>Address</th>
                <th>Email</th>
                <th>Phone No.</th>
                <th className="text-center">Action</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan={7} className="text-center py-5">
                    <div className="spinner-border spinner-border-sm text-primary me-2" role="status"></div>
                    Loading auditors...
                  </td>
                </tr>
              ) : auditors.length === 0 ? (
                <tr>
                  <td colSpan={7} className="text-center py-5 text-muted">
                    No auditors found. Click "Add Auditor" to create one.
                  </td>
                </tr>
              ) : (
                auditors.map((auditor, index) => (
                  <tr key={auditor.id}>
                    <td className="px-3 text-muted small">{index + 1}</td>
                    <td>
                      <div className="fw-bold text-dark">{auditor.firm_name}</div>
                      <div className="small text-muted">FRN: {auditor.firm_registration_number}</div>
                    </td>
                    <td>
                      <div>{auditor.auditor_name}</div>
                      <div className="small text-muted">{auditor.designation}</div>
                    </td>
                    <td className="small" style={{ maxWidth: "200px" }}>
                      <div className="text-truncate">{auditor.address}</div>
                      <div className="text-muted">{auditor.city}, {auditor.state}</div>
                    </td>
                    <td className="small">
                      <div>{auditor.email}</div>
                      <div className="text-muted">{auditor.firm_email}</div>
                    </td>
                    <td className="small">{auditor.mobile}</td>
                    <td className="text-center">
                      <button className="btn btn-sm btn-outline-primary border-0">
                        <i className="bi bi-pencil"></i>
                      </button>
                      <button className="btn btn-sm btn-outline-danger border-0 ms-1">
                        <i className="bi bi-trash"></i>
                      </button>
                    </td>
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

      {/* ✅ MODAL RENDER */}
      {openADTModal && (
        <UploadADTModal 
          onClose={() => setOpenADTModal(false)} 
          onSuccess={fetchAuditors}
        />
      )}
    </>
  )
}