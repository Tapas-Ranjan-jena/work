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

          <span
            style={{cursor:"pointer", fontSize:18}}
            onClick={onClose}
          >
            ✕
          </span>
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

          {/* CLOSE BUTTON */}
          <button
            className="btn btn-outline-secondary btn-sm d-flex align-items-center gap-2"
            onClick={onClose}
          >
            <span
              style={{
                width:18,
                height:18,
                borderRadius:"50%",
                border:"1.5px solid #000",
                display:"inline-flex",
                alignItems:"center",
                justifyContent:"center"
              }}
            >
              <svg width="10" height="10" viewBox="0 0 24 24" fill="none">
                <path
                  d="M18 6L6 18M6 6L18 18"
                  stroke="currentColor"
                  strokeWidth="3"
                  strokeLinecap="round"
                />
              </svg>
            </span>
            Close
          </button>

          {/* SAVE BUTTON */}
          <button className="btn btn-gradient btn-sm d-flex align-items-center gap-2">
            <span
              style={{
                width:18,
                height:18,
                borderRadius:"50%",
                background:"#fff",
                display:"inline-flex",
                alignItems:"center",
                justifyContent:"center"
              }}
            >
              <svg width="10" height="10" viewBox="0 0 24 24" fill="none">
                <path
                  d="M20 6L9 17L4 12"
                  stroke="#2b4cb3"
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </span>
            Save
          </button>

        </div>

      </div>
    </div>
  )
}
