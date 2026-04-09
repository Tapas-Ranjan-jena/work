import { useState, useEffect } from "react";
import { useOutletContext } from "react-router-dom"
import PageTopBar from "../../../components/common/PageTopBar"
import mastersService from "../../../services/mastersService";
import toast from "react-hot-toast";

export default function RequestedDocuments() {

  // ⭐ RECEIVE SIDEBAR CONTROL FROM DASHBOARD LAYOUT
  const { setOpen } = useOutletContext<any>()
  
  const [documents, setDocuments] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [pagination, setPagination] = useState({ page: 1, limit: 10, total: 0 });

  const fetchDocuments = async (page = 1) => {
    try {
      setLoading(true);
      const res = await mastersService.getRequestedDocuments({ search, page, limit: pagination.limit });
      setDocuments(res.data || []);
      setPagination(prev => ({ ...prev, page, total: res.pagination?.total || 0 }));
    } catch (error: any) {
      toast.error(error.message || "Failed to load requested documents");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDocuments(pagination.page);
  }, [pagination.page, search]);

  return (
    <div className="container-fluid">

      {/* ⭐ REUSABLE TOP BAR */}
      <PageTopBar onMenuClick={() => setOpen((prev:boolean) => !prev)} />

      <div className="card p-3">

        <small className="text-muted mb-2">
          Home / Requested Documents
        </small>

        <h6 className="mb-3">Requested Documents</h6>

        <div className="d-flex justify-content-end mb-2">
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="form-control form-control-sm"
            placeholder="Search"
            style={{ width: "180px" }}
          />
        </div>

        <div style={{ overflowX: "auto" }}>
          <table className="table table-bordered mb-0">
            <thead>
              <tr>
                <th>#</th>
                <th>Requested by</th>
                <th>Requested on</th>
                <th>Company Name</th>
                <th>Financial Year</th>
                <th>File Name</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>
              {loading ? (
                <tr><td colSpan={7} className="text-center py-4 text-muted">Loading documents...</td></tr>
              ) : documents.length === 0 ? (
                <tr><td colSpan={7} className="text-center py-4 text-muted">No data available in table</td></tr>
              ) : (
                documents.map((d, i) => (
                  <tr key={d.id || i}>
                    <td>{(pagination.page - 1) * pagination.limit + i + 1}</td>
                    <td>{d.requestedBy || "-"}</td>
                    <td>{d.requestedOn ? d.requestedOn.split("T")[0] : "-"}</td>
                    <td>{d.companyName || "-"}</td>
                    <td>{d.financialYear || "-"}</td>
                    <td>{d.fileName || "-"}</td>
                    <td>
                      <button className="btn btn-sm btn-light border me-1"><i className="bi bi-eye"></i></button>
                      <button className="btn btn-sm btn-light border"><i className="bi bi-download"></i></button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        <div className="d-flex justify-content-between align-items-center mt-2">
          <small className="text-muted">
            Showing {documents.length === 0 ? 0 : (pagination.page - 1) * pagination.limit + 1} to {Math.min(pagination.page * pagination.limit, pagination.total)} of {pagination.total} entries
          </small>
          
          <div className="d-flex gap-2">
            <button className="btn btn-light btn-sm" disabled={pagination.page === 1} onClick={() => setPagination(p => ({...p, page: p.page - 1}))}>Previous</button>
            <button className="btn btn-light btn-sm" disabled={pagination.page * pagination.limit >= pagination.total} onClick={() => setPagination(p => ({...p, page: p.page + 1}))}>Next</button>
          </div>
        </div>

      </div>

    </div>
  )
}
