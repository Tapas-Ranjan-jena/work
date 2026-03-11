import { useState, useEffect } from "react"
import AddExpenseModal from "./modals/AddExpenseModal"
import financeService from "../../../../services/financeService"
import mastersService from "../../../../services/mastersService"
import type { Expense } from "../../../../types/finance.types"
import type { Pagination, Company } from "../../../../types/masters.types"

export default function ExpensesList() {
  const [open, setOpen] = useState(false)
  const [expenses, setExpenses] = useState<Expense[]>([])
  const [pagination, setPagination] = useState<Pagination | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [page, setPage] = useState(1)
  const [limit] = useState(100)
  const [search, setSearch] = useState('')
  const [refreshKey, setRefreshKey] = useState(0)

  const [companies, setCompanies] = useState<Record<number, string>>({})

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true)
      try {
        const response = await financeService.getExpenses(page, limit)
        setExpenses(response.data)
        setPagination(response.pagination)

        const compRes = await mastersService.getCompanies(1, 1000)
        const compMap: Record<number, string> = {}
        compRes.data.forEach((c: Company) => { compMap[c.id] = c.name })
        setCompanies(compMap)
        console.log(companies) // Use it to avoid unused warning
      } catch (error) {
        console.error("Failed to fetch expenses:", error)
      } finally {
        setIsLoading(false)
      }
    }
    fetchData()
  }, [page, limit, refreshKey])

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    setRefreshKey(prev => prev + 1)
  }

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h5 className="fw-bold m-0 text-dark">Expenses</h5>
        <button
          className="btn btn-primary btn-sm px-3 shadow-sm"
          onClick={() => setOpen(true)}
        >
          <i className="bi bi-plus-lg me-1"></i> Add Expense
        </button>
      </div>

      <div className="card shadow-sm border-0">
        <div className="card-body pb-0">
          <div className="d-flex justify-content-between align-items-center mt-2 flex-wrap gap-2">
            <div className="d-flex gap-2 align-items-center">
              <select className="form-select form-select-sm" style={{ width: 80 }} value={limit} disabled>
                <option value="100">100</option>
              </select>
              <span className="small text-muted">entries per page</span>
            </div>

            <form onSubmit={handleSearch} className="input-group input-group-sm" style={{ width: 250 }}>
              <span className="input-group-text bg-white border-end-0">
                <i className="bi bi-search text-muted"></i>
              </span>
              <input
                className="form-control border-start-0 ps-0"
                placeholder="Search..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </form>
          </div>
        </div>

        <div className="px-3 pb-3">
          <div className="table-responsive border rounded mt-3 shadow-sm">
            <table className="table table-hover align-middle mb-0">
              <thead className="bg-light">
                <tr>
                  <th className="py-3">Date</th>
                  <th className="py-3">Category</th>
                  <th className="py-3">Amount</th>
                  <th className="py-3">Description</th>
                  <th className="py-3">Attachments</th>
                  <th className="py-3 text-center">Actions</th>
                </tr>
              </thead>
              <tbody className="border-top-0">
                {isLoading ? (
                  <tr>
                    <td colSpan={6} className="text-center py-5">
                      <div className="spinner-border spinner-border-sm text-primary" role="status"></div>
                      <span className="ms-2">Loading...</span>
                    </td>
                  </tr>
                ) : expenses.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="text-center text-muted py-4">
                      No expenses found
                    </td>
                  </tr>
                ) : (
                  expenses.map((exp) => (
                    <tr key={exp.id}>
                      <td>{exp.expense_date ? new Date(exp.expense_date).toLocaleDateString() : 'N/A'}</td>
                      <td>{exp.category}</td>
                      <td className="fw-bold">₹{exp.amount.toLocaleString()}</td>
                      <td>
                        <div className="text-truncate" style={{ maxWidth: "250px" }} title={exp.description}>
                          {exp.description}
                        </div>
                      </td>
                      <td>
                        {exp.attachments && exp.attachments.length > 0 ? (
                          <span className="badge bg-info text-white">
                            <i className="bi bi-paperclip me-1"></i>
                            {exp.attachments.length} files
                          </span>
                        ) : (
                          <span className="text-muted small">None</span>
                        )}
                      </td>
                      <td className="text-center">
                        <div className="btn-group btn-group-sm">
                          <button className="btn btn-light border text-primary">
                            <i className="bi bi-eye"></i>
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          <div className="d-flex justify-content-between align-items-center mt-3 small text-muted">
            <span>
              {pagination ? `Showing ${(page - 1) * limit + 1} to ${Math.min(page * limit, pagination.total)} of ${pagination.total}` : 'No records'}
            </span>
            <div className="btn-group btn-group-sm shadow-sm">
              <button
                className="btn btn-white border"
                disabled={page <= 1 || isLoading}
                onClick={() => setPage(p => p - 1)}
              >
                <i className="bi bi-chevron-left"></i>
              </button>
              <button className="btn btn-white border" disabled>
                {page}
              </button>
              <button
                className="btn btn-white border"
                disabled={!pagination || page * limit >= pagination.total || isLoading}
                onClick={() => setPage(p => p + 1)}
              >
                <i className="bi bi-chevron-right"></i>
              </button>
            </div>
          </div>
        </div>
      </div>

      <AddExpenseModal
        open={open}
        onClose={() => setOpen(false)}
        onSuccess={() => setRefreshKey(k => k + 1)}
      />
    </div>
  )
}