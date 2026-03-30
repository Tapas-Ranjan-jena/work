import { useState } from "react";

export default function BankersPANDatabase() {
  const [showAddModal, setShowAddModal] = useState(false);

  return (
    <div className="bankers-pan-database p-4">
      {/* ⭐ BREADCRUMBS */}
      <nav aria-label="breadcrumb" className="mb-4 text-start">
        <ol className="breadcrumb mb-0 small">
          <li className="breadcrumb-item"><a href="#" className="text-decoration-none text-primary">Home</a></li>
          <li className="breadcrumb-item active" aria-current="page">PAN Database</li>
        </ol>
      </nav>

      <div className="card shadow-sm border-0 p-4">
         <div className="d-flex justify-content-between align-items-center mb-4">
            <h5 className="fw-bold mb-0">Particulars of Banker's PAN</h5>
            <div className="d-flex gap-2">
               <button className="btn btn-primary btn-sm px-3 shadow-none" style={{ background: "#2b4cb3" }} onClick={() => setShowAddModal(true)}>
                  + Add Banker's PAN
               </button>
               <button className="btn btn-primary btn-sm px-3 shadow-none" style={{ background: "#2b4cb3" }}>
                  Import Excel
               </button>
            </div>
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
                 <th className="px-2 py-2 border-end">Name</th>
                 <th className="px-2 py-2 border-end">PAN</th>
                 <th className="px-2 py-2 text-center">Action</th>
               </tr>
             </thead>
             <tbody>
               <tr>
                 <td colSpan={4} className="text-center py-4 text-muted small border-bottom-0">No data available in table</td>
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

      {/* ⭐ ADD MODAL */}
      {showAddModal && (
        <div className="modal show d-block" style={{ background: "rgba(0,0,0,0.5)" }}>
           <div className="modal-dialog modal-lg modal-dialog-centered">
              <div className="modal-content overflow-hidden border-0 shadow">
                 <div className="modal-header bg-white py-3 border-bottom d-flex justify-content-center">
                    <h5 className="modal-title fw-bold">Enter Chargeholder Details</h5>
                 </div>
                 <div className="modal-body p-5 text-start">
                    <div className="row g-4">
                       <div className="col-md-6">
                          <label className="fw-bold small mb-2 border-bottom d-block">Name of the chargeholder</label>
                          <input type="text" className="form-control border-light shadow-sm" placeholder="Name of the chargeholder" />
                       </div>
                       <div className="col-md-6">
                          <label className="fw-bold small mb-2 border-bottom d-block">PAN</label>
                          <input type="text" className="form-control border-light shadow-sm" placeholder="PAN" />
                       </div>
                       <div className="col-12 mt-4">
                          <button className="btn btn-primary px-5 py-2 shadow-sm" style={{ background: "#2b4cb3" }}>Submit</button>
                       </div>
                    </div>
                 </div>
                 <div className="modal-footer bg-light p-2 text-end border-top">
                    <button className="btn-close opacity-50 shadow-none" onClick={() => setShowAddModal(false)}></button>
                 </div>
              </div>
           </div>
        </div>
      )}
    </div>
  );
}
