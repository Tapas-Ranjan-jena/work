import { useState, useEffect, useCallback } from "react"
import ClientTable from "./ClientsTable"
import PrimaryContact from "./PrimaryContacts"
import AddClientModal from "../../../components/modals/AddClientModal"
import AddCompanyModal from "../../../components/modals/AddCompanyModal"
import clientService from "../../../services/clients/client.service"
import type { Client, Pagination } from "../../../services/clients/types"
import ErrorBoundary from "../../../components/common/ErrorBoundary"

export default function ClientPage() {
  return (
    <ErrorBoundary>
      <ClientPageContent />
    </ErrorBoundary>
  )
}

function ClientPageContent() {
  const [tab, setTab] = useState<"clients" | "contacts">("clients")
  const [showClient, setShowClient] = useState(false)
  const [showCompany, setShowCompany] = useState(false)
  const [editingClient, setEditingClient] = useState<Client | null>(null)

  // API State
  const [clients, setClients] = useState<Client[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [search, setSearch] = useState("")
  const [pagination, setPagination] = useState<Pagination>({
    page: 1,
    limit: 10,
    total: 0
  })

  const fetchClients = useCallback(async () => {
    try {
      setLoading(true)
      setError(null)

      let response
      if (search) {
        response = await clientService.searchClients(search, pagination.page, pagination.limit)
      } else {
        response = await clientService.getClients(pagination.page, pagination.limit)
      }

      if (response && response.data) {
        setClients(response.data) // response.data is the array of clients from PaginatedResponse
        setPagination(response.pagination || {
          page: pagination.page,
          limit: pagination.limit,
          total: response.data.length
        })
      }
    } catch (err: any) {
      setError(err.message || "Failed to fetch clients")
    } finally {
      setLoading(false)
    }
  }, [search, pagination?.page, pagination?.limit])

  useEffect(() => {
    const timer = setTimeout(() => {
      fetchClients()
    }, search ? 500 : 0) // Debounce search

    return () => clearTimeout(timer)
  }, [fetchClients])

  const handleEditClient = (client: Client) => {
    setEditingClient(client)
    setShowCompany(true)
  }

  const handleDeleteClient = async (id: number) => {
    if (!window.confirm("Are you sure you want to delete this client?")) return
    try {
      await clientService.deleteClient(id)
      fetchClients()
    } catch (err: any) {
      alert(err.message || "Failed to delete client")
    }
  }

  return (
    <div>
      {/* HEADER */}
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h5 className="fw-bold">Clients</h5>

        <div className="d-flex gap-2">
          {/* SEARCH */}
          <input
            type="text"
            className="form-control"
            placeholder="Search clients..."
            style={{ width: 250 }}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          {/* ⭐ ADD CLIENT */}
          <button
            className="btn btn-primary"
            onClick={() => setShowClient(true)}
          >
            Add Client
          </button>

          {/* ⭐ ADD COMPANY */}
          <button
            className="btn btn-outline-primary"
            onClick={() => {
              setEditingClient(null)
              setShowCompany(true)
            }}
          >
            Add Company
          </button>
        </div>
      </div>

      {/* ERROR MESSAGE */}
      {error && (
        <div className="alert alert-danger alert-dismissible fade show" role="alert">
          {error}
          <button type="button" className="btn-close" onClick={() => setError(null)}></button>
        </div>
      )}

      {/* TABS */}
      <ul className="nav nav-pills mb-4 p-1 bg-light rounded-pill d-inline-flex shadow-sm border border-light">
        <li className="nav-item">
          <button
            className={`nav-link rounded-pill px-4 py-2 ${tab === "clients" ? "active shadow" : "text-muted"}`}
            onClick={() => setTab("clients")}
            style={{ fontWeight: tab === "clients" ? "600" : "500", transition: "all 0.2s" }}
          >
            <i className="bi bi-buildings-fill me-2"></i>
            Clients
          </button>
        </li>
        <li className="nav-item">
          <button
            className={`nav-link rounded-pill px-4 py-2 ${tab === "contacts" ? "active shadow" : "text-muted"}`}
            onClick={() => setTab("contacts")}
            style={{ fontWeight: tab === "contacts" ? "600" : "500", transition: "all 0.2s" }}
          >
            <i className="bi bi-person-lines-fill me-2"></i>
            Primary Contacts
          </button>
        </li>
      </ul>

      {/* CONTENT */}
      {tab === "clients" ? (
        <>
          <ClientTable
            clients={clients}
            loading={loading}
            onEdit={handleEditClient}
            onDelete={handleDeleteClient}
          />

          {/* PAGINATION */}
          {!loading && clients.length > 0 && pagination && (
            <div className="d-flex justify-content-between align-items-center mt-3">
              <span className="small text-muted">
                Showing {clients.length} of {pagination.total || 0} clients
              </span>
              <div className="d-flex gap-2">
                <button
                  className="btn btn-sm btn-outline-secondary"
                  disabled={pagination.page <= 1}
                  onClick={() => setPagination(prev => prev ? ({ ...prev, page: prev.page - 1 }) : prev)}
                >
                  Previous
                </button>
                <span className="btn btn-sm btn-light disabled">
                  Page {pagination.page}
                </span>
                <button
                  className="btn btn-sm btn-outline-secondary"
                  disabled={pagination.page * pagination.limit >= pagination.total}
                  onClick={() => setPagination(prev => prev ? ({ ...prev, page: prev.page + 1 }) : prev)}
                >
                  Next
                </button>
              </div>
            </div>
          )}
        </>
      ) : (
        <PrimaryContact />
      )}

      {/* ⭐ MODALS */}
      {showClient && (
        <AddClientModal
          onClose={() => setShowClient(false)}
          onSuccess={fetchClients}
        />
      )}

      {showCompany && (
        <AddCompanyModal
          client={editingClient || undefined}
          onClose={() => {
            setShowCompany(false)
            setEditingClient(null)
          }}
          onSuccess={fetchClients}
        />
      )}
    </div>
  )
}
