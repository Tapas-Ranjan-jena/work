import { useState, useEffect, useCallback } from "react"
import { useNavigate } from "react-router-dom"
import checklistService from "../../../../services/checklistService"
import type { Checklist } from "../../../../services/checklistTypes"
import toast from "react-hot-toast"

export default function StandardChecklist() {
  const navigate = useNavigate()
  const [checklists, setChecklists] = useState<Checklist[]>([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState("")
  const [page, setPage] = useState(1)
  const [limit] = useState(10)
  const [total, setTotal] = useState(0)

  const fetchChecklists = useCallback(async () => {
    setLoading(true)
    try {
      const res = await checklistService.getChecklists(page, limit, search)
      if (res.success) {
        setChecklists(res.data)
        setTotal(res.pagination?.total || 0)
      }
    } catch (error) {
      console.error("Error fetching checklists:", error)
      toast.error("Failed to fetch checklists")
    } finally {
      setLoading(false)
    }
  }, [page, limit, search])

  useEffect(() => {
    const timer = setTimeout(() => {
      fetchChecklists()
    }, 500)
    return () => clearTimeout(timer)
  }, [fetchChecklists])

  const handleDelete = async (id: number) => {
    if (!window.confirm("Are you sure you want to delete this checklist?")) return
    try {
      const res = await checklistService.deleteChecklist(id)
      if (res.success) {
        toast.success(res.message || "Checklist deleted successfully")
        fetchChecklists()
      } else {
        toast.error(res.message || "Failed to delete checklist")
      }
    } catch (error) {
      console.error("Error deleting checklist:", error)
      toast.error("An error occurred while deleting")
    }
  }

  const totalPages = Math.ceil(total / limit) || 1

  return (
    <div className="card border-0 p-3">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h6 className="fw-semibold m-0">Standard Checklist</h6>
        <div className="d-flex gap-2">
          <button
            onClick={() => navigate("/checklist/add")}
            className="btn btn-sm text-white"
            style={{ background: "#2E388E" }}
          >
            <i className="bi bi-plus-circle me-1"></i>
            Add Checklist
          </button>
          <button className="btn btn-sm text-white" style={{ background: "#2E388E" }}>
            <i className="bi bi-trash me-1"></i>
            Trash
          </button>
        </div>
      </div>

      {/* Controls */}
      <div className="d-flex justify-content-between mb-2">
        <div className="d-flex gap-2">
          <button className="btn btn-sm btn-light border">Show {limit} rows</button>
          <button className="btn btn-sm btn-light border">Excel</button>
        </div>
        <input
          className="form-control form-control-sm"
          style={{ width: 200 }}
          placeholder="Search"
          value={search}
          onChange={(e) => {
            setSearch(e.target.value)
            setPage(1)
          }}
        />
      </div>

      {/* Table */}
      <div className="table-responsive">
        <table className="table table-bordered align-middle">
          <thead>
            <tr>
              <th>#</th>
              <th>Title</th>
              <th>Created / Updated by</th>
              <th>Last Updated On</th>
              <th className="text-center">Action</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan={5} className="text-center py-4">
                  <div className="spinner-border spinner-border-sm text-primary me-2"></div>
                  Loading checklists...
                </td>
              </tr>
            ) : checklists.length === 0 ? (
              <tr>
                <td colSpan={5} className="text-center py-4 text-muted">No checklists found.</td>
              </tr>
            ) : (
              checklists.map((item, index) => (
                <tr key={item.id}>
                  <td>{(page - 1) * limit + index + 1}</td>
                  <td>{item.title}</td>
                  <td>{item.created_by_name || "Admin"}</td>
                  <td>{new Date(item.updated_at).toLocaleDateString()}</td>
                  <td className="text-center">
                    <button
                      className="btn btn-sm btn-outline-danger border-0"
                      onClick={() => handleDelete(item.id)}
                    >
                      <i className="bi bi-trash"></i>
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="d-flex justify-content-between align-items-center mt-2">
        <small className="text-muted">
          Showing {checklists.length > 0 ? (page - 1) * limit + 1 : 0} to {Math.min(page * limit, total)} of {total} entries
        </small>
        <div className="d-flex gap-2">
          <button
            className="btn btn-sm btn-light border"
            onClick={() => setPage(p => Math.max(1, p - 1))}
            disabled={page === 1 || loading}
          >
            Previous
          </button>
          <button
            className="btn btn-sm btn-light border"
            onClick={() => setPage(p => Math.min(totalPages, p + 1))}
            disabled={page >= totalPages || loading}
          >
            Next
          </button>
        </div>
      </div>

      <small className="text-danger mt-3 d-block">
        Alert: Please Note, these checklists are based on current laws and regulations.
        Any subsequent changes in laws may necessitate updates.
      </small>
    </div>
  )
}