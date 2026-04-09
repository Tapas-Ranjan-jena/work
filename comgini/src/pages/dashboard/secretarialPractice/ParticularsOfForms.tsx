import { useState, useEffect } from "react";
import secretarialService from "../../../services/secretarialService";

export default function ListOfForms() {
  const [forms, setForms] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [pagination, setPagination] = useState({ page: 1, limit: 10, total: 0 });
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    fetchForms();
  }, [pagination.page, searchQuery]);

  const fetchForms = async () => {
    try {
      setLoading(true);
      const res = await secretarialService.getCompanyCredentials({ 
        search: searchQuery, 
        page: pagination.page, 
        limit: pagination.limit 
      });
      const items = res.data?.data || res.data?.items || res.data || [];
      setForms(Array.isArray(items) ? items : []);
      setPagination(prev => ({ ...prev, total: res.pagination?.total || res.data?.total || items.length }));
    } catch (error) {
      console.error("Failed to fetch forms", error);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateStr?: string) => {
    if (!dateStr) return "-";
    return new Date(dateStr).toLocaleDateString('en-GB'); // dd/mm/yyyy
  };

  return (
    <div className="list-of-forms p-2 p-md-4 text-start">
      {/* ⭐ BREADCRUMBS */}
      <nav aria-label="breadcrumb" className="mb-4">
        <ol className="breadcrumb mb-0 small">
          <li className="breadcrumb-item"><a href="#" className="text-decoration-none text-primary">Home</a></li>
          <li className="breadcrumb-item active" aria-current="page">List of Forms</li>
        </ol>
      </nav>

      <div className="card shadow-sm border-0 p-3 p-md-4">
         <h4 className="fw-bold mb-4">List of Forms</h4>

         <div className="d-flex flex-column flex-md-row justify-content-between align-items-start align-items-md-center mb-3 gap-3">
            <div className="d-flex flex-wrap gap-2 w-100 w-md-auto">
               <button className="btn btn-outline-secondary btn-sm bg-white border flex-fill flex-md-grow-0">Show {pagination.limit} rows</button>
               <button className="btn btn-outline-secondary btn-sm bg-white border px-3 flex-fill flex-md-grow-0">Excel</button>
            </div>
            <div className="d-flex align-items-center gap-2 small w-100 w-md-auto">
               <span className="text-nowrap">Search:</span> 
               <input 
                type="text" 
                className="form-control form-control-sm border w-100" 
                style={{ maxWidth: "220px" }} 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search forms..."
              />
            </div>
         </div>

         <div className="table-responsive border rounded overflow-auto">
           <table className="table table-hover mb-0" style={{ fontSize: "10.5px" }}>
             <thead style={{ background: "#94a3b8", color: "white" }}>
               <tr className="align-middle text-nowrap">
                 <th className="px-1 py-2 text-center border-end" style={{ minWidth: "50px" }}>Sr. No.</th>
                 <th className="px-2 py-2 border-end" style={{ minWidth: "250px" }}>Company Name</th>
                 <th className="px-2 py-2 border-end text-center" style={{ minWidth: "150px" }}>Form Name</th>
                 <th className="px-2 py-2 border-end text-center" style={{ minWidth: "150px" }}>Team Member</th>
                 <th className="px-2 py-2 border-end text-center" style={{ minWidth: "120px" }}>Start Date</th>
                 <th className="px-2 py-2 border-end text-center" style={{ minWidth: "150px" }}>Last Updated date</th>
                 <th className="px-2 py-2 border-end text-center" style={{ minWidth: "100px" }}>Status</th>
                 <th className="px-2 py-2 border-end text-center" style={{ minWidth: "150px" }}>MCA User ID</th>
                 <th className="px-2 py-2 border-end text-center" style={{ minWidth: "150px" }}>SRN</th>
                 <th className="px-2 py-2 border-end text-center" style={{ minWidth: "120px" }}>MCA Status</th>
                 <th className="px-2 py-2" style={{ minWidth: "80px" }}>Action</th>
               </tr>
             </thead>
             <tbody>
               {loading ? (
                 <tr><td colSpan={11} className="text-center py-4 text-muted small border-bottom-0">Loading forms...</td></tr>
               ) : forms.length === 0 ? (
                 <tr><td colSpan={11} className="text-center py-4 text-muted small border-bottom-0">No data available in table</td></tr>
               ) : (
                 forms.map((f, i) => (
                   <tr key={f.id || i} className="align-middle">
                     <td className="text-center">{(pagination.page - 1) * pagination.limit + i + 1}</td>
                     <td className="text-start">{f.companyName || f.company_name || "-"}</td>
                     <td className="text-center">{f.formName || f.form_name || "-"}</td>
                     <td className="text-center">{f.assignedToName || f.assigned_to_name || "-"}</td>
                     <td className="text-center">{formatDate(f.createdAt)}</td>
                     <td className="text-center">{formatDate(f.updatedAt)}</td>
                     <td className="text-center">
                        <span className={`badge ${f.status === 'Completed' ? 'bg-success' : 'bg-warning text-dark'}`}>
                          {f.status || "Pending"}
                        </span>
                     </td>
                     <td className="text-center">{f.userId || f.user_id || "-"}</td>
                     <td className="text-center">{f.srn || "-"}</td>
                     <td className="text-center">{f.mcaStatus || "-"}</td>
                     <td className="text-center">
                        <button className="btn btn-sm btn-link p-0 me-2"><i className="bi bi-pencil"></i></button>
                        <button className="btn btn-sm btn-link p-0 text-danger"><i className="bi bi-trash"></i></button>
                     </td>
                   </tr>
                 ))
               )}
             </tbody>
           </table>
         </div>

         <div className="d-flex flex-column flex-sm-row justify-content-between align-items-center mt-3 gap-3 small text-muted text-center text-sm-start">
            <div>Showing {(pagination.page - 1) * pagination.limit + 1} to {Math.min(pagination.page * pagination.limit, pagination.total)} of {pagination.total} entries</div>
            <div className="d-flex gap-0 align-items-center">
               <button 
                className="btn btn-outline-secondary btn-sm px-3 rounded-start shadow-none" 
                onClick={() => setPagination(prev => ({ ...prev, page: Math.max(1, prev.page - 1) }))}
                disabled={pagination.page === 1}
               >Previous</button>
               <button 
                className="btn btn-outline-secondary btn-sm px-3 rounded-end shadow-none" 
                onClick={() => setPagination(prev => ({ ...prev, page: prev.page + 1 }))}
                disabled={pagination.page * pagination.limit >= pagination.total}
               >Next</button>
            </div>
         </div>
      </div>
    </div>
  );
}

