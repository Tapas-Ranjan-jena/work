import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"
import mastersService from "../../../../services/mastersService";
import toast from "react-hot-toast";

export default function DirectorsList() {

  const navigate = useNavigate()
  
  const [directors, setDirectors] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [pagination, setPagination] = useState({ page: 1, limit: 10, total: 0 });

  const fetchDirectors = async (page = 1) => {
    try {
      setLoading(true);
      const res = await mastersService.getDirectors({ search });
      const data = res || [];
      // Calculate frontend pagination
      const start = (page - 1) * pagination.limit;
      const paginatedData = data.slice(start, start + pagination.limit);
      setDirectors(paginatedData);
      setPagination(prev => ({ ...prev, page, total: data.length }));
    } catch (error: any) {
      toast.error(error.message || "Failed to load directors");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDirectors(1);
  }, [search]);

  return (
    <div className="container-fluid">

      <div className="card p-3">

        <small className="text-muted">
          Home / Director & KMP
        </small>

        <div className="d-flex justify-content-between align-items-center mt-2 mb-3 flex-wrap gap-2">

          <h6 className="m-0">Directors Details</h6>

          <div className="d-flex gap-2 flex-wrap">

            <button
              onClick={()=>navigate("/masters/director-kmp/dir8-mbp1")}
              className="btn btn-sm"
              style={{background:"#2E388E",color:"white"}}
            >
              DIR-8 / MBP-1
            </button>

            <button
              onClick={()=>navigate("/masters/director-kmp/inactive")}
              className="btn btn-sm"
              style={{background:"#2E388E",color:"white"}}
            >
              Inactive Director List
            </button>

            <button
              onClick={()=>navigate("/masters/director-kmp/company-wise")}
              className="btn btn-sm"
              style={{background:"#2E388E",color:"white"}}
            >
              Company wise directors List
            </button>

            <button
              onClick={()=>navigate("/masters/director-kmp/add-director")}
              className="btn btn-sm"
              style={{background:"#2E388E",color:"white"}}
            >
              + Add Director
            </button>

            <button
              onClick={()=>navigate("/masters/director-kmp/add-kmp")}
              className="btn btn-sm"
              style={{background:"#2E388E",color:"white"}}
            >
              + Add KMP
            </button>

          </div>

        </div>

        <div className="d-flex justify-content-between mb-2">

          <div className="d-flex gap-2">
            <button className="btn btn-light btn-sm">Show 10 rows</button>
            <button className="btn btn-light btn-sm">Excel</button>
          </div>

          <div style={{ position:"relative" }}>
            <i
              className="bi bi-search"
              style={{
                position:"absolute",
                left:"10px",
                top:"50%",
                transform:"translateY(-50%)",
                fontSize:"13px",
                color:"#888",
                pointerEvents:"none"
              }}
            />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="form-control form-control-sm"
              placeholder="Search"
              style={{
                width:"180px",
                paddingLeft:"28px"
              }}
            />
          </div>

        </div>

        <div style={{overflowX:"auto"}}>
          <table className="table table-bordered">
            <thead>
              <tr>
                <th>#</th>
                <th>Company Name</th>
                <th>DIN</th>
                <th>Email</th>
                <th>Contact No.</th>
                <th>DSC Expiry</th>
                <th>DIN Status</th>
                <th>DIR-3 KYC Status</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr><td colSpan={8} className="text-center py-4 text-muted">Loading directors...</td></tr>
              ) : directors.length === 0 ? (
                <tr><td colSpan={8} className="text-center py-4 text-muted">No data available in table</td></tr>
              ) : (
                directors.map((d, i) => (
                  <tr key={d.id || i}>
                    <td>{(pagination.page - 1) * pagination.limit + i + 1}</td>
                    <td>{d.companyName || "-"}</td>
                    <td>{d.din || "-"} // {d.name || ""}</td>
                    <td>{d.email || d.emailId || "-"}</td>
                    <td>{d.contactNo || d.mobile || d.phone || "-"}</td>
                    <td>{d.dscExpiry ? d.dscExpiry.split("T")[0] : "-"}</td>
                    <td>{d.dinStatus || d.status || "-"}</td>
                    <td>{d.dir3KycStatus || "-"}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        <div className="d-flex justify-content-between align-items-center mt-2">
          <small className="text-muted">
            Showing {directors.length === 0 ? 0 : (pagination.page - 1) * pagination.limit + 1} to {Math.min(pagination.page * pagination.limit, pagination.total)} of {pagination.total} entries
          </small>
          
          <div className="d-flex gap-2">
            <button className="btn btn-light btn-sm" disabled={pagination.page === 1} onClick={() => {
                setPagination(p => ({...p, page: p.page - 1}));
                fetchDirectors(pagination.page - 1);
            }}>Previous</button>
            <button className="btn btn-light btn-sm" disabled={pagination.page * pagination.limit >= pagination.total} onClick={() => {
                setPagination(p => ({...p, page: p.page + 1}));
                fetchDirectors(pagination.page + 1);
            }}>Next</button>
          </div>
        </div>

      </div>

    </div>
  )
}