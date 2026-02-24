export default function DeletedForms() {

  return (
    <div>

      <div className="mb-3">
        <h6 className="fw-semibold">Deleted Forms</h6>
      </div>

      <div className="d-flex justify-content-between mb-2">
        <button className="btn btn-sm btn-light border">Show 10 rows</button>

        <div className="position-relative">
          <input className="form-control form-control-sm ps-4" placeholder="Search" />
          <i className="bi bi-search position-absolute top-50 start-0 translate-middle-y ms-2"></i>
        </div>
      </div>

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
            <td colSpan={5} className="text-center">No data available in table</td>
          </tr>
        </tbody>
      </table>

    </div>
  )
}