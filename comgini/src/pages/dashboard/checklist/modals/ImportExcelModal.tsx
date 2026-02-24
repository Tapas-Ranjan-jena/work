type Props = {
  show: boolean
  onClose: () => void
}

export default function ImportExcelModal({ show, onClose }: Props) {
  if (!show) return null

  return (
    <div
      className="position-fixed top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center"
      style={{ background: "rgba(0,0,0,0.35)", zIndex: 1050 }}
    >
      <div className="bg-white p-3" style={{ width: "420px", borderRadius: "10px" }}>

        {/* ⭐ HEADER */}
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h6 className="fw-semibold m-0">Upload the Excel File to import data</h6>

          <button className="btn btn-sm" onClick={onClose}>
            <i className="bi bi-x-lg"></i>
          </button>
        </div>

        {/* ⭐ FILE INPUT */}
        <input type="file" className="form-control form-control-sm mb-3" />

        <small className="text-danger">
          *Importing this Excel file will replace existing entries. Please review carefully before proceeding.
        </small>

        {/* ⭐ FOOTER */}
        <div className="d-flex justify-content-end mt-3">
          <button onClick={onClose} className="btn btn-sm btn-light border">
            Cancel
          </button>
        </div>

      </div>
    </div>
  )
}