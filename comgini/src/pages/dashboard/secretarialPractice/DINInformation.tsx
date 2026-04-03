export default function DINInformationPage() {
  return (
    <div className="din-information p-2 p-md-4 text-start">
      {/* ⭐ BREADCRUMBS & WARNING */}
      <div className="d-flex flex-column flex-md-row justify-content-between align-items-start mb-4 gap-3">
        <nav aria-label="breadcrumb">
          <ol className="breadcrumb mb-0 small">
            <li className="breadcrumb-item"><a href="#" className="text-decoration-none text-primary">Home</a></li>
            <li className="breadcrumb-item active" aria-current="page">DIN Information</li>
          </ol>
        </nav>
        <div className="alert alert-danger py-2 px-3 mb-0 border-0 small fw-bold" style={{ color: "#dc3545", background: "rgba(220, 53, 69, 0.05)", borderRadius: "4px" }}>
           As per your plan, you have DIN Prefill credits, and 0 credits have been utilized. Please purchase more credits if you wish to fetch further.
        </div>
      </div>

      <div className="card shadow-sm border-0 p-0 overflow-hidden">
         <div className="row g-0">
            <div className="col-12 col-md-2 bg-light p-3 border-end d-flex align-items-center">
               <label className="fw-bold mb-0">DIN</label>
            </div>
            <div className="col-12 col-md-10 p-3">
                <div className="d-flex flex-column flex-sm-row gap-3 align-items-sm-center">
                   <input type="text" className="form-control border rounded py-2 shadow-sm w-100" placeholder="Enter DIN" style={{ maxWidth: "400px" }} />
                   <button className="btn btn-primary px-4 py-2 shadow-sm w-100 w-sm-auto" style={{ background: "#2b4cb3" }}>PREFILL FROM MCA</button>
                </div>
            </div>
         </div>
      </div>
    </div>
  );
}
