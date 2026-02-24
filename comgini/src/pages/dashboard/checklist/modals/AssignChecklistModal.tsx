type Props = {
  show: boolean
  onClose: () => void
}

export default function AssignChecklistModal({ show, onClose }: Props) {
  if (!show) return null

  return (
    <div
      className="position-fixed top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center"
      style={{ background: "rgba(0,0,0,0.35)", zIndex: 1050 }}
    >
      <div className="bg-white p-4" style={{ width: "520px", borderRadius: "12px" }}>

        {/* ⭐ HEADER */}
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h6 className="fw-semibold m-0">Particulars of Assignment</h6>

          <button className="btn btn-sm" onClick={onClose}>
            <i className="bi bi-x-lg"></i>
          </button>
        </div>

        {/* ⭐ FORM */}
        <div className="row g-3">

          <div className="col-md-6">
            <label className="form-label">Maker</label>
            <select className="form-select form-select-sm">
              <option>Select</option>
            </select>
          </div>

          <div className="col-md-6">
            <label className="form-label">Checker</label>
            <select className="form-select form-select-sm">
              <option>Select Checker</option>
            </select>
          </div>

          <div className="col-md-6">
            <label className="form-label">Name of Company</label>
            <select className="form-select form-select-sm">
              <option>Select Company</option>
            </select>
          </div>

          <div className="col-md-6">
            <label className="form-label">Checklist</label>
            <select className="form-select form-select-sm">
              <option>Select Checklist</option>
            </select>
          </div>

          <div className="col-md-6">
            <label className="form-label">Due Date, if any</label>
            <input className="form-control form-control-sm" placeholder="dd/mm/yy" />
          </div>

        </div>

        {/* ⭐ FOOTER */}
        <div className="d-flex justify-content-end mt-4">
          <button
            className="btn btn-sm text-white"
            style={{ background: "#2E388E" }}
          >
            Assign
          </button>
        </div>

      </div>
    </div>
  )
}