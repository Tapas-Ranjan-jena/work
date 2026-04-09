import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import secretarialService from "../../../services/secretarialService";
import mastersService from "../../../services/mastersService";


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

  const [filings, setFilings] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [listLoading, setListLoading] = useState(false);
  const [pagination, setPagination] = useState({ page: 1, limit: 10, total: 0 });
  const [mcaUsers, setMcaUsers] = useState<any[]>([]);
  const [companies, setCompanies] = useState<any[]>([]);
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [searching, setSearching] = useState(false);

  const fetchInitialData = async () => {
    try {
      const [usersRes, compRes] = await Promise.all([
        secretarialService.getMcaV2Users(),
        mastersService.getCompanies(1, 100)
      ]);
      setMcaUsers(usersRes.data || []);
      setCompanies(compRes.data || []);
    } catch (e) {
      console.error("Failed to fetch initial data", e);
    }
  };


  const fetchFilings = async (page = 1) => {
    try {
      setListLoading(true);
      const res = await secretarialService.getAnnualFilingList({ page, limit: pagination.limit });
      const items = res.data?.data || res.data?.items || res.data || [];
      setFilings(Array.isArray(items) ? items : []);
      setPagination(prev => ({ ...prev, page, total: res.pagination?.total || res.data?.total || items.length }));

    } catch (e: any) {
      toast.error(e.message || "Failed to load filings list");
    } finally {
      setListLoading(false);
    }
  };

  useEffect(() => {
    fetchInitialData();
    fetchFilings(pagination.page);
  }, [pagination.page]);


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.mcaUser && !formData.company && !formData.cin) {
       toast.error("Please provide information to check status");
       return;
    }
    try {
      setLoading(true);
      await secretarialService.checkAnnualFilingStatus({
         mcaUser: formData.mcaUser,
         companyId: formData.company,
         cin: formData.cin
      });
      toast.success("Filing status request submitted");
      setFormData({ mcaUser: "", company: "", cin: "" });
      fetchFilings(1);
    } catch (error: any) {
      toast.error(error.message || "Failed to submit request");
    } finally {
      setLoading(false);
    }
  };

  const handleSearchSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchData.companyName) return;
    try {
      setSearching(true);
      const results = await mastersService.searchMCACompanies(searchData.companyName);
      setSearchResults(results);
      if (results.length === 0) {
        toast.error("No companies found");
      }
    } catch (e) {
      toast.error("Failed to search companies");
    } finally {
      setSearching(false);
    }
  };

  const selectCompanyFromSearch = (company: any) => {
    setFormData({
      ...formData,
      cin: company.cin || company.registration_number || "",
      company: company.id || ""
    });
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
                {mcaUsers.map(u => (
                  <option key={u.id} value={u.id}>{u.username || u.label || u.firstName || u.email}</option>
                ))}
              </select>

            </div>
            <div className="col-md-3">
              <select 
                className="form-select bg-light border-0 py-2 shadow-none"
                value={formData.company}
                onChange={(e) => setFormData({ ...formData, company: e.target.value })}
              >
                <option value="">Select Company</option>
                {companies.map(c => (
                  <option key={c.id} value={c.id}>{c.name || c.companyName}</option>
                ))}
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
                disabled={loading}
              >
                {loading ? "Submitting..." : "Submit"}
              </button>
            </div>
          </div>
        </form>
      </div>

      {/* ⭐ FILINGS LIST */}
      <div className="card shadow-sm border-0 p-4 mt-4">
        <h6 className="fw-bold mb-4">Annual Filing Requests List</h6>
        <div style={{ overflowX: "auto" }}>
          <table className="table table-bordered mb-0">
            <thead>
              <tr>
                <th>#</th>
                <th>MCA User</th>
                <th>CIN</th>
                <th>Status</th>
                <th>Created At</th>
              </tr>
            </thead>
            <tbody>
              {listLoading ? (
                <tr><td colSpan={5} className="text-center py-4 text-muted">Loading filings...</td></tr>
              ) : filings.length === 0 ? (
                <tr><td colSpan={5} className="text-center py-4 text-muted">No filings found</td></tr>
              ) : (
                filings.map((f, i) => (
                  <tr key={f.id || i}>
                    <td>{(pagination.page - 1) * pagination.limit + i + 1}</td>
                    <td>{f.mca_user || "-"}</td>
                    <td>{f.cin || "-"}</td>
                    <td>
                      <span className={`badge ${f.status === 'pending' ? 'bg-warning text-dark' : 'bg-success'}`}>
                        {f.status || f.result_json?.status || "-"}
                      </span>
                    </td>
                    <td>{f.created_at ? new Date(f.created_at).toLocaleDateString() : "-"}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
        <div className="d-flex justify-content-between align-items-center mt-3">
          <small className="text-muted">
            Showing {filings.length === 0 ? 0 : (pagination.page - 1) * pagination.limit + 1} to {Math.min(pagination.page * pagination.limit, pagination.total)} of {pagination.total} entries
          </small>
          <div className="d-flex gap-2">
            <button className="btn btn-light btn-sm" disabled={pagination.page === 1} onClick={() => setPagination(p => ({...p, page: p.page - 1}))}>Previous</button>
            <button className="btn btn-light btn-sm" disabled={pagination.page * pagination.limit >= pagination.total} onClick={() => setPagination(p => ({...p, page: p.page + 1}))}>Next</button>
          </div>
        </div>
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
                  {searching ? (
                    <div className="text-center py-4 text-muted small">Searching...</div>
                  ) : searchResults.length === 0 ? (
                    <div className="text-center py-4 text-muted small">Enter company name to search</div>
                  ) : (
                    <div className="table-responsive" style={{ maxHeight: "300px" }}>
                      <table className="table table-sm table-hover small">
                        <thead>
                          <tr>
                            <th>CIN</th>
                            <th>Company Name</th>
                            <th>Action</th>
                          </tr>
                        </thead>
                        <tbody>
                          {searchResults.map((r, i) => (
                            <tr key={i}>
                              <td>{r.cin}</td>
                              <td>{r.name}</td>
                              <td>
                                <button 
                                  className="btn btn-sm btn-outline-primary py-0"
                                  onClick={() => selectCompanyFromSearch(r)}
                                >
                                  Select
                                </button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}
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
