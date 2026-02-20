import DataTableCard from "../../../../../components/common/DataTableCard"

export default function Assignments() {

  // ⭐ Later replace with API data
  const rows = [
    { id: 10, title: "Capital Structure", pending: 0, completed: "-", total: "-" },
    { id: 9, title: "Miscellaneous", pending: 0, completed: "-", total: "-" },
    { id: 8, title: "Search -View Public Document", pending: 0, completed: "-", total: "-" },
    { id: 7, title: "Statutory Compliances", pending: 0, completed: "-", total: "-" },
    { id: 6, title: "Charge Management", pending: 0, completed: "-", total: "-" },
    { id: 5, title: "Auditor related working", pending: 0, completed: "-", total: "-" },
    { id: 4, title: "Change of Name and Alteration of MOA", pending: 0, completed: "-", total: "-" },
    { id: 3, title: "Incorporation", pending: 0, completed: "-", total: "-" },
    { id: 2, title: "Director & KMP", pending: 0, completed: "-", total: "-" },
    { id: 1, title: "Annual Filing 2024-25", pending: 0, completed: "-", total: "-" },
  ]

  return (
    <div>

      <DataTableCard
        title="Assignments"
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
                <th>ID</th>
                <th>Title</th>
                <th>Pending Task</th>
                <th>Completed Task</th>
                <th>Total Task</th>
              </tr>
            </thead>

            <tbody>
              {rows.map((item) => (
                <tr key={item.id}>
                  <td>{item.id}</td>
                  <td>{item.title}</td>
                  <td>{item.pending}</td>
                  <td>{item.completed}</td>
                  <td>{item.total}</td>
                </tr>
              ))}
            </tbody>

          </table>

        </div>

      </DataTableCard>

    </div>
  )
}
