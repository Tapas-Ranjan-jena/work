import DataTableCard from "../../../../../components/common/DataTableCard"

export default function DirectorsKMP(){

  const data:any[] = []

  return (
    <DataTableCard>

      <div className="table-responsive">

        <table className="table table-bordered align-middle mb-0">

          <thead>
            <tr>
              <th>DIN</th>
              <th>Name</th>
              <th>Appointment Date</th>
              <th>Designation</th>
              <th>DSC Status</th>
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
                  <td>{row.din}</td>
                  <td>{row.name}</td>
                  <td>{row.date}</td>
                  <td>{row.designation}</td>
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
