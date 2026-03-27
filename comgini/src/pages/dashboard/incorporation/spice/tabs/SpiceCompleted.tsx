import { useState, useEffect } from "react";
import formsService from "../../../../../services/formsService";

export default function SpiceCompleted() {
  const [forms, setForms] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [search, setSearch] = useState<string>("");
  const [page, setPage] = useState<number>(1);
  const [pagination, setPagination] = useState({ limit: 10, total: 0 });

  useEffect(() => {
    const fetchForms = async () => {
      setLoading(true);
      try {
        const res = await formsService.getForms("SPICE", "completed", page, pagination.limit, search);
        if (res.success) {
          setForms(res.data);
          setPagination(res.pagination);
        }
      } catch (error) {
        console.error("Error fetching SPICE completed forms:", error);
      } finally {
        setLoading(false);
      }
    };

    const debounceSearch = setTimeout(() => {
      fetchForms();
    }, 500);

    return () => clearTimeout(debounceSearch);
  }, [page, search]);

  const totalPages = Math.ceil(pagination.total / pagination.limit) || 1;

  const handleNext = () => {
    if (page < totalPages) setPage(p => p + 1);
  };

  const handlePrev = () => {
    if (page > 1) setPage(p => p - 1);
  };

  return (
    <div>

      <div className="d-flex justify-content-end mb-2">
        <div className="position-relative" style={{maxWidth:"240px",width:"100%"}}>
          <input 
            className="form-control form-control-sm ps-4" 
            placeholder="Search"
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setPage(1);
            }}
          />
          <i className="bi bi-search position-absolute top-50 start-0 translate-middle-y ms-2"></i>
        </div>
      </div>

      <div className="table-responsive">
        <table className="table table-bordered align-middle">
          <thead>
            <tr>
              <th>Sr. No.</th>
              <th>LLP Name</th>
              <th>Purpose</th>
              <th>SRN</th>
              <th>MCA User</th>
              <th>Last Submitted</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {loading ? (
              <tr>
                <td colSpan={7} className="text-center">Loading...</td>
              </tr>
            ) : forms.length === 0 ? (
              <tr>
                <td colSpan={7} className="text-center">Completed Forms</td>
              </tr>
            ) : (
              forms.map((form, index) => (
                <tr key={index}>
                  <td>{(page - 1) * pagination.limit + index + 1}</td>
                  <td>{form.llpName || "-"}</td>
                  <td>{form.purpose || "-"}</td>
                  <td>{form.srn || "-"}</td>
                  <td>{form.mcaUser || "-"}</td>
                  <td>{form.lastSubmitted || "-"}</td>
                  <td>
                    <button className="btn btn-sm btn-light border">View</button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>

        <div className="d-flex justify-content-between mt-2">
          <small>
            Showing {forms.length > 0 ? (page - 1) * pagination.limit + 1 : 0} to{" "}
            {Math.min(page * pagination.limit, pagination.total)} of {pagination.total} entries
          </small>
          <div>
            <button 
              className="btn btn-sm btn-light border me-2" 
              onClick={handlePrev} 
              disabled={page === 1 || loading}
            >
              Previous
            </button>
            <button 
              className="btn btn-sm btn-light border" 
              onClick={handleNext} 
              disabled={page >= totalPages || loading}
            >
              Next
            </button>
          </div>
        </div>
      </div>

    </div>
  );
}