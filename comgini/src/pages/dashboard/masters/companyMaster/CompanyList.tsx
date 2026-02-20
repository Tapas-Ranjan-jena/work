import { useNavigate } from "react-router-dom"

export default function CompanyList() {

  const navigate = useNavigate()

  return (
    <div className="container-fluid">

      <div className="card p-3">

        {/* ================= HEADER ================= */}
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h6 className="m-0">Particulars of Companies</h6>

          <div className="d-flex gap-2">

            {/* Inactive Companies */}
            <button
              onClick={() => navigate("/masters/inactive-companies")}
              className="btn btn-sm d-flex align-items-center gap-2"
              style={{ background:"#2E388E", color:"white" }}
            >
              <i className="bi bi-slash-circle"></i>
              Inactive Companies
            </button>

            {/* Add Company */}
            <button
              onClick={() => navigate("/masters/add-company")}
              className="btn btn-sm d-flex align-items-center gap-2"
              style={{ background:"#2E388E", color:"white" }}
            >
              <i className="bi bi-plus-circle"></i>
              Add Company/LLP
            </button>

          </div>
        </div>

        {/* ================= TOOLBAR ================= */}
        <div className="d-flex justify-content-between mb-2">

          <div className="d-flex gap-2">
            <button className="btn btn-light btn-sm">Show 10 rows</button>
            <button className="btn btn-light btn-sm">Show/Hide</button>
            <button className="btn btn-light btn-sm">Excel</button>
          </div>

          {/* ⭐ SEARCH WITH ICON INSIDE */}
          <div style={{ position:"relative" }}>
            <i
              className="bi bi-search"
              style={{
                position:"absolute",
                left:"10px",
                top:"50%",
                transform:"translateY(-50%)",
                fontSize:"13px",
                color:"#888",
                pointerEvents:"none"
              }}
            />
            <input
              className="form-control form-control-sm"
              placeholder="Search"
              style={{
                width:"180px",
                paddingLeft:"28px"
              }}
            />
          </div>

        </div>

        {/* ================= TABLE ================= */}
        <div style={{ overflowX: "auto" }}>
          <table
            className="table table-bordered mb-0"
            style={{ minWidth:"1400px" }}
          >
            <thead>
              <tr>
                <th>#</th>
                <th>CIN</th>
                <th>Company Name</th>
                <th>Email</th>
                <th>INC Date</th>
                <th>Type of Company</th>
                <th>Category</th>
                <th>Sub Category</th>
                <th>Date of Last Balance Sheets</th>
                <th>Date of Last AGM</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>
              <tr>
                <td>1.</td>
                <td>U62099OD2023PTC044092</td>
                <td>-</td>
                <td>-</td>
                <td>-</td>
                <td>-</td>
                <td>-</td>
                <td>-</td>
                <td>-</td>
                <td>-</td>
                <td>
                  <span style={{ color:"#2E388E", fontSize:"12px" }}>
                    Update from MCA / E-form / Open
                  </span>
                </td>
              </tr>

              <tr>
                <td>2.</td>
                <td>U68200UP2023PTC185810</td>
                <td>U68200UP2023PTC185810</td>
                <td>Ajitbr246@gmail.com</td>
                <td>19/07/2023</td>
                <td>-</td>
                <td>Company limited by shares</td>
                <td>Non-government company</td>
                <td>31/03/2025</td>
                <td>30/09/2025</td>
                <td>
                  <span style={{ color:"#2E388E", fontSize:"12px" }}>
                    Update from MCA / E-form / Open
                  </span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* ================= FOOTER ================= */}
        <div className="d-flex justify-content-between align-items-center mt-2 flex-wrap">

          <small className="text-muted">
            Showing 1 to 2 of 2 entries
          </small>

          <div className="d-flex gap-2">
            <button
              className="btn btn-sm"
              style={{ background:"#2E388E", color:"white" }}
            >
              Inactive
            </button>

            <button
              className="btn btn-sm"
              style={{ background:"#2E388E", color:"white" }}
            >
              Delete
            </button>
          </div>

        </div>

      </div>

    </div>
  )
}
