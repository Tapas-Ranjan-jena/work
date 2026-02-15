type Props = {
  onClose: () => void
}

export default function AddInvoiceModal({onClose}:Props){

  return(
    <div className="modal-overlay">

      <div className="modal-box">

        {/* HEADER */}
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h5 className="fw-bold m-0">Add Invoice</h5>
          <span style={{cursor:"pointer"}} onClick={onClose}>✕</span>
        </div>

        {/* NOTE TEXT */}
        <p className="small text-danger mb-3">
          Note: <br/>
          1. Please update your invoice setup before generating invoice.<br/>
          2. Please update your company / firm profile before generating invoice.
        </p>

        {/* FORM */}
        <div className="row g-3">

          <div className="col-12">
            <label className="form-label small">First Name</label>
            <input className="form-control"/>
          </div>

          <div className="col-md-6">
            <label className="form-label small">Bill date</label>
            <input className="form-control" placeholder="Bill date"/>
          </div>

          <div className="col-md-6">
            <label className="form-label small">Due date</label>
            <input className="form-control" placeholder="Due date"/>
          </div>

          <div className="col-12">
            <label className="form-label small">Invoice Type</label>
            <input className="form-control"/>
          </div>

          <div className="col-12">
            <label className="form-label small">Client</label>
            <input className="form-control"/>
          </div>

          <div className="col-md-6">
            <label className="form-label small">TAX</label>
            <input className="form-control"/>
          </div>

          <div className="col-md-6">
            <label className="form-label small">Second TAX</label>
            <input className="form-control"/>
          </div>

          <div className="col-12">
            <label className="form-label small">Recurring</label>
            <div>
              <input type="checkbox"/>
            </div>
          </div>

          <div className="col-12">
            <label className="form-label small">Note</label>
            <textarea className="form-control"/>
          </div>

          <div className="col-12">
            <label className="form-label small">Labels</label>
            <input className="form-control"/>
          </div>

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
