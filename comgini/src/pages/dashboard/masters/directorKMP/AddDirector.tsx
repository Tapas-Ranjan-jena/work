import { useNavigate } from "react-router-dom"

export default function AddDirector() {

    const navigate = useNavigate()

    return (
        <div className="container-fluid">

            {/* ⭐ DO NOT ADD PageTopBar HERE (DashboardLayout already has it) */}

            <div className="card p-3">

                {/* ================= BREADCRUMB ================= */}
                <small className="text-muted">
                    Home / Director / Add-Director
                </small>

                {/* ================= CANCEL BUTTON ================= */}
                <div className="d-flex justify-content-end mb-3">
                    <button
                        onClick={() => navigate("/masters/director-kmp")}
                        className="btn btn-sm"
                        style={{ background: "#2E388E", color: "#fff" }}
                    >
                        Cancel
                    </button>
                </div>

                {/* ================= FORM GRID ================= */}
                <div className="row g-3">

                    {/* DIN */}
                    <div className="col-md-6">
                        <label className="form-label">DIN</label>
                        <input className="form-control" />
                    </div>

                    {/* PREFILL FROM MCA */}
                    <div className="col-md-6">
                        <label className="form-label">&nbsp;</label>
                        <button className="btn btn-light w-100">
                            PREFILL FROM MCA →
                        </button>
                    </div>

                    {/* SALUTATION */}
                    <div className="col-md-6">
                        <label className="form-label">Salutation</label>
                        <input className="form-control" placeholder="Salutation" />
                    </div>

                    {/* NAME GROUP */}
                    <div className="col-md-6">
                        <label className="form-label">Name</label>

                        <div className="d-flex gap-2">
                            <input className="form-control" placeholder="First name" />
                            <input className="form-control" placeholder="Middle name" />
                            <input className="form-control" placeholder="Last name" />
                        </div>
                    </div>

                    {/* PRESENT ADDRESS */}
                    <div className="col-12">
                        <label className="form-label">Present Address</label>
                        <input className="form-control" />
                    </div>

                    {/* COUNTRY */}
                    <div className="col-md-6">
                        <label className="form-label">Country</label>
                        <select className="form-select">
                            <option>Select Country</option>
                        </select>
                    </div>

                    {/* STATE */}
                    <div className="col-md-6">
                        <label className="form-label">State</label>
                        <select className="form-select">
                            <option>Select State</option>
                        </select>
                    </div>

                    {/* CITY */}
                    <div className="col-md-6">
                        <label className="form-label">City</label>
                        <select className="form-select">
                            <option>Select City</option>
                        </select>
                    </div>

                    {/* PINCODE */}
                    <div className="col-md-6">
                        <label className="form-label">Pincode</label>
                        <input className="form-control" />
                    </div>

                    {/* FATHER NAME */}
                    <div className="col-md-6">
                        <label className="form-label">Father Name</label>
                        <input className="form-control" />
                    </div>

                    {/* PAN */}
                    <div className="col-md-6">
                        <label className="form-label">PAN</label>
                        <input className="form-control" />
                    </div>

                    {/* AADHAR */}
                    <div className="col-md-6">
                        <label className="form-label">Aadhar Number</label>
                        <input className="form-control" />
                    </div>

                    {/* MOBILE */}
                    <div className="col-md-6">
                        <label className="form-label">Mobile Number</label>
                        <input className="form-control" />
                    </div>

                    {/* EMAIL */}
                    <div className="col-md-6">
                        <label className="form-label">Email ID</label>
                        <input className="form-control" />
                    </div>

                    {/* OCCUPATION */}
                    <div className="col-md-6">
                        <label className="form-label">Occupation</label>
                        <input className="form-control" />
                    </div>

                    {/* DOB */}
                    <div className="col-md-6">
                        <label className="form-label">Date of Birth</label>
                        <input className="form-control" placeholder="dd/mm/yyyy" />
                    </div>

                    {/* GENDER */}
                    <div className="col-md-6">
                        <label className="form-label">Gender</label>
                        <select className="form-select">
                            <option>Select Gender</option>
                        </select>
                    </div>

                    {/* DSC EXPIRY */}
                    <div className="col-md-6">
                        <label className="form-label">DSC Expiry</label>
                        <input className="form-control" placeholder="d/m/y" />
                    </div>

                    {/* NATIONALITY */}
                    <div className="col-md-6">
                        <label className="form-label">Nationality</label>
                        <input className="form-control" />
                    </div>

                    {/* DIN STATUS */}
                    <div className="col-md-6">
                        <label className="form-label">DIN Status</label>
                        <input className="form-control" />
                    </div>

                    {/* RESIDENTIAL STATUS */}
                    <div className="col-md-6">
                        <label className="form-label">Residential Status</label>
                        <select className="form-select">
                            <option>Select Category</option>
                        </select>
                    </div>

                    {/* MARITAL STATUS */}
                    <div className="col-md-6">
                        <label className="form-label">Marital Status</label>
                        <select className="form-select">
                            <option>Select Status</option>
                        </select>
                    </div>

                    {/* QUALIFICATION */}
                    <div className="col-md-6">
                        <label className="form-label">Qualification</label>
                        <input className="form-control" />
                    </div>

                    {/* EXPERIENCE */}
                    <div className="col-md-6">
                        <label className="form-label">Experience</label>
                        <input className="form-control" />
                    </div>

                    {/* PASSPORT */}
                    <div className="col-md-6">
                        <label className="form-label">Passport Number</label>
                        <input className="form-control" />
                    </div>

                    {/* PASSPORT EXPIRY */}
                    <div className="col-md-6">
                        <label className="form-label">Passport Expiry Date</label>
                        <input className="form-control" />
                    </div>

                    {/* PERMANENT ADDRESS */}
                    <div className="col-12">
                        <label className="form-label">Permanent Address</label>
                        <input className="form-control" />
                    </div>

                    {/* OTHER ADDRESS */}
                    <div className="col-12">
                        <label className="form-label">Other Communication Address</label>
                        <input className="form-control" />
                    </div>

                    {/* ================= FILE UPLOADS ================= */}

                    <div className="col-12">
                        <div className="row align-items-center">
                            <div className="col-md-3">
                                <label className="form-label m-0">Select PAN</label>
                            </div>
                            <div className="col-md-9">
                                <input type="file" className="form-control" />
                            </div>
                        </div>
                    </div>

                    <div className="col-12">
                        <div className="row align-items-center">
                            <div className="col-md-3">
                                <label className="form-label m-0">Select Aadhar</label>
                            </div>
                            <div className="col-md-9">
                                <input type="file" className="form-control" />
                            </div>
                        </div>
                    </div>

                    <div className="col-12">
                        <div className="row align-items-center">
                            <div className="col-md-3">
                                <label className="form-label m-0">Select Passport</label>
                            </div>
                            <div className="col-md-9">
                                <input type="file" className="form-control" />
                            </div>
                        </div>
                    </div>

                    <div className="col-12">
                        <div className="row align-items-center">
                            <div className="col-md-3">
                                <label className="form-label m-0">Select voter ID</label>
                            </div>
                            <div className="col-md-9">
                                <input type="file" className="form-control" />
                            </div>
                        </div>
                    </div>

                    <div className="col-12">
                        <div className="row align-items-center">
                            <div className="col-md-3">
                                <label className="form-label m-0">Select Driving Licence</label>
                            </div>
                            <div className="col-md-9">
                                <input type="file" className="form-control" />
                            </div>
                        </div>
                    </div>


                </div>

                {/* ================= FOOTER BUTTONS ================= */}
                <div className="mt-3 d-flex gap-2">
                    <button
                        className="btn btn-sm"
                        style={{ background: "#2E388E", color: "#fff" }}
                    >
                        Update
                    </button>

                    <button
                        onClick={() => navigate("/masters/director-kmp")}
                        className="btn btn-sm btn-light"
                    >
                        Cancel
                    </button>
                </div>

            </div>

        </div>
    )
}
