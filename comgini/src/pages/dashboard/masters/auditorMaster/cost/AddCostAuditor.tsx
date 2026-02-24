import { useNavigate } from "react-router-dom"

export default function AddCostAuditor(){

  const navigate = useNavigate()

  return(
    <>
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h6>Add Auditor Details</h6>

        <button
          onClick={()=>navigate(-1)}
          className="btn btn-sm"
          style={{background:"#2E388E",color:"#fff"}}
        >
          <i className="bi bi-arrow-left me-1"></i>
          Back
        </button>
      </div>

      <div className="row g-3">

        <div className="col-md-12">
          <select className="form-select">
            <option>Select Category</option>
          </select>
        </div>

        <div className="col-md-4">
          <input className="form-control" placeholder="Firm Registration Number (FRN)"/>
        </div>

        <div className="col-md-4">
          <input className="form-control" placeholder="Name of Firm"/>
        </div>

        <div className="col-md-4">
          <input className="form-control" placeholder="PAN"/>
        </div>

        <div className="col-md-6">
          <input className="form-control" placeholder="Firm Email ID"/>
        </div>

        <div className="col-md-6">
          <input className="form-control" placeholder="Address"/>
        </div>

        <div className="col-md-4">
          <select className="form-select">
            <option>Select Country</option>
          </select>
        </div>

        <div className="col-md-4">
          <select className="form-select">
            <option>Select State</option>
          </select>
        </div>

        <div className="col-md-4">
          <select className="form-select">
            <option>Select City</option>
          </select>
        </div>

        <div className="col-md-6">
          <input className="form-control" placeholder="Membership Number"/>
        </div>

        <div className="col-md-6">
          <input className="form-control" placeholder="Name of Auditor"/>
        </div>

        <div className="col-md-4">
          <input className="form-control" placeholder="Mobile Number"/>
        </div>

        <div className="col-md-4">
          <input className="form-control" placeholder="Email"/>
        </div>

        <div className="col-md-4">
          <input className="form-control" placeholder="Designation"/>
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
    </>
  )
}