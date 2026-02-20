export default function InactiveDirectors() {

  return (
    <div className="container-fluid">

      {/* ================= BREADCRUMB ================= */}
      <div className="mb-2">
        <small className="text-muted">
          Home / Director / Inactive Director
        </small>
        <hr className="mt-2 mb-3"/>
      </div>

      <div className="card p-3">

        {/* ================= HEADER ================= */}
        <div className="d-flex justify-content-between align-items-center mb-3">

          <h6 className="m-0">Inactive Directors</h6>

          <button className="btn btn-light btn-sm">
            Active Directors
          </button>

        </div>

        {/* ================= TOOLBAR ================= */}
        <div className="d-flex justify-content-between align-items-center mb-2 flex-wrap gap-2">

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
          <table className="table table-bordered mb-0">
            <thead>
              <tr>
                <th>#</th>
                <th>Director Name</th>
                <th>DIN</th>
                <th>Email ID</th>
                <th>DSC Expiry</th>
                <th>DIN Status</th>
                <th>DIR3-KYC Status</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>
              <tr>
                <td colSpan={8} className="text-center">
                  No data available in table
                </td>
              </tr>
            </tbody>

          </table>
        </div>

        {/* ================= FOOTER ================= */}
        <div className="d-flex justify-content-between align-items-center mt-2">

          <small className="text-muted">
            Showing 0 to 0 of 0 entries
          </small>

          <div className="d-flex gap-2">
            <button className="btn btn-light btn-sm">Previous</button>
            <button className="btn btn-light btn-sm">Next</button>
          </div>

        </div>

      </div>

    </div>
  )
}
