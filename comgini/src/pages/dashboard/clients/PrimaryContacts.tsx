import { useState, useEffect, useCallback } from "react"
import AddContactModal from "../../../components/modals/AddContactModal"
import clientService from "../../../services/clients/client.service"
import mastersService from "../../../services/mastersService"
import type { PrimaryContact } from "../../../types/masters.types"

export default function PrimaryContacts() {
  const [openModal, setOpenModal] = useState(false)
  const [contacts, setContacts] = useState<PrimaryContact[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const getInitials = (name: string) => {
    return name.split(" ").map(n => n[0]).join("").substring(0, 2).toUpperCase()
  }

  const fetchContacts = useCallback(async () => {
    try {
      setLoading(true)
      const res = await mastersService.getPrimaryContacts()
      setContacts(res)
    } catch (err: any) {
      setError(err.message || "Failed to fetch contacts")
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchContacts()
  }, [fetchContacts])

  const handleDeleteContact = async (clientId: number, contactId: number) => {
    if (!window.confirm("Are you sure you want to delete this contact?")) return
    try {
      await clientService.deleteClientContact(clientId, contactId)
      fetchContacts()
    } catch (err: any) {
      alert(err.message || "Failed to delete contact")
    }
  }

  return (
    <div>
      {/* HEADER + BUTTON */}
      <div className="d-flex justify-content-between align-items-center mb-4 mt-2">
        <div>
          <h5 className="fw-bold m-0 text-dark">Primary Contacts</h5>
          <small className="text-muted">Manage all your client's primary communication points</small>
        </div>
        <button
          className="btn btn-primary shadow-sm"
          style={{ padding: "0.5rem 1.25rem", borderRadius: "8px" }}
          onClick={() => setOpenModal(true)}
        >
          <i className="bi bi-person-plus me-2"></i>
          Add Contact
        </button>
      </div>

      {/* ERROR MESSAGE */}
      {error && (
        <div className="alert alert-danger alert-dismissible fade show" role="alert">
          {error}
          <button type="button" className="btn-close" onClick={() => setError(null)}></button>
        </div>
      )}

      {/* TABLE */}
      <div className="client-table table-responsive">
        <table className="table align-middle mb-0" style={{ borderCollapse: "separate", borderSpacing: "0 0.5rem" }}>
          <thead className="bg-light text-muted" style={{ letterSpacing: "0.5px", fontSize: "0.75rem", textTransform: "uppercase" }}>
            <tr>
              <th className="border-0 rounded-start font-weight-bold p-3">Name</th>
              <th className="border-0 font-weight-bold p-3">Company Name</th>
              <th className="border-0 font-weight-bold p-3">Designation</th>
              <th className="border-0 font-weight-bold p-3">Email</th>
              <th className="border-0 font-weight-bold p-3">Phone</th>
              <th className="border-0 rounded-end font-weight-bold p-3" style={{ width: 80 }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan={6} className="text-center py-5">
                  <div className="spinner-border text-primary" role="status"></div>
                </td>
              </tr>
            ) : contacts.length === 0 ? (
              <tr>
                <td colSpan={6} className="text-center text-muted py-5 bg-white shadow-sm rounded">
                  <div className="d-flex flex-column align-items-center">
                    <i className="bi bi-inbox fs-2 text-muted mb-2"></i>
                    <p className="mb-0">No records found.</p>
                  </div>
                </td>
              </tr>
            ) : (
              contacts.map((item) => (
                <tr 
                  key={item.id} 
                  className="bg-white shadow-sm rounded transition-all hover-shadow"
                  style={{ transition: "all 0.2s ease-in-out" }}
                  onMouseEnter={(e) => (e.currentTarget.style.transform = "translateY(-1px)") || (e.currentTarget.style.boxShadow = "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)")}
                  onMouseLeave={(e) => (e.currentTarget.style.transform = "translateY(0)") || (e.currentTarget.style.boxShadow = "0 1px 2px 0 rgba(0, 0, 0, 0.05)")}
                >
                  <td className="p-3 border-0 rounded-start">
                    <div className="d-flex align-items-center gap-3">
                      <div className="avatar bg-primary text-white rounded-circle d-flex align-items-center justify-content-center fw-bold shadow-sm" style={{ width: "40px", height: "40px", fontSize: "14px" }}>
                        {getInitials(item.name || '?')}
                      </div>
                      <div className="text-dark fw-semibold">{item.name}</div>
                    </div>
                  </td>
                  <td className="p-3 border-0 text-muted fw-medium">{item.company_name}</td>
                  <td className="p-3 border-0 text-muted">
                    <span className="badge bg-light text-dark border px-2 py-1">{item.designation || '-'}</span>
                  </td>
                  <td className="p-3 border-0 text-muted">
                    <div className="d-flex align-items-center gap-2">
                       <i className="bi bi-envelope text-secondary"></i> {item.email}
                    </div>
                  </td>
                  <td className="p-3 border-0 text-muted">
                     <div className="d-flex align-items-center gap-2">
                       <i className="bi bi-telephone text-secondary"></i> {item.phone}
                     </div>
                  </td>
                  <td className="p-3 border-0 rounded-end">
                    <button
                      className="btn btn-sm btn-outline-danger border-0"
                      onClick={() => handleDeleteContact(item.client_id, item.id)}
                      title="Delete"
                    >
                      <i className="bi bi-trash"></i>
                    </button>
                  </td>
                </tr>
              ))
            )}
            </tbody>
          </table>
        </div>

      {/* ⭐ MODAL */}
      {openModal && (
        <AddContactModal
          onClose={() => setOpenModal(false)}
          onContactAdded={fetchContacts}
        />
      )}
    </div>
  )
}
