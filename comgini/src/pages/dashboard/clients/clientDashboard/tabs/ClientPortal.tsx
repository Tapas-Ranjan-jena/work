import { useState } from "react"
import AddClientPortalModal from "../../../../../components/modals/AddClientPortalModal"
import DataTableCard from "../../../../../components/common/DataTableCard"

export default function ClientPortal() {

  const [openModal, setOpenModal] = useState<boolean>(false)

  return (
    <div className="client-portal-wrapper">

      <DataTableCard
        title="Client portal"
        addButton={
          <button
            className="btn btn-outline-dark btn-sm"
            onClick={() => setOpenModal(true)}
          >
            + Add Client Portal
          </button>
        }

        /* ⭐ TOOLBAR COMES AUTOMATICALLY */
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
                <th>Name</th>
                <th>Job Title</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Skype</th>
              </tr>
            </thead>

            <tbody>
              <tr>
                <td colSpan={5} className="text-center text-muted py-4">
                  No record found.
                </td>
              </tr>
            </tbody>

          </table>
        </div>

      </DataTableCard>

      {/* ================= MODAL ================= */}
      {openModal && (
        <AddClientPortalModal onClose={() => setOpenModal(false)} />
      )}

    </div>
  )
}
