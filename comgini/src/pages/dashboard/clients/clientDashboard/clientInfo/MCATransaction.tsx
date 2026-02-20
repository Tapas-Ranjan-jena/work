import DataTableCard from "../../../../../components/common/DataTableCard"

export default function MCATransaction() {

  const data: any[] = []

  return (
    <DataTableCard>

      <div className="table-responsive">

        <table className="table table-bordered align-middle mb-0">

          <thead>
            <tr>
              <th>Form Name</th>
              <th>SRN</th>
              <th>Transaction Date</th>
              <th>Status</th>
            </tr>
          </thead>

          <tbody>
            {data.length === 0 ? (
              <tr>
                <td colSpan={4} className="text-center text-muted py-4">
                  No record found.
                </td>
              </tr>
            ) : (
              data.map((row, index) => (
                <tr key={index}>
                  <td>{row.form}</td>
                  <td>{row.srn}</td>
                  <td>{row.date}</td>
                  <td>{row.status}</td>
                </tr>
              ))
            )}

          </tbody>

        </table>

      </div>

    </DataTableCard>
  )
}
