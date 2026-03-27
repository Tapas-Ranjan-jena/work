import { useState } from "react"
import MISReportForm from "./MISReportForm"

export default function ReportLayout() {
  const [activeTab, setActiveTab] = useState("company")

  return (
    <div className="container-fluid">

      <div className="card p-3">

        {/* ===== PATH ===== */}
        <small className="text-muted d-block border-bottom pb-2 mb-3">
          <span className="text-primary">Home</span> / MIS
        </small>

        {/* ===== WARNINGS ===== */}
        <div className="mb-3" style={{color:"#dc2626",fontSize:"12px"}}>
          <div>1. We recommend generating report for a maximum of 100 companies in a single attempt.</div>
          <div>2. Report for up to 30 companies can be generated within a few minutes. For more than 30 companies, the report will be generated within 24 hours.</div>
        </div>

        <h6 className="mb-2">GENERATE MIS REPORT</h6>

        {/* ===== SUB TABS ===== */}
        <div
          className="d-flex gap-3 mb-3"
          style={{ borderBottom:"1px solid #e5e7eb" }}
        >

          <div
            onClick={() => setActiveTab("company")}
            className={`pb-2 ${activeTab === "company" ? "text-primary border-bottom border-primary border-2" : "text-muted"}`}
            style={{ cursor: "pointer" }}
          >
            Company
          </div>

          <div
            onClick={() => setActiveTab("llp")}
            className={`pb-2 ${activeTab === "llp" ? "text-primary border-bottom border-primary border-2" : "text-muted"}`}
            style={{ cursor: "pointer" }}
          >
            LLP
          </div>

        </div>

        {/* ===== CHILD PAGE ===== */}
        {activeTab === "company" && <MISReportForm type="company" />}
        {activeTab === "llp" && <MISReportForm type="llp" />}

      </div>

    </div>
  )
}