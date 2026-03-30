import { useState } from "react";
import toast from "react-hot-toast";

export default function CheckAnnualFiling() {
  const [showSearchModal, setShowSearchModal] = useState(false);
  const [formData, setFormData] = useState({
    mcaUser: "",
    company: "",
    cin: ""
  });

  const [searchData, setSearchData] = useState({
    companyName: ""
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Filing status request submitted");
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Searching for CIN...");
    setShowSearchModal(false);
  };

  return (
    <div className="check-annual-filing p-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <nav aria-label="breadcrumb">
          <ol className="breadcrumb mb-0">
            <li className="breadcrumb-item"><a href="#" className="text-decoration-none">Home</a></li>
            <li className="breadcrumb-item active" aria-current="page">Check Annual Filing Status</li>
          </ol>
        </nav>
        <button 
          className="btn btn-primary d-flex align-items-center gap-2" 
          onClick={() => setShowSearchModal(true)}
          style={{ background: "#1e40af", borderColor: "#1e40af" }}
        >
          Search CIN
        </button>
      </div>

      <div className="card shadow-sm border-0 p-4">
        <h6 className="fw-bold mb-4">Check Annual Filing Status of any company from MCA</h6>
        <form onSubmit={handleSubmit}>
          <div className="row g-3 align-items-end">
            <div className="col-md-3">
              <select 
                className="form-select bg-light border-0 py-2 shadow-none"
                value={formData.mcaUser}
                onChange={(e) => setFormData({ ...formData, mcaUser: e.target.value })}
              >
                <option value="">Select MCA User</option>
              </select>
            </div>
            <div className="col-md-3">
              <select 
                className="form-select bg-light border-0 py-2 shadow-none"
                value={formData.company}
                onChange={(e) => setFormData({ ...formData, company: e.target.value })}
              >
                <option value="">Select Company</option>
              </select>
            </div>
            <div className="col-md-4">
              <input 
                type="text" 
                className="form-control bg-light border-0 py-2 shadow-none" 
                placeholder="CIN (Corporate Identity Number)"
                value={formData.cin}
                onChange={(e) => setFormData({ ...formData, cin: e.target.value })}
              />
            </div>
            <div className="col-md-2">
              <button 
                type="submit" 
                className="btn btn-primary w-100 py-2"
                style={{ background: "#1e40af", borderColor: "#1e40af" }}
              >
                Submit
              </button>
            </div>
          </div>
        </form>
      </div>

      {/* ⭐ SEARCH CIN MODAL */}
      {showSearchModal && (
        <div className="modal fade show d-block" style={{ backgroundColor: "rgba(0,0,0,0.5)", zIndex: 4000 }}>
          <div className="modal-dialog modal-dialog-centered modal-lg">
            <div className="modal-content border-0 shadow-lg" style={{ borderRadius: "8px" }}>
              <div className="modal-header border-bottom p-3">
                <h6 className="modal-title fw-semibold">Search CIN</h6>
                <button type="button" className="btn-close" onClick={() => setShowSearchModal(false)}></button>
              </div>
              <div className="modal-body p-4" style={{ minHeight: "300px" }}>
                <form onSubmit={handleSearchSubmit}>
                  <div className="row g-3 align-items-center">
                    <div className="col-md-8">
                      <input 
                        type="text" 
                        className="form-control bg-light border-0 py-2 shadow-none" 
                        placeholder="Company/LLP Name"
                        value={searchData.companyName}
                        onChange={(e) => setSearchData({ ...searchData, companyName: e.target.value })}
                      />
                    </div>
                    <div className="col-md-4">
                      <button type="submit" className="btn border px-4 py-2 bg-white text-dark fw-semibold">Submit</button>
                    </div>
                  </div>
                </form>

                <div className="mt-4 pt-4 border-top">
                  {/* Result area with horizontal scrollbar would go here as seen in screenshot */}
                  <div className="position-relative overflow-hidden" style={{ height: "40px", background: "#f8f9fa", borderRadius: "4px" }}>
                     <div className="position-absolute bottom-0 w-100 bg-secondary opacity-25" style={{ height: "4px" }}></div>
                     <div className="position-absolute bottom-0 bg-secondary" style={{ height: "4px", width: "80%", left: "10%", cursor: "pointer" }}></div>
                  </div>
                </div>
              </div>
              <div className="modal-footer border-0 p-3 bg-light d-flex justify-content-end">
                <button className="btn btn-link text-secondary p-0" onClick={() => setShowSearchModal(false)}>
                  <i className="bi bi-x-lg fs-5"></i>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
