import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import mastersService from "../../../../services/mastersService";
import toast from "react-hot-toast";

export default function ShareholderList(){

  const navigate = useNavigate();
  const [shareholders, setShareholders] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [pagination, setPagination] = useState({ page: 1, limit: 10, total: 0 });

  const fetchShareholders = async (page = 1) => {
    try {
      setLoading(true);
      const res = await mastersService.getShareholders({ page, limit: pagination.limit, search });
      setShareholders(res.data || []);
      setPagination(prev => ({ ...prev, page, total: res.pagination?.total || 0 }));
    } catch (error: any) {
      toast.error(error.message || "Failed to load shareholders");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (!window.confirm("Are you sure you want to delete this shareholder?")) return;
    try {
      await mastersService.deleteShareholder(id);
      toast.success("Shareholder deleted successfully");
      fetchShareholders(pagination.page);
    } catch (error: any) {
      toast.error(error.message || "Failed to delete shareholder");
    }
  };

  useEffect(() => {
    fetchShareholders(pagination.page);
  }, [pagination.page, search]);

  return(

    <div className="container-fluid">

      <div className="card p-3">

        <small className="text-muted">
          Home / Shareholder
        </small>

        <h6 className="mt-2">Shareholder List</h6>

        {/* ================= HEADER ACTIONS ================= */}
        <div className="d-flex justify-content-between align-items-center mb-2 flex-wrap gap-2">

          <div className="d-flex gap-2">
            <button className="btn btn-light btn-sm">Show 10 rows</button>
            <button className="btn btn-light btn-sm">Excel</button>
          </div>

          <div className="d-flex gap-2 flex-wrap">

            <button
              onClick={()=>navigate("/masters/shareholder/company-wise")}
              className="btn btn-sm"
              style={{background:"#2E388E",color:"#fff"}}
            >
              Company wise shareholder’s list
            </button>

            <button
              onClick={()=>navigate("/masters/shareholder/add")}
              className="btn btn-sm"
              style={{background:"#2E388E",color:"#fff"}}
            >
              + Add Shareholder
            </button>

            <div style={{position:"relative"}}>
              <i
                className="bi bi-search"
                style={{
                  position:"absolute",
                  left:"10px",
                  top:"50%",
                  transform:"translateY(-50%)",
                  fontSize:"13px",
                  color:"#888"
                }}
              />
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="form-control form-control-sm"
                placeholder="Search"
                style={{width:"180px",paddingLeft:"28px"}}
              />
            </div>

          </div>

        </div>

        {/* ================= TABLE ================= */}
        <div style={{overflowX:"auto"}}>
          <table className="table table-bordered">
            <thead>
              <tr>
                <th>#</th>
                <th>Shareholder Name</th>
                <th>Father's Name</th>
                <th>Category</th>
                <th>Sub Category</th>
                <th>Under Sub Category</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>
              {loading ? (
                <tr>
                  <td colSpan={7} className="text-center py-4 text-muted">Loading...</td>
                </tr>
              ) : shareholders.length === 0 ? (
                <tr>
                  <td colSpan={7} className="text-center py-4 text-muted">No data available in table</td>
                </tr>
              ) : (
                shareholders.map((s, i) => (
                  <tr key={s.id || i}>
                    <td>{(pagination.page - 1) * pagination.limit + i + 1}</td>
                    <td>{s.shareholderName || s.name || "-"}</td>
                    <td>{s.fatherName || "-"}</td>
                    <td>{s.category || "-"}</td>
                    <td>{s.subCategory || "-"}</td>
                    <td>{s.underSubCategory || "-"}</td>
                    <td>
                      <button 
                        className="btn btn-sm btn-light border me-1"
                        onClick={() => navigate(`/masters/shareholder/edit/${s.id}`)}
                      >
                        <i className="bi bi-pencil"></i> Edit
                      </button>
                      <button 
                        className="btn btn-sm btn-light border text-danger"
                        onClick={() => s.id && handleDelete(s.id)}
                      >
                        <i className="bi bi-trash"></i>
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* ================= FOOTER ================= */}
        <div className="d-flex justify-content-between align-items-center mt-2">

          <small>Showing {shareholders.length === 0 ? 0 : (pagination.page - 1) * pagination.limit + 1} to {Math.min(pagination.page * pagination.limit, pagination.total)} of {pagination.total} entries</small>

          <div className="d-flex gap-2">
            <button className="btn btn-light btn-sm" disabled={pagination.page === 1} onClick={() => setPagination(p => ({...p, page: p.page - 1}))}>Previous</button>
            <button className="btn btn-light btn-sm" disabled={pagination.page * pagination.limit >= pagination.total} onClick={() => setPagination(p => ({...p, page: p.page + 1}))}>Next</button>
          </div>

        </div>

      </div>

    </div>
  )
}