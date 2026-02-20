import { useState } from "react"

export default function ExpiryManager() {

  const [activeTab, setActiveTab] = useState<"due" | "expired">("due")

  return (
    <div>

      {/* ⭐ SUB TABS WITH GREY BACKGROUND */}
      <div
        className="client-tabs mb-3"
        style={{
          background:"#F5F5F6",
          padding:"6px 10px",
          borderRadius:"6px",
          border:"1px solid #e2e2e2"
        }}
      >

        <button
          className={`client-tab ${activeTab === "due" ? "active" : ""}`}
          style={{
            background:"transparent",
            border:"none"
          }}
          onClick={() => setActiveTab("due")}
        >
          Due for Expiry
        </button>

        <button
          className={`client-tab ${activeTab === "expired" ? "active" : ""}`}
          style={{
            background:"transparent",
            border:"none"
          }}
          onClick={() => setActiveTab("expired")}
        >
          Expired
        </button>

      </div>


      {/* ================= TABLE CARD ================= */}
      <div
        style={{
          border:"1px solid #e2e2e2",
          borderRadius:"6px",
          overflow:"hidden",
          background:"#fff"
        }}
      >

        {/* ⭐ TOOLBAR (GREY STRIP) */}
        <div
          className="d-flex justify-content-between align-items-center flex-wrap gap-2"
          style={{
            background:"#F5F5F6",
            borderBottom:"1px solid #e2e2e2",
            padding:"8px 10px"
          }}
        >

          {/* LEFT SIDE */}
          <div className="d-flex gap-2">

            <button className="btn btn-light btn-sm">
              Show 10 rows
            </button>

            <button className="btn btn-light btn-sm">
              Excel
            </button>

          </div>

          {/* RIGHT SIDE */}
          <input
            className="form-control form-control-sm"
            placeholder="Search"
            style={{ width: "180px" }}
          />

        </div>


        {/* ================= TABLE ================= */}
        <div className="table-responsive">
          <table className="table align-middle mb-0 table-bordered">

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


        {/* ⭐ FOOTER BAR */}
        <div
          className="d-flex justify-content-between align-items-center"
          style={{
            background:"#F5F5F6",
            borderTop:"1px solid #e2e2e2",
            padding:"8px 10px"
          }}
        >

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
