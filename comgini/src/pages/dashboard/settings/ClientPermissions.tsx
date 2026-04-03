import { useState } from "react";

export default function ClientPermissions() {
    const [permissions, setPermissions] = useState([
        { id: 1, name: "View Assignments", client: true, contact: false },
        { id: 2, name: "Download Documents", client: true, contact: true },
        { id: 3, name: "Add Comments", client: true, contact: true },
        { id: 4, name: "View Invoices", client: true, contact: false },
        { id: 5, name: "Approve Compliance", client: true, contact: false },
    ]);

    const togglePermission = (id: number, type: 'client' | 'contact') => {
        setPermissions(permissions.map(p => {
            if (p.id === id) {
                return {
                    ...p,
                    client: type === 'client' ? !p.client : p.client,
                    contact: type === 'contact' ? !p.contact : p.contact
                };
            }
            return p;
        }));
    };

    return (
        <div className="client-permissions text-start">
            <h5 className="fw-bold mb-4">Client Permissions</h5>
            
            <div className="card shadow-sm border-0">
                <div className="card-header bg-white border-bottom p-2 d-flex flex-column flex-md-row justify-content-between align-items-stretch align-items-md-center gap-3">
                    <div className="d-flex align-items-center gap-2">
                        <select className="form-select form-select-sm" style={{ width: "75px" }}>
                            <option value="100">100</option>
                            <option value="50">50</option>
                        </select>
                        <button className="btn btn-sm btn-light border p-1 px-2 shadow-none"><i className="bi bi-eye-slash"></i></button>
                    </div>
                    
                    <div className="d-flex flex-column flex-sm-row align-items-stretch align-items-sm-center gap-2">
                        <div className="position-relative flex-grow-1">
                            <input type="text" className="form-control form-control-sm ps-3 pe-4 py-2" placeholder="Search" style={{ minWidth: "180px", background: "#fff" }} />
                            <i className="bi bi-search position-absolute end-0 top-50 translate-middle-y me-2 text-muted" style={{ fontSize: "12px" }}></i>
                        </div>
                    </div>
                </div>

                <div className="table-responsive border rounded-bottom overflow-auto">
                    <table className="table table-hover align-middle mb-0" style={{ fontSize: "13.5px" }}>
                        <thead className="table-light">
                            <tr className="text-nowrap">
                                <th className="fw-semibold px-3 py-3" style={{ minWidth: "250px" }}>Permission Name</th>
                                <th className="fw-semibold text-center px-3" style={{ minWidth: "120px" }}>Client</th>
                                <th className="fw-semibold text-center px-3" style={{ minWidth: "120px" }}>Primary Contact</th>
                                <th className="fw-semibold text-center px-3" style={{ width: "60px", minWidth: "60px" }}><i className="bi bi-list"></i></th>
                            </tr>
                        </thead>
                        <tbody>
                            {permissions.map((p) => (
                                <tr key={p.id} className="text-nowrap">
                                    <td className="px-3 py-3 text-dark fw-medium">{p.name}</td>
                                    <td className="text-center px-3">
                                        <div className="form-check d-flex justify-content-center">
                                            <input 
                                                className="form-check-input shadow-none" 
                                                type="checkbox" 
                                                checked={p.client} 
                                                onChange={() => togglePermission(p.id, 'client')}
                                                style={{ width: "18px", height: "18px", cursor: 'pointer' }}
                                            />
                                        </div>
                                    </td>
                                    <td className="text-center px-3">
                                        <div className="form-check d-flex justify-content-center">
                                            <input 
                                                className="form-check-input shadow-none" 
                                                type="checkbox" 
                                                checked={p.contact} 
                                                onChange={() => togglePermission(p.id, 'contact')}
                                                style={{ width: "18px", height: "18px", cursor: 'pointer' }}
                                            />
                                        </div>
                                    </td>
                                    <td className="text-center px-3">
                                        <button className="btn btn-sm text-secondary border-0 p-1 shadow-none"><i className="bi bi-pencil-square fs-6"></i></button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            <div className="mt-4">
                <button className="btn btn-primary d-flex align-items-center justify-content-center gap-2 px-5 py-3 shadow-sm border-0 w-100 w-sm-auto" style={{ borderRadius: "10px", background: "#3b82f6", fontWeight: "600" }}>
                    <i className="bi bi-check2-circle fs-5"></i>
                    Update Permissions
                </button>
            </div>

            <style>{`
                ::-webkit-scrollbar { height: 6px; }
                ::-webkit-scrollbar-thumb { background: #cbd5e1; border-radius: 10px; }
                .table-responsive { scrollbar-gutter: stable; }
                .form-check-input:checked { background-color: #3b82f6; border-color: #3b82f6; }
                .table th { background-color: #f1f5f9; color: #475569; }
            `}</style>
        </div>
    );
}
