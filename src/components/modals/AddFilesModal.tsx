type Props = {
  onClose: () => void
}

export default function AddFilesModal({ onClose }: Props) {

  return (
    <div className="modal-overlay">

      <div className="modal-box">

        {/* HEADER */}
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h5 className="fw-bold m-0">Add Files</h5>
          <span style={{cursor:"pointer"}} onClick={onClose}>✕</span>
        </div>

        {/* DROP AREA */}
        <div
          style={{
            border:"2px dashed #d9d9d9",
            borderRadius:8,
            padding:"40px",
            textAlign:"center",
            color:"#666"
          }}
        >
          Drag-and-drop documents here
          <br />
          (or click to browse..)
        </div>

        {/* FOOTER */}
        <div className="d-flex justify-content-end gap-2 mt-4">

          <button
            className="btn btn-outline-secondary btn-sm"
            onClick={onClose}
          >
            Close
          </button>

          <button className="btn btn-gradient btn-sm">
            Save
          </button>

        </div>

      </div>
    </div>
  )
}
