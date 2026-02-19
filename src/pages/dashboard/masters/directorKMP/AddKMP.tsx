export default function AddKMP() {

  return (
    <div className="container-fluid">

      <div className="card p-3">

        {/* ===== PATH ===== */}
        <div className="d-flex justify-content-between align-items-center border-bottom pb-2 mb-3">
          <small className="text-muted">
            Home / KMP / Add KMP
          </small>

          <button
            className="btn btn-sm"
            style={{ background: "#2E388E", color: "#fff" }}
          >
            Cancel
          </button>
        </div>

        {/* ================= FORM ================= */}
        <div className="row g-3">

          {/* PAN + Aadhar */}
          <div className="col-md-3">
            <label className="form-label">PAN *</label>
          </div>
          <div className="col-md-3">
            <input className="form-control" placeholder="Enter Here" />
          </div>

          <div className="col-md-3">
            <label className="form-label">Aadhar Number</label>
          </div>
          <div className="col-md-3">
            <input className="form-control" placeholder="Enter Here" />
          </div>

          {/* Membership Number */}
          <div className="col-md-3">
            <label className="form-label">
              Membership Number (in case of company secretary)
            </label>
          </div>
          <div className="col-md-9">
            <input className="form-control" placeholder="Enter Here" />
          </div>

          {/* Salutation + Name */}
          <div className="col-md-3">
            <label className="form-label">Salutation</label>
          </div>
          <div className="col-md-3">
            <input className="form-control" placeholder="Salutation" />
          </div>

          <div className="col-md-6">
            <label className="form-label">Name *</label>
            <div className="d-flex gap-2">
              <input className="form-control" placeholder="First name" />
              <input className="form-control" placeholder="Middle name" />
              <input className="form-control" placeholder="Last name" />
            </div>
          </div>

          {/* Address */}
          <div className="col-md-3">
            <label className="form-label">Address</label>
          </div>
          <div className="col-md-9">
            <input className="form-control" placeholder="Enter Here" />
          </div>

          {/* Country + State */}
          <div className="col-md-3">
            <label className="form-label">Country</label>
          </div>
          <div className="col-md-3">
            <select className="form-select">
              <option>Select Country</option>
            </select>
          </div>

          <div className="col-md-3">
            <label className="form-label">State</label>
          </div>
          <div className="col-md-3">
            <select className="form-select">
              <option>Select State</option>
            </select>
          </div>

          {/* City + Pincode */}
          <div className="col-md-3">
            <label className="form-label">City</label>
          </div>
          <div className="col-md-3">
            <select className="form-select">
              <option>Select City</option>
            </select>
          </div>

          <div className="col-md-3">
            <label className="form-label">Pincode</label>
          </div>
          <div className="col-md-3">
            <input className="form-control" placeholder="Enter Here" />
          </div>

          {/* Father + Email */}
          <div className="col-md-3">
            <label className="form-label">Father Name</label>
          </div>
          <div className="col-md-3">
            <input className="form-control" placeholder="Enter Here" />
          </div>

          <div className="col-md-3">
            <label className="form-label">Email ID *</label>
          </div>
          <div className="col-md-3">
            <input className="form-control" placeholder="Enter Here" />
          </div>

          {/* Mobile + DOB */}
          <div className="col-md-3">
            <label className="form-label">Mobile Number *</label>
          </div>
          <div className="col-md-3">
            <input className="form-control" placeholder="Enter Here" />
          </div>

          <div className="col-md-3">
            <label className="form-label">Date of Birth *</label>
          </div>
          <div className="col-md-3">
            <input className="form-control" placeholder="dd/mm/yyyy" />
          </div>

          {/* Gender + DSC */}
          <div className="col-md-3">
            <label className="form-label">Gender *</label>
          </div>
          <div className="col-md-3">
            <select className="form-select">
              <option>Select Gender</option>
            </select>
          </div>

          <div className="col-md-3">
            <label className="form-label">DSC Expiry</label>
          </div>
          <div className="col-md-3">
            <input className="form-control" placeholder="dd/mm/yyyy" />
          </div>

          {/* Nationality + Permanent Address */}
          <div className="col-md-3">
            <label className="form-label">Nationality *</label>
          </div>
          <div className="col-md-3">
            <input className="form-control" placeholder="Enter Here" />
          </div>

          <div className="col-md-3">
            <label className="form-label">Permanent Address</label>
          </div>
          <div className="col-md-3">
            <input className="form-control" placeholder="Enter Here" />
          </div>

          {/* Passport */}
          <div className="col-md-3">
            <label className="form-label">Passport Number</label>
          </div>
          <div className="col-md-3">
            <input className="form-control" placeholder="Enter Here" />
          </div>

          <div className="col-md-3">
            <label className="form-label">Passport Expiry Date</label>
          </div>
          <div className="col-md-3">
            <input className="form-control" placeholder="dd/mm/yyyy" />
          </div>

          {/* Other Communication Address */}
          <div className="col-md-3">
            <label className="form-label">Other Communication Address</label>
          </div>
          <div className="col-md-9">
            <input className="form-control" />
          </div>

          {/* ===== FILE UPLOADS (LEFT LABEL RIGHT INPUT) ===== */}

          <div className="col-md-3">
            <label>Select Pan</label>
          </div>
          <div className="col-md-9">
            <input type="file" className="form-control" />
          </div>

          <div className="col-md-3">
            <label>Select Aadhar</label>
          </div>
          <div className="col-md-9">
            <input type="file" className="form-control" />
          </div>

          <div className="col-md-3">
            <label>Select Passport</label>
          </div>
          <div className="col-md-9">
            <input type="file" className="form-control" />
          </div>

          <div className="col-md-3">
            <label>Select voter ID</label>
          </div>
          <div className="col-md-9">
            <input type="file" className="form-control" />
          </div>

          <div className="col-md-3">
            <label>Select Driving Licence</label>
          </div>
          <div className="col-md-9">
            <input type="file" className="form-control" />
          </div>

        </div>

        {/* ===== FOOTER BUTTONS ===== */}
        <div className="mt-4 d-flex gap-2">
          <button
            className="btn btn-sm"
            style={{ background: "#2E388E", color: "#fff" }}
          >
            Update
          </button>

          <button className="btn btn-secondary btn-sm">
            Cancel
          </button>
        </div>

      </div>

    </div>
  )
}
