import React, { useState } from "react";
import ISINList from "../../pages/dashboard/rtaServices/ISINList";

const RTAServicesView: React.FC = () => {
    const [activeService, setActiveService] = useState<string | null>(null);

    const services = [
        { id: "isin", title: "ISIN Creation", icon: "bi-building-add", description: "Manage and create ISIN applications" },
        { id: "compliance", title: "RTA Compliance", icon: "bi-shield-check", description: "Monitor RTA compliance status", disabled: true },
        { id: "transfers", title: "Share Transfers", icon: "bi-arrow-left-right", description: "Process share transfer requests", disabled: true },
    ];

    if (activeService === "isin") {
        return (
            <div className="card shadow-sm border-0 p-3" style={{ borderRadius: "16px" }}>
                <div className="d-flex align-items-center gap-2 mb-4 border-bottom pb-2">
                    <span 
                        className="text-primary small" 
                        style={{ cursor: "pointer" }}
                        onClick={() => setActiveService(null)}
                    >
                        Back to Services
                    </span>
                    <span className="text-muted small">/ ISIN Creation</span>
                </div>
                <ISINList isNested={true} />
            </div>
        );
    }

    return (
        <div className="card shadow-sm border-0 p-4" style={{ borderRadius: "16px" }}>
            <div className="mb-4">
                <h5 className="fw-bold text-dark mb-1">RTA Services</h5>
                <p className="text-muted small">Select a service to manage your Registry and Transfer Agent tasks.</p>
            </div>

            <div className="row g-4">
                {services.map((service) => (
                    <div key={service.id} className="col-12 col-md-6 col-lg-4">
                        <div 
                            className={`p-4 border rounded shadow-sm h-100 transition-all ${service.disabled ? "opacity-50" : "hover-shadow"}`}
                            style={{ 
                                cursor: service.disabled ? "not-allowed" : "pointer",
                                backgroundColor: "#fff",
                                border: "1px solid #eee"
                            }}
                            onClick={() => !service.disabled && setActiveService(service.id)}
                        >
                            <div className="d-flex align-items-center gap-3 mb-3">
                                <div className="bg-light p-3 rounded" style={{ color: "#2b4cb3" }}>
                                    <i className={`bi ${service.icon} h3 mb-0`}></i>
                                </div>
                                <div>
                                    <h6 className="fw-bold mb-0">{service.title}</h6>
                                    {service.disabled && <span className="badge bg-secondary" style={{ fontSize: "10px" }}>Coming Soon</span>}
                                </div>
                            </div>
                            <p className="text-muted small mb-0">{service.description}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default RTAServicesView;
