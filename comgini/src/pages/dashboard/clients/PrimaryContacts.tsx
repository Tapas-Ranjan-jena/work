import { useState, useEffect, useCallback } from "react"
import AddContactModal from "../../../components/modals/AddContactModal"
import clientService from "../../../services/clients/client.service"
import type { ClientContact } from "../../../services/clients/types"

interface ContactWithClient extends ClientContact {
  companyName: string;
}

export default function PrimaryContacts() {
  const [openModal, setOpenModal] = useState(false)
  const [contacts, setContacts] = useState<ContactWithClient[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchContacts = useCallback(async () => {
    try {
      setLoading(true)
      const response = await clientService.getClients(1, 100) // Fetch top 100 clients to get contacts

      const allContacts: ContactWithClient[] = []
      if (response && response.data) {
        response.data.forEach(client => {
          if (client.contacts) {
            client.contacts.forEach(contact => {
              allContacts.push({
                ...contact,
                companyName: client.name
              })
            })
          }
        })
      }

      setContacts(allContacts.filter(c => c.is_primary === 1))
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
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h6 className="fw-bold m-0">Primary Contact</h6>
        <button
          className="btn btn-outline-dark btn-sm"
          onClick={() => setOpenModal(true)}
        >
          + Add Contact
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
      <div className="client-table card shadow-sm">
        <div className="table-responsive">
          <table className="table table-hover align-middle mb-0">
            <thead className="table-light">
              <tr>
                <th>Name</th>
                <th>Company Name</th>
                <th>Designation</th>
                <th>Email</th>
                <th>Phone</th>
                <th style={{ width: 80 }}>Actions</th>
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
                  <td colSpan={6} className="text-center text-muted py-4">
                    No record found.
                  </td>
                </tr>
              ) : (
                contacts.map((item) => (
                  <tr key={item.id}>
                    <td>{item.name}</td>
                    <td>{item.companyName}</td>
                    <td>{item.designation || '-'}</td>
                    <td>{item.email}</td>
                    <td>{item.phone}</td>
                    <td>
                      <button
                        className="btn btn-sm btn-link text-danger p-0"
                        onClick={() => handleDeleteContact(item.client_id, item.id)}
                        title="Delete"
                      >
                        🗑
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
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
