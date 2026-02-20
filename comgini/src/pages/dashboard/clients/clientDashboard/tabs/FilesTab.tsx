import { useState } from "react"
import AddFilesModal from "../../../../../components/modals/AddFilesModal"
import DataTableCard from "../../../../../components/common/DataTableCard"

export default function FilesTab() {

  const [openModal, setOpenModal] = useState(false)

  // ⭐ later replace with API
  const files: any[] = []

  return (
    <div>

      <DataTableCard
        title="Files"
        addButton={
          <button
            className="btn btn-outline-dark btn-sm"
            onClick={() => setOpenModal(true)}
          >
            + Add Files
          </button>
        }
        showToolbar
        showEntries
        showExport   // ⭐ Excel + Print added
        showSearch
      >

        {/* ================= TABLE ================= */}
        <div className="table-responsive">

          <table className="table align-middle mb-0 table-bordered">

            <thead>
              <tr>
                <th>ID</th>
                <th>Files</th>
                <th>Size</th>
                <th>Uploaded by</th>
                <th>Created date</th>
              </tr>
            </thead>

            <tbody>
              {files.length === 0 ? (
                <tr>
                  <td colSpan={5} className="text-center text-muted py-4">
                    No record found.
                  </td>
                </tr>
              ) : (
                files.map((f, i) => (
                  <tr key={i}>
                    <td>{f.id}</td>
                    <td>{f.name}</td>
                    <td>{f.size}</td>
                    <td>{f.user}</td>
                    <td>{f.date}</td>
                  </tr>
                ))
              )}
            </tbody>

          </table>

        </div>

      </DataTableCard>

      {/* ================= MODAL ================= */}
      {openModal && (
        <AddFilesModal onClose={() => setOpenModal(false)} />
      )}

    </div>
  )
}
