import { NavLink, Outlet, useLocation, useNavigate } from "react-router-dom"
import { useState } from "react"
import AddInvoiceModal from "../modals/AddInvoiceModal"
import AddPaymentModal from "../modals/AddPaymentModal"
import type { Pagination } from "../../../../../types/masters.types"

export default function InvoiceLayout() {
  const [openInvoice, setOpenInvoice] = useState(false)
  const [openPayment, setOpenPayment] = useState(false)
  const [page, setPage] = useState(1)
  const [limit] = useState(100)
  const [search, setSearch] = useState('')
  const [pagination, setPagination] = useState<Pagination | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [refreshKey, setRefreshKey] = useState(0)

  const location = useLocation()
  const navigate = useNavigate()

  const activeTab = () => {
    if (location.pathname.includes("yearly")) return "yearly"
    if (location.pathname.includes("custom")) return "custom"
    if (location.pathname.includes("recurring")) return "recurring"
    return "monthly"
  }

  return (
    <div>
      <h5 className="fw-bold mb-3 text-dark">Invoices</h5>

      <div className="card shadow-sm border-0">
        <div className="card-body pb-0">
          <div className="d-flex justify-content-between align-items-center flex-wrap gap-2 border-bottom pb-2">
            <div className="d-none d-md-flex gap-4 small fw-semibold">
              <NavLink to="/finance/invoices/monthly"
                className={({ isActive }) =>
                  `pb-2 text-decoration-none ${isActive ? "text-primary border-bottom border-primary border-2" : "text-muted"}`
                }>
                Monthly
              </NavLink>
              <NavLink to="/finance/invoices/yearly"
                className={({ isActive }) =>
                  `pb-2 text-decoration-none ${isActive ? "text-primary border-bottom border-primary border-2" : "text-muted"}`
                }>
                Yearly
              </NavLink>
              <NavLink to="/finance/invoices/custom"
                className={({ isActive }) =>
                  `pb-2 text-decoration-none ${isActive ? "text-primary border-bottom border-primary border-2" : "text-muted"}`
                }>
                Custom
              </NavLink>
              <NavLink to="/finance/invoices/recurring"
                className={({ isActive }) =>
                  `pb-2 text-decoration-none ${isActive ? "text-primary border-bottom border-primary border-2" : "text-muted"}`
                }>
                Recurring
              </NavLink>
            </div>

            <select
              className="form-select form-select-sm d-md-none"
              value={activeTab()}
              onChange={(e) => navigate(`/finance/invoices/${e.target.value}`)}
              style={{ width: 180 }}
            >
              <option value="monthly">Monthly</option>
              <option value="yearly">Yearly</option>
              <option value="custom">Custom</option>
              <option value="recurring">Recurring</option>
            </select>

            <div className="d-flex gap-2">
              <button className="btn btn-outline-primary btn-sm px-3" onClick={() => setOpenPayment(true)}>
                <i className="bi bi-wallet2 me-1"></i> Add Payment
              </button>
              <button className="btn btn-primary btn-sm px-3" onClick={() => setOpenInvoice(true)}>
                <i className="bi bi-plus-lg me-1"></i> Add Invoice
              </button>
            </div>
          </div>

          <div className="d-flex justify-content-between align-items-center mt-3 flex-wrap gap-2">
            <div className="d-flex align-items-center gap-2">
              <select className="form-select form-select-sm" style={{ width: 80 }} value={limit} disabled>
                <option value="100">100</option>
              </select>
            </div>

            <div className="d-flex align-items-center flex-wrap gap-2 justify-content-end">
              <div className="input-group input-group-sm" style={{ width: 250 }}>
                <span className="input-group-text bg-white border-end-0">
                  <i className="bi bi-search text-muted"></i>
                </span>
                <input
                  className="form-control border-start-0 ps-0"
                  placeholder="Search and press enter..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
              </div>
            </div>
          </div>
        </div>

        <div className="px-3 pb-3">
          <div className="table-responsive border rounded mt-3 shadow-sm">
            <table className="table table-hover align-middle mb-0">
              <thead className="bg-light">
                <tr>
                  <th className="py-3">Invoice Number</th>
                  <th className="py-3">Client</th>
                  <th className="py-3">Company</th>
                  <th className="py-3">Issue Date</th>
                  <th className="py-3">Due Date</th>
                  <th className="py-3">Subtotal</th>
                  <th className="py-3">Tax</th>
                  <th className="py-3">Total</th>
                  <th className="py-3 text-center">Actions</th>
                </tr>
              </thead>
              <tbody className="border-top-0">
                <Outlet context={{ page, limit, search, setPagination, setIsLoading, refreshKey }} />
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

      <AddInvoiceModal
        open={openInvoice}
        onClose={() => setOpenInvoice(false)}
        onSuccess={() => setRefreshKey(prev => prev + 1)}
      />
      <AddPaymentModal
        open={openPayment}
        onClose={() => setOpenPayment(false)}
      />
    </div>
  )
}