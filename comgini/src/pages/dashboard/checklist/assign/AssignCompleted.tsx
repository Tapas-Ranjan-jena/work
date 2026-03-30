import { useState, useEffect, useCallback } from "react"
import { useOutletContext } from "react-router-dom"
import assignmentService from "../../../../services/assignmentService"
import type { Assignment } from "../../../../services/assignmentTypes"
import toast from "react-hot-toast"

export default function AssignCompleted() {
  const { refreshKey } = useOutletContext<{ refreshKey: number }>()
  const [assignments, setAssignments] = useState<Assignment[]>([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState("")
  const [page, setPage] = useState(1)
  const [limit] = useState(10)
  const [total, setTotal] = useState(0)

  const fetchAssignments = useCallback(async () => {
    setLoading(true)
    try {
      const res = await assignmentService.getAssignments('completed', page, limit, search)
      if (res.success) {
        setAssignments(res.data)
        setTotal(res.pagination?.total || 0)
      }
    } catch (error) {
      console.error("Error fetching completed assignments:", error)
      toast.error("Failed to fetch completed assignments")
    } finally {
      setLoading(false)
    }
  }, [page, limit, search])

  useEffect(() => {
    const timer = setTimeout(() => {
      fetchAssignments()
    }, 500)
    return () => clearTimeout(timer)
  }, [fetchAssignments, refreshKey])

  const totalPages = Math.ceil(total / limit) || 1

  return (
    <div>

      {/* ⭐ TOP ACTION BAR */}
      <div className="d-flex justify-content-between align-items-center mb-2 flex-wrap gap-2">
        <div className="d-flex gap-2">
          <button className="btn btn-sm btn-light border">Show {limit} rows</button>
          <button className="btn btn-sm btn-light border">Excel</button>
        </div>

        <div className="position-relative" style={{ width: "220px" }}>
          <input
            className="form-control form-control-sm ps-4"
            placeholder="Search"
            value={search}
            onChange={(e) => {
              setSearch(e.target.value)
              setPage(1)
            }}
          />
          <i className="bi bi-search position-absolute top-50 start-0 translate-middle-y ms-2"></i>
        </div>
      </div>

      {/* ⭐ TABLE */}
      <div className="table-responsive">
        <table className="table table-bordered align-middle">
          <thead>
            <tr>
              <th>#</th>
              <th>Name of Company</th>
              <th>Assignment</th>
              <th>Maker</th>
              <th>Checker</th>
              <th>Status</th>
              <th>Last Updated By</th>
              <th>Last Updated On</th>
              <th>Due Date</th>
              <th className="text-center">Action</th>
            </tr>
          </thead>

          <tbody>
            {loading ? (
              <tr>
                <td colSpan={10} className="text-center py-4">
                  <div className="spinner-border spinner-border-sm text-primary me-2"></div>
                  Loading completed assignments...
                </td>
              </tr>
            ) : assignments.length === 0 ? (
              <tr>
                <td colSpan={10} className="text-center py-4 text-muted">
                  No completed assignments found.
                </td>
              </tr>
            ) : (
              assignments.map((item, index) => (
                <tr key={item.id}>
                  <td>{(page - 1) * limit + index + 1}</td>
                  <td>{item.company_name}</td>
                  <td>{item.checklist_title}</td>
                  <td>{item.maker_name}</td>
                  <td>{item.checker_name}</td>
                  <td>
                    <span className="badge bg-success">{item.status}</span>
                  </td>
                  <td>{item.last_updated_by || "Admin"}</td>
                  <td>{item.updated_at ? new Date(item.updated_at).toLocaleDateString() : "-"}</td>
                  <td>{item.due_date ? new Date(item.due_date).toLocaleDateString() : "-"}</td>
                  <td className="text-center">
                    <button className="btn btn-sm btn-outline-primary border-0 me-1">
                      <i className="bi bi-eye"></i>
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* ⭐ FOOTER */}
      <div className="d-flex justify-content-between align-items-center mt-2">
        <small className="text-muted">
          Showing {assignments.length > 0 ? (page - 1) * limit + 1 : 0} to {Math.min(page * limit, total)} of {total} entries
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

    </div>
  )
}