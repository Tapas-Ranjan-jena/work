export default function FillipCompleted() {
  return (
    <div>

      {/* ⭐ SEARCH */}
      <div className="d-flex justify-content-end mb-2">
        <div className="position-relative" style={{ maxWidth: "240px", width: "100%" }}>
          <input
            className="form-control form-control-sm ps-4"
            placeholder="Search"
          />
          <i className="bi bi-search position-absolute top-50 start-0 translate-middle-y ms-2"></i>
        </div>
      </div>

      {/* ⭐ TABLE */}
      <div className="table-responsive">
        <table className="table table-bordered align-middle">
          <thead>
            <tr>
              <th>Sr. No.</th>
              <th>LLP Name</th>
              <th>Purpose</th>
              <th>SRN</th>
              <th>MCA User</th>
              <th>Last Submitted</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            <tr>
              <td colSpan={7} className="text-center">
                Completed Forms
              </td>
            </tr>
          </tbody>
        </table>

        {/* ⭐ FOOTER */}
        <div className="d-flex justify-content-between align-items-center mt-2">
          <small>Showing 0 to 0 of 0 entries</small>

          <div>
            <button className="btn btn-sm btn-light border me-2">
              Previous
            </button>
            <button className="btn btn-sm btn-light border">
              Next
            </button>
          </div>
        </div>
      </div>

    </div>
  )
}