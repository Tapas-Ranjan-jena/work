import { useState, useEffect } from "react"
import { NavLink, useNavigate, useLocation } from "react-router-dom"
import AddAgreementModal from "./AddAgreementModal"
import businessManagerService from "../../../../services/businessManagerService"
import type { Contract } from "../../../../services/businessManagerService"

export default function AgreementList() {
  const [open, setOpen] = useState(false)
  const [agreements, setAgreements] = useState<Contract[]>([])
  
  const navigate = useNavigate()
  const location = useLocation()

  const currentPath = location.pathname

  const fetchAgreements = async () => {
    try {
        const data = await businessManagerService.getContracts({ page: 1, limit: 100 });
        setAgreements(data.data || []);
    } catch (e) {
        console.error("Failed to fetch agreements", e);
    }
  }

  useEffect(() => {
    fetchAgreements();
  }, [])

  return (
    <div>

      {/* ================= BIG PAGE TITLE ================= */}
      <h5 className="fw-bold mb-3">
        Business Manager
      </h5>

      {/* ================= CARD START ================= */}
      <div className="card border-0 shadow-sm">

        <div className="card-body pb-0">

          {/* ================= TABS + ADD BUTTON ================= */}
          <div className="d-flex justify-content-between align-items-center border-bottom pb-2 flex-wrap gap-2">

            {/* ⭐ DESKTOP TABS */}
            <div className="d-none d-md-flex gap-4 small fw-semibold">

              <NavLink
                to="/business-manager/registration"
                className={({ isActive }) =>
                  `pb-2 text-decoration-none ${
                    isActive
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
                  `pb-2 text-decoration-none ${
                    isActive
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
                  `pb-2 text-decoration-none ${
                    isActive
                      ? "text-primary border-bottom border-primary"
                      : "text-muted"
                  }`
                }
              >
                Contract/Agreement
              </NavLink>

            </div>

            {/* ⭐ MOBILE DROPDOWN TABS */}
            <div className="d-md-none w-100">
              <select
                className="form-select form-select-sm"
                value={currentPath}
                onChange={(e) => navigate(e.target.value)}
              >
                <option value="/business-manager/registration">
                  Registration/Licence
                </option>
                <option value="/business-manager/insurance">
                  Insurance
                </option>
                <option value="/business-manager/agreement">
                  Contract/Agreement
                </option>
              </select>
            </div>

            {/* ADD BUTTON */}
            <button
              className="btn btn-outline-dark btn-sm"
              onClick={() => setOpen(true)}
            >
              <i className="bi bi-plus-circle me-1"></i>
              Add Agreement
            </button>

          </div>

          {/* ================= CONTROLS ================= */}
          <div className="d-flex justify-content-between align-items-center mt-3 flex-wrap gap-2">

            <div className="d-flex align-items-center gap-2">
              <select className="form-select form-select-sm" style={{ width: 80 }}>
                <option>100</option>
                <option>50</option>
                <option>25</option>
              </select>

              <button className="btn btn-light btn-sm border">
                <i className="bi bi-eye-slash"></i>
              </button>
            </div>

            <div className="input-group input-group-sm" style={{ width: 240 }}>
              <span className="input-group-text bg-white">
                <i className="bi bi-search"></i>
              </span>
              <input className="form-control" placeholder="Search" />
            </div>

          </div>

        </div>

        {/* ================= TABLE ================= */}
        <div className="px-3 pb-3">

          <div className="table-responsive border rounded mt-3">
            <table className="table table-sm table-bordered align-middle mb-0">

              <thead style={{ background: "#f4f5f7" }}>
                <tr>
                  <th>Company Name</th>
                  <th>Category</th>
                  <th>Name of Party</th>
                  <th>Contract Name</th>
                  <th>Contract Value</th>
                  <th>Valid From</th>
                  <th>Expires On</th>
                  <th>Files</th>
                  <th style={{ width: 40 }}>
                    <i className="bi bi-list"></i>
                  </th>
                </tr>
              </thead>

              <tbody>
                {agreements.length === 0 ? (
                    <tr>
                    <td colSpan={9} className="text-center text-muted py-4">
                        No record found.
                    </td>
                    </tr>
                ) : (
                    agreements.map((agr) => (
                    <tr key={agr.id}>
                        <td>{agr.company_name || agr.company_id}</td>
                        <td>{agr.category}</td>
                        <td>{agr.name_of_party}</td>
                        <td>{agr.contract_name}</td>
                        <td>{agr.contract_value}</td>
                        <td>{agr.start_from ? new Date(agr.start_from).toLocaleDateString() : '-'}</td>
                        <td>{agr.expiry_date ? new Date(agr.expiry_date).toLocaleDateString() : '-'}</td>
                        <td>{agr.file_url ? 'Yes' : 'No'}</td>
                        <td>
                            <i className="bi bi-three-dots-vertical"></i>
                        </td>
                    </tr>
                    ))
                )}
              </tbody>

            </table>
          </div>

          {/* ================= FOOTER ================= */}
          <div className="d-flex justify-content-between align-items-center mt-2 small text-muted">
            <span>0-0 / 0</span>

            <div className="btn-group btn-group-sm">
              <button className="btn btn-light border">
                <i className="bi bi-chevron-left"></i>
              </button>
              <button className="btn btn-light border">
                <i className="bi bi-chevron-right"></i>
              </button>
            </div>
          </div>

        </div>

      </div>

      <AddAgreementModal open={open} onClose={() => { setOpen(false); fetchAgreements(); }} />

    </div>
  )
}