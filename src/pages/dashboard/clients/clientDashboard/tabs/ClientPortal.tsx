import { useState } from "react"
import AddClientPortalModal from "../../../../../components/modals/AddClientPortalModal"

export default function ClientPortal(){

  const [openModal,setOpenModal] = useState(false)

  return (
    <div>

      {/* HEADER */}
      <div className="d-flex justify-content-between align-items-center mb-3">

        <h6 className="fw-bold m-0">Client portal</h6>

        <button
          className="btn btn-outline-dark btn-sm"
          onClick={()=>setOpenModal(true)}
        >
          + Add client Portal
        </button>

      </div>

      {/* TABLE AREA */}
      <div className="client-table">
        <table>
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
              <td colSpan={5} className="text-center text-muted">
                No record found.
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* MODAL */}
      {openModal && (
        <AddClientPortalModal onClose={()=>setOpenModal(false)} />
      )}

    </div>
  )
}
