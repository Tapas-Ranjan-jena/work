export default function AssignPending() {

  return (
    <div>

      <div className="d-flex justify-content-between mb-2">
        <div className="d-flex gap-2">
          <button className="btn btn-sm btn-light border">Show 10 rows</button>
          <button className="btn btn-sm btn-light border">Excel</button>
        </div>

        <input className="form-control form-control-sm" style={{width:200}} placeholder="Search"/>
      </div>

      <div className="table-responsive">
        <table className="table table-bordered">
          <thead>
            <tr>
              <th>#</th>
              <th>Name of Company</th>
              <th>Assignment</th>
              <th>Maker</th>
              <th>Checker</th>
              <th>Status</th>
              <th>Last Updated</th>
              <th>Due Date</th>
              <th>Action</th>
              <th>Export</th>
            </tr>
          </thead>

          <tbody>
            <tr>
              <td colSpan={10} className="text-center">
                No data available in table
              </td>
            </tr>
          </tbody>
        </table>
      </div>

    </div>
  )
}