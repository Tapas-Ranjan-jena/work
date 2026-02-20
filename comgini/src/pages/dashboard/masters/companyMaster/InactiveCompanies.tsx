import { useNavigate } from "react-router-dom"

export default function InactiveCompanies() {

  const navigate = useNavigate()

  return (
    <div className="container-fluid">

      <div className="card p-3">

        {/* ================= HEADER ================= */}
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h6 className="m-0">Inactive Companies</h6>

          <button
            onClick={() => navigate("/masters/company-master")}
            className="btn btn-sm"
            style={{ background:"#2E388E",color:"white" }}
          >
            Active Companies
          </button>
        </div>

        {/* ================= TOP CONTROLS ================= */}
        <div className="d-flex justify-content-between mb-2">

          <div className="d-flex gap-2">
            <button className="btn btn-light btn-sm">Show 10 rows</button>
            <button className="btn btn-light btn-sm">Excel</button>
          </div>

          {/* ⭐ SEARCH WITH ICON */}
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
        <div style={{ overflowX:"auto" }}>
          <table className="table table-bordered">
            <thead>
              <tr>
                <th>#</th>
                <th>CIN</th>
                <th>Company Name</th>
                <th>Incorporation Date</th>
                <th>Deleted By</th>
                <th>Deleted On</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>
              <tr>
                <td colSpan={7} className="text-center">
                  No data available in table
                </td>
              </tr>
            </tbody>
          </table>
        </div>

      </div>

    </div>
  )
}
