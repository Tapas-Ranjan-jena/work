import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import companyService from "../../../../services/companyService";

export default function CheckCompanyName() {
  const navigate = useNavigate();
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);

  useEffect(() => {
    const fetchCompanies = async () => {
      if (!query.trim()) {
        setResults([]);
        setHasSearched(false);
        return;
      }

      setLoading(true);
      setHasSearched(true);
      try {
        const res = await companyService.searchCompany(query);
        if (res.success) {
          setResults(res.data);
        } else {
          setResults([]);
        }
      } catch (error) {
        console.error("Error searching companies:", error);
        setResults([]);
      } finally {
        setLoading(false);
      }
    };

    const debounceSearch = setTimeout(() => {
      fetchCompanies();
    }, 500);

    return () => clearTimeout(debounceSearch);
  }, [query]);

  return (
    <div className="card border-0 p-3">

      {/* ⭐ TOP ROW (BACK + DASHBOARD STYLE) */}
      <div className="d-flex justify-content-end mb-3">
        <button
          onClick={() => navigate("/incorporation/run-llp")}
          className="btn btn-sm d-flex align-items-center gap-2 text-white"
          style={{ background:"#2E388E" }}
        >
          {/* ⭐ CIRCLE ARROW */}
          <span
            className="d-flex align-items-center justify-content-center"
            style={{
              width:"20px",
              height:"20px",
              borderRadius:"50%",
              background:"rgba(255,255,255,0.2)"
            }}
          >
            <i className="bi bi-arrow-left"></i>
          </span>

          Back
        </button>
      </div>

      {/* ⭐ TITLE ROW */}
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h6 className="fw-semibold m-0">Check Company/LLP Name</h6>

        <small className="text-danger">
          50 free credits available /50 used.
        </small>
      </div>

      {/* ⭐ SEARCH INPUT */}
      <div className="position-relative mb-3">
        <input
          className="form-control form-control-sm pe-5"
          placeholder="Enter Company Name/LLP"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <i className="bi bi-search position-absolute top-50 end-0 translate-middle-y me-3"></i>
      </div>

      {/* ⭐ SEARCH RESULTS */}
      <div className="search-results">
        {loading && <div className="text-muted small">Searching...</div>}
        
        {!loading && hasSearched && results.length === 0 && (
          <div className="text-muted small">No companies found for "{query}".</div>
        )}

        {!loading && results.length > 0 && (
          <div className="list-group list-group-flush border rounded">
            {results.map((company, index) => (
              <div key={index} className="list-group-item d-flex justify-content-between align-items-start p-3">
                <div className="ms-2 me-auto">
                  <div className="fw-bold">{company.companyName || company.name || "Unknown"}</div>
                  <small className="text-muted">{company.cin || company.llpin || ""}</small>
                </div>
                <span className="badge bg-primary rounded-pill">{company.status || "Active"}</span>
              </div>
            ))}
          </div>
        )}
      </div>

    </div>
  );
}