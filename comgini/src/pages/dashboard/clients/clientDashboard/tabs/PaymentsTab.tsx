import DataTableCard from "../../../../../components/common/DataTableCard"

export default function PaymentsTab() {

  // ⭐ Later replace with API data
  const payments: any[] = []

  return (
    <div>

      <DataTableCard
        title="Payments"
        showToolbar
        showEntries
        showExport
        showSearch
      >

        {/* ================= TABLE ================= */}
        <div className="table-responsive">

          <table className="table table-bordered align-middle mb-0">

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

      </DataTableCard>

    </div>
  )
}
