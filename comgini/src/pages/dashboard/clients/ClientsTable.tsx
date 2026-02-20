export default function ClientsTable() {

  // ⭐ Dummy data (later replace with API)
  const clients = [
    {
      company: "24 MOONTIMES NEWS PRIVATE LIMITED",
      cin: "U83910UP2023PTC175954"
    },
    {
      company: "AARG INFRATECH PRIVATE LIMITED",
      cin: "U26990KA2021PTC155732"
    }
  ]

  return (
    <div className="card shadow-sm">
      <div className="table-responsive">

        <table className="table table-hover align-middle mb-0">

          <thead className="table-light">
            <tr>
              <th>Company Name</th>
              <th>CIN/LLPIN</th>
              <th>Assigned Members</th>
              <th>Client Groups</th>
              <th>WhatsApp Group Link</th>
              <th style={{ width: 80 }}></th>
            </tr>
          </thead>

          <tbody>
            {clients.map((item, index) => (
              <tr key={index}>
                <td>{item.company}</td>
                <td>{item.cin}</td>
                <td>-</td>
                <td>-</td>
                <td>-</td>
                <td>✎</td>
              </tr>
            ))}
          </tbody>

        </table>

      </div>
    </div>
  )
}
