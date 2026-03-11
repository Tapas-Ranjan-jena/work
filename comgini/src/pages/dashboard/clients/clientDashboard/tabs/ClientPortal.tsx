import { useState, useEffect, useCallback } from "react"
import { useParams } from "react-router-dom"
import AddClientPortalModal from "../../../../../components/modals/AddClientPortalModal"
import DataTableCard from "../../../../../components/common/DataTableCard"
import clientService from "../../../../../services/clients/client.service"

export default function ClientPortal() {
  const { clientId: id } = useParams<{ clientId: string }>()
  const clientId = id ? parseInt(id) : 0

  const [openModal, setOpenModal] = useState<boolean>(false)
  const [portalUsers, setPortalUsers] = useState<any[]>([])
  const [loading, setLoading] = useState(!!clientId)

  const fetchPortalUsers = useCallback(async () => {
    if (!clientId) return
    try {
      setLoading(true)
      const data = await clientService.getClientPortalUsers(clientId)
      setPortalUsers(data)
    } catch (err: any) {
      console.error("Failed to fetch portal users:", err)
    } finally {
      setLoading(false)
    }
  }, [clientId])

  useEffect(() => {
    fetchPortalUsers()
  }, [fetchPortalUsers])

  const handleDelete = async (userId: number) => {
    if (!window.confirm("Are you sure you want to delete this portal user?")) return
    try {
      await clientService.deleteClientPortalUser(clientId, userId)
      fetchPortalUsers()
    } catch (err: any) {
      alert(err.message || "Failed to delete portal user")
    }
  }

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
        showToolbar
        showEntries
        showExport
        showSearch
      >
        <div className="table-responsive">
          <table className="table table-bordered align-middle mb-0">
            <thead>
              <tr>
                <th>Name</th>
                <th>Job Title</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Skype</th>
                <th style={{ width: 80 }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan={6} className="text-center py-4">
                    <div className="spinner-border spinner-border-sm text-primary" role="status"></div>
                    <span className="ms-2">Loading...</span>
                  </td>
                </tr>
              ) : portalUsers.length === 0 ? (
                <tr>
                  <td colSpan={6} className="text-center text-muted py-4">
                    No record found.
                  </td>
                </tr>
              ) : (
                portalUsers.map((user) => (
                  <tr key={user.id}>
                    <td>{user.firstName} {user.lastName}</td>
                    <td>{user.jobTitle || "-"}</td>
                    <td>{user.email}</td>
                    <td>{user.phone || "-"}</td>
                    <td>{user.skype || "-"}</td>
                    <td>
                      <button
                        className="btn btn-sm btn-link text-danger p-0"
                        onClick={() => handleDelete(user.id)}
                        title="Delete"
                      >
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <polyline points="3 6 5 6 21 6"></polyline>
                          <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                          <line x1="10" y1="11" x2="10" y2="17"></line>
                          <line x1="14" y1="11" x2="14" y2="17"></line>
                        </svg>
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </DataTableCard>

      {openModal && (
        <AddClientPortalModal
          clientId={clientId}
          onClose={() => setOpenModal(false)}
          onSuccess={fetchPortalUsers}
        />
      )}
    </div>
  )
}
