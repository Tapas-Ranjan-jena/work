import DataTableCard from "../../../../../components/common/DataTableCard"

export default function IndexOfCharges(){

  const data:any[] = []

  return (
    <DataTableCard>

      <div className="table-responsive">

        <table className="table table-bordered align-middle mb-0">

          <thead>
            <tr>
              <th>Charge ID</th>
              <th>Charge Holder</th>
              <th>Creation Date</th>
              <th>Amount</th>
              <th>Status</th>
            </tr>
          </thead>

          <tbody>
            {data.length === 0 ? (
              <tr>
                <td colSpan={5} className="text-center text-muted py-4">
                  No record found.
                </td>
              </tr>
            ) : (
              data.map((row,index)=>(
                <tr key={index}>
                  <td>{row.id}</td>
                  <td>{row.holder}</td>
                  <td>{row.date}</td>
                  <td>{row.amount}</td>
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
