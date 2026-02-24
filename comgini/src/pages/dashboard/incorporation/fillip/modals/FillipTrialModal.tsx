type Props = {
  show: boolean
  onClose: () => void
}

export default function FillipTrialModal({ show, onClose }: Props) {

  if (!show) return null

  return (
    <div
      className="position-fixed top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center"
      style={{ background: "rgba(0,0,0,0.35)", zIndex: 1050 }}
    >
      <div
        className="bg-white"
        style={{
          width: "520px",
          borderRadius: "12px",
          overflow: "hidden"
        }}
      >
        {/* HEADER */}
        <div className="d-flex justify-content-between align-items-center p-3 border-bottom">
          <h6 className="m-0 fw-semibold">Select MCA User ID</h6>

          <button className="btn btn-sm" onClick={onClose}>
            <i className="bi bi-x-lg"></i>
          </button>
        </div>

        {/* BODY */}
        <div className="p-3">
          <select className="form-select">
            <option>Select MCA User</option>
          </select>
        </div>

        {/* FOOTER */}
        <div className="p-3 d-flex justify-content-end">
          <button
            onClick={onClose}
            className="btn btn-sm text-white"
            style={{ background: "#2E388E" }}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  )
}