type Column = {
  label: string
  key: string
}

type Props = {
  columns: Column[]
  data: any[]
}

export default function InfoTable({ columns, data }: Props){

  return (
    <div className="client-table">

      <table className="table table-sm align-middle mb-0">

        <thead>
          <tr>
            {columns.map(col=>(
              <th key={col.key}>{col.label}</th>
            ))}
          </tr>
        </thead>

        <tbody>

          {data.length === 0 && (
            <tr>
              <td colSpan={columns.length} className="text-center py-4 text-muted">
                No records found
              </td>
            </tr>
          )}

          {data.map((row,index)=>(
            <tr key={index}>
              {columns.map(col=>(
                <td key={col.key}>
                  {row[col.key]}
                </td>
              ))}
            </tr>
          ))}

        </tbody>

      </table>

    </div>
  )
}
