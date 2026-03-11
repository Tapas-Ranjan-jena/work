import { useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import clientService from "../../../../../services/clients/client.service"
import type { Client } from "../../../../../services/clients/types"

export default function ClientDetails() {
  const { clientId } = useParams()
  const [client, setClient] = useState<Client | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchClientData = async () => {
      if (!clientId) return
      try {
        setLoading(true)
        const data = await clientService.getClientById(parseInt(clientId))
        setClient(data)
      } catch (error) {
        console.error("Failed to fetch client data:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchClientData()
  }, [clientId])

  if (loading) {
    return (
      <div className="d-flex justify-content-center p-5">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    )
  }

  if (!client) {
    return <div className="p-5 text-center">Client not found.</div>
  }

  return (
    <div
      style={{
        border: "1px solid #e2e2e2",
        borderRadius: "6px",
        overflow: "hidden",
        background: "#fff"
      }}
    >
      {/* ⭐ GRID TABLE */}
      <div className="client-details-grid">
        {/* ROW 1 */}
        <div className="details-row">
          <div className="details-label dark">CIN</div>
          <div className="details-value grey">{client.cin || "-"}</div>

          <div className="details-label dark">Company Name</div>
          <div className="details-value grey">{client.name}</div>
        </div>

        {/* ROW 2 */}
        <div className="details-row">
          <div className="details-label dark">Phone</div>
          <div className="details-value grey">{client.phone}</div>

          <div className="details-label dark">Email</div>
          <div className="details-value grey">{client.email}</div>
        </div>

        {/* ROW 3 */}
        <div className="details-row">
          <div className="details-label dark">Address</div>
          <div className="details-value grey">{client.address || "-"}</div>

          <div className="details-label dark">Status</div>
          <div className="details-value grey" style={{ textTransform: 'capitalize' }}>{client.status}</div>
        </div>

        {/* ROW 4 */}
        <div className="details-row">
          <div className="details-label dark">Created At</div>
          <div className="details-value grey">{new Date(client.createdAt).toLocaleDateString()}</div>

          <div className="details-label dark">Updated At</div>
          <div className="details-value grey">{new Date(client.updatedAt).toLocaleDateString()}</div>
        </div>
      </div>
    </div>
  )
}
