import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import rtaService from "../../../services/rtaService"
import type { ISINRecord } from "../../../services/rtaService"

export default function ISINList({ isNested = false }: { isNested?: boolean }) {
  const [records, setRecords] = useState<ISINRecord[]>([])
  const [, setLoading] = useState(true)
  const [search, setSearch] = useState("")
  const navigate = useNavigate()

  useEffect(() => {
    fetchRecords()
  }, [])

  const fetchRecords = async () => {
    try {
      setLoading(true)
      const data = await rtaService.getISINRecords(1, 10, search)
      // Since backend is placeholder, we'll keep empty for now
      setRecords(data?.records || [])
    } catch (error) {
      console.error("Error fetching ISIN records", error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className={`isin-list ${isNested ? "p-0" : "p-4"} text-start`}>
      {/* ⭐ BREADCRUMBS */}
      {!isNested && (
        <nav aria-label="breadcrumb" className="mb-4">
          <ol className="breadcrumb mb-0 small">
            <li className="breadcrumb-item"><a href="#" className="text-decoration-none text-primary" onClick={() => navigate("/dashboard")}>Home</a></li>
            <li className="breadcrumb-item active" aria-current="page">RTA Services</li>
            <li className="breadcrumb-item active" aria-current="page">ISIN Creation</li>
          </ol>
        </nav>
      )}

      <div className={`${isNested ? "" : "card shadow-sm border-0 p-4"}`}>
        <div className="d-flex justify-content-between align-items-center mb-5 border-bottom pb-3">
          <h5 className="fw-bold mb-0">Particulars of ISIN Creation</h5>
          <div className="d-flex gap-2">
            <button
              className="btn btn-primary btn-sm px-4 shadow-none"
              style={{ background: "#2b4cb3" }}
              onClick={() => navigate("/rta-services/isin-creation/add")}
            >
              Create Documents
            </button>
            <button
              className="btn btn-primary btn-sm px-4 shadow-none d-flex align-items-center gap-2"
              style={{ background: "#2b4cb3" }}
              onClick={() => navigate("/dashboard")}
            >
              <i className="bi bi-arrow-left-circle"></i> Back
            </button>
          </div>
        </div>

        <div className="d-flex justify-content-between align-items-center mb-4">
          <div className="d-flex gap-2">
            <button className="btn btn-outline-secondary btn-sm bg-white border px-3">Show 10 rows</button>
          </div>
          <div className="d-flex align-items-center gap-2">
            <span className="small fw-bold">Search:</span>
            <input
              type="text"
              className="form-control form-control-sm border shadow-none"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              onKeyUp={(e) => e.key === "Enter" && fetchRecords()}
            />
          </div>
        </div>

        <div className="table-responsive border rounded overflow-hidden">
          <table className="table table-hover mb-0" style={{ fontSize: "11px" }}>
            <thead style={{ background: "#94a3b8", color: "white" }}>
              <tr className="align-middle">
                <th className="px-2 py-2 text-center border-end" style={{ width: "40px" }}>Sr. No.</th>
                <th className="px-2 py-2 border-end">Name of Company</th>
                <th className="px-2 py-2 border-end text-center">CIN</th>
                <th className="px-2 py-2 border-end text-center">RTA Name</th>
                <th className="px-2 py-2 border-end text-center">Type of Security</th>
                <th className="px-2 py-2 border-end text-center">Reference No.</th>
                <th className="px-2 py-2 border-end text-center">Created</th>
                <th className="px-2 py-2 text-center">Action</th>
              </tr>
            </thead>
            <tbody>
              {records.length === 0 ? (
                <tr>
                  <td colSpan={8} className="text-center py-4 text-muted small border-bottom-0">
                    No data available in table
                  </td>
                </tr>
              ) : (
                records.map((r, i) => (
                  <tr key={r.id}>
                    <td className="text-center border-end">{i + 1}</td>
                    <td className="border-end">{r.company_name}</td>
                    <td className="text-center border-end">{r.cin}</td>
                    <td className="text-center border-end">{r.rta_name}</td>
                    <td className="text-center border-end">{r.security_type}</td>
                    <td className="text-center border-end">{r.reference_no}</td>
                    <td className="text-center border-end">{r.created_at}</td>
                    <td className="text-center">
                      <button className="btn btn-sm text-primary"><i className="bi bi-eye"></i></button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        <div className="d-flex justify-content-between align-items-center mt-3 small text-muted">
          <div>Showing 0 to 0 of 0 entries</div>
          <div className="d-flex gap-0 align-items-center">
            <button className="btn btn-outline-secondary btn-sm px-3 rounded-start border-end-0">Previous</button>
            <button className="btn btn-outline-secondary btn-sm px-3 rounded-end">Next</button>
          </div>
        </div>
      </div>
    </div>
  )
}
