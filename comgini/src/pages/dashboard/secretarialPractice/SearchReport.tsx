import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import secretarialService, { type SearchReportPayload } from "../../../services/secretarialService";

type ViewType = "list" | "add";
type TabType = "company" | "llp";

interface Signatory { id: number; name_designation: string; doa: string; din_pan: string; }
interface Shareholder { id: number; name: string; address: string; type: string; count: string; paid: string; total: string; }
interface Charge { id: number; charge_id: string; created: string; modified: string; secured_amount: string; short_particulars: string; holder_name: string; holder_address: string; }

export default function SearchReport() {
  const [view, setView] = useState<ViewType>("list");
  const [activeTab, setActiveTab] = useState<TabType>("company");
  const [reports, setReports] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [pagination, setPagination] = useState({ page: 1, limit: 10, total: 0 });

  // Form State
  const [formData, setFormData] = useState<Partial<SearchReportPayload>>({
    entity_type: "company",
    date_of_search: new Date().toISOString().split('T')[0],
    srn_mca_search: "",
    signed_by: "1",
    udin: "",
    date_of_signing: new Date().toISOString().split('T')[0],
    place_of_signing: "Mumbai",
    cin: "",
    company_name: "",
    registered_office: "",
    registration_number: "",
    authorized_capital: 0,
    paid_up_capital: 0,
    date_of_incorporation: "",
    date_of_last_agm: "",
    date_of_last_balance_sheet: "",
  });
  
  // Dynamic Table States
  const [signatories, setSignatories] = useState<Signatory[]>([{ id: 1, name_designation: "", doa: "", din_pan: "" }]);
  const [shareholders, setShareholders] = useState<Shareholder[]>([{ id: 1, name: "", address: "", type: "", count: "", paid: "", total: "" }]);
  const [charges, setCharges] = useState<Charge[]>([{ id: 1, charge_id: "", created: "", modified: "", secured_amount: "", short_particulars: "", holder_name: "", holder_address: "" }]);

  useEffect(() => {
    if (view === "list") {
      fetchReports();
    }
  }, [view, activeTab]);

  const fetchReports = async (page = 1) => {
    try {
      setLoading(true);
      const res = await secretarialService.getSearchReports({ type: activeTab, page, limit: pagination.limit });
      setReports(res.data || []);
      setPagination(prev => ({ ...prev, page, total: res.pagination?.total || 0 }));
    } catch (error) {
      console.error("Failed to fetch search reports", error);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async () => {
    try {
      setLoading(true);
      
      const payload: SearchReportPayload = {
        ...(formData as SearchReportPayload),
        entity_type: activeTab,
        signatories: signatories.map(({ id, ...rest }) => rest), // Keep original field names as they were mapped to underscores in state? 
        // Wait, signatories in state use underscores or spaces? 
        // signatories: [{ id: 1, name_designation: "", doa: "", din_pan: "" }]
        shareholders: shareholders.map(({ id, ...rest }) => rest),
        charges: charges.map(({ id, ...rest }) => rest),
      };

      await secretarialService.createSearchReport(payload);
      toast.success("Search report created successfully");
      setView("list");
      fetchReports();
    } catch (error: any) {
      toast.error(error.message || "Failed to create search report");
    } finally {
      setLoading(false);
    }
  };


  // Add/Remove Handlers
  const addSignatory = () => setSignatories([...signatories, { id: Date.now(), name_designation: "", doa: "", din_pan: "" }]);
  const removeSignatory = () => signatories.length > 1 && setSignatories(signatories.slice(0, -1));

  const addShareholder = () => setShareholders([...shareholders, { id: Date.now(), name: "", address: "", type: "", count: "", paid: "", total: "" }]);
  const removeShareholder = () => shareholders.length > 1 && setShareholders(shareholders.slice(0, -1));

  const addCharge = () => setCharges([...charges, { id: Date.now(), charge_id: "", created: "", modified: "", secured_amount: "", short_particulars: "", holder_name: "", holder_address: "" }]);
  const removeCharge = () => charges.length > 1 && setCharges(charges.slice(0, -1));

  return (
    <div className="search-report p-2 p-md-4 text-start">
      {/* ⭐ BREADCRUMBS */}
      <nav aria-label="breadcrumb" className="mb-4">
        <ol className="breadcrumb mb-0 small">
          <li className="breadcrumb-item"><a href="#" className="text-decoration-none text-primary" onClick={() => setView("list")}>Home</a></li>
          {view === "list" ? (
             <li className="breadcrumb-item active" aria-current="page">Search Report</li>
          ) : (
             <>
               <li className="breadcrumb-item"><a href="#" className="text-decoration-none text-primary" onClick={() => setView("list")}>Search Report</a></li>
               <li className="breadcrumb-item active" aria-current="page">Prepare Search Report</li>
             </>
          )}
        </ol>
      </nav>

      {/* ⭐ LIST VIEW */}
      {view === "list" && (
        <div className="card shadow-sm border-0 p-3 p-md-4">
            <h5 className="fw-bold mb-4">Secretarial Practice - Search Report</h5>
            
            <div className="d-flex border-bottom mb-4 overflow-auto flex-nowrap">
               <button className={`btn btn-link text-decoration-none px-4 py-2 small fw-bold text-nowrap ${activeTab === "company" ? "text-primary border-bottom border-3 border-primary" : "text-muted border-0"}`} onClick={() => setActiveTab("company")}>Company</button>
               <button className={`btn btn-link text-decoration-none px-4 py-2 small fw-bold text-nowrap ${activeTab === "llp" ? "text-primary border-bottom border-3 border-primary" : "text-muted border-0"}`} onClick={() => setActiveTab("llp")}>LLP</button>
            </div>

            <div className="d-flex flex-column flex-md-row justify-content-between align-items-start align-items-md-center mb-4 gap-3">
               <div className="d-flex flex-wrap gap-2 w-100 w-md-auto">
                  <button className="btn btn-outline-secondary btn-sm bg-white border px-3 flex-fill flex-md-grow-0">Show 10 rows</button>
                  <button className="btn btn-outline-secondary btn-sm bg-white border px-3 flex-fill flex-md-grow-0">Excel</button>
               </div>
               <button className="btn btn-primary btn-sm px-4 shadow-none w-100 w-md-auto py-2 py-md-1" style={{ background: "#2b4cb3" }} onClick={() => setView("add")}>+ Prepare Search Report</button>
            </div>

            <div className="table-responsive border rounded overflow-auto">
              <table className="table table-hover mb-0" style={{ fontSize: "11px" }}>
                <thead style={{ background: "#94a3b8", color: "white" }}>
                  <tr className="align-middle text-nowrap">
                    <th className="px-2 py-2 text-center border-end" style={{ minWidth: "40px" }}>Sr. No.</th>
                    <th className="px-2 py-2 border-end" style={{ minWidth: "250px" }}>Name of {activeTab === "company" ? "Company" : "LLP"}</th>
                    <th className="px-2 py-2 border-end text-center" style={{ minWidth: "150px" }}>Date of Report</th>
                    <th className="px-2 py-2 border-end text-center" style={{ minWidth: "150px" }}>SRN</th>
                    <th className="px-2 py-2 border-end text-center" style={{ minWidth: "150px" }}>Signed by</th>
                    <th className="px-2 py-2 border-end text-center" style={{ minWidth: "80px" }}>Action</th>
                    <th className="px-2 py-2 text-center" style={{ minWidth: "100px" }}>View/Download</th>
                  </tr>
                </thead>
                <tbody>
                   {loading ? (
                     <tr><td colSpan={7} className="text-center py-4 text-muted small border-bottom-0">Loading reports...</td></tr>
                   ) : reports.length === 0 ? (
                     <tr><td colSpan={7} className="text-center py-4 text-muted small border-bottom-0">No data available in table</td></tr>
                   ) : (
                     reports.map((r, idx) => (
                       <tr key={r.id || idx} className="align-middle text-nowrap">
                         <td className="text-center">{(pagination.page - 1) * pagination.limit + idx + 1}</td>
                         <td className="text-start">{r.payload?.company_name || r.company_name || r.companyName || r.name || "-"}</td>
                         <td className="text-center">{r.payload?.date_of_search || r.date_of_search || r.dateOfSearch || r.date || "-"}</td>
                         <td className="text-center">{r.payload?.srn_mca_search || r.srn_mca_search || r.srnMcaSearch || r.srn || "-"}</td>
                         <td className="text-center">{(r.payload?.signed_by_name || r.signed_by_name) || (r.payload?.signed_by || r.signed_by) || "-"}</td>
                         <td className="text-center">
                           <button className="btn btn-sm btn-outline-primary py-0">Edit</button>
                         </td>
                         <td className="text-center">
                           <button className="btn btn-sm btn-link"><i className="bi bi-download"></i></button>
                         </td>
                       </tr>
                     ))
                   )}
                </tbody>
              </table>
            </div>

            <div className="d-flex flex-column flex-sm-row justify-content-between align-items-center mt-3 gap-3 small text-muted text-center text-sm-start">
               <div>Showing 0 to 0 of 0 entries</div>
               <div className="d-flex gap-0 align-items-center">
                  <button className="btn btn-outline-secondary btn-sm px-3 rounded-start shadow-none">Previous</button>
                  <button className="btn btn-outline-secondary btn-sm px-3 rounded-end shadow-none">Next</button>
               </div>
            </div>
        </div>
      )}

      {/* ⭐ PREPARE FORM (Screenshot 1-3 Layout) */}
      {view === "add" && (
        <div className="card shadow-sm border-0 p-3 p-md-4">
            {/* Header */}
            <div className="d-flex flex-column flex-sm-row justify-content-between align-items-start align-items-sm-center mb-5 border-bottom pb-4 gap-3">
               <h5 className="fw-bold mb-0">Prepare Search Report</h5>
               <button className="btn btn-primary btn-sm px-4 d-flex align-items-center gap-2 shadow-sm w-100 w-sm-auto justify-content-center" 
                       style={{ background: "#2b4cb3", zIndex: 10 }} 
                       onClick={() => setView("list")}>
                  <i className="bi bi-arrow-left-circle"></i> Back
               </button>
            </div>

            <div className="row g-0 border rounded overflow-hidden mb-5">
               {/* Row 1: Search Date & SRN */}
               <div className="col-12 col-md-6 border-end border-bottom d-flex flex-column flex-sm-row align-items-stretch">
                  <div className="bg-light px-3 py-3 fw-bold small border-end d-flex align-items-center" style={{ minWidth: "180px" }}>Date of Search <span className="text-danger ms-1">*</span></div>
                  <div className="flex-grow-1 p-2"><input type="date" name="date_of_search" className="form-control form-control-sm border-0 shadow-none bg-transparent" value={formData.date_of_search} onChange={handleInputChange} /></div>
               </div>
               <div className="col-12 col-md-6 border-bottom d-flex flex-column flex-sm-row align-items-stretch">
                  <div className="bg-light px-3 py-3 fw-bold small border-end d-flex align-items-center" style={{ minWidth: "180px" }}>SRN of MCA Search <span className="text-danger ms-1">*</span></div>
                  <div className="flex-grow-1 p-2"><input type="text" name="srn_mca_search" className="form-control form-control-sm border-0 shadow-none bg-transparent" value={formData.srn_mca_search} onChange={handleInputChange} /></div>
               </div>

               {/* Row 2: Signed by & UDIN */}
               <div className="col-12 col-md-6 border-end border-bottom d-flex flex-column flex-sm-row align-items-stretch">
                  <div className="bg-light px-3 py-3 fw-bold small border-end d-flex align-items-center" style={{ minWidth: "180px" }}>Signed by <span className="text-danger ms-1">*</span></div>
                  <div className="flex-grow-1 p-2">
                     <select name="signed_by" className="form-select form-select-sm border-0 shadow-none bg-transparent" value={formData.signed_by} onChange={handleInputChange}>
                        <option value="1">Professional A</option>
                        <option value="2">Professional B</option>
                     </select>
                  </div>
               </div>
               <div className="col-12 col-md-6 border-bottom d-flex flex-column flex-sm-row align-items-stretch">
                  <div className="bg-light px-3 py-3 fw-bold small border-end d-flex align-items-center" style={{ minWidth: "180px" }}>UDIN <span className="text-danger ms-1">*</span></div>
                  <div className="flex-grow-1 p-2"><input type="text" name="udin" className="form-control form-control-sm border-0 shadow-none bg-transparent" value={formData.udin} onChange={handleInputChange} /></div>
               </div>

               {/* Row 3: Date & Place of Signing */}
               <div className="col-12 col-md-6 border-end border-bottom d-flex flex-column flex-sm-row align-items-stretch">
                  <div className="bg-light px-3 py-3 fw-bold small border-end d-flex align-items-center" style={{ minWidth: "180px" }}>Date of Signing <span className="text-danger ms-1">*</span></div>
                  <div className="flex-grow-1 p-2"><input type="date" name="date_of_signing" className="form-control form-control-sm border-0 shadow-none bg-transparent" value={formData.date_of_signing} onChange={handleInputChange} /></div>
               </div>
               <div className="col-12 col-md-6 border-bottom d-flex flex-column flex-sm-row align-items-stretch">
                  <div className="bg-light px-3 py-3 fw-bold small border-end d-flex align-items-center" style={{ minWidth: "180px" }}>Place of Signing <span className="text-danger ms-1">*</span></div>
                  <div className="flex-grow-1 p-2"><input type="text" name="place_of_signing" className="form-control form-control-sm border-0 shadow-none bg-transparent" value={formData.place_of_signing} onChange={handleInputChange} /></div>
               </div>

               {/* Section: Particulars of Company */}
               <div className="col-12 bg-light px-3 py-3 fw-bold border-bottom text-primary small">PARTICULARS OF THE COMPANY</div>
               
               <div className="col-12 col-md-6 border-end border-bottom d-flex flex-column flex-sm-row align-items-stretch">
                  <div className="bg-light px-3 py-3 fw-bold small border-end d-flex align-items-center" style={{ minWidth: "180px" }}>CIN <span className="text-danger ms-1">*</span></div>
                  <div className="flex-grow-1 p-2 d-flex gap-2">
                     <input type="text" name="cin" className="form-control form-control-sm border-0 shadow-none bg-transparent" placeholder="CIN" value={formData.cin} onChange={handleInputChange} />
                     <button className="btn btn-sm btn-white border shadow-none"><i className="bi bi-search"></i></button>
                  </div>
               </div>
               <div className="col-12 col-md-6 border-bottom d-flex flex-column flex-sm-row align-items-stretch">
                  <div className="bg-light px-3 py-3 fw-bold small border-end d-flex align-items-center" style={{ minWidth: "180px" }}>Name of the Company <span className="text-danger ms-1">*</span></div>
                  <div className="flex-grow-1 p-2"><input type="text" name="company_name" className="form-control form-control-sm border-0 shadow-none bg-transparent" value={formData.company_name} onChange={handleInputChange} /></div>
               </div>
               
               <div className="col-12 border-bottom d-flex flex-column flex-sm-row align-items-stretch">
                  <div className="bg-light px-3 py-3 fw-bold small border-end d-flex align-items-center" style={{ minWidth: "180px" }}>Registered Office <span className="text-danger ms-1">*</span></div>
                  <div className="flex-grow-1 p-2"><input type="text" name="registered_office" className="form-control form-control-sm border-0 shadow-none bg-transparent" value={formData.registered_office} onChange={handleInputChange} /></div>
               </div>

               <div className="col-12 col-md-6 border-end border-bottom d-flex flex-column flex-sm-row align-items-stretch">
                  <div className="bg-light px-3 py-3 fw-bold small border-end d-flex align-items-center" style={{ minWidth: "180px" }}>Registration Number</div>
                  <div className="flex-grow-1 p-2"><input type="text" name="registration_number" className="form-control form-control-sm border-0 shadow-none bg-transparent" value={formData.registration_number} onChange={handleInputChange} /></div>
               </div>
               <div className="col-12 col-md-6 border-bottom d-flex flex-column flex-sm-row align-items-stretch">
                  <div className="bg-light px-3 py-3 fw-bold small border-end d-flex align-items-center" style={{ minWidth: "180px" }}>Authorized Capital</div>
                  <div className="flex-grow-1 p-2"><input type="number" name="authorized_capital" className="form-control form-control-sm border-0 shadow-none bg-transparent" value={formData.authorized_capital} onChange={handleInputChange} /></div>
               </div>

               <div className="col-12 col-md-6 border-end border-bottom d-flex flex-column flex-sm-row align-items-stretch">
                  <div className="bg-light px-3 py-3 fw-bold small border-end d-flex align-items-center" style={{ minWidth: "180px" }}>Paid up Capital</div>
                  <div className="flex-grow-1 p-2"><input type="number" name="paid_up_capital" className="form-control form-control-sm border-0 shadow-none bg-transparent" value={formData.paid_up_capital} onChange={handleInputChange} /></div>
               </div>
               <div className="col-12 col-md-6 border-bottom d-flex flex-column flex-sm-row align-items-stretch">
                  <div className="bg-light px-3 py-3 fw-bold small border-end d-flex align-items-center" style={{ minWidth: "180px" }}>Date of Incorporation <span className="text-danger ms-1">*</span></div>
                  <div className="flex-grow-1 p-2"><input type="date" name="date_of_incorporation" className="form-control form-control-sm border-0 shadow-none bg-transparent" value={formData.date_of_incorporation} onChange={handleInputChange} /></div>
               </div>

               <div className="col-12 col-md-6 border-end d-flex flex-column flex-sm-row align-items-stretch">
                  <div className="bg-light px-3 py-3 fw-bold small border-end d-flex align-items-center" style={{ minWidth: "180px" }}>Date of Last AGM</div>
                  <div className="flex-grow-1 p-2"><input type="date" name="date_of_last_agm" className="form-control form-control-sm border-0 shadow-none bg-transparent" value={formData.date_of_last_agm} onChange={handleInputChange} /></div>
               </div>
               <div className="col-12 col-md-6 d-flex flex-column flex-sm-row align-items-stretch">
                  <div className="bg-light px-3 py-3 fw-bold small border-end d-flex align-items-center" style={{ minWidth: "180px" }}>Date of Last Balance Sheet Filed</div>
                  <div className="flex-grow-1 p-2"><input type="date" name="date_of_last_balance_sheet" className="form-control form-control-sm border-0 shadow-none bg-transparent" value={formData.date_of_last_balance_sheet} onChange={handleInputChange} /></div>
               </div>
            </div>

            {/* Table: Particulars of Signatories */}
            <div className="mt-5 text-start">
               <h6 className="fw-bold mb-3 border-bottom pb-2">PARTICULARS OF SIGNATORIES</h6>
               <div className="table-responsive border rounded overflow-auto mb-3">
                  <table className="table table-bordered table-sm small mb-0">
                     <thead style={{ background: "#dbeafe" }}>
                        <tr className="text-nowrap">
                           <th style={{ width: "80px", minWidth: "80px" }} className="text-center">Sr. No.</th>
                           <th style={{ minWidth: "250px" }}>Name and Designation</th>
                           <th style={{ width: "180px", minWidth: "180px" }} className="text-center">Date of Appointment</th>
                           <th style={{ minWidth: "200px" }}>DIN/PAN</th>
                        </tr>
                     </thead>
                     <tbody>
                        {signatories.map((s, i) => (
                           <tr key={s.id} className="align-middle">
                              <td className="text-center">
                                 <div className="d-flex align-items-center justify-content-center gap-2">
                                    <input type="checkbox" className="form-check-input mt-0" /> {i + 1}
                                 </div>
                              </td>
                              <td className="p-0"><input type="text" className="form-control form-control-sm border-0 px-2 bg-transparent" value={s.name_designation} onChange={(e) => setSignatories(prev => prev.map(item => item.id === s.id ? { ...item, name_designation: e.target.value } : item))} /></td>
                              <td className="p-0"><input type="date" className="form-control form-control-sm border-0 text-center px-2 bg-transparent" value={s.doa} onChange={(e) => setSignatories(prev => prev.map(item => item.id === s.id ? { ...item, doa: e.target.value } : item))} /></td>
                              <td className="p-0"><input type="text" className="form-control form-control-sm border-0 px-2 bg-transparent" value={s.din_pan} onChange={(e) => setSignatories(prev => prev.map(item => item.id === s.id ? { ...item, din_pan: e.target.value } : item))} /></td>
                           </tr>
                        ))}
                     </tbody>
                  </table>
               </div>
               <div className="d-flex flex-column flex-sm-row gap-2">
                  <button className="btn btn-primary btn-sm px-4 shadow-none py-2" style={{ background: "#2b4cb3" }} onClick={addSignatory}>Add row +</button>
                  <button className="btn btn-primary btn-sm px-4 shadow-none py-2" style={{ background: "#2b4cb3" }} onClick={removeSignatory}>Remove</button>
               </div>
            </div>

            {/* Table: Shareholders */}
            <div className="mt-5 text-start">
               <h6 className="fw-bold mb-3 border-bottom pb-2">PARTICULARS OF SHAREHOLDER AS ON</h6>
               <div className="table-responsive border rounded overflow-auto mb-3">
                  <table className="table table-bordered table-sm small text-center mb-0">
                     <thead style={{ background: "#dbeafe" }}>
                        <tr className="text-nowrap">
                           <th style={{ width: "80px", minWidth: "80px" }}>Sr. No.</th>
                           <th style={{ minWidth: "250px" }}>Name</th>
                           <th style={{ minWidth: "250px" }}>Address</th>
                           <th style={{ minWidth: "150px" }}>Type of Shares</th>
                           <th style={{ minWidth: "120px" }}>No. of Shares</th>
                           <th style={{ minWidth: "150px" }}>Paid Value Per Share</th>
                           <th style={{ minWidth: "150px" }}>Total Amount</th>
                        </tr>
                     </thead>
                     <tbody>
                        {shareholders.map((s, i) => (
                           <tr key={s.id} className="align-middle">
                              <td><div className="d-flex align-items-center justify-content-center gap-2"><input type="checkbox" className="form-check-input mt-0" /> {i + 1}</div></td>
                              <td className="p-0"><input type="text" className="form-control form-control-sm border-0 bg-transparent px-2" value={s.name} onChange={(e) => setShareholders(prev => prev.map(item => item.id === s.id ? { ...item, name: e.target.value } : item))} /></td>
                              <td className="p-0"><input type="text" className="form-control form-control-sm border-0 bg-transparent px-2" value={s.address} onChange={(e) => setShareholders(prev => prev.map(item => item.id === s.id ? { ...item, address: e.target.value } : item))} /></td>
                              <td className="p-0"><input type="text" className="form-control form-control-sm border-0 bg-transparent px-2" value={s.type} onChange={(e) => setShareholders(prev => prev.map(item => item.id === s.id ? { ...item, type: e.target.value } : item))} /></td>
                              <td className="p-0"><input type="text" className="form-control form-control-sm border-0 bg-transparent px-2" value={s.count} onChange={(e) => setShareholders(prev => prev.map(item => item.id === s.id ? { ...item, count: e.target.value } : item))} /></td>
                              <td className="p-0"><input type="text" className="form-control form-control-sm border-0 bg-transparent px-2" value={s.paid} onChange={(e) => setShareholders(prev => prev.map(item => item.id === s.id ? { ...item, paid: e.target.value } : item))} /></td>
                              <td className="p-0"><input type="text" className="form-control form-control-sm border-0 bg-transparent px-2" value={s.total} onChange={(e) => setShareholders(prev => prev.map(item => item.id === s.id ? { ...item, total: e.target.value } : item))} /></td>
                           </tr>
                        ))}
                        <tr className="bg-light fw-bold">
                           <td colSpan={6} className="text-end">Total</td>
                           <td>0.00</td>
                        </tr>
                     </tbody>
                  </table>
               </div>
               <div className="d-flex flex-column flex-sm-row gap-2">
                  <button className="btn btn-primary btn-sm px-4 shadow-none py-2" style={{ background: "#2b4cb3" }} onClick={addShareholder}>Add row +</button>
                  <button className="btn btn-primary btn-sm px-4 shadow-none py-2" style={{ background: "#2b4cb3" }} onClick={removeShareholder}>Remove</button>
                  <button className="btn btn-primary btn-sm px-4 shadow-none py-2" style={{ background: "#2b4cb3" }}>Import from ComGini</button>
               </div>
            </div>

            {/* Table: Charges */}
            <div className="mt-5 text-start">
               <h6 className="fw-bold mb-3 border-bottom pb-2">PARTICULARS OF CHARGES</h6>
               <div className="table-responsive border rounded overflow-auto mb-3">
                  <table className="table table-bordered table-sm small text-center mb-0">
                     <thead style={{ background: "#dbeafe" }}>
                        <tr className="align-middle text-nowrap">
                           <th style={{ width: "80px", minWidth: "80px" }}>Sr. No.</th>
                           <th style={{ minWidth: "150px" }}>Charge ID</th>
                           <th style={{ minWidth: "150px" }}>Date of creation</th>
                           <th style={{ minWidth: "200px" }}>Date of present Modification of charge</th>
                           <th style={{ minWidth: "180px" }}>Amount secured By charge</th>
                           <th style={{ minWidth: "250px" }}>Short Particulars of property charged at present time</th>
                           <th style={{ minWidth: "250px" }}>Name of Charge holder</th>
                           <th style={{ minWidth: "250px" }}>Address of Charge holder</th>
                           <th style={{ width: "100px", minWidth: "100px" }}>Import Form</th>
                        </tr>
                     </thead>
                     <tbody>
                        {charges.map((c, i) => (
                           <tr key={c.id} className="align-middle text-nowrap">
                              <td><div className="d-flex align-items-center justify-content-center gap-2"><input type="checkbox" className="form-check-input mt-0" /> {i + 1}</div></td>
                              <td className="p-0"><input type="text" className="form-control form-control-sm border-0 bg-transparent px-2" value={c.charge_id} onChange={(e) => setCharges(prev => prev.map(item => item.id === c.id ? { ...item, charge_id: e.target.value } : item))} /></td>
                              <td className="p-0"><input type="date" className="form-control form-control-sm border-0 bg-transparent px-2" value={c.created} onChange={(e) => setCharges(prev => prev.map(item => item.id === c.id ? { ...item, created: e.target.value } : item))} /></td>
                              <td className="p-0"><input type="date" className="form-control form-control-sm border-0 bg-transparent px-2" value={c.modified} onChange={(e) => setCharges(prev => prev.map(item => item.id === c.id ? { ...item, modified: e.target.value } : item))} /></td>
                              <td className="p-0"><input type="text" className="form-control form-control-sm border-0 bg-transparent px-2" value={c.secured_amount} onChange={(e) => setCharges(prev => prev.map(item => item.id === c.id ? { ...item, secured_amount: e.target.value } : item))} /></td>
                              <td className="p-0"><input type="text" className="form-control form-control-sm border-0 bg-transparent px-2" value={c.short_particulars} onChange={(e) => setCharges(prev => prev.map(item => item.id === c.id ? { ...item, short_particulars: e.target.value } : item))} /></td>
                              <td className="p-0"><input type="text" className="form-control form-control-sm border-0 bg-transparent px-2" value={c.holder_name} onChange={(e) => setCharges(prev => prev.map(item => item.id === c.id ? { ...item, holder_name: e.target.value } : item))} /></td>
                              <td className="p-0"><input type="text" className="form-control form-control-sm border-0 bg-transparent px-2" value={c.holder_address} onChange={(e) => setCharges(prev => prev.map(item => item.id === c.id ? { ...item, holder_address: e.target.value } : item))} /></td>
                              <td className="text-center"><button className="btn btn-sm text-primary py-0"><i className="bi bi-file-earmark-arrow-up"></i></button></td>
                           </tr>
                        ))}
                     </tbody>
                  </table>
               </div>
               <div className="d-flex flex-column flex-sm-row gap-2">
                  <button className="btn btn-primary btn-sm px-4 shadow-none py-2" style={{ background: "#2b4cb3" }} onClick={addCharge}>Add row +</button>
                  <button className="btn btn-primary btn-sm px-4 shadow-none py-2" style={{ background: "#2b4cb3" }} onClick={removeCharge}>Remove</button>
                  <button className="btn btn-primary btn-sm px-4 shadow-none py-2" style={{ background: "#2b4cb3" }}>Import from ComGini</button>
               </div>
               <div className="mt-5">
                  <button className="btn btn-primary px-5 py-3 fw-bold w-100 w-md-auto shadow-sm" style={{ background: "#2b4cb3" }} onClick={handleSubmit}>Submit</button>
               </div>
            </div>
        </div>
      )}
    </div>
  );
}
