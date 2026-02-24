import { useNavigate } from "react-router-dom"

export default function StandardChecklist() {

  const navigate = useNavigate()

  return (
    <div className="card border-0 p-3">

      <div className="d-flex justify-content-between align-items-center mb-3">
        <h6 className="fw-semibold m-0">Standard Checklist</h6>

        <div className="d-flex gap-2">
          <button
            onClick={() => navigate("/checklist/add")}
            className="btn btn-sm text-white"
            style={{ background:"#2E388E"}}
          >
            <i className="bi bi-plus-circle me-1"></i>
            Add Checklist
          </button>

          <button className="btn btn-sm text-white" style={{ background:"#2E388E"}}>
            <i className="bi bi-trash me-1"></i>
            Trash
          </button>
        </div>
      </div>

      {/* Controls */}
      <div className="d-flex justify-content-between mb-2">
        <div className="d-flex gap-2">
          <button className="btn btn-sm btn-light border">Show 10 rows</button>
          <button className="btn btn-sm btn-light border">Excel</button>
        </div>

        <input className="form-control form-control-sm" style={{width:200}} placeholder="Search"/>
      </div>

      {/* Table */}
      <div className="table-responsive">
        <table className="table table-bordered align-middle">
          <thead>
            <tr>
              <th>#</th>
              <th>Title</th>
              <th>View</th>
              <th>Created / Updated by</th>
              <th>Last Updated On</th>
              <th>Action</th>
              <th>Export</th>
            </tr>
          </thead>

          <tbody>
            <tr>
              <td colSpan={7} className="text-center">No data available</td>
            </tr>
          </tbody>
        </table>
      </div>

      <small className="text-danger">
        Alert: Please Note, these checklists are based on current laws...
      </small>

    </div>
  )
}