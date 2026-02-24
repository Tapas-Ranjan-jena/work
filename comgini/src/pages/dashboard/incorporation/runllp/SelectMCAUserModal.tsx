type Props = {
  show: boolean
  onClose: () => void
}

export default function SelectMCAUserModal({ show, onClose }: Props) {
  if (!show) return null

  return (
    <div className="modal fade show d-block" style={{ background: "rgba(0,0,0,0.5)" }}>
      <div className="modal-dialog">
        <div className="modal-content">

          <div className="modal-header">
            <h6 className="modal-title">Select MCA User ID</h6>
            <button className="btn-close" onClick={onClose}></button>
          </div>

          <div className="modal-body">
            <select className="form-select">
              <option>Select MCA User</option>
            </select>
          </div>

          <div className="modal-footer">
            <button
              onClick={onClose}
              className="btn text-white"
              style={{ background: "#2E388E" }}
            >
              Cancel
            </button>
          </div>

        </div>
      </div>
    </div>
  )
}