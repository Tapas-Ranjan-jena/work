import { useState } from "react";

type ViewType = "list" | "add";

interface InterestEntry {
  id: number;
  cin: string;
  name: string;
  doa: string;
  designation: string;
  other: string;
}

export default function PrepareDIR2() {
  const [view, setView] = useState<ViewType>("list");
  const [interests, setInterests] = useState<InterestEntry[]>([
    { id: 1, cin: "U62020KA2026PTC214274", name: "Jameendarx Global Private Limited", doa: "06/06/2023", designation: "Director", other: "" }
  ]);

  const addInterest = () => {
    setInterests([...interests, { id: Date.now(), cin: "", name: "", doa: "", designation: "Director", other: "" }]);
  };

  const removeInterest = (id: number) => {
    setInterests(interests.filter(i => i.id !== id));
  };

  return (
    <div className="prepare-dir2 p-4">
      {/* ⭐ BREADCRUMBS */}
      <nav aria-label="breadcrumb" className="mb-4 text-start">
        <ol className="breadcrumb mb-0 small">
          <li className="breadcrumb-item"><a href="#" className="text-decoration-none text-primary" onClick={() => setView("list")}>Home</a></li>
          {view === "list" ? (
             <li className="breadcrumb-item active" aria-current="page">DIR-2</li>
          ) : (
             <>
               <li className="breadcrumb-item"><a href="#" className="text-decoration-none text-primary" onClick={() => setView("list")}>DIR-2</a></li>
               <li className="breadcrumb-item active" aria-current="page">Enter Particulars of DIR-2</li>
             </>
          )}
        </ol>
      </nav>

      {/* ⭐ LIST VIEW */}
      {view === "list" && (
        <div className="card shadow-sm border-0 p-4">
           <div className="d-flex justify-content-between align-items-center mb-4">
              <h5 className="fw-bold mb-0">Particulars of DIR-2</h5>
              <button className="btn btn-primary btn-sm px-3 shadow-none" style={{ background: "#2b4cb3" }} onClick={() => setView("add")}>
                 + Prepare DIR-2
              </button>
           </div>

           <div className="d-flex justify-content-between align-items-center mb-3">
              <div className="small">Show 
                 <select className="mx-2 border border-light shadow-none">
                    <option>10</option>
                 </select> entries
              </div>
              <div className="d-flex align-items-center gap-2 small">
                 Search: <input type="text" className="form-control form-control-sm border shadow-none" />
              </div>
           </div>

           <div className="table-responsive border rounded overflow-hidden">
             <table className="table table-hover mb-0 text-start" style={{ fontSize: "11px" }}>
               <thead style={{ background: "#94a3b8", color: "white" }}>
                 <tr className="align-middle">
                   <th className="px-2 py-2 text-center border-end" style={{ width: "40px" }}>#</th>
                   <th className="px-2 py-2 border-end">Company Name</th>
                   <th className="px-2 py-2 border-end text-center">Appointee Name</th>
                   <th className="px-2 py-2 border-end text-center">Date of Appointment</th>
                   <th className="px-2 py-2 border-end text-center">DIR-2</th>
                   <th className="px-2 py-2 text-center">Action</th>
                 </tr>
               </thead>
               <tbody>
                 <tr>
                   <td colSpan={6} className="text-center py-4 text-muted small border-bottom-0">No data available in table</td>
                 </tr>
               </tbody>
             </table>
           </div>

           <div className="d-flex justify-content-between align-items-center mt-3 small text-muted">
              <div>Showing 0 to 0 of 0 entries</div>
              <div className="d-flex gap-0 align-items-center">
                 <button className="btn btn-outline-secondary btn-sm px-3 border-end-0 rounded-0 shadow-none">Previous</button>
                 <button className="btn btn-outline-secondary btn-sm px-3 rounded-0 shadow-none">Next</button>
              </div>
           </div>
        </div>
      )}

      {/* ⭐ ADD/PREPARE FORM */}
      {view === "add" && (
        <div className="card shadow-sm border-0 p-4 position-relative">
           {/* Header with Back Button */}
           <div className="d-flex justify-content-between align-items-center mb-5 border-bottom pb-3">
              <h5 className="fw-bold mb-0">Enter Particulars of DIR-2</h5>
              <button className="btn btn-primary btn-sm px-3 d-flex align-items-center gap-2 shadow-sm" 
                      style={{ background: "#2b4cb3", zIndex: 10 }}
                      onClick={() => setView("list")}>
                 <i className="bi bi-arrow-left-circle"></i> Back
              </button>
           </div>
           
           <div className="row g-0 text-start">
              {/* Select Company */}
              <div className="col-12 mb-4 px-3">
                 <div className="row align-items-center">
                    <label className="col-md-2 fw-bold small">Select Company</label>
                    <div className="col-md-10">
                       <select className="form-select border-light shadow-sm">
                          <option>Select Company</option>
                       </select>
                    </div>
                 </div>
              </div>

              {/* Row 2 */}
              <div className="col-md-6 mb-4 px-3">
                 <div className="row align-items-center">
                    <label className="col-md-4 fw-bold small">Company Name</label>
                    <div className="col-md-8">
                       <input type="text" className="form-control border-light shadow-sm bg-light" placeholder="Company Name" disabled />
                    </div>
                 </div>
              </div>
              <div className="col-md-6 mb-4 px-3">
                 <div className="row align-items-center">
                    <label className="col-md-4 fw-bold small">Designation</label>
                    <div className="col-md-8">
                       <input type="text" className="form-control border-light shadow-sm" placeholder="Designation" />
                    </div>
                 </div>
              </div>

              {/* Company Address */}
              <div className="col-12 mb-4 px-3">
                 <div className="row align-items-center">
                    <label className="col-md-2 fw-bold small">Company Address</label>
                    <div className="col-md-10">
                       <input type="text" className="form-control border-light shadow-sm bg-light" placeholder="Company Address" disabled />
                    </div>
                 </div>
              </div>

              {/* DIN Section */}
              <div className="col-md-6 mb-4 px-3">
                 <div className="row align-items-center">
                    <label className="col-md-4 fw-bold small">DIN</label>
                    <div className="col-md-8">
                        <div className="input-group">
                           <input type="text" className="form-control border-light shadow-sm" placeholder="Enter DIN" />
                           <button className="btn btn-outline-secondary btn-sm border-light shadow-sm px-3 fw-bold small bg-white text-muted">Prefill from MCA <i className="bi bi-arrow-right-circle"></i></button>
                        </div>
                    </div>
                 </div>
              </div>
              <div className="col-md-6 text-start mb-4 px-3">
                 {/* Empty side for layout consistency */}
              </div>

              {/* Name & Father's Name */}
              <div className="col-md-6 mb-4 px-3">
                 <div className="row align-items-center">
                    <label className="col-md-4 fw-bold small">Name</label>
                    <div className="col-md-8">
                       <input type="text" className="form-control border-light shadow-sm" placeholder="Name" />
                    </div>
                 </div>
              </div>
              <div className="col-md-6 mb-4 px-3">
                 <div className="row align-items-center">
                    <label className="col-md-4 fw-bold small">Father's Name</label>
                    <div className="col-md-8">
                       <input type="text" className="form-control border-light shadow-sm" placeholder="Father's Name" />
                    </div>
                 </div>
              </div>

              {/* Gender & DOB */}
              <div className="col-md-6 mb-4 px-3">
                 <div className="row align-items-center">
                    <label className="col-md-4 fw-bold small">Gender</label>
                    <div className="col-md-8">
                       <select className="form-select border-light shadow-sm">
                          <option>Select Gender</option>
                          <option>Male</option>
                          <option>Female</option>
                          <option>Other</option>
                       </select>
                    </div>
                 </div>
              </div>
              <div className="col-md-6 mb-4 px-3">
                 <div className="row align-items-center">
                    <label className="col-md-4 fw-bold small">DOB</label>
                    <div className="col-md-8">
                       <input type="text" className="form-control border-light shadow-sm" placeholder="dd/mm/yyyy" />
                    </div>
                 </div>
              </div>

              {/* Address */}
              <div className="col-12 mb-4 px-3">
                 <div className="row align-items-center">
                    <label className="col-md-2 fw-bold small">Address</label>
                    <div className="col-md-10">
                       <textarea className="form-control border-light shadow-sm" placeholder="Address" rows={2}></textarea>
                    </div>
                 </div>
              </div>

              {/* Email & Mobile */}
              <div className="col-md-6 mb-4 px-3">
                 <div className="row align-items-center">
                    <label className="col-md-4 fw-bold small">Email</label>
                    <div className="col-md-8">
                       <input type="email" className="form-control border-light shadow-sm" placeholder="Email" />
                    </div>
                 </div>
              </div>
              <div className="col-md-6 mb-4 px-3">
                 <div className="row align-items-center">
                    <label className="col-md-4 fw-bold small">Mobile Number</label>
                    <div className="col-md-8">
                       <input type="text" className="form-control border-light shadow-sm" placeholder="Mobile Number" />
                    </div>
                 </div>
              </div>

              {/* PAN & Nationality */}
              <div className="col-md-6 mb-4 px-3">
                 <div className="row align-items-center">
                    <label className="col-md-4 fw-bold small">PAN</label>
                    <div className="col-md-8">
                       <input type="text" className="form-control border-light shadow-sm" placeholder="PAN" />
                    </div>
                 </div>
              </div>
              <div className="col-md-6 mb-4 px-3">
                 <div className="row align-items-center">
                    <label className="col-md-4 fw-bold small">Nationality</label>
                    <div className="col-md-8">
                       <input type="text" className="form-control border-light shadow-sm" placeholder="Nationality" />
                    </div>
                 </div>
              </div>

              {/* Occupation & Appointment Date */}
              <div className="col-md-6 mb-4 px-3">
                 <div className="row align-items-center">
                    <label className="col-md-4 fw-bold small">Occupation</label>
                    <div className="col-md-8">
                       <input type="text" className="form-control border-light shadow-sm" placeholder="Occupation" />
                    </div>
                 </div>
              </div>
              <div className="col-md-6 mb-4 px-3">
                 <div className="row align-items-center">
                    <label className="col-md-4 fw-bold small">Date of appointment</label>
                    <div className="col-md-8">
                       <input type="text" className="form-control border-light shadow-sm" placeholder="dd/mm/yyyy" />
                    </div>
                 </div>
              </div>

              {/* Consent & Place */}
              <div className="col-md-6 mb-4 px-3">
                 <div className="row align-items-center">
                    <label className="col-md-4 fw-bold small">Date of consent</label>
                    <div className="col-md-8">
                       <input type="text" className="form-control border-light shadow-sm" placeholder="dd/mm/yyyy" />
                    </div>
                 </div>
              </div>
              <div className="col-md-6 mb-4 px-3">
                 <div className="row align-items-center">
                    <label className="col-md-4 fw-bold small">Place of signing consent</label>
                    <div className="col-md-8">
                       <input type="text" className="form-control border-light shadow-sm" placeholder="Place" />
                    </div>
                 </div>
              </div>

              {/* Declarations */}
              <div className="col-12 mb-3 px-3">
                 <div className="bg-light p-3 rounded d-flex justify-content-between align-items-center border">
                    <span className="small fw-bold">Is the appointee required to obtain the security clearance from the Ministry of Home Affairs, Government of India?</span>
                    <div className="d-flex gap-3">
                       <label className="small"><input type="radio" name="security" className="me-1" /> Yes</label>
                       <label className="small"><input type="radio" name="security" className="me-1" /> No</label>
                    </div>
                 </div>
              </div>
              <div className="col-12 mb-4 px-3">
                 <div className="bg-light p-3 rounded d-flex justify-content-between align-items-center border">
                    <span className="small fw-bold">Is the applicant member of any Professional Institute?</span>
                    <div className="d-flex gap-3">
                       <label className="small"><input type="radio" name="institute" className="me-1" /> Yes</label>
                       <label className="small"><input type="radio" name="institute" className="me-1" /> No</label>
                    </div>
                 </div>
              </div>

              {/* ⭐ Interest in Other Entities Table */}
              <div className="col-12 mt-4 px-3">
                 <h6 className="fw-bold mb-3 text-start border-bottom pb-2" style={{ borderBottom: "2px solid #2b4cb3 !important" }}>
                    <span style={{ borderBottom: "3px solid #2b4cb3", paddingBottom: "7px" }}>Interest in Other Entities</span>
                 </h6>
                 <div className="table-responsive">
                    <table className="table table-bordered small">
                       <thead className="bg-light">
                          <tr className="align-middle">
                             <th style={{ width: "20%" }}>CIN</th>
                             <th style={{ width: "30%" }}>Company Name</th>
                             <th style={{ width: "15%" }}>Date of Appointment</th>
                             <th style={{ width: "15%" }}>Designation</th>
                             <th style={{ width: "15%" }}>Other, if any</th>
                             <th style={{ width: "5%" }}></th>
                          </tr>
                       </thead>
                       <tbody>
                          {interests.map((item) => (
                             <tr key={item.id} className="align-middle">
                                <td><input type="text" className="form-control form-control-sm border-0" defaultValue={item.cin} /></td>
                                <td><input type="text" className="form-control form-control-sm border-0" defaultValue={item.name} /></td>
                                <td><input type="text" className="form-control form-control-sm border-0" defaultValue={item.doa} /></td>
                                <td>
                                   <select className="form-select form-select-sm border-0">
                                      <option>Director</option>
                                      <option>Managing Director</option>
                                   </select>
                                </td>
                                <td><input type="text" className="form-control form-control-sm border-0" /></td>
                                <td className="text-center">
                                   <button className="btn btn-danger btn-sm rounded-0 px-2 py-1" onClick={() => removeInterest(item.id)}>X</button>
                                </td>
                             </tr>
                          ))}
                       </tbody>
                    </table>
                 </div>
                 <div className="d-flex gap-2 mt-3">
                    <button className="btn btn-primary btn-sm px-4 shadow-none" style={{ background: "#2b4cb3" }} onClick={addInterest}>+ Add row</button>
                    <button className="btn btn-primary btn-sm px-4 shadow-none" style={{ background: "#2b4cb3" }}>Submit</button>
                 </div>
              </div>
           </div>
        </div>
      )}
    </div>
  );
}
