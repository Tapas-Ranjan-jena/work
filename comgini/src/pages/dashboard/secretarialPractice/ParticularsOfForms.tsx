export default function ListOfForms() {
  return (
    <div className="list-of-forms p-4">
      {/* ⭐ BREADCRUMBS */}
      <nav aria-label="breadcrumb" className="mb-4 text-start">
        <ol className="breadcrumb mb-0 small">
          <li className="breadcrumb-item"><a href="#" className="text-decoration-none text-primary">Home</a></li>
          <li className="breadcrumb-item active" aria-current="page">List of Forms</li>
        </ol>
      </nav>

      <div className="card shadow-sm border-0 p-4">
         <h4 className="fw-bold mb-4 text-start">List of Forms</h4>

         <div className="d-flex justify-content-between align-items-center mb-3">
            <div className="d-flex gap-2">
               <button className="btn btn-outline-secondary btn-sm bg-white border">Show 10 rows</button>
               <button className="btn btn-outline-secondary btn-sm bg-white border px-3">Excel</button>
            </div>
            <div className="d-flex align-items-center gap-2 small">
               Search: <input type="text" className="form-control form-control-sm border" />
            </div>
         </div>

         <div className="table-responsive border rounded overflow-hidden">
           <table className="table table-hover mb-0 text-start" style={{ fontSize: "10.5px" }}>
             <thead style={{ background: "#94a3b8", color: "white" }}>
               <tr className="align-middle">
                 <th className="px-1 py-2 text-center border-end" style={{ width: "40px" }}>Sr. No.</th>
                 <th className="px-2 py-2 border-end">Company Name</th>
                 <th className="px-2 py-2 border-end text-center">Form Name</th>
                 <th className="px-2 py-2 border-end text-center">Team Member</th>
                 <th className="px-2 py-2 border-end text-center">Start Date</th>
                 <th className="px-2 py-2 border-end text-center">Last Updated date</th>
                 <th className="px-2 py-2 border-end text-center">Status</th>
                 <th className="px-2 py-2 border-end text-center">MCA User ID</th>
                 <th className="px-2 py-2 border-end text-center">SRN</th>
                 <th className="px-2 py-2 border-end text-center">MCA Status</th>
                 <th className="px-2 py-2">Action</th>
               </tr>
             </thead>
             <tbody>
               <tr>
                 <td colSpan={11} className="text-center py-4 text-muted small border-bottom-0">No data available in table</td>
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
    </div>
  );
}
