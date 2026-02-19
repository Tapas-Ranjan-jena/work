import { useState } from "react"
import { useNavigate } from "react-router-dom"
import AddCompanyModal from "../components/AddCompanyModal"

export default function AddCompanyLLP() {

  const [openModal, setOpenModal] = useState(false)
  const navigate = useNavigate()   // ⭐ added

  return (
    <div className="container-fluid">

      {/* ================= BREADCRUMB ================= */}
      <div className="mb-3">
        <small className="text-muted">
          Home / Company/LLP
        </small>
      </div>

      <div className="card p-3">

        {/* ================= HEADER ================= */}
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h6 className="m-0">Add Company/LLP</h6>

          <div className="d-flex gap-2">
            <button
              onClick={() => setOpenModal(true)}
              className="btn btn-sm"
              style={{ background:"#2E388E",color:"white" }}
            >
              <i className="bi bi-plus-circle me-1"></i>
              Add Manually
            </button>

            {/* ⭐ BACK BUTTON NAVIGATION ADDED */}
            <button
              onClick={() => navigate("/masters/company-master")}
              className="btn btn-sm"
              style={{ background:"#2E388E",color:"white" }}
            >
              <i className="bi bi-arrow-left me-1"></i>
              Back
            </button>
          </div>
        </div>

        {/* ================= WARNING ================= */}
        <div className="text-danger small mb-4">
          Important: Adding a company automatically consumes one slot from your plan limit,
          even if no data / form is entered. Kindly add companies carefully.
        </div>

        {/* ================= SEARCH SECTION ================= */}
        <div className="d-flex align-items-center flex-wrap gap-4">

          <button
            className="btn btn-sm"
            style={{ background:"#2E388E",color:"white" }}
          >
            Search CIN/LLPIN
          </button>

          <input
            className="form-control mx-3"
            placeholder="CIN (Corporate Identity Number) / LLPIN"
            style={{ maxWidth:"420px" }}
          />

          <button
            className="btn btn-sm"
            style={{ background:"#2E388E",color:"white" }}
          >
            Submit
          </button>

        </div>

      </div>

      {/* ================= MODAL ================= */}
      <AddCompanyModal
        show={openModal}
        onClose={() => setOpenModal(false)}
      />

    </div>
  )
}
