import { useNavigate } from "react-router-dom"

export default function AddDebentureHolder(){

  const navigate = useNavigate()

  return(
    <div className="container-fluid">

      <div className="card p-3">

        {/* ================= BREADCRUMB ================= */}
        <small className="text-muted d-block border-bottom pb-2 mb-3">
          <span className="text-primary">Home</span>
          {" / "}
          <span className="text-primary">Debenture holder's Master</span>
          {" / "}
          Add Debenture holder
        </small>

        {/* ================= HEADER ================= */}
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h6 className="m-0">Add Debenture holder</h6>

          <button
            onClick={()=>navigate("/masters/debenture-holder")}
            className="btn btn-sm"
            style={{background:"#2E388E",color:"#fff"}}
          >
            <i className="bi bi-arrow-left me-1"></i>
            Back
          </button>
        </div>

        {/* ================= IMPORT FROM ================= */}
        <div className="border rounded p-2 mb-3 small">
          <strong className="me-2">Import from:</strong>

          <label className="me-3">
            <input type="radio" name="import" className="me-1" defaultChecked />
            Director's Master
          </label>

          <label className="me-3">
            <input type="radio" name="import" className="me-1" />
            Shareholder's Master
          </label>

          <label>
            <input type="radio" name="import" className="me-1" />
            Add Fresh Entry
          </label>
        </div>

        {/* ================= FORM ================= */}
        <div className="row g-3">

          {/* FIRST ROW */}
          <div className="col-md-3">
            <label className="form-label">Director</label>
            <select className="form-select">
              <option>Select Director</option>
            </select>
          </div>

          <div className="col-md-3">
            <label className="form-label">Category</label>
            <select className="form-select">
              <option>Category</option>
            </select>
          </div>

          <div className="col-md-3">
            <label className="form-label">Sub Category</label>
            <select className="form-select">
              <option>Non institutions</option>
            </select>
          </div>

          <div className="col-md-3">
            <label className="form-label">Under Sub Category</label>
            <select className="form-select">
              <option>Individual</option>
            </select>
          </div>

          {/* NAME ROW */}
          <div className="col-md-4">
            <label className="form-label">Full Name</label>
            <input className="form-control"/>
          </div>

          <div className="col-md-4">
            <label className="form-label">Father's Name</label>
            <input className="form-control"/>
          </div>

          <div className="col-md-4">
            <label className="form-label">Mother's Name</label>
            <input className="form-control"/>
          </div>

          {/* ADDRESS */}
          <div className="col-md-6">
            <label className="form-label">Add Line 1</label>
            <input className="form-control"/>
          </div>

          <div className="col-md-2">
            <label className="form-label">Country</label>
            <select className="form-select">
              <option>Select Country</option>
            </select>
          </div>

          <div className="col-md-2">
            <label className="form-label">State</label>
            <select className="form-select">
              <option>Select State</option>
            </select>
          </div>

          <div className="col-md-2">
            <label className="form-label">City</label>
            <select className="form-select">
              <option>Select City</option>
            </select>
          </div>

          <div className="col-md-2">
            <label className="form-label">Pin Code / Zip Code</label>
            <input className="form-control"/>
          </div>

          {/* PERSONAL INFO */}
          <div className="col-md-2">
            <label className="form-label">Gender</label>
            <select className="form-select">
              <option>Select Gender</option>
            </select>
          </div>

          <div className="col-md-2">
            <label className="form-label">PAN</label>
            <input className="form-control"/>
          </div>

          <div className="col-md-2">
            <label className="form-label">DOB</label>
            <input className="form-control" placeholder="d/m/y"/>
          </div>

          <div className="col-md-2">
            <label className="form-label">Aadhar</label>
            <input className="form-control"/>
          </div>

          <div className="col-md-2">
            <label className="form-label">Nationality</label>
            <input className="form-control"/>
          </div>

          <div className="col-md-2">
            <label className="form-label">Voter ID</label>
            <input className="form-control"/>
          </div>

          {/* CONTACT */}
          <div className="col-md-2">
            <label className="form-label">Email</label>
            <input className="form-control"/>
          </div>

          <div className="col-md-2">
            <label className="form-label">Mobile</label>
            <input className="form-control"/>
          </div>

          <div className="col-md-2">
            <label className="form-label">Marital Status</label>
            <select className="form-select">
              <option>Marital Status</option>
            </select>
          </div>

          <div className="col-md-2">
            <label className="form-label">Spouse's Name</label>
            <input className="form-control"/>
          </div>

          <div className="col-md-2">
            <label className="form-label">Occupation</label>
            <input className="form-control"/>
          </div>

          <div className="col-md-2">
            <label className="form-label">Name of Guardian</label>
            <input className="form-control"/>
          </div>

          {/* REGISTRATION */}
          <div className="col-md-6">
            <label className="form-label">CIN / Registration No.</label>
            <input className="form-control"/>
          </div>

          <div className="col-md-6">
            <label className="form-label">Date of Incorporation / Reg.</label>
            <input className="form-control" placeholder="d/m/y"/>
          </div>

          {/* FILE UPLOADS */}
          <div className="col-md-6">
            <label className="form-label">Select Pan</label>
            <input type="file" className="form-control"/>
          </div>

          <div className="col-md-6">
            <label className="form-label">Select Aadhar</label>
            <input type="file" className="form-control"/>
          </div>

          {/* SUBMIT */}
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