import { useState, useEffect, useCallback, useMemo } from "react"
import { NavLink, useNavigate, useLocation } from "react-router-dom"
import AddRegistrationModal from "./AddRegistrationModal"
import registrationService from "../../../../services/registrationService"
import type { Registration } from "../../../../services/registrationService"

export default function RegistrationList() {
  const [open, setOpen] = useState(false)
  const [registrations, setRegistrations] = useState<Registration[]>([])
  const [loading, setLoading] = useState(false)
  const [search, setSearch] = useState('')
  const [page, setPage] = useState(1)
  const itemsPerPage = 10

  const navigate = useNavigate()
  const location = useLocation()

  const currentPath = location.pathname

  const fetchRegistrations = useCallback(async () => {
    setLoading(true)
    try {
      // Fetch a larger chunk of data to handle client-side filtering/pagination
      const response = await registrationService.getRegistrations(1, 1000, '')
      setRegistrations(response.data || [])
    } catch (error) {
      console.error("Failed to fetch registrations", error)
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchRegistrations()
  }, [fetchRegistrations])

  // Client-side filtering
  const filteredItems = useMemo(() => {
    if (!search) return registrations
    const lowerSearch = search.toLowerCase()
    return registrations.filter(reg =>
      reg.company_name?.toLowerCase().includes(lowerSearch) ||
      reg.document_type?.toLowerCase().includes(lowerSearch) ||
      reg.document_number?.toLowerCase().includes(lowerSearch) ||
      reg.issuing_authority?.toLowerCase().includes(lowerSearch)
    )
  }, [registrations, search])

  // Client-side pagination
  const paginatedItems = useMemo(() => {
    const startIndex = (page - 1) * itemsPerPage
    return filteredItems.slice(startIndex, startIndex + itemsPerPage)
  }, [filteredItems, page])

  const totalPages = Math.ceil(filteredItems.length / itemsPerPage)

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value)
    setPage(1) // Reset to first page on search
  }

  return (
    <div>
      <h5 className="fw-bold mb-3">Business Manager</h5>

      <div className="card shadow-sm border-0">
        <div className="card-body pb-0">
          <div className="d-flex justify-content-between align-items-center border-bottom pb-2 flex-wrap gap-2">
            <div className="d-none d-md-flex gap-4 small fw-semibold">
              <NavLink
                to="/business-manager/registration"
                className={({ isActive }) =>
                  `pb-2 text-decoration-none ${isActive
                    ? "text-primary border-bottom border-primary"
                    : "text-muted"
                  }`
                }
              >
                Registration/Licence
              </NavLink>

              <NavLink
                to="/business-manager/insurance"
                className={({ isActive }) =>
                  `pb-2 text-decoration-none ${isActive
                    ? "text-primary border-bottom border-primary"
                    : "text-muted"
                  }`
                }
              >
                Insurance
              </NavLink>

              <NavLink
                to="/business-manager/agreement"
                className={({ isActive }) =>
                  `pb-2 text-decoration-none ${isActive
                    ? "text-primary border-bottom border-primary"
                    : "text-muted"
                  }`
                }
              >
                Contract/Agreement
              </NavLink>
            </div>

            <div className="d-md-none w-100">
              <select
                className="form-select form-select-sm"
                value={currentPath}
                onChange={(e) => navigate(e.target.value)}
              >
                <option value="/business-manager/registration">Registration/Licence</option>
                <option value="/business-manager/insurance">Insurance</option>
                <option value="/business-manager/agreement">Contract/Agreement</option>
              </select>
            </div>

            <button
              className="btn btn-primary btn-sm px-3 shadow-sm"
              onClick={() => setOpen(true)}
            >
              <i className="bi bi-plus-circle me-1"></i>
              Add Registration
            </button>
          </div>

          <div className="d-flex justify-content-between align-items-center mt-3 flex-wrap gap-2">
            <div className="d-flex align-items-center gap-2">
              <select className="form-select form-select-sm" style={{ width: 80 }} value={itemsPerPage} disabled>
                <option value="10">{itemsPerPage}</option>
              </select>

              <button className="btn btn-light btn-sm border">
                <i className="bi bi-eye-slash"></i>
              </button>
            </div>

            <div className="input-group input-group-sm" style={{ width: 240 }}>
              <span className="input-group-text bg-white">
                <i className="bi bi-search text-muted"></i>
              </span>
              <input
                className="form-control"
                placeholder="Search..."
                value={search}
                onChange={handleSearchChange}
              />
            </div>
          </div>
        </div>

        <div className="px-3 pb-3">
          <div className="table-responsive border rounded mt-3">
            <table className="table table-sm table-bordered table-hover align-middle mb-0">
              <thead className="bg-light text-secondary">
                <tr>
                  <th className="fw-semibold">Company Name</th>
                  <th className="fw-semibold">Category</th>
                  <th className="fw-semibold">Reg. Name</th>
                  <th className="fw-semibold">Reg. Number</th>
                  <th className="fw-semibold">Status</th>
                  <th className="fw-semibold text-center">Applied Date</th>
                  <th className="fw-semibold text-center">Expires On</th>
                  <th className="fw-semibold text-center">Files</th>
                  <th style={{ width: 40 }} className="text-center">
                    <i className="bi bi-list"></i>
                  </th>
                </tr>
              </thead>

              <tbody>
                {loading ? (
                  <tr>
                    <td colSpan={9} className="text-center py-4">
                      <div className="spinner-border spinner-border-sm text-primary me-2" role="status"></div>
                      <span className="text-muted">Loading registrations...</span>
                    </td>
                  </tr>
                ) : paginatedItems.length > 0 ? (
                  paginatedItems.map((reg) => (
                    <tr key={reg.id}>
                      <td>{reg.company_name || 'N/A'}</td>
                      <td>{reg.document_type || 'N/A'}</td>
                      <td>{reg.issuing_authority || 'N/A'}</td>
                      <td>{reg.document_number || 'N/A'}</td>
                      <td>
                        <span className={`badge rounded-pill ${reg.status === 'active' ? 'bg-success-subtle text-success border border-success' : 'bg-warning-subtle text-warning border border-warning'}`}>
                          {reg.status || 'unknown'}
                        </span>
                      </td>
                      <td className="text-center small">{reg.issue_date || 'N/A'}</td>
                      <td className="text-center small">{reg.expiry_date || 'N/A'}</td>
                      <td className="text-center">
                        <button className="btn btn-link btn-sm p-0">
                          <i className="bi bi-file-earmark-pdf text-danger"></i>
                        </button>
                      </td>
                      <td className="text-center">
                        <div className="dropdown">
                          <button className="btn btn-link btn-sm text-dark p-0" data-bs-toggle="dropdown">
                            <i className="bi bi-three-dots-vertical"></i>
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={9} className="text-center text-muted py-5">
                      <i className="bi bi-info-circle me-1"></i>
                      No records found{search ? ` for "${search}"` : ''}.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          <div className="d-flex justify-content-between align-items-center mt-3 small text-muted">
            <span>
              Showing {paginatedItems.length > 0 ? (page - 1) * itemsPerPage + 1 : 0} to{" "}
              {Math.min(page * itemsPerPage, filteredItems.length)} of {filteredItems.length} records
            </span>

            <div className="btn-group btn-group-sm shadow-sm">
              <button
                className="btn btn-white border px-3"
                disabled={page === 1}
                onClick={() => setPage(p => p - 1)}
              >
                <i className="bi bi-chevron-left"></i>
              </button>
              <button
                className="btn btn-white border px-3"
                disabled={page >= totalPages}
                onClick={() => setPage(p => p + 1)}
              >
                <i className="bi bi-chevron-right"></i>
              </button>
            </div>
          </div>
        </div>
      </div>

      <AddRegistrationModal
        open={open}
        onClose={() => setOpen(false)}
        onSuccess={() => {
          fetchRegistrations();
          setOpen(false);
        }}
      />
    </div>
  )
}
