import { useNavigate } from "react-router-dom"

export default function AddRTA(){

  const navigate = useNavigate()

  return(
    <div className="container-fluid">

      <div className="card p-3">

        <small className="text-muted d-block border-bottom pb-2 mb-3">
          <span className="text-primary">Home</span> / Registrar and Transfer agents
        </small>

        <div className="d-flex justify-content-end mb-2">
          <button
            onClick={()=>navigate("/masters/rta-master")}
            className="btn btn-sm"
            style={{background:"#2E388E",color:"#fff"}}
          >
            <i className="bi bi-arrow-left me-1"></i>
            Back
          </button>
        </div>

        <h6 className="mb-3">Add RTA Details</h6>

        <div className="row g-3">

          <div className="col-lg-6">
            <label>Name of RTA</label>
            <input className="form-control" placeholder="Name of RTA"/>
          </div>

          <div className="col-lg-6">
            <label>CIN</label>
            <input className="form-control" placeholder="CIN"/>
          </div>

          <div className="col-12">
            <label>Address</label>
            <input className="form-control" placeholder="Address"/>
          </div>

          <div className="col-lg-6">
            <label>Contact Person Name</label>
            <input className="form-control"/>
          </div>

          <div className="col-lg-6">
            <label>Email</label>
            <input className="form-control"/>
          </div>

          <div className="col-lg-6">
            <label>Contact Number</label>
            <input className="form-control"/>
          </div>

          <div className="col-lg-6">
            <label>Website</label>
            <input className="form-control"/>
          </div>

          <div className="col-12">
            <button
              className="btn btn-sm"
              style={{background:"#2E388E",color:"#fff"}}
            >
              Submit
            </button>
          </div>

        </div>

      </div>
    </div>
  )
}