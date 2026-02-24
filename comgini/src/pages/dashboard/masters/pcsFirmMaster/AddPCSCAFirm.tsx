import { useNavigate } from "react-router-dom"

export default function AddPCSCAFirm(){

  const navigate = useNavigate()

  return(
    <div className="container-fluid">

      <div className="card p-3">

        {/* ===== Breadcrumb ===== */}
        <small className="text-muted d-block border-bottom pb-2 mb-3">
          <span className="text-primary">Home</span> / Firm List / Particulars of PCS Firm
        </small>

        {/* Back Button */}
        <div className="d-flex justify-content-end mb-2">
          <button
            onClick={()=>navigate("/masters/pcs-firm-master")}
            className="btn btn-sm"
            style={{background:"#2E388E",color:"#fff"}}
          >
            <i className="bi bi-arrow-left me-1"></i>
            Back
          </button>
        </div>

        <div className="row g-3">

          <div className="col-lg-6">
            <label>Firm Name</label>
            <input className="form-control"/>
          </div>

          <div className="col-lg-6">
            <label>Firm URN</label>
            <input className="form-control"/>
          </div>

          <div className="col-12">
            <label>Address</label>
            <input className="form-control"/>
          </div>

          <div className="col-lg-6">
            <label>Mobile Number</label>
            <input className="form-control"/>
          </div>

          <div className="col-lg-6">
            <label>Email ID</label>
            <input className="form-control"/>
          </div>

          <div className="col-lg-6">
            <label>PAN</label>
            <input className="form-control"/>
          </div>

          <div className="col-lg-6">
            <label>GSTIN</label>
            <input className="form-control"/>
          </div>

          <div className="col-lg-6">
            <label>Bank Name</label>
            <input className="form-control"/>
          </div>

          <div className="col-lg-6">
            <label>Account Number</label>
            <input className="form-control"/>
          </div>

          <div className="col-lg-6">
            <label>Website</label>
            <input className="form-control"/>
          </div>

          <div className="col-lg-6">
            <label>IFS Code</label>
            <input className="form-control"/>
          </div>

          <div className="col-12">
            <label>Website</label>
            <input className="form-control"/>
          </div>

          {/* Letter Head */}
          <div className="col-12">
            <small className="fw-bold">LETTER HEAD</small>
            <div className="border rounded p-2 mt-1">
              <label className="me-3">
                <input type="radio" name="lh" className="me-1"/> Standard Letter Head
              </label>

              <label>
                <input type="radio" name="lh" className="me-1"/> Customize your own letter head
              </label>
            </div>
          </div>

          {/* PCS DETAILS */}
          <div className="col-lg-4">
            <label>Name of PCS / CA</label>
            <input className="form-control"/>
          </div>

          <div className="col-lg-4">
            <label>Designation</label>
            <input className="form-control"/>
          </div>

          <div className="col-lg-4">
            <label>Membership Number</label>
            <input className="form-control"/>
          </div>

          <div className="col-lg-4">
            <label>Certificate of Practice Number</label>
            <input className="form-control"/>
          </div>

          <div className="col-lg-4">
            <label>PAN</label>
            <input className="form-control"/>
          </div>

          <div className="col-lg-4">
            <label>Action</label>
            <input className="form-control"/>
          </div>

          <div className="col-12 d-flex gap-2">
            <button className="btn btn-light btn-sm">
              <i className="bi bi-plus-circle me-1"></i>
              Add More
            </button>

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