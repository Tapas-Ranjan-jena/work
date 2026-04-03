import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import MasterDataFormModal from "./modals/MasterDataFormModal";
import StuckOffCompanyView from "./StuckOffCompanyView";
import EnquireFeesV2View from "./EnquireFeesV2View";
import EnquireFeesV3View from "./EnquireFeesV3View";
import ViewPublicDocumentView from "./ViewPublicDocumentView";

const MCAServicesView: React.FC = () => {
    const navigate = useNavigate();
    const [activeView, setActiveView] = useState<string | null>(null);
    const [showMasterDataModal, setShowMasterDataModal] = useState(false);

    const services = [
        "MCA Master Data",
        "Check Company Name",
        "MCA E-book",
        "Check Struck-off Companies",
        "Enquire Fees Company - V2",
        "Enquire Fees - V3",
        "View Public Document",
        "Check Annual Filling Status"
    ];

    const handleServiceClick = (service: string) => {
        if (service === "MCA Master Data") {
            setShowMasterDataModal(true);
        } else if (service === "Check Company Name") {
            navigate("/incorporation/check-company");
        } else if (service === "MCA E-book") {
            window.open("https://www.mca.gov.in/content/mca/global/en/acts-rules/ebooks.html", "_blank");
        } else if (service === "Check Struck-off Companies") {
            setActiveView("Struck-off Companies");
        } else if (service === "Enquire Fees Company - V2") {
            setActiveView("Fees V2");
        } else if (service === "Enquire Fees - V3") {
            setActiveView("Fees V3");
        } else if (service === "View Public Document") {
            setActiveView("VPD");
        }
    };

    if (activeView === "Struck-off Companies") {
        return <StuckOffCompanyView onBack={() => setActiveView(null)} />;
    }

    if (activeView === "Fees V2") {
        return <EnquireFeesV2View onBack={() => setActiveView(null)} />;
    }

    if (activeView === "Fees V3") {
        return <EnquireFeesV3View onBack={() => setActiveView(null)} />;
    }

    if (activeView === "VPD") {
        return <ViewPublicDocumentView onBack={() => setActiveView(null)} />;
    }

    return (
        <>
            <div className="card shadow-sm border-0 p-4" style={{ borderRadius: "16px" }}>
                <div className="d-flex align-items-center gap-2 mb-4 border-bottom pb-2">
                    <span 
                        className="text-primary small" 
                        style={{ cursor: "pointer" }}
                        onClick={() => setActiveView(null)}
                    >
                        Home
                    </span>
                    <span className="text-muted small">/MCA Services</span>
                </div>

                <div className="row g-3">
                    {services.map((service, index) => (
                        <div key={index} className="col-12 col-sm-6 col-md-4 col-lg-3">
                            <button 
                                onClick={() => handleServiceClick(service)}
                                className="btn btn-primary w-100 py-3 shadow-sm transition-all" 
                                style={{ 
                                    backgroundColor: "#004085", 
                                    borderColor: "#004085", 
                                    borderRadius: "10px",
                                    minHeight: "100px",
                                    fontWeight: "600",
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    wordBreak: "break-word"
                                }}
                                onMouseOver={(e) => (e.currentTarget.style.backgroundColor = "#003366")}
                                onMouseOut={(e) => (e.currentTarget.style.backgroundColor = "#004085")}
                            >
                                {service}
                            </button>
                        </div>
                    ))}
                </div>
            </div>

            {showMasterDataModal && (
                <MasterDataFormModal onClose={() => setShowMasterDataModal(false)} />
            )}
        </>
    );
};

export default MCAServicesView;
