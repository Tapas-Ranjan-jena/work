export default function SpiceDeletedForms() {
  return (
    <div>

      <h6 className="fw-semibold mb-3">Deleted Forms</h6>

      <div className="d-flex justify-content-between align-items-center mb-2">
        <button className="btn btn-sm btn-light border">Show 10 rows</button>

        <div className="position-relative" style={{maxWidth:"220px"}}>
          <input className="form-control form-control-sm ps-4" placeholder="Search"/>
          <i className="bi bi-search position-absolute top-50 start-0 translate-middle-y ms-2"></i>
        </div>
      </div>

      <div className="table-responsive">
        <table className="table table-bordered">
          <thead>
            <tr>
              <th>Sr. No.</th>
              <th>Company/LLP Name</th>
              <th>SRN of Form</th>
              <th>Last Updated on</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            <tr>
              <td colSpan={5} className="text-center">
                No data available in table
              </td>
            </tr>
          </tbody>
        </table>

        <div className="d-flex justify-content-between mt-2">
          <small>Showing 0 to 0 of 0 entries</small>
          <div>
            <button className="btn btn-sm btn-light border me-2">Previous</button>
            <button className="btn btn-sm btn-light border">Next</button>
          </div>
        </div>
      </div>

    </div>
  )
}