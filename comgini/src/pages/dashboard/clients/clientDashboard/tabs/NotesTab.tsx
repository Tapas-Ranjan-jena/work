import { useState } from "react"
import AddNoteModal from "../../../../../components/modals/AddNoteModal"
import DataTableCard from "../../../../../components/common/DataTableCard"

export default function NotesTab() {

  const [openModal, setOpenModal] = useState(false)

  const notes: any[] = []

  return (
    <div>

      <DataTableCard
        title="Notes"
        addButton={
          <button
            className="btn btn-outline-dark btn-sm"
            onClick={() => setOpenModal(true)}
          >
            + Add Notes
          </button>
        }
        showToolbar
        showEntries
        showSearch
        /* ❌ showExport REMOVED */
      >

        <div className="table-responsive">
          <table className="table table-bordered align-middle mb-0">

            <thead>
              <tr>
                <th>Created date</th>
                <th>Title</th>
                <th>Files</th>
              </tr>
            </thead>

            <tbody>
              {notes.length === 0 ? (
                <tr>
                  <td colSpan={3} className="text-center text-muted py-4">
                    No record found.
                  </td>
                </tr>
              ) : (
                notes.map((n, i) => (
                  <tr key={i}>
                    <td>{n.date}</td>
                    <td>{n.title}</td>
                    <td>{n.files}</td>
                  </tr>
                ))
              )}
            </tbody>

          </table>
        </div>

      </DataTableCard>

      {openModal && (
        <AddNoteModal onClose={() => setOpenModal(false)} />
      )}

    </div>
  )
}
