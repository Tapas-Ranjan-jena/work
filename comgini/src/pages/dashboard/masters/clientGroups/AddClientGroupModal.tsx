type Props={
  onClose:()=>void
}

export default function AddClientGroupModal({onClose}:Props){

  return(
    <div
      className="position-fixed top-0 start-0 w-100 h-100 d-flex justify-content-center align-items-center"
      style={{
        background:"rgba(0,0,0,0.2)",
        zIndex:9999
      }}
    >

      <div
        className="bg-white rounded shadow"
        style={{
          width:"600px",
          maxWidth:"95%"
        }}
      >

        {/* HEADER */}
        <div className="d-flex justify-content-between align-items-center border-bottom p-3">
          <h6 className="m-0">Add Client group</h6>
          <i
            className="bi bi-x-lg"
            style={{cursor:"pointer"}}
            onClick={onClose}
          />
        </div>

        {/* BODY */}
        <div className="p-3">

          <div className="row g-3">

            <div className="col-12">
              <label>Title</label>
              <input className="form-control" placeholder="Title"/>
            </div>

            <div className="col-12">
              <label>Contact Name</label>
              <input className="form-control" placeholder="Contact Name"/>
            </div>

            <div className="col-12">
              <label>Contact No</label>
              <input className="form-control" placeholder="Contact No"/>
            </div>

            <div className="col-12">
              <label>Email ID</label>
              <input className="form-control" placeholder="Email ID"/>
            </div>

          </div>

        </div>

        {/* FOOTER */}
        <div className="border-top p-3 d-flex justify-content-end gap-2">
          <button
            className="btn btn-light btn-sm"
            onClick={onClose}
          >
            <i className="bi bi-x-circle me-1"></i>
            Close
          </button>

          <button
            className="btn btn-sm"
            style={{background:"#2E388E",color:"#fff"}}
          >
            <i className="bi bi-check-circle me-1"></i>
            Save
          </button>
        </div>

      </div>
    </div>
  )
}