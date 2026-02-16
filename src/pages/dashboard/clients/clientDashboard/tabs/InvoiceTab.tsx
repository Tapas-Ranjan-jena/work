import { useState } from "react"
import AddInvoiceModal from "../../../../../components/modals/AddInvoiceModal"
import DataTableCard from "../../../../../components/common/DataTableCard"

export default function InvoiceTab() {

  const [open, setOpen] = useState(false)

  return (
    <div>

      <DataTableCard
        title="Invoice"
        addButton={
          <button
            className="btn btn-outline-dark btn-sm"
            onClick={() => setOpen(true)}
          >
            + Add Invoice
          </button>
        }
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
                <th>ID</th>
                <th>Assignment</th>
                <th>Bill date</th>
                <th>Due date</th>
                <th>Invoice value</th>
                <th>Payment received</th>
                <th>Status</th>
              </tr>
            </thead>

            <tbody>
              <tr>
                <td colSpan={7} className="text-center text-muted py-4">
                  No record found.
                </td>
              </tr>
            </tbody>

          </table>

        </div>

      </DataTableCard>

      {/* ================= MODAL ================= */}
      {open && <AddInvoiceModal onClose={() => setOpen(false)} />}

    </div>
  )
}
