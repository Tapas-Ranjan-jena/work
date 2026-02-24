import { useNavigate } from "react-router-dom"

export default function AddStatutoryAuditor() {

  const navigate = useNavigate()

  return (
    <div>

      {/* ===== TITLE ROW ===== */}
      <div className="d-flex justify-content-between align-items-center mb-3">

        <h6 className="m-0">Add Auditor Details</h6>

        <button
          onClick={() => navigate(-1)}
          className="btn btn-sm"
          style={{ background: "#2E388E", color: "#fff" }}
        >
          <i className="bi bi-arrow-left me-1"></i>
          Back
        </button>

      </div>


      {/* ===== CATEGORY ===== */}
      <div className="mb-3">

        <label className="form-label small">
          Category of Auditor
        </label>

        <select className="form-select">
          <option>Select Category</option>
        </select>

      </div>


      {/* ===== PARTICULARS OF FIRM ===== */}
      <div className="mb-2 small fw-semibold text-muted">
        PARTICULARS OF FIRM
      </div>

      <div className="row g-3">

        <div className="col-lg-4 col-md-6">
          <input
            className="form-control"
            placeholder="Firm Registration Number (FRN)"
          />
        </div>

        <div className="col-lg-4 col-md-6">
          <input
            className="form-control"
            placeholder="Name of Firm"
          />
        </div>

        <div className="col-lg-4 col-md-6">
          <input
            className="form-control"
            placeholder="PAN"
          />
        </div>

        <div className="col-lg-6 col-md-6">
          <input
            className="form-control"
            placeholder="Firm Email ID"
          />
        </div>

        <div className="col-lg-6 col-md-6">
          <input
            className="form-control"
            placeholder="Address"
          />
        </div>

        <div className="col-lg-4 col-md-6">
          <select className="form-select">
            <option>Select Country</option>
          </select>
        </div>

        <div className="col-lg-4 col-md-6">
          <select className="form-select">
            <option>Select State</option>
          </select>
        </div>

        <div className="col-lg-4 col-md-6">
          <select className="form-select">
            <option>Select City</option>
          </select>
        </div>

      </div>


      {/* ===== PARTNER'S NUMBER SECTION ===== */}
      <div className="mt-4 mb-2 small fw-semibold text-muted">
        PARTNER'S NUMBER
      </div>

      <div className="row g-3">

        <div className="col-lg-6 col-md-6">
          <input
            className="form-control"
            placeholder="Membership Number"
          />
        </div>

        <div className="col-lg-6 col-md-6">
          <input
            className="form-control"
            placeholder="Name of Auditor"
          />
        </div>

        <div className="col-lg-4 col-md-6">
          <input
            className="form-control"
            placeholder="Mobile Number"
          />
        </div>

        <div className="col-lg-4 col-md-6">
          <input
            className="form-control"
            placeholder="Email"
          />
        </div>

        <div className="col-lg-4 col-md-6">
          <input
            className="form-control"
            placeholder="Designation"
          />
        </div>

      </div>


      {/* ===== SUBMIT ===== */}
      <div className="mt-3">
        <button
          className="btn btn-sm"
          style={{ background: "#2E388E", color: "#fff" }}
        >
          Submit
        </button>
      </div>

    </div>
  )
}