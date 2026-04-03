import { useState } from "react"

export default function FeeCalculatorTab() {
  const [sharesCount, setSharesCount] = useState("")
  const [nominalValue, setNominalValue] = useState("")
  const [totalNominalAmount, setTotalNominalAmount] = useState(0)
  const [custodialFee, setCustodialFee] = useState(0)
  const [joiningFee] = useState(15000)
  const [joiningFeeWithGst] = useState(17700)
  
  const calculateFees = () => {
    const count = parseFloat(sharesCount) || 0
    const nominal = parseFloat(nominalValue) || 0
    const totalAmount = count * nominal
    setTotalNominalAmount(totalAmount)

    // Rough calculation logic based on the chart
    let fee = 0
    if (totalAmount <= 25000000) fee = 5000
    else if (totalAmount <= 50000000) fee = 9000
    else if (totalAmount <= 100000000) fee = 22500
    else if (totalAmount <= 200000000) fee = 45000
    else fee = 75000 // Placeholder for higher ranges

    setCustodialFee(fee)
  }

  return (
    <div className="p-4 bg-white text-start shadow-sm" style={{ fontSize: "14px" }}>
      <div className="d-flex justify-content-end gap-2 mb-4">
          <button className="btn btn-primary d-flex align-items-center gap-2 shadow-none px-3 py-2 fw-bold" style={{ background: "#2b4cb3" }}>
            <i className="bi bi-plus-lg"></i> Import Form
          </button>
          <button className="btn btn-primary d-flex align-items-center gap-2 shadow-none px-4 py-2 fw-bold" style={{ background: "#2b4cb3" }}>
            <i className="bi bi-arrow-left-circle"></i> Back
          </button>
      </div>

      <h6 className="fw-bold mb-3 border-start border-4 border-primary ps-2">NSDL AND CDSL</h6>
      
      <div className="table-responsive border rounded mb-4">
        <table className="table table-bordered table-sm mb-0 align-middle">
          <thead className="bg-light text-center">
            <tr>
              <th className="py-2">Particulars</th>
              <th className="py-2" style={{ width: "150px" }}>Fee</th>
              <th className="py-2" style={{ width: "200px" }}>Payable Amount (including GST)</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="px-3 fw-bold">One time joining fee for listed/unlisted company</td>
              <td className="text-center">15,000</td>
              <td className="text-center">17,700</td>
            </tr>
            <tr>
              <td className="px-3 border-0 py-0">
                <div className="row g-2 py-2">
                    <div className="col-12 small fw-bold mb-1">(Number of share * Nominal Value per share = Total nominal amount)</div>
                    <div className="col-4">
                        <input type="text" className="form-control form-control-sm shadow-none" placeholder="0" value={sharesCount} onChange={(e) => setSharesCount(e.target.value)} onBlur={calculateFees} />
                    </div>
                    <div className="col-4">
                        <input type="text" className="form-control form-control-sm shadow-none" placeholder="0" value={nominalValue} onChange={(e) => setNominalValue(e.target.value)} onBlur={calculateFees} />
                    </div>
                    <div className="col-4">
                        <input type="text" className="form-control form-control-sm bg-light shadow-none fw-bold" value={totalNominalAmount} disabled />
                    </div>
                </div>
              </td>
              <td className="text-center bg-light fw-bold">{custodialFee.toLocaleString()}</td>
              <td className="text-center bg-light fw-bold">{(custodialFee * 1.18).toLocaleString()}</td>
            </tr>
            <tr>
                <td className="px-3 fw-bold">Security Deposit</td>
                <td className="text-center bg-light fw-bold">0</td>
                <td className="text-center bg-light fw-bold">0</td>
            </tr>
            <tr className="bg-light fw-bold">
                <td className="px-3 text-primary">Total Amount</td>
                <td className="text-center">{(joiningFee + custodialFee).toLocaleString()}</td>
                <td className="text-center">{(joiningFeeWithGst + (custodialFee * 1.18)).toLocaleString()}</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div className="p-3 border rounded mb-5" style={{ background: "#fff9f9", border: "1px solid #ffcccc" }}>
        <p className="small mb-0 text-danger fw-bold">Disclaimer: The charges provided are estimated based on the entered information and are intended for general guidance. Actual charges may vary from these estimates</p>
      </div>

      <h5 className="fw-bold mb-3">Fee Chart</h5>
      <h6 className="fw-bold mb-3 text-secondary">NSDL and CDSL</h6>
      
      <div className="table-responsive border rounded mb-5">
        <table className="table table-bordered table-sm mb-0">
          <thead className="bg-light">
            <tr>
              <th className="py-2 px-3">Nominal value of admitted securities (₹)</th>
              <th className="py-2 px-3">Annual Custodial Charges payable by an Issuer to Depository (₹)</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="px-3 py-2">
                Upto 2.5 crore<br />
                <span className="text-danger small">*applicable for unlisted entity only</span>
              </td>
              <td className="px-3 py-2 text-center align-middle">5,000</td>
            </tr>
            <tr><td className="px-3 py-2">Above 2.5 crore and upto 5 crore</td><td className="px-3 py-2 text-center align-middle">9,000</td></tr>
            <tr><td className="px-3 py-2">Above 5 crore and upto 10 crore</td><td className="px-3 py-2 text-center align-middle">22,500</td></tr>
            <tr><td className="px-3 py-2">Above 10 crore and upto 20 crore</td><td className="px-3 py-2 text-center align-middle">45,000</td></tr>
            <tr><td className="px-3 py-2">Above 20 crore</td><td className="px-3 py-2 text-center align-middle">75,000</td></tr>
          </tbody>
        </table>
      </div>

      <h6 className="fw-bold mb-3 text-uppercase border-bottom pb-2">Payment Details</h6>
      
      <div className="mb-4">
        <div className="d-flex align-items-center gap-4 p-3 border rounded bg-light" style={{ maxWidth: "400px" }}>
            <span className="fw-bold small">Have you made the payment?</span>
            <div className="d-flex gap-3">
                <div className="form-check mb-0">
                    <input className="form-check-input" type="radio" name="payment_made" id="pay_yes" />
                    <label className="form-check-label small" htmlFor="pay_yes">Yes</label>
                </div>
                <div className="form-check mb-0">
                    <input className="form-check-input" type="radio" name="payment_made" id="pay_no" checked />
                    <label className="form-check-label small" htmlFor="pay_no">No</label>
                </div>
            </div>
        </div>
      </div>

      <div className="table-responsive border rounded mb-5">
        <table className="table table-bordered table-sm mb-0 align-middle small text-center" style={{ minWidth: "1000px" }}>
          <thead className="bg-light">
            <tr>
                <th className="py-2 text-start px-3" style={{ width: "250px" }}>Name of Issuer</th>
                <th colSpan={7} className="p-0"><input type="text" className="form-control form-control-sm border-0 rounded-0 shadow-none px-3" /></th>
            </tr>
            <tr>
                <th className="py-2 text-start px-3">Application Reference Number (ARN)</th>
                <th colSpan={7} className="p-0"><input type="text" className="form-control form-control-sm border-0 rounded-0 shadow-none px-3" /></th>
            </tr>
            <tr className="bg-info-subtle">
              <th rowSpan={2} className="py-3 text-start px-3" style={{ width: "250px" }}>Particulars of Fees</th>
              <th rowSpan={2} className="py-3" style={{ width: "100px" }}>Date of Payment</th>
              <th rowSpan={2} className="py-3" style={{ width: "120px" }}>Bank Name</th>
              <th colSpan={2} className="py-2">Payment Details</th>
              <th rowSpan={2} className="py-3" style={{ width: "120px" }}>Total fees including GST</th>
              <th rowSpan={2} className="py-3" style={{ width: "100px" }}>TDS Amount (In Rs.)</th>
              <th rowSpan={2} className="py-3" style={{ width: "120px" }}>Amount paid (In Rs.)</th>
            </tr>
            <tr className="bg-info-subtle">
                <th className="py-2 fw-bold small" style={{ width: "120px" }}>Cheque / DD / UTR</th>
                <th className="py-2 fw-bold small" style={{ width: "120px" }}>NEFT / RTGS</th>
            </tr>
          </thead>
          <tbody>
            {[
                { label: "Joining Fees", key: "joining" },
                { label: "Annual Custody Fees", key: "custody" },
                { label: "Security Deposit (2 years of applicable Annual Custody Fees)", key: "deposit" }
            ].map((row) => (
                <tr key={row.key}>
                    <td className="text-start px-3 py-2 fw-bold bg-light">{row.label}</td>
                    <td className="p-0"><input type="text" className="form-control form-control-sm border-0 rounded-0 shadow-none text-center" placeholder="d/m/Y" /></td>
                    <td className="p-0"><input type="text" className="form-control form-control-sm border-0 rounded-0 shadow-none text-center" /></td>
                    <td className="p-0"><input type="text" className="form-control form-control-sm border-0 rounded-0 shadow-none text-center" /></td>
                    <td className="p-0"><input type="text" className="form-control form-control-sm border-0 rounded-0 shadow-none text-center" /></td>
                    <td className="p-0"><input type="text" className="form-control form-control-sm border-0 rounded-0 shadow-none text-center" /></td>
                    <td className="p-0"><input type="text" className="form-control form-control-sm border-0 rounded-0 shadow-none text-center" /></td>
                    <td className="p-0"><input type="text" className="form-control form-control-sm border-0 rounded-0 shadow-none text-center" /></td>
                </tr>
            ))}
            <tr className="bg-light fw-bold">
                <td colSpan={5} className="text-end px-3 py-2">Total</td>
                <td className="p-0"><input type="text" className="form-control form-control-sm border-0 rounded-0 shadow-none text-center fw-bold bg-light" disabled value="0" /></td>
                <td className="p-0"><input type="text" className="form-control form-control-sm border-0 rounded-0 shadow-none text-center fw-bold bg-light" disabled value="0" /></td>
                <td className="p-0"><input type="text" className="form-control form-control-sm border-0 rounded-0 shadow-none text-center fw-bold bg-light" disabled value="0" /></td>
            </tr>
          </tbody>
        </table>
      </div>

      <div className="row g-4 mb-5">
          <div className="col-md-4">
              <label className="fw-bold small mb-2">Signing Person</label>
              <select className="form-select form-select-sm border shadow-none">
                  <option>Select Person</option>
              </select>
          </div>
          <div className="col-md-4">
              <label className="fw-bold small mb-2">Date of Signing</label>
              <input type="text" className="form-control form-control-sm border shadow-none" placeholder="d/m/Y" />
          </div>
          <div className="col-md-4">
              <label className="fw-bold small mb-2">Place of Signing</label>
              <input type="text" className="form-control form-control-sm border shadow-none" />
          </div>
      </div>

      <div className="text-start">
          <button className="btn btn-primary px-5 py-2 fw-bold" style={{ backgroundColor: "#2b4cb3" }}>Submit</button>
      </div>
    </div>
  )
}
