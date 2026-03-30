import { useState } from "react";

type ViewType = "list" | "add";

export default function CSRCalculation() {
  const [view, setView] = useState<ViewType>("list");
  const [showImportModal, setShowImportModal] = useState(false);

  return (
    <div className="csr-calculation p-4">
      {/* ⭐ BREADCRUMBS */}
      <nav aria-label="breadcrumb" className="mb-4 text-start">
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
        <div className="card shadow-sm border-0 p-4">
           <div className="d-flex justify-content-between align-items-center mb-4">
              <h5 className="fw-bold mb-0">CSR Calculation List</h5>
              <div className="d-flex gap-2">
                 <button className="btn btn-primary btn-sm px-3 shadow-none" style={{ background: "#2b4cb3" }} onClick={() => setShowImportModal(true)}>
                    Import from Excel
                 </button>
                 <button className="btn btn-primary btn-sm px-3 shadow-none" style={{ background: "#2b4cb3" }} onClick={() => setView("add")}>
                    + Add calculation
                 </button>
              </div>
           </div>

           <div className="d-flex justify-content-between align-items-center mb-3">
              <div className="small">Show 
                 <select className="mx-2 border border-light shadow-none">
                    <option>10</option>
                 </select> entries
              </div>
              <div className="d-flex align-items-center gap-2 small">
                 Search: <input type="text" className="form-control form-control-sm border shadow-none" />
              </div>
           </div>

           <div className="table-responsive border rounded overflow-hidden">
             <table className="table table-hover mb-0 text-start" style={{ fontSize: "11px" }}>
               <thead style={{ background: "#94a3b8", color: "white" }}>
                 <tr className="align-middle">
                   <th className="px-2 py-2 text-center border-end" style={{ width: "40px" }}>Sr. No.</th>
                   <th className="px-2 py-2 border-end">Company Name</th>
                   <th className="px-2 py-2 border-end text-center">Financial Year</th>
                   <th className="px-2 py-2 border-end text-center">Updated By</th>
                   <th className="px-2 py-2 border-end text-center">Last Updated On</th>
                   <th className="px-2 py-2 border-end text-center">Action</th>
                   <th className="px-2 py-2 text-center">Extract</th>
                 </tr>
               </thead>
               <tbody>
                 <tr><td colSpan={7} className="text-center py-4 text-muted small border-bottom-0">No data available in table</td></tr>
               </tbody>
             </table>
           </div>
        </div>
      )}

      {/* ⭐ ADD/COMPUTATION VIEW */}
      {view === "add" && (
        <div className="card shadow-sm border-0 p-4">
           {/* Header Row */}
           <div className="d-flex justify-content-between align-items-center mb-5 border-bottom pb-3">
              <div className="d-flex gap-4 align-items-center">
                 <div className="text-start">
                    <label className="fw-bold small d-block mb-1 border-bottom">Company:</label>
                    <select className="form-select form-select-sm border-light shadow-sm" style={{ width: "220px" }}>
                       <option>Select Company</option>
                    </select>
                 </div>
                 <div className="text-start">
                    <label className="fw-bold small d-block mb-1 border-bottom">Financial Year:</label>
                    <select className="form-select form-select-sm border-light shadow-sm" style={{ width: "220px" }}>
                       <option>Select Financial Year</option>
                    </select>
                 </div>
                 <div className="text-start">
                    <label className="fw-bold small d-block mb-1 border-bottom">Date of Incorporation:</label>
                    <input type="text" className="form-control form-control-sm border-light shadow-sm bg-light" placeholder="d/m/Y" style={{ width: "180px" }} disabled />
                 </div>
              </div>
              <button className="btn btn-primary btn-sm px-3 d-flex align-items-center gap-2 shadow-sm" style={{ background: "#2b4cb3", zIndex: 10 }} onClick={() => setView("list")}>
                 <i className="bi bi-arrow-left-circle"></i> Back
              </button>
           </div>

           <h5 className="text-danger fw-bold text-center mb-4">Computation of Corporate Social Responsibility FY</h5>
           
           <div className="table-responsive">
              <table className="table table-bordered small text-start align-middle">
                 <thead style={{ background: "#fed7aa" }}>
                    <tr>
                       <th rowSpan={2} className="text-center" style={{ width: "40%" }}>Description</th>
                       <th colSpan={4} className="text-center">Financial Year</th>
                    </tr>
                    <tr className="text-center">
                       <th style={{ width: "15%" }}>FY</th>
                       <th style={{ width: "15%" }}>FY</th>
                       <th style={{ width: "15%" }}>FY</th>
                       <th style={{ width: "15%" }}>FY</th>
                    </tr>
                 </thead>
                 <tbody>
                    <tr><td className="fw-bold">Net Profit & Loss as per P&L account (Before Tax)</td>{Array(4).fill(0).map((_, i) => <td key={i}><input type="text" className="form-control form-control-sm border-0 bg-transparent text-center" defaultValue="0" /></td>)}</tr>
                    <tr><td>Add: CSR Expenses Debited to Profit & Loss Account</td>{Array(4).fill(0).map((_, i) => <td key={i}><input type="text" className="form-control form-control-sm border-0 bg-transparent text-center" defaultValue="0" /></td>)}</tr>
                    <tr><td>Less: Profit from Joint Venture Credited to P&L Account</td>{Array(4).fill(0).map((_, i) => <td key={i}><input type="text" className="form-control form-control-sm border-0 bg-transparent text-center" defaultValue="0" /></td>)}</tr>
                    <tr><td>Add: Loss from Joint Venture Debited to P&L Account</td>{Array(4).fill(0).map((_, i) => <td key={i}><input type="text" className="form-control form-control-sm border-0 bg-transparent text-center" defaultValue="0" /></td>)}</tr>
                    
                    <tr className="bg-light fw-bold text-danger"><td colSpan={5}>Add: Credit Shall Be Given For (If not already provided)</td></tr>
                    <tr><td>a. bounties and subsidies received from any Government, or any public authority constituted or authorised in this behalf, unless and except in so far as the Central Government otherwise directs</td>{Array(4).fill(0).map((_, i) => <td key={i}><input type="text" className="form-control form-control-sm border-0 bg-transparent text-center" defaultValue="0" /></td>)}</tr>
                    
                    <tr className="bg-light fw-bold text-danger"><td colSpan={5}>Less: Credit Shall Not Be Given For (If not already provided)</td></tr>
                    <tr><td>a. profits, by way of premium on shares or debentures of the company, which are issued or sold by the company unless the company is an investment company as referred to in clause (a) of the Explanation to section 186</td>{Array(4).fill(0).map((_, i) => <td key={i}><input type="text" className="form-control form-control-sm border-0 bg-transparent text-center" defaultValue="0" /></td>)}</tr>
                    <tr><td>b. profits on sales by the company of forfeited shares</td>{Array(4).fill(0).map((_, i) => <td key={i}><input type="text" className="form-control form-control-sm border-0 bg-transparent text-center" defaultValue="0" /></td>)}</tr>
                    <tr><td>c. profits of a capital nature including profits from the sale of the undertaking or any of the undertakings of the company or of any part thereof</td>{Array(4).fill(0).map((_, i) => <td key={i}><input type="text" className="form-control form-control-sm border-0 bg-transparent text-center" defaultValue="0" /></td>)}</tr>
                    <tr><td>d. profits from the sale of any immovable property or fixed assets of a capital nature comprised in the undertaking or any of the undertakings of the company, unless the business of the company consists, whether wholly or partly, of buying and selling any such property or assets. If Sale Consideration - WDV is Positive then Add only (Cost-WDV)</td>{Array(4).fill(0).map((_, i) => <td key={i}><input type="text" className="form-control form-control-sm border-0 bg-transparent text-center" defaultValue="0" /></td>)}</tr>
                    <tr><td>e. any change in carrying amount of an asset or of a liability recognised in equity reserves including surplus in profit and loss account on measurement of the asset</td>{Array(4).fill(0).map((_, i) => <td key={i}><input type="text" className="form-control form-control-sm border-0 bg-transparent text-center" defaultValue="0" /></td>)}</tr>
                    <tr><td>f. Any amount representing unrealised gains, notional gains or revaluation of assets</td>{Array(4).fill(0).map((_, i) => <td key={i}><input type="text" className="form-control form-control-sm border-0 bg-transparent text-center" defaultValue="0" /></td>)}</tr>

                    <tr className="bg-light fw-bold text-danger"><td colSpan={5}>Less: Following Shall be allowed to be Deducted (If not already provided)</td></tr>
                    {[
                      "a. all the usual working charges",
                      "b. directors' remuneration",
                      "c. bonus or commission paid or payable to any member of the company's staff, or to any engineer, technician or person employed or engaged by the company, whether on a whole-time or on a part-time basis",
                      "d. any tax notified by the Central Government as being in the nature of a tax on excess or abnormal profits",
                      "e. any tax on business profits imposed for special reasons or in special circumstances and notified by the Central Government in this behalf",
                      "f. interest on debentures issued by the company",
                      "g. Interest on mortgages executed by the company and on loans and advances secured by a charge on its fixed or floating assets",
                      "h. interest on unsecured loans and advances",
                      "i. expenses on repairs, whether to immovable or to movable property, provided the repairs are not of a capital nature",
                      "j. outgoings inclusive of contributions made under section 181 (Bonafide Charitable Trusts)",
                      "k. depreciation to the extent specified in section 123",
                      "l. the excess of expenditure over income, which had arisen in computing the net profits in accordance with this section in any year which begins at or after the commencement of this Act, in so far as such excess has not been deducted in any subsequent year preceding the year in respect of which the net profits have to be ascertained",
                      "m. any compensation or damages to be paid in virtue of any legal liability including a liability arising from a breach of contract",
                      "n. any sum paid by way of insurance against the risk of meeting any liability such as is referred to in clause",
                      "o. debts considered bad and written off or adjusted during the year of account"
                    ].map((row, idx) => (
                      <tr key={`deduct-all-${idx}`}><td>{row}</td>{Array(4).fill(0).map((_, i) => <td key={i}><input type="text" className="form-control form-control-sm border-0 bg-transparent text-center" defaultValue="0" /></td>)}</tr>
                    ))}

                    <tr className="bg-light fw-bold text-danger"><td colSpan={5}>Add: Following Shall Not be allowed to be Deducted (If not already provided)</td></tr>
                    <tr><td>a. income-tax and super-tax payable by the company under the Income-tax Act, 1961, or any other tax on the income of the company not falling under clauses (d) and (e) of sub-section (4)</td><td colSpan={4}></td></tr>
                    <tr><td className="ps-4">(i) Income Tax</td>{Array(4).fill(0).map((_, i) => <td key={i}><input type="text" className="form-control form-control-sm border-0 bg-transparent text-center" defaultValue="0" /></td>)}</tr>
                    <tr><td className="ps-4">(ii) Interest on Direct Tax</td>{Array(4).fill(0).map((_, i) => <td key={i}><input type="text" className="form-control form-control-sm border-0 bg-transparent text-center" defaultValue="0" /></td>)}</tr>
                    <tr><td className="ps-4">(iii) Any other Income-tax</td>{Array(4).fill(0).map((_, i) => <td key={i}><input type="text" className="form-control form-control-sm border-0 bg-transparent text-center" defaultValue="0" /></td>)}</tr>
                    <tr><td>b. any compensation, damages or payments made voluntarily, that is to say, otherwise than in virtue of a liability such as is referred to in clause (m) of sub-section (4)</td>{Array(4).fill(0).map((_, i) => <td key={i}><input type="text" className="form-control form-control-sm border-0 bg-transparent text-center" defaultValue="0" /></td>)}</tr>
                    <tr><td>c. loss of a capital nature including loss on sale of the undertaking or any of the undertakings of the company or of any part thereof not including any excess of the written-down value of any asset which is sold, discarded, demolished or destroyed over its sale proceeds or its scrap value</td>{Array(4).fill(0).map((_, i) => <td key={i}><input type="text" className="form-control form-control-sm border-0 bg-transparent text-center" defaultValue="0" /></td>)}</tr>
                    <tr><td>d. any change in carrying amount of an asset or of a liability recognised in equity reserves including surplus in profit and loss account on measurement of the asset or the liability at fair value</td>{Array(4).fill(0).map((_, i) => <td key={i}><input type="text" className="form-control form-control-sm border-0 bg-transparent text-center" defaultValue="0" /></td>)}</tr>

                    {/* Summary Rows */}
                    <tr style={{ background: "#fed7aa" }} className="fw-bold border-top-2">
                       <td>Profit as per Section 198 of Companies Act, 2013</td>
                       {Array(4).fill(0).map((_, i) => <td key={i}><input type="text" className="form-control form-control-sm border-0 bg-transparent text-center fw-bold" defaultValue="0" /></td>)}
                    </tr>
                    <tr style={{ background: "#fed7aa" }} className="fw-bold">
                       <td>Average Profit of the Company (for FY )</td>
                       {Array(4).fill(0).map((_, i) => <td key={i}><input type="text" className="form-control form-control-sm border-0 bg-transparent text-center fw-bold" defaultValue="0" /></td>)}
                    </tr>
                    <tr className="fw-bold border-bottom-0">
                       <td colSpan={5}>Minimum CSR expenses to be incurred</td>
                    </tr>
                    <tr style={{ background: "#fed7aa" }} className="fw-bold">
                       <td>(2% of the Average Net Profit of the Company)</td>
                       {Array(4).fill(0).map((_, i) => <td key={i}><input type="text" className="form-control form-control-sm border-0 bg-transparent text-center fw-bold" defaultValue="0" /></td>)}
                    </tr>
                    <tr style={{ background: "#fed7aa" }} className="fw-bold">
                       <td>Less : Excess Spending of previous years <span className="text-danger small">(available for Set off)</span></td>
                       {Array(4).fill(0).map((_, i) => <td key={i}><input type="text" className="form-control form-control-sm border-0 bg-transparent text-center fw-bold" defaultValue="0" /></td>)}
                    </tr>
                    <tr style={{ background: "#fed7aa" }} className="fw-bold">
                       <td>CSR Liability for the year</td>
                       {Array(4).fill(0).map((_, i) => <td key={i}><input type="text" className="form-control form-control-sm border-0 bg-transparent text-center fw-bold" defaultValue="0" /></td>)}
                    </tr>
                    <tr style={{ background: "#fed7aa" }} className="fw-bold">
                       <td>CSR spent</td>
                       {Array(4).fill(0).map((_, i) => <td key={i}><input type="text" className="form-control form-control-sm border-0 bg-transparent text-center fw-bold" defaultValue="0" /></td>)}
                    </tr>
                    <tr style={{ background: "#fed7aa" }} className="fw-bold">
                       <td>Excess spent to be carried forward next year</td>
                       {Array(4).fill(0).map((_, i) => <td key={i}><input type="text" className="form-control form-control-sm border-0 bg-transparent text-center fw-bold" defaultValue="0" /></td>)}
                    </tr>
                 </tbody>
              </table>
           </div>

           {/* Footer Definition Box */}
           <div className="mt-4 border p-3 rounded bg-white text-start shadow-sm">
              <h6 className="fw-bold text-decoration-underline small mb-2 text-start">Definition of the "Net Profit" as per rule 2(h) of the The Companies (Corporate Social Responsibility Policy) Rules, 2014:</h6>
              <p className="small mb-0 text-muted" style={{ fontSize: "11px", lineHeight: "1.6" }}>
                 "Net profit" means the net profit of a company as per its financial statement prepared in accordance with the applicable provisions of the Act, but shall not include the following, namely:-<br />
                 (i) any profit arising from any overseas branch or branches of the company, whether operated as a separate company or otherwise; and<br />
                 (ii) any dividend received from other companies in India, which are covered under and complying with the provisions of section 135 of the Act: Provided that in case of a foreign company covered under these rules, net profit means the net profit of such company as per profit and loss account prepared in terms of clause (a) of sub-section (1) of section 381, read with section 198 of the Act.
              </p>
           </div>

           <div className="mt-4 text-start"><button className="btn btn-primary px-5 py-2 shadow-sm" style={{ background: "#2b4cb3" }}>Submit</button></div>
        </div>
      )}

      {/* ⭐ IMPORT MODAL */}
      {showImportModal && (
        <div className="modal show d-block" style={{ background: "rgba(0,0,0,0.5)" }}>
           <div className="modal-dialog modal-lg modal-dialog-centered">
              <div className="modal-content overflow-hidden border-0 shadow">
                 <div className="modal-header bg-white py-3 border-bottom d-flex justify-content-center">
                    <h5 className="modal-title fw-bold">Import Data from Excel</h5>
                 </div>
                 <div className="modal-body p-5 text-start">
                    <div className="row align-items-center bg-light p-4 rounded border">
                       <div className="col-md-3 fw-bold small">Upload Excel</div>
                       <div className="col-md-9 flex-column gap-3">
                          <input type="file" className="form-control border mb-3" />
                          <button className="btn btn-primary px-4 py-2" style={{ background: "#2b4cb3" }}>
                            <i className="bi bi-download me-2"></i> Download Template
                          </button>
                       </div>
                    </div>
                 </div>
                 <div className="modal-footer bg-light p-2 text-end border-top">
                    <button className="btn-close opacity-50 shadow-none" onClick={() => setShowImportModal(false)}></button>
                 </div>
              </div>
           </div>
        </div>
      )}
    </div>
  );
}
