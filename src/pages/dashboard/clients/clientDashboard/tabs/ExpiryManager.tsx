import { useState } from "react"

export default function ExpiryManager() {

  const [activeTab, setActiveTab] = useState<"due" | "expired">("due")

  return (
    <div>

      {/* SUB TABS */}
      <div className="client-tabs mb-3">

        <button
          className={`client-tab ${activeTab === "due" ? "active" : ""}`}
          onClick={() => setActiveTab("due")}
        >
          Due for Expiry
        </button>

        <button
          className={`client-tab ${activeTab === "expired" ? "active" : ""}`}
          onClick={() => setActiveTab("expired")}
        >
          Expired
        </button>

      </div>

      {/* TABLE */}
      <div className="client-table">

        <div className="d-flex justify-content-between align-items-center p-2 border-bottom">

          <div className="d-flex gap-2">
            <button className="btn btn-light btn-sm">Show 10 rows</button>
            <button className="btn btn-light btn-sm">Excel</button>
          </div>

          <input
            className="form-control form-control-sm"
            placeholder="Search"
            style={{ width: "180px" }}
          />

        </div>

        <div className="table-responsive">
          <table className="table align-middle mb-0">
            <thead>
              <tr>
                <th>#</th>
                <th>Particular</th>
                <th>Expiry Date</th>
              </tr>
            </thead>

            <tbody>
              <tr>
                <td colSpan={3} className="text-center text-muted py-4">
                  No data available in table
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="d-flex justify-content-between align-items-center p-2 border-top">

          <small className="text-muted">
            Showing 0 to 0 of 0 entries
          </small>

          <div className="d-flex gap-2">
            <button className="btn btn-light btn-sm">Previous</button>
            <button className="btn btn-light btn-sm">Next</button>
          </div>

        </div>

      </div>

    </div>
  )
}
