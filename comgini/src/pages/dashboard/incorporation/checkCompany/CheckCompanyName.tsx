import { useNavigate } from "react-router-dom"

export default function CheckCompanyName() {

  const navigate = useNavigate()

  return (
    <div className="card border-0 p-3">

      {/* ⭐ TOP ROW (BACK + DASHBOARD STYLE) */}
      <div className="d-flex justify-content-end mb-3">

        <button
          onClick={() => navigate("/incorporation/run-llp")}
          className="btn btn-sm d-flex align-items-center gap-2 text-white"
          style={{ background:"#2E388E" }}
        >
          {/* ⭐ CIRCLE ARROW */}
          <span
            className="d-flex align-items-center justify-content-center"
            style={{
              width:"20px",
              height:"20px",
              borderRadius:"50%",
              background:"rgba(255,255,255,0.2)"
            }}
          >
            <i className="bi bi-arrow-left"></i>
          </span>

          Back
        </button>

      </div>

      {/* ⭐ TITLE ROW */}
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h6 className="fw-semibold m-0">Check Company/LLP Name</h6>

        <small className="text-danger">
          50 free credits available /50 used.
        </small>
      </div>

      {/* ⭐ SEARCH INPUT */}
      <div className="position-relative">
        <input
          className="form-control form-control-sm pe-5"
          placeholder="Enter Company Name/LLP"
        />

        <i className="bi bi-search position-absolute top-50 end-0 translate-middle-y me-3"></i>
      </div>

    </div>
  )
}