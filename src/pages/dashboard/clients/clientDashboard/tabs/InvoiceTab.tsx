import { useState } from "react"
import AddInvoiceModal from "../../../../../components/modals/AddInvoiceModal"

export default function InvoiceTab() {

    const [open, setOpen] = useState(false)

    return (
        <div>

            {/* HEADER */}
            <div className="d-flex justify-content-between align-items-center mb-3">

                <h6 className="fw-bold m-0">Invoice</h6>

                <button
                    className="btn btn-outline-dark btn-sm"
                    onClick={() => setOpen(true)}
                >
                    + Add Invoice
                </button>

            </div>

            {/* TABLE DESIGN SAME AS SCREENSHOT */}
            <div className="client-table">

                <div className="table-responsive">

                    <table className="table align-middle mb-0">

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

            </div>

            {open && <AddInvoiceModal onClose={() => setOpen(false)} />}

        </div>
    )
}
