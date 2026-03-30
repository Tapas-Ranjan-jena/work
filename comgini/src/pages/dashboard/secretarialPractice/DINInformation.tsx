export default function DINInformationPage() {
  return (
    <div className="din-information p-4 text-start">
      {/* ⭐ BREADCRUMBS & WARNING */}
      <div className="d-flex justify-content-between align-items-start mb-4">
        <nav aria-label="breadcrumb">
          <ol className="breadcrumb mb-0 small">
            <li className="breadcrumb-item"><a href="#" className="text-decoration-none text-primary">Home</a></li>
            <li className="breadcrumb-item active" aria-current="page">DIN Information</li>
          </ol>
        </nav>
        <div className="alert alert-danger py-1 px-3 mb-0 border-0 small fw-bold" style={{ color: "#dc3545", background: "transparent" }}>
           As per your plan, you have DIN Prefill credits, and 0 credits have been utilized. Please purchase more credits if you wish to fetch further.
        </div>
      </div>

      <div className="card shadow-sm border-0 p-0 overflow-hidden">
         <div className="row g-0">
            <div className="col-md-2 bg-light p-3 border-end d-flex align-items-center">
               <label className="fw-bold mb-0">DIN</label>
            </div>
            <div className="col-md-10 p-3 d-flex gap-3 align-items-center">
               <input type="text" className="form-control border rounded" placeholder="Enter DIN" style={{ maxWidth: "300px" }} />
               <button className="btn btn-primary px-4" style={{ background: "#2b4cb3" }}>PREFILL FROM MCA</button>
            </div>
         </div>
      </div>
    </div>
  );
}
