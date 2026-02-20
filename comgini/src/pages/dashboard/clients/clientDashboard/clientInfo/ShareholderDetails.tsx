import DataTableCard from "../../../../../components/common/DataTableCard"

export default function ShareholderDetails(){

  const data = [
    {
      name:"GULSHAN KUMAR MAGON",
      father:"GOPAL KRISHAN MAGON",
      type:"(With Voting Rights) (Equity)",
      shares:"400000"
    },
    {
      name:"JAGDISH CHANDER MAGON",
      father:"GOPAL KRISHAN MAGON",
      type:"(With Voting Rights) (Equity)",
      shares:"100000"
    }
  ]

  return (
    <DataTableCard>

      <div className="table-responsive">

        <table className="table table-bordered align-middle mb-0">

          <thead>
            <tr>
              <th>Shareholder Name</th>
              <th>Father Name</th>
              <th>Type of share</th>
              <th>Number of Share</th>
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
              data.map((row,index)=>(
                <tr key={index}>
                  <td>{row.name}</td>
                  <td>{row.father}</td>
                  <td>{row.type}</td>
                  <td>{row.shares}</td>
                </tr>
              ))
            )}
          </tbody>

        </table>

      </div>

    </DataTableCard>
  )
}
