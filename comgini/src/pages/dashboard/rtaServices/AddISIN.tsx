import { useState } from "react"
import { useNavigate } from "react-router-dom"
import ISINDetailsTab from "./tabs/ISINDetailsTab"
import NetworthCertificateTab from "./tabs/NetworthCertificateTab"
import NSDLMasterFormTab from "./tabs/NSDLMasterFormTab"
import FeeCalculatorTab from "./tabs/FeeCalculatorTab"
import DocumentsTab from "./tabs/DocumentsTab"
import UploadMGTModal from "./modals/UploadMGTModal"

type TabType = "isin" | "networth" | "nsdl" | "fee" | "docs"

export default function AddISIN() {
  const [activeTab, setActiveTab] = useState<TabType>("isin")
  const [showUploadModal, setShowUploadModal] = useState(false)
  const navigate = useNavigate()

  const tabs = [
    { id: "isin", label: "ISIN Details" },
    { id: "networth", label: "Networth Certificate Details" },
    { id: "nsdl", label: "Master Creation Form NSDL" },
    { id: "fee", label: "Fee Calculator/Payment" },
    { id: "docs", label: "Documents" },
  ]

  const onUploadSuccess = (data: any) => {
    console.log("MGT data", data)
    // Here we would populate form state with data
  }

  return (
    <div className="add-isin p-4 text-start">
      {/* ⭐ BREADCRUMBS */}
      <nav aria-label="breadcrumb" className="mb-4">
        <ol className="breadcrumb mb-0 small">
          <li className="breadcrumb-item"><a href="#" className="text-decoration-none text-primary" onClick={() => navigate("/dashboard")}>Home</a></li>
          <li className="breadcrumb-item"><a href="#" className="text-decoration-none text-primary" onClick={() => navigate("/rta-services/isin-creation")}>RTA Services</a></li>
          <li className="breadcrumb-item active" aria-current="page">Add ISIN</li>
        </ol>
      </nav>

      <div className="card shadow-sm border-0 p-4">
        {/* Header */}
        <div className="d-flex justify-content-end align-items-center mb-5 gap-2">
            <button 
                className="btn btn-primary btn-sm px-4 shadow-none d-flex align-items-center gap-2" 
                style={{ background: "#2b4cb3" }}
                onClick={() => setShowUploadModal(true)}
            >
              <i className="bi bi-plus-lg"></i> Import Form
            </button>
            <button 
                className="btn btn-primary btn-sm px-4 shadow-none d-flex align-items-center gap-2" 
                style={{ background: "#2b4cb3" }}
                onClick={() => navigate("/rta-services/isin-creation")}
            >
              <i className="bi bi-arrow-left-circle"></i> Back
            </button>
        </div>

        {/* Tab Navigation */}
        <div className="d-flex border-bottom mb-5 overflow-auto">
            {tabs.map((tab) => (
                <button
                    key={tab.id}
                    className={`btn btn-link text-decoration-none px-4 py-2 small fw-bold border-0 text-nowrap ${
                        activeTab === tab.id ? "text-primary border-bottom border-3 border-primary" : "text-muted"
                    }`}
                    style={{ borderBottom: activeTab === tab.id ? "3px solid #2b4cb3" : "none" }}
                    onClick={() => setActiveTab(tab.id as TabType)}
                >
                    {tab.label}
                </button>
            ))}
        </div>

        {/* Tab Content */}
        <div className="tab-content" style={{ minHeight: "400px" }}>
            {activeTab === "isin" && <ISINDetailsTab />}
            {activeTab === "networth" && <NetworthCertificateTab />}
            {activeTab === "nsdl" && <NSDLMasterFormTab />}
            {activeTab === "fee" && <FeeCalculatorTab />}
            {activeTab === "docs" && <DocumentsTab />}
        </div>
      </div>

      <UploadMGTModal 
        show={showUploadModal} 
        onClose={() => setShowUploadModal(false)}
        onSuccess={onUploadSuccess}
      />
    </div>
  )
}
