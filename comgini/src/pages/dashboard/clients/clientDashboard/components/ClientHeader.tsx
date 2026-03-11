import { useState, useEffect, useCallback } from "react"
import { useParams, useNavigate } from "react-router-dom"
import clientService from "../../../../../services/clients/client.service"
import type { Client } from "../../../../../services/clients/types"

export default function ClientHeader() {
  const { clientId: id } = useParams<{ clientId: string }>()
  const navigate = useNavigate()
  const clientId = id ? parseInt(id) : 0

  const [currentClient, setCurrentClient] = useState<Client | null>(null)
  const [allClients, setAllClients] = useState<Client[]>([])
  const [loading, setLoading] = useState(false)

  const fetchData = useCallback(async () => {
    if (!clientId) return
    try {
      setLoading(true)
      const data = await clientService.getClientById(clientId)
      setCurrentClient(data)
    } catch (error) {
      console.error("Failed to fetch current client:", error)
    } finally {
      setLoading(false)
    }
  }, [clientId])

  const fetchAllClients = useCallback(async () => {
    try {
      // Fetching first page of clients for the dropdown
      const response = await clientService.getClients(1, 100)
      setAllClients(response.data)
    } catch (error) {
      console.error("Failed to fetch all clients:", error)
    }
  }, [])

  useEffect(() => {
    fetchData()
  }, [fetchData])

  useEffect(() => {
    fetchAllClients()
  }, [fetchAllClients])

  const handleSwitch = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const nextId = e.target.value
    if (nextId) {
      // Navigate to the same tab but for the new client
      // We assume they want to stay in the same dashboard context
      const currentPath = window.location.pathname
      const newPath = currentPath.replace(`/clients/${clientId}`, `/clients/${nextId}`)
      navigate(newPath)
    }
  }

  return (
    <div
      style={{
        background: "#ECECEF",
        padding: "10px 14px",
        paddingBottom: "14px",
        marginBottom: "14px",
        borderBottom: "0.2px solid #62667E",
        borderRadius: "6px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        fontSize: "14px"
      }}
    >
      {/* LEFT SIDE */}
      <div>
        <span style={{ fontWeight: 600 }}>
          Client Name -
        </span>{" "}
        <span style={{ letterSpacing: ".2px" }}>
          {loading ? "Loading..." : (currentClient?.name || "Select a client")}
        </span>
      </div>

      {/* RIGHT SIDE */}
      <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
        <span>Switch Client :</span>

        <select
          value={clientId}
          onChange={handleSwitch}
          style={{
            height: "28px",
            borderRadius: "4px",
            width: "140px",
            border: "1px solid #cfcfcf",
            padding: "2px 6px",
            fontSize: "13px",
            background: "#fff"
          }}
        >
          <option value="">--</option>
          {allClients.map(c => (
            <option key={c.id} value={c.id}>
              {c.name}
            </option>
          ))}
        </select>
      </div>
    </div>
  )
}
