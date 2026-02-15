type Props = {
  onClose: () => void
}

export default function AddNoteModal({ onClose }: Props) {

  return (
    <div className="modal-overlay">

      <div className="modal-box">

        {/* HEADER */}
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h5 className="fw-bold m-0">Add Note</h5>
          <span style={{cursor:"pointer"}} onClick={onClose}>✕</span>
        </div>

        {/* FORM */}
        <div className="row g-3">

          <div className="col-12">
            <input
              className="form-control"
              placeholder="Title"
            />
          </div>

          <div className="col-12">
            <textarea
              className="form-control"
              rows={6}
              placeholder="Description..."
            />
          </div>

          <div className="col-12">
            <input
              className="form-control"
              placeholder="Labels"
            />
          </div>

        </div>

        {/* FOOTER */}
        <div className="d-flex justify-content-between align-items-center mt-4">

          <button className="btn btn-outline-secondary btn-sm">
            Upload file
          </button>

          <div className="d-flex gap-2">
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

    </div>
  )
}
