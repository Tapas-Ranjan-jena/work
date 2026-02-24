export default function AssignCompleted() {
  return (
    <div>

      {/* ⭐ TOP ACTION BAR */}
      <div className="d-flex justify-content-between align-items-center mb-2 flex-wrap gap-2">
        <div className="d-flex gap-2">
          <button className="btn btn-sm btn-light border">Show 10 rows</button>
          <button className="btn btn-sm btn-light border">Excel</button>
        </div>

        <div className="position-relative" style={{ width: "220px" }}>
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
              <th>#</th>
              <th>Name of Company</th>
              <th>Assignment</th>
              <th>Maker</th>
              <th>Checker</th>
              <th>Status</th>
              <th>Last Updated By</th>
              <th>Last Updated On</th>
              <th>Due Date</th>
              <th>Action</th>
              <th>Export</th>
            </tr>
          </thead>

          <tbody>
            <tr>
              <td colSpan={11} className="text-center">
                No data available in table
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* ⭐ FOOTER */}
      <div className="d-flex justify-content-between align-items-center mt-2">
        <small>Showing 0 to 0 of 0 entries</small>

        <div>
          <button className="btn btn-sm btn-light border me-2">Previous</button>
          <button className="btn btn-sm btn-light border">Next</button>
        </div>
      </div>

    </div>
  )
}