import { useNavigate } from "react-router-dom"

export default function CompanyWiseDirectors() {

  const navigate = useNavigate()

  return (
    <div className="container-fluid">

      <div className="card p-3">

        {/* ================= BREADCRUMB ================= */}
        <small className="text-muted">
          Home / Director & KMP / Company wise directors & KMP
        </small>

        {/* ================= HEADER ================= */}
        <div className="d-flex justify-content-between align-items-center mt-2 mb-3">

          <h6 className="m-0">Company wise directors & KMP</h6>

          {/* ⭐ BACK BUTTON */}
          <button
            onClick={() => navigate("/masters/director-kmp")}
            className="btn btn-light btn-sm d-flex align-items-center gap-1"
          >
            <i className="bi bi-arrow-left-circle"></i>
            Back
          </button>

        </div>

        {/* ================= TABLE TOOLBAR ================= */}
        <div className="d-flex justify-content-between align-items-center mb-2">

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
        <div style={{overflowX:"auto"}}>
          <table className="table table-bordered mb-0">

            <thead>
              <tr>
                <th>#</th>
                <th>Company Name</th>
                <th>Director Name</th>
                <th>DIN</th>
                <th>Designation</th>
                <th>Email ID</th>
                <th>Contact No.</th>
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

        {/* ================= FOOTER ================= */}
        <div className="d-flex justify-content-between align-items-center mt-2">

          <small>Showing 0 to 0 of 0 entries</small>

          <div className="d-flex gap-2">
            <button className="btn btn-light btn-sm">Previous</button>
            <button className="btn btn-light btn-sm">Next</button>
          </div>

        </div>

      </div>

    </div>
  )
}
