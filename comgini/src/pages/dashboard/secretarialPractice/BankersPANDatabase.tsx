import { useState } from "react";

export default function BankersPANDatabase() {
  const [showAddModal, setShowAddModal] = useState(false);

  return (
    <div className="bankers-pan-database p-2 p-md-4 text-start">
      {/* ⭐ BREADCRUMBS */}
      <nav aria-label="breadcrumb" className="mb-4">
        <ol className="breadcrumb mb-0 small">
          <li className="breadcrumb-item"><a href="#" className="text-decoration-none text-primary">Home</a></li>
          <li className="breadcrumb-item active" aria-current="page">PAN Database</li>
        </ol>
      </nav>

      <div className="card shadow-sm border-0 p-3 p-md-4">
         <div className="d-flex flex-column flex-md-row justify-content-between align-items-start align-items-md-center mb-4 gap-3">
            <h5 className="fw-bold mb-0">Particulars of Banker's PAN</h5>
            <div className="d-flex flex-wrap gap-2 w-100 w-md-auto">
               <button className="btn btn-primary btn-sm px-4 flex-grow-1 flex-md-grow-0 py-2 py-md-1" style={{ background: "#2b4cb3" }} onClick={() => setShowAddModal(true)}>
                  + Add Banker's PAN
               </button>
               <button className="btn btn-primary btn-sm px-4 flex-grow-1 flex-md-grow-0 py-2 py-md-1" style={{ background: "#2b4cb3" }}>
                  Import Excel
               </button>
            </div>
         </div>

         <div className="d-flex flex-column flex-md-row justify-content-between align-items-start align-items-md-center mb-3 gap-3">
            <div className="small w-100 w-md-auto">Show 
               <select className="mx-2 border border-light py-1">
                  <option>10</option>
               </select> entries
            </div>
            <div className="d-flex align-items-center gap-2 small w-100 w-md-auto">
               <span className="text-nowrap">Search:</span> 
               <input type="text" className="form-control form-control-sm border w-100" style={{ maxWidth: "220px" }} />
            </div>
         </div>

         <div className="table-responsive border rounded overflow-auto">
           <table className="table table-hover mb-0" style={{ fontSize: "11px" }}>
             <thead style={{ background: "#94a3b8", color: "white" }}>
               <tr className="align-middle text-nowrap">
                 <th className="px-2 py-2 text-center border-end" style={{ minWidth: "40px" }}>#</th>
                 <th className="px-2 py-2 border-end" style={{ minWidth: "250px" }}>Name</th>
                 <th className="px-2 py-2 border-end" style={{ minWidth: "200px" }}>PAN</th>
                 <th className="px-2 py-2 text-center" style={{ minWidth: "80px" }}>Action</th>
               </tr>
             </thead>
             <tbody>
               <tr>
                 <td colSpan={4} className="text-center py-4 text-muted small border-bottom-0">No data available in table</td>
               </tr>
             </tbody>
           </table>
         </div>

         <div className="d-flex flex-column flex-sm-row justify-content-between align-items-center mt-3 gap-3 small text-muted text-center text-sm-start">
            <div>Showing 0 to 0 of 0 entries</div>
            <div className="d-flex gap-0 align-items-center">
               <button className="btn btn-outline-secondary btn-sm px-3 rounded-start">Previous</button>
               <button className="btn btn-outline-secondary btn-sm px-3 rounded-end">Next</button>
            </div>
         </div>
      </div>

      {/* ⭐ ADD MODAL */}
      {showAddModal && (
        <div className="modal show d-block" style={{ background: "rgba(0,0,0,0.5)", zIndex: 1050 }}>
           <div className="modal-dialog modal-lg modal-dialog-centered">
              <div className="modal-content overflow-hidden border-0 shadow">
                 <div className="modal-header bg-white py-3 border-bottom d-flex justify-content-center position-relative">
                    <h5 className="modal-title fw-bold">Enter Chargeholder Details</h5>
                    <button className="btn-close position-absolute end-0 me-3" onClick={() => setShowAddModal(false)}></button>
                 </div>
                 <div className="modal-body p-3 p-md-5 text-start">
                    <div className="row g-4">
                       <div className="col-12 col-md-6">
                          <label className="fw-bold small mb-2 border-bottom d-block">Name of the chargeholder</label>
                          <input type="text" className="form-control border-light shadow-sm py-2" placeholder="Name of the chargeholder" />
                       </div>
                       <div className="col-12 col-md-6">
                          <label className="fw-bold small mb-2 border-bottom d-block">PAN</label>
                          <input type="text" className="form-control border-light shadow-sm py-2" placeholder="PAN" />
                       </div>
                       <div className="col-12 mt-4">
                          <button className="btn btn-primary px-5 py-2 shadow-sm w-100 w-md-auto" style={{ background: "#2b4cb3" }}>Submit</button>
                       </div>
                    </div>
                 </div>
                 <div className="modal-footer bg-light p-2 text-end border-top">
                    <button className="btn btn-sm btn-outline-secondary px-3" onClick={() => setShowAddModal(false)}>Close</button>
                 </div>
              </div>
           </div>
        </div>
      )}
    </div>
  );
}
