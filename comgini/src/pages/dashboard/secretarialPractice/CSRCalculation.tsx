import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import secretarialService, { type CSRCalculationPayload } from "../../../services/secretarialService";

type ViewType = "list" | "add";

export default function CSRCalculation() {
  const [view, setView] = useState<ViewType>("list");
  const [showImportModal, setShowImportModal] = useState(false);
  const [calculations, setCalculations] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [pagination, setPagination] = useState({ page: 1, limit: 10, total: 0 });
  const [computationData, setComputationData] = useState<any>({
    net_profit: [0, 0, 0, 0],
    csr_expenses: [0, 0, 0, 0],
    jv_profit: [0, 0, 0, 0],
    jv_loss: [0, 0, 0, 0],
    bounties: [0, 0, 0, 0],
    premium_shares: [0, 0, 0, 0],
    forfeited_shares: [0, 0, 0, 0],
    capital_profits: [0, 0, 0, 0],
    immovable_property: [0, 0, 0, 0],
    carrying_amount_asset: [0, 0, 0, 0],
    unrealised_gains: [0, 0, 0, 0],
    working_charges: [0, 0, 0, 0],
    directors_rem: [0, 0, 0, 0],
    bonus_staff: [0, 0, 0, 0],
    excess_tax: [0, 0, 0, 0],
    special_tax: [0, 0, 0, 0],
    debenture_interest: [0, 0, 0, 0],
    mortgage_interest: [0, 0, 0, 0],
    unsecured_loan_interest: [0, 0, 0, 0],
    repair_expenses: [0, 0, 0, 0],
    charitable_contrib: [0, 0, 0, 0],
    depreciation: [0, 0, 0, 0],
    expenditure_excess: [0, 0, 0, 0],
    compensation_damages: [0, 0, 0, 0],
    insurance_risk: [0, 0, 0, 0],
    bad_debts: [0, 0, 0, 0],
    income_tax: [0, 0, 0, 0],
    interest_direct_tax: [0, 0, 0, 0],
    any_other_tax: [0, 0, 0, 0],
    voluntary_damages: [0, 0, 0, 0],
    capital_loss: [0, 0, 0, 0],
    carrying_amount_liability: [0, 0, 0, 0],
  });

  const handleComputationChange = (field: string, index: number, value: string) => {
    setComputationData((prev: any) => ({
      ...prev,
      [field]: prev[field].map((v: number, i: number) => i === index ? parseFloat(value) || 0 : v)
    }));
  };

  const handleSubmit = async () => {
    try {
      const payload: CSRCalculationPayload = {
        company_id: 1, // To be dynamic
        financial_year: "2024-25", // To be dynamic
        computation_data: computationData
      };
      await secretarialService.createCSRCalculation(payload);
      toast.success("CSR Calculation saved successfully");
      setView("list");
    } catch (error) {
      toast.error("Failed to save CSR Calculation");
    }
  };

  useEffect(() => {
    if (view === "list") {
      fetchCalculations();
    }
  }, [view]);

  const fetchCalculations = async (page = 1) => {
    try {
      setLoading(true);
      const res = await secretarialService.getCSRCalculations({ page, limit: pagination.limit });
      setCalculations(res.data || []);
      setPagination(prev => ({ ...prev, page, total: res.pagination?.total || 0 }));
    } catch (error) {
      console.error("Failed to fetch CSR calculations", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="csr-calculation p-2 p-md-4 text-start">
      {/* ⭐ BREADCRUMBS */}
      <nav aria-label="breadcrumb" className="mb-4">
        <ol className="breadcrumb mb-0 small">
          <li className="breadcrumb-item"><a href="#" className="text-decoration-none text-primary" onClick={() => setView("list")}>Home</a></li>
          {view === "list" ? (
             <li className="breadcrumb-item active" aria-current="page">CSR Calculation</li>
          ) : (
             <>
               <li className="breadcrumb-item"><a href="#" className="text-decoration-none text-primary" onClick={() => setView("list")}>CSR Calculation</a></li>
               <li className="breadcrumb-item active" aria-current="page">Add Calculation</li>
             </>
          )}
        </ol>
      </nav>

      {/* ⭐ LIST VIEW */}
      {view === "list" && (
        <div className="card shadow-sm border-0 p-3 p-md-4">
            <div className="d-flex flex-column flex-md-row justify-content-between align-items-start align-items-md-center mb-4 gap-3">
               <h5 className="fw-bold mb-0">CSR Calculation List</h5>
               <div className="d-flex flex-wrap gap-2 w-100 w-md-auto">
                  <button className="btn btn-primary btn-sm px-4 shadow-none flex-fill flex-md-grow-0 py-2 py-md-1" style={{ background: "#2b4cb3" }} onClick={() => setShowImportModal(true)}>
                     Import from Excel
                  </button>
                  <button className="btn btn-primary btn-sm px-4 shadow-none flex-fill flex-md-grow-0 py-2 py-md-1" style={{ background: "#2b4cb3" }} onClick={() => setView("add")}>
                     + Add calculation
                  </button>
               </div>
            </div>

            <div className="d-flex flex-column flex-md-row justify-content-between align-items-start align-items-md-center mb-3 gap-3">
               <div className="small w-100 w-md-auto">Show 
                  <select className="mx-2 border border-light py-1 shadow-none">
                     <option>10</option>
                  </select> entries
               </div>
               <div className="d-flex align-items-center gap-2 small w-100 w-md-auto">
                  <span className="text-nowrap">Search:</span> 
                  <input type="text" className="form-control form-control-sm border shadow-none w-100" style={{ maxWidth: "220px" }} />
               </div>
            </div>

            <div className="table-responsive border rounded overflow-auto">
              <table className="table table-hover mb-0" style={{ fontSize: "11px" }}>
                <thead style={{ background: "#94a3b8", color: "white" }}>
                  <tr className="align-middle text-nowrap">
                    <th className="px-2 py-2 text-center border-end" style={{ minWidth: "40px" }}>Sr. No.</th>
                    <th className="px-2 py-2 border-end" style={{ minWidth: "250px" }}>Company Name</th>
                    <th className="px-2 py-2 border-end text-center" style={{ minWidth: "150px" }}>Financial Year</th>
                    <th className="px-2 py-2 border-end text-center" style={{ minWidth: "150px" }}>Updated By</th>
                    <th className="px-2 py-2 border-end text-center" style={{ minWidth: "150px" }}>Last Updated On</th>
                    <th className="px-2 py-2 border-end text-center" style={{ minWidth: "80px" }}>Action</th>
                    <th className="px-2 py-2 text-center" style={{ minWidth: "80px" }}>Extract</th>
                  </tr>
                </thead>
                <tbody>
                   {loading ? (
                     <tr><td colSpan={7} className="text-center py-4">Loading calculations...</td></tr>
                   ) : calculations.length === 0 ? (
                     <tr><td colSpan={7} className="text-center py-4 text-muted small border-bottom-0">No data available in table</td></tr>
                   ) : (
                     calculations.map((c, idx) => (
                       <tr key={c.id || idx} className="align-middle text-nowrap">
                         <td className="text-center">{(pagination.page - 1) * pagination.limit + idx + 1}</td>
                         <td className="text-start">{c.client_name || c.company_name || c.name || "-"}</td>
                         <td className="text-center">{c.financial_year || "-"}</td>
                         <td className="text-center">{c.updated_by || c.updatedBy || "System"}</td>
                         <td className="text-center">{c.created_at ? new Date(c.created_at).toLocaleDateString() : "-"}</td>
                         <td className="text-center">
                           <button className="btn btn-sm btn-outline-primary py-0">Edit</button>
                         </td>
                         <td className="text-center">
                           <button className="btn btn-sm btn-link"><i className="bi bi-file-earmark-arrow-down"></i></button>
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

      {/* ⭐ ADD/COMPUTATION VIEW */}
      {view === "add" && (
        <div className="card shadow-sm border-0 p-3 p-md-4">
            {/* Header Row */}
            <div className="d-flex flex-column flex-lg-row justify-content-between align-items-start align-items-lg-center mb-5 border-bottom pb-4 gap-4">
               <div className="d-flex flex-column flex-md-row gap-3 gap-md-4 align-items-start align-items-md-center w-100">
                  <div className="text-start flex-fill">
                     <label className="fw-bold small d-block mb-2 border-bottom pb-1">Company:</label>
                     <select className="form-select form-select-sm border-light shadow-sm w-100 py-2" style={{ minWidth: "220px" }}>
                        <option>Select Company</option>
                     </select>
                  </div>
                  <div className="text-start flex-fill">
                     <label className="fw-bold small d-block mb-2 border-bottom pb-1">Financial Year:</label>
                     <select className="form-select form-select-sm border-light shadow-sm w-100 py-2" style={{ minWidth: "220px" }}>
                        <option>Select Financial Year</option>
                     </select>
                  </div>
                  <div className="text-start flex-fill">
                     <label className="fw-bold small d-block mb-2 border-bottom pb-1">Date of Incorporation:</label>
                     <input type="text" className="form-control form-control-sm border-light shadow-sm bg-light w-100 py-2" placeholder="d/m/Y" disabled />
                  </div>
               </div>
               <button className="btn btn-primary btn-sm px-4 d-flex align-items-center gap-2 shadow-sm w-100 w-lg-auto justify-content-center py-2" style={{ background: "#2b4cb3", zIndex: 10 }} onClick={() => setView("list")}>
                  <i className="bi bi-arrow-left-circle"></i> Back
               </button>
            </div>

            <h5 className="text-danger fw-bold text-center mb-4 small px-2">Computation of Corporate Social Responsibility FY</h5>
            
            <div className="table-responsive border rounded overflow-auto mb-3">
               <table className="table table-bordered small text-start align-middle mb-0">
                  <thead style={{ background: "#fed7aa" }}>
                     <tr className="text-nowrap">
                        <th rowSpan={2} className="text-center" style={{ minWidth: "350px" }}>Description</th>
                        <th colSpan={4} className="text-center">Financial Year</th>
                     </tr>
                     <tr className="text-center text-nowrap">
                        <th style={{ minWidth: "120px" }}>FY</th>
                        <th style={{ minWidth: "120px" }}>FY</th>
                        <th style={{ minWidth: "120px" }}>FY</th>
                        <th style={{ minWidth: "120px" }}>FY</th>
                     </tr>
                  </thead>
                  <tbody>
                     <tr className="text-nowrap"><td className="fw-bold">Net Profit & Loss as per P&L account (Before Tax)</td>{Array(4).fill(0).map((_, i) => <td key={i} className="p-0"><input type="text" className="form-control form-control-sm border-0 bg-transparent text-center py-2" value={computationData.net_profit[i]} onChange={(e) => handleComputationChange('net_profit', i, e.target.value)} /></td>)}</tr>
                     <tr className="text-nowrap"><td>Add: CSR Expenses Debited to Profit & Loss Account</td>{Array(4).fill(0).map((_, i) => <td key={i} className="p-0"><input type="text" className="form-control form-control-sm border-0 bg-transparent text-center py-2" value={computationData.csr_expenses[i]} onChange={(e) => handleComputationChange('csr_expenses', i, e.target.value)} /></td>)}</tr>
                     <tr className="text-nowrap"><td>Less: Profit from Joint Venture Credited to P&L Account</td>{Array(4).fill(0).map((_, i) => <td key={i} className="p-0"><input type="text" className="form-control form-control-sm border-0 bg-transparent text-center py-2" value={computationData.jv_profit[i]} onChange={(e) => handleComputationChange('jv_profit', i, e.target.value)} /></td>)}</tr>
                     <tr className="text-nowrap"><td>Add: Loss from Joint Venture Debited to P&L Account</td>{Array(4).fill(0).map((_, i) => <td key={i} className="p-0"><input type="text" className="form-control form-control-sm border-0 bg-transparent text-center py-2" value={computationData.jv_loss[i]} onChange={(e) => handleComputationChange('jv_loss', i, e.target.value)} /></td>)}</tr>
                     
                     <tr className="bg-light fw-bold text-danger"><td colSpan={5}>Add: Credit Shall Be Given For (If not already provided)</td></tr>
                     <tr className="text-nowrap"><td>a. bounties and subsidies received from any Government...</td>{Array(4).fill(0).map((_, i) => <td key={i} className="p-0"><input type="text" className="form-control form-control-sm border-0 bg-transparent text-center py-2" value={computationData.bounties[i]} onChange={(e) => handleComputationChange('bounties', i, e.target.value)} /></td>)}</tr>
                     
                     <tr className="bg-light fw-bold text-danger"><td colSpan={5}>Less: Credit Shall Not Be Given For (If not already provided)</td></tr>
                     <tr className="text-nowrap"><td>a. profits, by way of premium on shares or debentures...</td>{Array(4).fill(0).map((_, i) => <td key={i} className="p-0"><input type="text" className="form-control form-control-sm border-0 bg-transparent text-center py-2" value={computationData.premium_shares[i]} onChange={(e) => handleComputationChange('premium_shares', i, e.target.value)} /></td>)}</tr>
                     {[
                       { label: "b. profits on sales by the company of forfeited shares", field: 'forfeited_shares' },
                       { label: "c. profits of a capital nature including profits from the sale...", field: 'capital_profits' },
                       { label: "d. profits from the sale of any immovable property...", field: 'immovable_property' },
                       { label: "e. any change in carrying amount of an asset...", field: 'carrying_amount_asset' },
                       { label: "f. Any amount representing unrealised gains...", field: 'unrealised_gains' }
                     ].map((row, idx) => (
                       <tr key={`credit-no-${idx}`} className="text-nowrap"><td>{row.label}</td>{Array(4).fill(0).map((_, i) => <td key={i} className="p-0"><input type="text" className="form-control form-control-sm border-0 bg-transparent text-center py-2" value={(computationData as any)[row.field][i]} onChange={(e) => handleComputationChange(row.field, i, e.target.value)} /></td>)}</tr>
                     ))}

                     <tr className="bg-light fw-bold text-danger"><td colSpan={5}>Less: Following Shall be allowed to be Deducted (If not already provided)</td></tr>
                     {[
                       { label: "a. all the usual working charges", field: 'working_charges' },
                       { label: "b. directors' remuneration", field: 'directors_rem' },
                       { label: "c. bonus or commission paid or payable to staff", field: 'bonus_staff' },
                       { label: "d. tax on excess or abnormal profits", field: 'excess_tax' },
                       { label: "e. tax on business profits for special reasons", field: 'special_tax' },
                       { label: "f. interest on debentures", field: 'debenture_interest' },
                       { label: "g. Interest on mortgages", field: 'mortgage_interest' },
                       { label: "h. interest on unsecured loans", field: 'unsecured_loan_interest' },
                       { label: "i. expenses on repairs", field: 'repair_expenses' },
                       { label: "j. outgoings inclusive of charitable contributions", field: 'charitable_contrib' },
                       { label: "k. depreciation", field: 'depreciation' },
                       { label: "l. excess of expenditure over income", field: 'expenditure_excess' },
                       { label: "m. any compensation or damages", field: 'compensation_damages' },
                       { label: "n. any sum paid by way of insurance", field: 'insurance_risk' },
                       { label: "o. debts considered bad and written off", field: 'bad_debts' }
                     ].map((row, idx) => (
                       <tr key={`deduct-all-${idx}`} className="text-nowrap"><td>{row.label}</td>{Array(4).fill(0).map((_, i) => <td key={i} className="p-0"><input type="text" className="form-control form-control-sm border-0 bg-transparent text-center py-2" value={(computationData as any)[row.field][i]} onChange={(e) => handleComputationChange(row.field, i, e.target.value)} /></td>)}</tr>
                     ))}

                     <tr className="bg-light fw-bold text-danger"><td colSpan={5}>Add: Following Shall Not be allowed to be Deducted (If not already provided)</td></tr>
                     <tr><td>a. income-tax and super-tax payable</td><td colSpan={4}></td></tr>
                     <tr className="text-nowrap"><td className="ps-4">(i) Income Tax</td>{Array(4).fill(0).map((_, i) => <td key={i} className="p-0"><input type="text" className="form-control form-control-sm border-0 bg-transparent text-center py-2" value={computationData.income_tax[i]} onChange={(e) => handleComputationChange('income_tax', i, e.target.value)} /></td>)}</tr>
                     <tr className="text-nowrap"><td className="ps-4">(ii) Interest on Direct Tax</td>{Array(4).fill(0).map((_, i) => <td key={i} className="p-0"><input type="text" className="form-control form-control-sm border-0 bg-transparent text-center py-2" value={computationData.interest_direct_tax[i]} onChange={(e) => handleComputationChange('interest_direct_tax', i, e.target.value)} /></td>)}</tr>
                     <tr className="text-nowrap"><td className="ps-4">(iii) Any other Income-tax</td>{Array(4).fill(0).map((_, i) => <td key={i} className="p-0"><input type="text" className="form-control form-control-sm border-0 bg-transparent text-center py-2" value={computationData.any_other_tax[i]} onChange={(e) => handleComputationChange('any_other_tax', i, e.target.value)} /></td>)}</tr>
                     <tr className="text-nowrap"><td>b. any compensation, damages or payments made voluntarily</td>{Array(4).fill(0).map((_, i) => <td key={i} className="p-0"><input type="text" className="form-control form-control-sm border-0 bg-transparent text-center py-2" value={computationData.voluntary_damages[i]} onChange={(e) => handleComputationChange('voluntary_damages', i, e.target.value)} /></td>)}</tr>
                     <tr className="text-nowrap"><td>c. loss of a capital nature</td>{Array(4).fill(0).map((_, i) => <td key={i} className="p-0"><input type="text" className="form-control form-control-sm border-0 bg-transparent text-center py-2" value={computationData.capital_loss[i]} onChange={(e) => handleComputationChange('capital_loss', i, e.target.value)} /></td>)}</tr>
                     <tr className="text-nowrap"><td>d. any change in carrying amount of an asset...</td>{Array(4).fill(0).map((_, i) => <td key={i} className="p-0"><input type="text" className="form-control form-control-sm border-0 bg-transparent text-center py-2" value={computationData.carrying_amount_liability[i]} onChange={(e) => handleComputationChange('carrying_amount_liability', i, e.target.value)} /></td>)}</tr>

                     {/* Summary Rows */}
                     <tr style={{ background: "#fed7aa" }} className="fw-bold border-top-2 text-nowrap">
                        <td>Profit as per Section 198 of Companies Act, 2013</td>
                        {Array(4).fill(0).map((_, i) => <td key={i} className="text-center">0</td>)}
                     </tr>
                     <tr style={{ background: "#fed7aa" }} className="fw-bold text-nowrap">
                        <td>Average Profit of the Company (for FY )</td>
                        {Array(4).fill(0).map((_, i) => <td key={i} className="text-center">0</td>)}
                     </tr>
                     <tr className="fw-bold border-bottom-0 text-nowrap">
                        <td colSpan={5}>Minimum CSR expenses to be incurred</td>
                     </tr>
                     <tr style={{ background: "#fed7aa" }} className="fw-bold text-nowrap">
                        <td>(2% of the Average Net Profit of the Company)</td>
                        {Array(4).fill(0).map((_, i) => <td key={i} className="text-center">0</td>)}
                     </tr>
                     <tr style={{ background: "#fed7aa" }} className="fw-bold text-nowrap">
                        <td>Less : Excess Spending of previous years <span className="text-danger small">(Set off)</span></td>
                        {Array(4).fill(0).map((_, i) => <td key={i} className="text-center">0</td>)}
                     </tr>
                     <tr style={{ background: "#fed7aa" }} className="fw-bold text-nowrap">
                        <td>CSR Liability for the year</td>
                        {Array(4).fill(0).map((_, i) => <td key={i} className="text-center">0</td>)}
                     </tr>
                     <tr style={{ background: "#fed7aa" }} className="fw-bold text-nowrap">
                        <td>CSR spent</td>
                        {Array(4).fill(0).map((_, i) => <td key={i} className="text-center">0</td>)}
                     </tr>
                     <tr style={{ background: "#fed7aa" }} className="fw-bold text-nowrap">
                        <td>Excess spent to be carried forward next year</td>
                        {Array(4).fill(0).map((_, i) => <td key={i} className="text-center">0</td>)}
                     </tr>
                  </tbody>
               </table>
            </div>

            {/* Footer Definition Box */}
            <div className="mt-4 border p-3 rounded bg-white text-start shadow-sm">
               <h6 className="fw-bold text-decoration-underline small mb-2 text-start">Definition of the "Net Profit" as per rule 2(h)...</h6>
               <p className="small mb-0 text-muted" style={{ fontSize: "11px", lineHeight: "1.6" }}>
                  "Net profit" means the net profit of a company as per its financial statement prepared in accordance with the applicable provisions of the Act, but shall not include the following, namely:-<br />
                  (i) any profit arising from any overseas branch...<br />
                  (ii) any dividend received from other companies in India...
               </p>
            </div>

            <div className="mt-4 text-start">
               <button className="btn btn-primary px-5 py-3 fw-bold w-100 w-md-auto shadow-sm" style={{ background: "#2b4cb3" }} onClick={handleSubmit}>Submit Calculation</button>
            </div>
        </div>
      )}

      {/* ⭐ IMPORT MODAL */}
      {showImportModal && (
        <div className="modal show d-block" style={{ background: "rgba(0,0,0,0.5)", zIndex: 1050 }}>
           <div className="modal-dialog modal-lg modal-dialog-centered">
              <div className="modal-content overflow-hidden border-0 shadow">
                 <div className="modal-header bg-white py-3 border-bottom d-flex justify-content-center position-relative">
                    <h5 className="modal-title fw-bold">Import Data from Excel</h5>
                    <button className="btn-close position-absolute end-0 me-3" onClick={() => setShowImportModal(false)}></button>
                 </div>
                 <div className="modal-body p-3 p-md-5 text-start">
                    <div className="row g-3 align-items-center bg-light p-3 p-md-4 rounded border">
                       <div className="col-12 col-md-3 fw-bold small">Upload Excel</div>
                       <div className="col-12 col-md-9 d-flex flex-column gap-3">
                          <input type="file" className="form-control border shadow-none py-2" />
                          <button className="btn btn-primary px-4 py-2 w-100 w-sm-auto align-self-start shadow-sm" style={{ background: "#2b4cb3" }}>
                            <i className="bi bi-download me-2"></i> Download Template
                          </button>
                       </div>
                    </div>
                 </div>
                 <div className="modal-footer bg-light p-2 text-end border-top">
                    <button className="btn btn-sm btn-outline-secondary px-3" onClick={() => setShowImportModal(false)}>Close</button>
                 </div>
              </div>
           </div>
        </div>
      )}
    </div>
  );
}
