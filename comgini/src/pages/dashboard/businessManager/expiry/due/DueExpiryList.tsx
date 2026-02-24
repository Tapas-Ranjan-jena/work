export default function DueExpiryList() {
  return (
    <div className="table-responsive border rounded mt-3">
      <table className="table table-sm table-bordered align-middle mb-0">

        <thead style={{ background: "#f4f5f7" }}>
          <tr>
            <th>Company Name</th>
            <th>Particulars</th>
            <th>Expiry date</th>
            <th style={{ width: 40 }}>
              <i className="bi bi-list"></i>
            </th>
          </tr>
        </thead>

        <tbody>
          <tr>
            <td colSpan={4} className="text-center text-muted py-4">
              No record found.
            </td>
          </tr>
        </tbody>

      </table>

      <div className="d-flex justify-content-between align-items-center p-2 small text-muted">
        <span>0-0 / 0</span>

        <div className="btn-group btn-group-sm">
          <button className="btn btn-light border">
            <i className="bi bi-chevron-left"></i>
          </button>
          <button className="btn btn-light border">
            <i className="bi bi-chevron-right"></i>
          </button>
        </div>
      </div>
    </div>
  )
}