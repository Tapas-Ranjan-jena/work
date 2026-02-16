import { useState } from "react"
import AddContactModal from "../../../../../components/modals/AddContactModal"
import DataTableCard from "../../../../../components/common/DataTableCard"

type Contact = {
  id: number
  name: string
  company: string
  job: string
  email: string
  phone: string
  skype: string
}

export default function PrimaryContactTab() {

  const [openModal, setOpenModal] = useState(false)

  // ⭐ Later replace with API data
  const contacts: Contact[] = []

  return (
    <div>

      <DataTableCard
        title="Primary Contact"
        addButton={
          <button
            className="btn btn-outline-dark btn-sm"
            onClick={() => setOpenModal(true)}
          >
            + Add Contact
          </button>
        }

        /* ⭐ TOOLBAR AUTO GENERATED */
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
                <th>Company Name</th>
                <th>Job Title</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Skype</th>
              </tr>
            </thead>

            <tbody>
              {contacts.length === 0 ? (
                <tr>
                  <td colSpan={6} className="text-center text-muted py-4">
                    No record found.
                  </td>
                </tr>
              ) : (
                contacts.map((item) => (
                  <tr key={item.id}>
                    <td>{item.name}</td>
                    <td>{item.company}</td>
                    <td>{item.job}</td>
                    <td>{item.email}</td>
                    <td>{item.phone}</td>
                    <td>{item.skype}</td>
                  </tr>
                ))
              )}
            </tbody>

          </table>

        </div>

      </DataTableCard>

      {/* ================= MODAL ================= */}
      {openModal && (
        <AddContactModal onClose={() => setOpenModal(false)} />
      )}

    </div>
  )
}
