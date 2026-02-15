export default function PaymentsTab() {

  // ⭐ Later replace with API data
  const payments: any[] = []

  return (
    <div>

      {/* HEADER */}
      <div className="d-flex justify-content-between align-items-center mb-3">

        <h6 className="fw-bold m-0">Payments</h6>

        <div className="d-flex gap-2">

          <select className="form-select form-select-sm">
            <option>100</option>
          </select>

          <button className="btn btn-light btn-sm">Excel</button>
          <button className="btn btn-light btn-sm">Print</button>

          <input
            className="form-control form-control-sm"
            placeholder="Search"
            style={{ width: 160 }}
          />

        </div>

      </div>

      {/* TABLE */}
      <div className="client-table">
        <div className="table-responsive">

          <table className="table align-middle mb-0">

            <thead>
              <tr>
                <th>Invoice ID</th>
                <th>Payment date</th>
                <th>Payment method</th>
                <th>Note</th>
                <th>Amount</th>
              </tr>
            </thead>

            <tbody>
              {payments.length === 0 ? (
                <tr>
                  <td colSpan={5} className="text-center text-muted py-4">
                    No record found.
                  </td>
                </tr>
              ) : (
                payments.map((item, index) => (
                  <tr key={index}>
                    <td>{item.invoiceId}</td>
                    <td>{item.date}</td>
                    <td>{item.method}</td>
                    <td>{item.note}</td>
                    <td>{item.amount}</td>
                  </tr>
                ))
              )}
            </tbody>

          </table>

        </div>
      </div>

    </div>
  )
}
