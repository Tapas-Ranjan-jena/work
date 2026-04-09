import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import mastersService from "../../../../services/mastersService";
import toast from "react-hot-toast";

export default function DebentureHolderList(){

  const navigate = useNavigate();
  const [holders, setHolders] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [pagination, setPagination] = useState({ page: 1, limit: 10, total: 0 });

  const fetchHolders = async (page = 1) => {
    try {
      setLoading(true);
      const res = await mastersService.getDebentureHolders({ page, limit: pagination.limit, search });
      setHolders(res.data || []);
      setPagination(prev => ({ ...prev, page, total: res.pagination?.total || 0 }));
    } catch (error: any) {
      toast.error(error.message || "Failed to load debenture holders");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (!window.confirm("Are you sure you want to delete this debenture holder?")) return;
    try {
      await mastersService.deleteDebentureHolder(id);
      toast.success("Debenture holder deleted successfully");
      fetchHolders(pagination.page);
    } catch (error: any) {
      toast.error(error.message || "Failed to delete debenture holder");
    }
  };

  useEffect(() => {
    fetchHolders(pagination.page);
  }, [pagination.page, search]);

  return(
    <div className="container-fluid">

      <div className="card p-3">

        {/* ================= BREADCRUMB ================= */}
        <small className="text-muted d-block border-bottom pb-2 mb-3">
          <span className="text-primary">Home</span> / Debenture holder's Master
        </small>

        {/* ================= ACTION BUTTON ROW (ABOVE TITLE) ================= */}
        <div className="d-flex justify-content-end gap-2 mb-1">

          <button
            onClick={()=>navigate("/masters/debenture-holder/company-wise")}
            className="btn btn-sm"
            style={{background:"#2E388E",color:"#fff"}}
          >
            Company wise Debenture holder’s list
          </button>

          <button
            onClick={()=>navigate("/masters/debenture-holder/add")}
            className="btn btn-sm"
            style={{background:"#2E388E",color:"#fff"}}
          >
            + Add Debenture holder
          </button>

        </div>

        {/* ================= TITLE ================= */}
        <h6 className="m-0 mb-2">
          Debenture holder's List
        </h6>

        {/* ================= SHOW ROWS + SEARCH ================= */}
        <div className="d-flex justify-content-between mb-2">
          <div className="d-flex gap-2">
            <button className="btn btn-light btn-sm">Show 10 rows</button>
            <button className="btn btn-light btn-sm">Excel</button>
          </div>

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

        {/* ================= TABLE ================= */}
        <div style={{overflowX:"auto"}}>
          <table className="table table-bordered">
            <thead>
              <tr>
                <th>#</th>
                <th>Name of the Debenture holder</th>
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
              ) : holders.length === 0 ? (
                <tr>
                  <td colSpan={7} className="text-center py-4 text-muted">No data available in table</td>
                </tr>
              ) : (
                holders.map((s, i) => (
                  <tr key={s.id || i}>
                    <td>{(pagination.page - 1) * pagination.limit + i + 1}</td>
                    <td>{s.debentureHolderName || s.name || "-"}</td>
                    <td>{s.fatherName || "-"}</td>
                    <td>{s.category || "-"}</td>
                    <td>{s.subCategory || "-"}</td>
                    <td>{s.underSubCategory || "-"}</td>
                    <td>
                      <button className="btn btn-sm btn-light border me-1" onClick={() => navigate(`/masters/debenture-holder/edit/${s.id}`)}>
                        <i className="bi bi-pencil"></i> Edit
                      </button>
                      <button className="btn btn-sm btn-light border text-danger" onClick={() => s.id && handleDelete(s.id)}>
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
        <div className="d-flex justify-content-between mt-2">
          <small>Showing {holders.length === 0 ? 0 : (pagination.page - 1) * pagination.limit + 1} to {Math.min(pagination.page * pagination.limit, pagination.total)} of {pagination.total} entries</small>

          <div className="d-flex gap-2">
            <button className="btn btn-light btn-sm" disabled={pagination.page === 1} onClick={() => setPagination(p => ({...p, page: p.page - 1}))}>Previous</button>
            <button className="btn btn-light btn-sm" disabled={pagination.page * pagination.limit >= pagination.total} onClick={() => setPagination(p => ({...p, page: p.page + 1}))}>Next</button>
          </div>
        </div>

      </div>
    </div>
  )
}