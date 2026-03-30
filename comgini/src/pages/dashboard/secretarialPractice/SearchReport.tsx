import { useState } from "react";

type ViewType = "list" | "add";
type TabType = "company" | "llp";

interface Signatory { id: number; name: string; doa: string; din: string; }
interface Shareholder { id: number; name: string; address: string; type: string; count: string; paid: string; total: string; }
interface Charge { id: number; cid: string; created: string; modified: string; secured: string; short: string; holder: string; address: string; }

export default function SearchReport() {
  const [view, setView] = useState<ViewType>("list");
  const [activeTab, setActiveTab] = useState<TabType>("company");
  
  // Dynamic Table States
  const [signatories, setSignatories] = useState<Signatory[]>([{ id: 1, name: "", doa: "", din: "" }]);
  const [shareholders, setShareholders] = useState<Shareholder[]>([{ id: 1, name: "", address: "", type: "", count: "", paid: "", total: "" }]);
  const [charges, setCharges] = useState<Charge[]>([{ id: 1, cid: "", created: "", modified: "", secured: "", short: "", holder: "", address: "" }]);

  // Add/Remove Handlers
  const addSignatory = () => setSignatories([...signatories, { id: Date.now(), name: "", doa: "d/m/Y", din: "" }]);
  const removeSignatory = () => signatories.length > 1 && setSignatories(signatories.slice(0, -1));

  const addShareholder = () => setShareholders([...shareholders, { id: Date.now(), name: "", address: "", type: "", count: "", paid: "", total: "" }]);
  const removeShareholder = () => shareholders.length > 1 && setShareholders(shareholders.slice(0, -1));

  const addCharge = () => setCharges([...charges, { id: Date.now(), cid: "", created: "d/m/Y", modified: "d/m/Y", secured: "", short: "", holder: "", address: "" }]);
  const removeCharge = () => charges.length > 1 && setCharges(charges.slice(0, -1));

  return (
    <div className="search-report p-4 text-start">
      {/* ⭐ BREADCRUMBS */}
      <nav aria-label="breadcrumb" className="mb-4">
        <ol className="breadcrumb mb-0 small">
          <li className="breadcrumb-item"><a href="#" className="text-decoration-none text-primary" onClick={() => setView("list")}>Home</a></li>
          {view === "list" ? (
             <li className="breadcrumb-item active" aria-current="page">Search Report</li>
          ) : (
             <>
               <li className="breadcrumb-item"><a href="#" className="text-decoration-none text-primary" onClick={() => setView("list")}>Search Report</a></li>
               <li className="breadcrumb-item active" aria-current="page">Prepare Search Report</li>
             </>
          )}
        </ol>
      </nav>

      {/* ⭐ LIST VIEW */}
      {view === "list" && (
        <div className="card shadow-sm border-0 p-4">
           <h5 className="fw-bold mb-4">Secretarial Practice - Search Report</h5>
           <div className="d-flex border-bottom mb-4">
              <button className={`btn btn-link text-decoration-none px-4 py-2 small fw-bold ${activeTab === "company" ? "text-primary border-bottom border-3 border-primary" : "text-muted border-0"}`} onClick={() => setActiveTab("company")}>Company</button>
              <button className={`btn btn-link text-decoration-none px-4 py-2 small fw-bold ${activeTab === "llp" ? "text-primary border-bottom border-3 border-primary" : "text-muted border-0"}`} onClick={() => setActiveTab("llp")}>LLP</button>
           </div>
           <div className="d-flex justify-content-between align-items-center mb-4">
              <div className="d-flex gap-2">
                 <button className="btn btn-outline-secondary btn-sm bg-white border px-3">Show 10 rows</button>
                 <button className="btn btn-outline-secondary btn-sm bg-white border px-3">Excel</button>
              </div>
              <button className="btn btn-primary btn-sm px-4 shadow-none" style={{ background: "#2b4cb3" }} onClick={() => setView("add")}>+ Prepare Search Report</button>
           </div>
           <div className="table-responsive border rounded overflow-hidden">
             <table className="table table-hover mb-0" style={{ fontSize: "11px" }}>
               <thead style={{ background: "#94a3b8", color: "white" }}>
                 <tr className="align-middle">
                   <th className="px-2 py-2 text-center border-end" style={{ width: "40px" }}>Sr. No.</th>
                   <th className="px-2 py-2 border-end">Name of {activeTab === "company" ? "Company" : "LLP"}</th>
                   <th className="px-2 py-2 border-end text-center">Date of Report</th>
                   <th className="px-2 py-2 border-end text-center">SRN</th>
                   <th className="px-2 py-2 border-end text-center">Signed by</th>
                   <th className="px-2 py-2 border-end text-center">Action</th>
                   <th className="px-2 py-2 text-center">View/Download</th>
                 </tr>
               </thead>
               <tbody>
                 <tr><td colSpan={7} className="text-center py-4 text-muted small border-bottom-0">No data available in table</td></tr>
               </tbody>
             </table>
           </div>
        </div>
      )}

      {/* ⭐ PREPARE FORM (Screenshot 1-3 Layout) */}
      {view === "add" && (
        <div className="card shadow-sm border-0 p-4">
           {/* Header */}
           <div className="d-flex justify-content-between align-items-center mb-5 border-bottom pb-3">
              <h5 className="fw-bold mb-0">Prepare Search Report</h5>
              <button className="btn btn-primary btn-sm px-3 d-flex align-items-center gap-2 shadow-sm" style={{ background: "#2b4cb3", zIndex: 10 }} onClick={() => setView("list")}>
                 <i className="bi bi-arrow-left-circle"></i> Back
              </button>
           </div>

           <div className="row g-0 border rounded overflow-hidden mb-5">
              {/* Row 1: Search Date & SRN */}
              <div className="col-md-6 border-end border-bottom d-flex align-items-stretch">
                 <div className="bg-light px-3 py-2 fw-bold small border-end d-flex align-items-center" style={{ minWidth: "180px" }}>Date of Search <span className="text-danger ms-1">*</span></div>
                 <div className="flex-grow-1 p-2"><input type="text" className="form-control form-control-sm border-0" placeholder="d/m/Y" /></div>
              </div>
              <div className="col-md-6 border-bottom d-flex align-items-stretch">
                 <div className="bg-light px-3 py-2 fw-bold small border-end d-flex align-items-center" style={{ minWidth: "180px" }}>SRN of MCA Search <span className="text-danger ms-1">*</span></div>
                 <div className="flex-grow-1 p-2"><input type="text" className="form-control form-control-sm border-0" /></div>
              </div>

              {/* Row 2: Signed by & UDIN */}
              <div className="col-md-6 border-end border-bottom d-flex align-items-stretch">
                 <div className="bg-light px-3 py-2 fw-bold small border-end d-flex align-items-center" style={{ minWidth: "180px" }}>Signed by <span className="text-danger ms-1">*</span></div>
                 <div className="flex-grow-1 p-2">
                    <select className="form-select form-select-sm border-0"><option>Select Professional</option></select>
                 </div>
              </div>
              <div className="col-md-6 border-bottom d-flex align-items-stretch">
                 <div className="bg-light px-3 py-2 fw-bold small border-end d-flex align-items-center" style={{ minWidth: "180px" }}>UDIN <span className="text-danger ms-1">*</span></div>
                 <div className="flex-grow-1 p-2"><input type="text" className="form-control form-control-sm border-0" /></div>
              </div>

              {/* Row 3: Date & Place of Signing */}
              <div className="col-md-6 border-end border-bottom d-flex align-items-stretch">
                 <div className="bg-light px-3 py-2 fw-bold small border-end d-flex align-items-center" style={{ minWidth: "180px" }}>Date of Signing <span className="text-danger ms-1">*</span></div>
                 <div className="flex-grow-1 p-2"><input type="text" className="form-control form-control-sm border-0" placeholder="d/m/Y" /></div>
              </div>
              <div className="col-md-6 border-bottom d-flex align-items-stretch">
                 <div className="bg-light px-3 py-2 fw-bold small border-end d-flex align-items-center" style={{ minWidth: "180px" }}>Place of Signing <span className="text-danger ms-1">*</span></div>
                 <div className="flex-grow-1 p-2"><input type="text" className="form-control form-control-sm border-0" /></div>
              </div>

              {/* Section: Particulars of Company */}
              <div className="col-12 bg-light px-3 py-2 fw-bold border-bottom">PARTICULARS OF THE COMPANY</div>
              <div className="col-md-6 border-end border-bottom d-flex align-items-stretch">
                 <div className="bg-light px-3 py-2 fw-bold small border-end d-flex align-items-center" style={{ minWidth: "180px" }}>CIN <span className="text-danger ms-1">*</span></div>
                 <div className="flex-grow-1 p-2 d-flex gap-2">
                    <input type="text" className="form-control form-control-sm border-0" placeholder="CIN" />
                    <button className="btn btn-sm btn-white border shadow-none"><i className="bi bi-search"></i></button>
                 </div>
              </div>
              <div className="col-md-6 border-bottom d-flex align-items-stretch">
                 <div className="bg-light px-3 py-2 fw-bold small border-end d-flex align-items-center" style={{ minWidth: "180px" }}>Name of the Company <span className="text-danger ms-1">*</span></div>
                 <div className="flex-grow-1 p-2"><input type="text" className="form-control form-control-sm border-0 bg-light" disabled /></div>
              </div>
              <div className="col-12 border-bottom d-flex align-items-stretch">
                 <div className="bg-light px-3 py-2 fw-bold small border-end d-flex align-items-center" style={{ minWidth: "180px" }}>Registered Office <span className="text-danger ms-1">*</span></div>
                 <div className="flex-grow-1 p-2"><input type="text" className="form-control form-control-sm border-0 bg-light" disabled /></div>
              </div>
              <div className="col-md-6 border-end border-bottom d-flex align-items-stretch">
                 <div className="bg-light px-3 py-2 fw-bold small border-end d-flex align-items-center" style={{ minWidth: "180px" }}>Registration Number</div>
                 <div className="flex-grow-1 p-2"><input type="text" className="form-control form-control-sm border-0" /></div>
              </div>
              <div className="col-md-6 border-bottom d-flex align-items-stretch">
                 <div className="bg-light px-3 py-2 fw-bold small border-end d-flex align-items-center" style={{ minWidth: "180px" }}>Authorized Capital</div>
                 <div className="flex-grow-1 p-2"><input type="text" className="form-control form-control-sm border-0" /></div>
              </div>
              <div className="col-md-6 border-end border-bottom d-flex align-items-stretch">
                 <div className="bg-light px-3 py-2 fw-bold small border-end d-flex align-items-center" style={{ minWidth: "180px" }}>Paid up Capital</div>
                 <div className="flex-grow-1 p-2"><input type="text" className="form-control form-control-sm border-0" /></div>
              </div>
              <div className="col-md-6 border-bottom d-flex align-items-stretch">
                 <div className="bg-light px-3 py-2 fw-bold small border-end d-flex align-items-center" style={{ minWidth: "180px" }}>Date of Incorporation <span className="text-danger ms-1">*</span></div>
                 <div className="flex-grow-1 p-2"><input type="text" className="form-control form-control-sm border-0 bg-light" placeholder="d/m/Y" disabled /></div>
              </div>
              <div className="col-md-6 border-end d-flex align-items-stretch">
                 <div className="bg-light px-3 py-2 fw-bold small border-end d-flex align-items-center" style={{ minWidth: "180px" }}>Date of Last AGM</div>
                 <div className="flex-grow-1 p-2"><input type="text" className="form-control form-control-sm border-0" placeholder="d/m/Y" /></div>
              </div>
              <div className="col-md-6 d-flex align-items-stretch">
                 <div className="bg-light px-3 py-2 fw-bold small border-end d-flex align-items-center" style={{ minWidth: "180px" }}>Date of Last Balance Sheet Filed</div>
                 <div className="flex-grow-1 p-2"><input type="text" className="form-control form-control-sm border-0" placeholder="d/m/Y" /></div>
              </div>
           </div>

           {/* Table: Particulars of Signatories */}
           <div className="mt-5 text-start">
              <h6 className="fw-bold mb-3 border-bottom pb-2">PARTICULARS OF SIGNATORIES</h6>
              <div className="table-responsive">
                 <table className="table table-bordered table-sm small">
                    <thead style={{ background: "#dbeafe" }}>
                       <tr>
                          <th style={{ width: "50px" }}>Sr. No.</th>
                          <th>Name and Designation</th>
                          <th style={{ width: "150px" }}>Date of Appointment</th>
                          <th>DIN/PAN</th>
                       </tr>
                    </thead>
                    <tbody>
                       {signatories.map((s, i) => (
                          <tr key={s.id} className="align-middle">
                             <td className="text-center d-flex align-items-center justify-content-center gap-2">
                                <input type="checkbox" className="form-check-input mt-0" /> {i + 1}
                             </td>
                             <td><input type="text" className="form-control form-control-sm border-0" /></td>
                             <td><input type="text" className="form-control form-control-sm border-0 text-center" defaultValue="d/m/Y" /></td>
                             <td><input type="text" className="form-control form-control-sm border-0" /></td>
                          </tr>
                       ))}
                    </tbody>
                 </table>
              </div>
              <div className="d-flex gap-2">
                 <button className="btn btn-primary btn-sm px-3 shadow-none" style={{ background: "#2b4cb3" }} onClick={addSignatory}>Add row +</button>
                 <button className="btn btn-primary btn-sm px-3 shadow-none" style={{ background: "#2b4cb3" }} onClick={removeSignatory}>Remove</button>
              </div>
           </div>

           {/* Table: Shareholders */}
           <div className="mt-5 text-start">
              <h6 className="fw-bold mb-3 border-bottom pb-2">PARTICULARS OF SHAREHOLDER AS ON</h6>
              <div className="table-responsive">
                 <table className="table table-bordered table-sm small text-center">
                    <thead style={{ background: "#dbeafe" }}>
                       <tr>
                          <th style={{ width: "50px" }}>Sr. No.</th>
                          <th>Name</th>
                          <th>Address</th>
                          <th style={{ width: "150px" }}>Type of Shares</th>
                          <th style={{ width: "100px" }}>No. of Shares</th>
                          <th style={{ width: "150px" }}>Paid Value Per Share</th>
                          <th style={{ width: "150px" }}>Total Amount</th>
                       </tr>
                    </thead>
                    <tbody>
                       {shareholders.map((s, i) => (
                          <tr key={s.id}>
                             <td className="d-flex align-items-center justify-content-center gap-2"><input type="checkbox" className="form-check-input mt-0" /> {i + 1}</td>
                             <td><input type="text" className="form-control form-control-sm border-0" /></td>
                             <td><input type="text" className="form-control form-control-sm border-0" /></td>
                             <td><input type="text" className="form-control form-control-sm border-0" /></td>
                             <td><input type="text" className="form-control form-control-sm border-0" /></td>
                             <td><input type="text" className="form-control form-control-sm border-0" /></td>
                             <td><input type="text" className="form-control form-control-sm border-0" /></td>
                          </tr>
                       ))}
                       <tr className="bg-light fw-bold">
                          <td colSpan={6} className="text-end">Total</td>
                          <td>0.00</td>
                       </tr>
                    </tbody>
                 </table>
              </div>
              <div className="d-flex gap-2">
                 <button className="btn btn-primary btn-sm px-3 shadow-none" style={{ background: "#2b4cb3" }} onClick={addShareholder}>Add row +</button>
                 <button className="btn btn-primary btn-sm px-3 shadow-none" style={{ background: "#2b4cb3" }} onClick={removeShareholder}>Remove</button>
                 <button className="btn btn-primary btn-sm px-3 shadow-none" style={{ background: "#2b4cb3" }}>Import from ComplyRelax</button>
              </div>
           </div>

           {/* Table: Charges */}
           <div className="mt-5 text-start">
              <h6 className="fw-bold mb-3 border-bottom pb-2">PARTICULARS OF CHARGES</h6>
              <div className="table-responsive">
                 <table className="table table-bordered table-sm small text-center">
                    <thead style={{ background: "#dbeafe" }}>
                       <tr className="align-middle">
                          <th style={{ width: "50px" }}>Sr. No.</th>
                          <th>Charge ID</th>
                          <th style={{ width: "120px" }}>Date of creation</th>
                          <th style={{ width: "150px" }}>Date of present Modification of charge</th>
                          <th>Amount secured By charge</th>
                          <th>Short Particulars of property charged at present time</th>
                          <th>Name of Charge holder</th>
                          <th>Address of Charge holder</th>
                          <th style={{ width: "80px" }}>Import Form</th>
                       </tr>
                    </thead>
                    <tbody>
                       {charges.map((c, i) => (
                          <tr key={c.id}>
                             <td className="d-flex align-items-center justify-content-center gap-2"><input type="checkbox" className="form-check-input mt-0" /> {i + 1}</td>
                             <td><input type="text" className="form-control form-control-sm border-0" /></td>
                             <td><input type="text" className="form-control form-control-sm border-0" defaultValue="d/m/Y" /></td>
                             <td><input type="text" className="form-control form-control-sm border-0" defaultValue="d/m/Y" /></td>
                             <td><input type="text" className="form-control form-control-sm border-0" /></td>
                             <td><input type="text" className="form-control form-control-sm border-0" /></td>
                             <td><input type="text" className="form-control form-control-sm border-0" /></td>
                             <td><input type="text" className="form-control form-control-sm border-0" /></td>
                             <td><button className="btn btn-sm text-primary"><i className="bi bi-file-earmark-arrow-up"></i></button></td>
                          </tr>
                       ))}
                    </tbody>
                 </table>
              </div>
              <div className="d-flex gap-2">
                 <button className="btn btn-primary btn-sm px-3 shadow-none" style={{ background: "#2b4cb3" }} onClick={addCharge}>Add row +</button>
                 <button className="btn btn-primary btn-sm px-3 shadow-none" style={{ background: "#2b4cb3" }} onClick={removeCharge}>Remove</button>
                 <button className="btn btn-primary btn-sm px-3 shadow-none" style={{ background: "#2b4cb3" }}>Import from ComplyRelax</button>
              </div>
              <div className="mt-4">
                 <button className="btn btn-primary px-5 py-2 fw-bold" style={{ background: "#2b4cb3" }}>Submit</button>
              </div>
           </div>
        </div>
      )}
    </div>
  );
}
