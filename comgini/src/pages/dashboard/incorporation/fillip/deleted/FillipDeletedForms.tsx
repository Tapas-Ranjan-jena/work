import { NavLink } from "react-router-dom"

export default function FillipDeletedForms() {
  return (
    <div className="card border-0 p-3">

      {/* ⭐ BREADCRUMB */}
      <div className="mb-2">
        <small>
          <NavLink to="/dashboard" className="text-decoration-none">
            Home
          </NavLink>
          {" / "}
          <NavLink to="/incorporation/fillip" className="text-decoration-none">
            Fillip Forms
          </NavLink>
          {" / "}Deleted Forms
        </small>
      </div>

      {/* ⭐ TITLE */}
      <h6 className="fw-semibold mb-3">Deleted Forms</h6>

      {/* ⭐ TOP CONTROLS */}
      <div className="d-flex flex-wrap justify-content-between align-items-center mb-2 gap-2">

        {/* Show Rows */}
        <button className="btn btn-sm btn-light border">
          Show 10 rows
        </button>

        {/* SEARCH */}
        <div
          className="position-relative"
          style={{ maxWidth: "240px", width: "100%" }}
        >
          <input
            className="form-control form-control-sm ps-4"
            placeholder="Search"
          />
          <i className="bi bi-search position-absolute top-50 start-0 translate-middle-y ms-2"></i>
        </div>
      </div>

      {/* ⭐ TABLE */}
      <div className="table-responsive">
        <table className="table table-bordered align-middle mb-0">
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
      </div>

      {/* ⭐ FOOTER */}
      <div className="d-flex flex-wrap justify-content-between align-items-center mt-2 gap-2">
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
  )
}