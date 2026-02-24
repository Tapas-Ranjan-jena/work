import { useNavigate } from "react-router-dom"

export default function AddShareholder(){

  const navigate = useNavigate()

  return(
    <div className="container-fluid">

      <div className="card p-3">

        <small className="text-muted">
          Home / Shareholder / Particulars of Shareholder
        </small>

        {/* ================= HEADER ================= */}
        <div className="d-flex justify-content-between align-items-center mt-2 mb-3">
          <h6 className="m-0">Particulars of Shareholder</h6>

          <button
            onClick={()=>navigate("/masters/shareholder")}
            className="btn btn-sm"
            style={{background:"#2E388E",color:"#fff"}}
          >
            ← Back
          </button>
        </div>

        {/* ================= FORM ================= */}
        <div className="row g-3">

          {/* CATEGORY ROW */}
          <div className="col-md-4">
            <label className="form-label">Category</label>
            <select className="form-select">
              <option>Category</option>
            </select>
          </div>

          <div className="col-md-4">
            <label className="form-label">Sub Category</label>
            <select className="form-select">
              <option>Sub Category</option>
            </select>
          </div>

          <div className="col-md-4">
            <label className="form-label">Under Sub Category</label>
            <select className="form-select">
              <option>Under Sub Category</option>
            </select>
          </div>

          {/* CIN / REGISTRATION */}
          <div className="col-md-4">
            <label className="form-label">CIN/LLPIN</label>
            <input className="form-control" placeholder="CIN/LLPIN"/>
          </div>

          <div className="col-md-4">
            <label className="form-label">Unique Identification No/ Registration No.</label>
            <input className="form-control" placeholder="Unique Identification No/ Registration No."/>
          </div>

          <div className="col-md-4">
            <label className="form-label">Date of incorporation/Reg.</label>
            <input className="form-control" placeholder="d/m/y"/>
          </div>

          {/* BODY CORPORATE */}
          <div className="col-md-8">
            <label className="form-label">Name of Body Corporate</label>
            <input className="form-control" placeholder="Name of Body Corporate"/>
          </div>

          <div className="col-md-4">
            <label className="form-label">PAN</label>
            <input className="form-control" placeholder="PAN"/>
          </div>

          {/* ADDRESS */}
          <div className="col-md-8">
            <label className="form-label">Add Line 1</label>
            <input className="form-control" placeholder="Add Line 1"/>
          </div>

          <div className="col-md-4">
            <label className="form-label">Country</label>
            <select className="form-select">
              <option>Select Country</option>
            </select>
          </div>

          <div className="col-md-4">
            <label className="form-label">State</label>
            <select className="form-select">
              <option>Select State</option>
            </select>
          </div>

          <div className="col-md-4">
            <label className="form-label">City</label>
            <select className="form-select">
              <option>Select City</option>
            </select>
          </div>

          <div className="col-md-4">
            <label className="form-label">Pin Code/ZIP Code</label>
            <input className="form-control" placeholder="Pin Code/ZIP Code"/>
          </div>

          {/* CONTACT */}
          <div className="col-md-6">
            <label className="form-label">Email</label>
            <input className="form-control" placeholder="Email"/>
          </div>

          <div className="col-md-6">
            <label className="form-label">Mobile</label>
            <input className="form-control" placeholder="Mobile"/>
          </div>

          {/* FILE UPLOAD */}
          <div className="col-12">
            <label className="form-label">Select Pan</label>
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