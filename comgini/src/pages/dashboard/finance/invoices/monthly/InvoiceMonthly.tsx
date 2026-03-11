import { useState, useEffect } from "react"
import { useOutletContext } from "react-router-dom"
import financeService from "../../../../../services/financeService"
import clientService from "../../../../../services/clients/client.service"
import mastersService from "../../../../../services/mastersService"
import MarkAsPaidModal from "../modals/MarkAsPaidModal"
import InvoiceDetailsModal from "../modals/InvoiceDetailsModal"
import type { Invoice } from "../../../../../types/finance.types"
import type { Pagination, Company } from "../../../../../types/masters.types"
import type { Client } from "../../../../../services/clients/types"

interface ContextType {
  page: number
  limit: number
  search: string
  setPagination: (p: Pagination | null) => void
  setIsLoading: (l: boolean) => void
  refreshKey: number
}

export default function InvoiceMonthly() {
  const { page, limit, search, setPagination, setIsLoading, refreshKey } = useOutletContext<ContextType>()
  const [invoices, setInvoices] = useState<Invoice[]>([])
  const [companies, setCompanies] = useState<Record<number, string>>({})
  const [clients, setClients] = useState<Record<number, string>>({})

  const [selectedInvoice, setSelectedInvoice] = useState<Invoice | null>(null)
  const [showMarkAsPaid, setShowMarkAsPaid] = useState(false)
  const [showDetails, setShowDetails] = useState(false)
  const [localRefresh, setLocalRefresh] = useState(0)

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true)
      try {
        const invResponse = await financeService.getInvoices(page, limit)
        setInvoices(invResponse.data)
        setPagination(invResponse.pagination)

        const [compRes, clientRes] = await Promise.all([
          mastersService.getCompanies(1, 1000),
          clientService.getClients(1, 1000)
        ])

        const compMap: Record<number, string> = {}
        compRes.data.forEach((c: Company) => { compMap[c.id] = c.name })
        setCompanies(compMap)

        const clientMap: Record<number, string> = {}
        clientRes.data.forEach((c: Client) => { clientMap[c.id] = c.name })
        setClients(clientMap)

      } catch (error) {
        console.error("Failed to fetch invoices:", error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchData()
  }, [page, limit, search, refreshKey, localRefresh])

  const handleMarkAsPaid = (inv: Invoice) => {
    setSelectedInvoice(inv)
    setShowMarkAsPaid(true)
  }

  const handleShowDetails = (inv: Invoice) => {
    setSelectedInvoice(inv)
    setShowDetails(true)
  }

  if (invoices.length === 0) {
    return (
      <tr>
        <td colSpan={9} className="text-center text-muted py-4">
          No invoices found.
        </td>
      </tr>
    )
  }

  return (
    <>
      {invoices.map((inv) => (
        <tr key={inv.id}>
          <td>{inv.invoice_number}</td>
          <td>{clients[inv.client_id] || `Client #${inv.client_id}`}</td>
          <td>{companies[inv.company_id] || `Company #${inv.company_id}`}</td>
          <td>{new Date(inv.issue_date).toLocaleDateString()}</td>
          <td>{new Date(inv.due_date).toLocaleDateString()}</td>
          <td>₹{inv.subtotal?.toLocaleString() || 0}</td>
          <td>₹{inv.tax_amount?.toLocaleString() || 0}</td>
          <td className="fw-bold">₹{inv.total_amount?.toLocaleString() || 0}</td>
          <td className="text-center">
            <div className="btn-group btn-group-sm">
              <button
                className="btn btn-light border text-primary"
                title="View Invoice"
                onClick={() => handleShowDetails(inv)}
              >
                <i className="bi bi-eye"></i>
              </button>
              {inv.payment_status !== 'paid' && (
                <button
                  className="btn btn-light border text-success"
                  title="Mark as Paid"
                  onClick={() => handleMarkAsPaid(inv)}
                >
                  <i className="bi bi-check-circle"></i>
                </button>
              )}
            </div>
          </td>
        </tr>
      ))}

      <MarkAsPaidModal
        open={showMarkAsPaid}
        invoice={selectedInvoice}
        onClose={() => setShowMarkAsPaid(false)}
        onSuccess={() => setLocalRefresh(prev => prev + 1)}
      />

      <InvoiceDetailsModal
        open={showDetails}
        invoiceId={selectedInvoice?.id || null}
        onClose={() => setShowDetails(false)}
      />
    </>
  )
}
