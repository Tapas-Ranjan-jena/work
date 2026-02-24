import { useNavigate } from "react-router-dom"

export default function AddSecretarialAuditor(){

  const navigate = useNavigate()

  return(
    <div className="container-fluid">

      {/* ===== HEADER ===== */}
      <div className="d-flex justify-content-between align-items-center mb-3 flex-wrap gap-2">
        <h6 className="m-0">Particulars of Secretarial Auditor</h6>

        <button
          onClick={()=>navigate(-1)}
          className="btn btn-sm"
          style={{background:"#2E388E",color:"#fff"}}
        >
          <i className="bi bi-arrow-left me-1"></i>
          Back
        </button>
      </div>

      {/* ===== FORM ===== */}
      <div className="row g-3">

        {/* CATEGORY */}
        <div className="col-12">
          <label className="form-label small mb-1">Category of Auditor</label>
          <select className="form-select">
            <option>Select Category</option>
          </select>
        </div>

        {/* ================= PARTICULARS OF FIRM ================= */}
        <div className="col-12 mt-2">
          <small className="fw-semibold text-uppercase">Particulars of Firm</small>
        </div>

        <div className="col-md-6">
          <label className="form-label small mb-1">Name of Firm</label>
          <input className="form-control"/>
        </div>

        <div className="col-md-6">
          <label className="form-label small mb-1">Firm Registration Number</label>
          <input className="form-control"/>
        </div>

        {/* ================= PARTICULARS OF AUDITOR ================= */}
        <div className="col-12 mt-2">
          <small className="fw-semibold text-uppercase">Particulars of Auditor</small>
        </div>

        <div className="col-md-6">
          <label className="form-label small mb-1">Name of Auditor</label>
          <input className="form-control"/>
        </div>

        <div className="col-md-6">
          <label className="form-label small mb-1">Designation in the firm</label>
          <input className="form-control"/>
        </div>

        <div className="col-md-6">
          <label className="form-label small mb-1">Membership Number</label>
          <input className="form-control"/>
        </div>

        <div className="col-md-6">
          <label className="form-label small mb-1">Certificate of Practice</label>
          <input className="form-control"/>
        </div>

        <div className="col-md-6">
          <label className="form-label small mb-1">Mobile Number</label>
          <input className="form-control"/>
        </div>

        <div className="col-md-6">
          <label className="form-label small mb-1">Email ID</label>
          <input className="form-control"/>
        </div>

        {/* ADDRESS */}
        <div className="col-12">
          <label className="form-label small mb-1">Address of firm / Auditor</label>
          <select className="form-select">
            <option>Select Address</option>
          </select>
        </div>

        {/* ================= LETTER HEAD ================= */}
        <div className="col-12 mt-2">
          <small className="fw-semibold text-uppercase">Letter Head</small>
        </div>

        <div className="col-12 d-flex align-items-center gap-3 flex-wrap">
          <div className="form-check">
            <input className="form-check-input" type="radio" name="letter"/>
            <label className="form-check-label small">
              Standard Letter Head
            </label>
          </div>

          <div className="form-check">
            <input className="form-check-input" type="radio" name="letter"/>
            <label className="form-check-label small">
              Customize your own letter head
            </label>
          </div>

          <button
            className="btn btn-sm ms-auto"
            style={{background:"#2E388E",color:"#fff"}}
          >
            <i className="bi bi-plus-circle me-1"></i>
            Add Partner
          </button>
        </div>

        {/* SUBMIT */}
        <div className="col-12">
          <button
            className="btn btn-sm"
            style={{background:"#2E388E",color:"#fff"}}
          >
            Submit
          </button>
        </div>

      </div>

    </div>
  )
}