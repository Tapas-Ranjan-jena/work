type Props = {
  show: boolean
  onClose: () => void
}

export default function AddCompanyModal({ show, onClose }: Props) {

  if (!show) return null

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        background: "rgba(0,0,0,0.35)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 9999
      }}
    >
      <div
        className="card p-4"
        style={{
          width: "900px",
          borderRadius: "10px"
        }}
      >

        {/* ================= HEADER ================= */}
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h6 className="m-0">Add Company/LLP Manually</h6>

          <button
            onClick={onClose}
            className="btn btn-sm"
          >
            ✕
          </button>
        </div>

        {/* ================= FORM GRID ================= */}
        <div className="row g-3">

          {/* TYPE */}
          <div className="col-md-4">
            <label className="form-label small mb-1">Type</label>
            <input className="form-control" placeholder="Select Type" />
          </div>

          {/* CIN/LLPIN */}
          <div className="col-md-4">
            <label className="form-label small mb-1">CIN/LLPIN</label>
            <input className="form-control" placeholder="CIN/LLPIN" />
          </div>

          {/* START TIME */}
          <div className="col-md-4">
            <label className="form-label small mb-1">Start time</label>
            <input className="form-control" placeholder="Start time" />
          </div>

          {/* COMPANY CLASS */}
          <div className="col-md-4">
            <label className="form-label small mb-1">Company Class</label>
            <input className="form-control" placeholder="Select Class" />
          </div>

          {/* COMPANY CATEGORY */}
          <div className="col-md-4">
            <label className="form-label small mb-1">Company Category</label>
            <input className="form-control" placeholder="Select Categories" />
          </div>

          {/* DATE OF INCORPORATION */}
          <div className="col-md-4">
            <label className="form-label small mb-1">Date of Incorporation</label>
            <input className="form-control" placeholder="d/m/y" />
          </div>

          {/* EMAIL */}
          <div className="col-md-6">
            <label className="form-label small mb-1">Email</label>
            <input className="form-control" placeholder="Email" />
          </div>

          {/* ADDRESS */}
          <div className="col-md-6">
            <label className="form-label small mb-1">Address</label>
            <input className="form-control" placeholder="Address Line" />
          </div>

        </div>

        {/* ================= FOOTER ================= */}
        <div className="d-flex justify-content-end mt-4">
          <button
            className="btn btn-sm"
            style={{ background:"#2E388E",color:"white" }}
          >
            Submit
          </button>
        </div>

      </div>
    </div>
  )
}
