import { useState, useEffect } from "react";
import leadsService from "../../../../services/leadsService";
import dropdownService from "../../../../services/dropdownService";
import type { DropdownUser } from "../../../../services/dropdownService";

interface AddLeadModalProps {
    show: boolean;
    onClose: () => void;
    editId?: string;
}

export default function AddLeadModal({ show, onClose, editId }: AddLeadModalProps) {
    const [formData, setFormData] = useState({
        title: "", company_name: "", status: "", owner_id: 0, source: "",
        address: "", city: "", state: "", pincode: "", country: "", phone: "", website: "", gstin: ""
    });
    const [owners, setOwners] = useState<DropdownUser[]>([]);
    const [sources, setSources] = useState<string[]>([]);
    const [statusList, setStatusList] = useState<string[]>([]);

    useEffect(() => {
        if (!show) return;

        const loadDropdowns = async () => {
            try {
                const [u, s, stat] = await Promise.all([
                    dropdownService.getUsers(),
                    dropdownService.getLeadsSources(),
                    dropdownService.getLeadsStatusList()
                ]);
                setOwners(u); setSources(s); setStatusList(stat);
            } catch (e) {
                console.error("error loading dropdowns", e);
            }
        };
        loadDropdowns();
        
        if (editId) {
            // Ideally we fetch lead details by ID, but since there's no endpoint in leadsService,
            // we leave it empty or map it if passed from parent.
        } else {
            setFormData({
                title: "", company_name: "", status: "", owner_id: 0, source: "",
                address: "", city: "", state: "", pincode: "", country: "", phone: "", website: "", gstin: ""
            });
        }
    }, [show, editId]);

    if (!show) return null;

    const handleSave = async () => {
        try {
            if (editId) {
                await leadsService.updateLead(editId, formData);
            } else {
                await leadsService.createLead(formData);
            }
            onClose(); // Parent should refetch data on close
        } catch (error) {
            console.error("Failed to save lead", error);
            alert("Failed to save lead");
        }
    };

    return (
        <div className="modal-overlay">
            <div className="modal-box" style={{ maxWidth: "800px", padding: 0 }}>
                {/* ⭐ HEADER */}
                <div className="d-flex justify-content-between align-items-center p-3 px-4 border-bottom bg-white">
                    <h5 className="fw-bold mb-0" style={{ fontSize: '18px' }}>{editId ? 'Edit Lead' : 'Add Lead'}</h5>
                    <span style={{ cursor: "pointer", fontSize: "20px" }} onClick={onClose} className="text-muted">✕</span>
                </div>

                {/* ⭐ CONTENT */}
                <div className="p-4 bg-white" style={{ maxHeight: '80vh', overflowY: 'auto' }}>
                    <div className="container-fluid px-0">
                        {/* Title */}
                        <div className="row mb-3 align-items-center">
                            <div className="col-3"><label className="text-muted" style={{ fontSize: '14px' }}>Title</label></div>
                            <div className="col-9"><input className="form-control form-control-sm" value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} /></div>
                        </div>
                        {/* Company */}
                        <div className="row mb-3 align-items-center">
                            <div className="col-3"><label className="text-muted" style={{ fontSize: '14px' }}>Company name</label></div>
                            <div className="col-9"><input className="form-control form-control-sm" value={formData.company_name} onChange={e => setFormData({...formData, company_name: e.target.value})} /></div>
                        </div>
                        {/* Status */}
                        <div className="row mb-3 align-items-center">
                            <div className="col-3"><label className="text-muted" style={{ fontSize: '14px' }}>Status</label></div>
                            <div className="col-9">
                                <select className="form-select form-select-sm" value={formData.status} onChange={e => setFormData({...formData, status: e.target.value})}>
                                    <option value="">- Select -</option>
                                    {statusList.map(s => <option key={s} value={s}>{s}</option>)}
                                </select>
                            </div>
                        </div>
                        {/* Owner */}
                        <div className="row mb-3 align-items-center">
                            <div className="col-3"><label className="text-muted" style={{ fontSize: '14px' }}>Owner</label></div>
                            <div className="col-9">
                                <select className="form-select form-select-sm" value={formData.owner_id} onChange={e => setFormData({...formData, owner_id: Number(e.target.value)})}>
                                    <option value="0">- Select -</option>
                                    {owners.map(o => <option key={o.id} value={o.id}>{o.first_name} {o.last_name}</option>)}
                                </select>
                            </div>
                        </div>
                        {/* Source */}
                        <div className="row mb-3 align-items-center">
                            <div className="col-3"><label className="text-muted" style={{ fontSize: '14px' }}>Source</label></div>
                            <div className="col-9">
                                <select className="form-select form-select-sm" value={formData.source} onChange={e => setFormData({...formData, source: e.target.value})}>
                                    <option value="">- Select -</option>
                                    {sources.map(s => <option key={s} value={s}>{s}</option>)}
                                </select>
                            </div>
                        </div>
                        {/* Phone */}
                        <div className="row mb-3 align-items-center">
                            <div className="col-3"><label className="text-muted" style={{ fontSize: '14px' }}>Phone</label></div>
                            <div className="col-9"><input className="form-control form-control-sm" value={formData.phone} onChange={e => setFormData({...formData, phone: e.target.value})} /></div>
                        </div>
                        {/* Address */}
                        <div className="row mb-3 align-items-start">
                            <div className="col-3"><label className="text-muted mt-2" style={{ fontSize: '14px' }}>Address</label></div>
                            <div className="col-9"><textarea className="form-control" rows={3} value={formData.address} onChange={e => setFormData({...formData, address: e.target.value})}></textarea></div>
                        </div>
                        {/* City */}
                        <div className="row mb-3 align-items-center">
                            <div className="col-3"><label className="text-muted" style={{ fontSize: '14px' }}>City</label></div>
                            <div className="col-9"><input className="form-control form-control-sm" value={formData.city} onChange={e => setFormData({...formData, city: e.target.value})} /></div>
                        </div>
                        {/* State */}
                        <div className="row mb-3 align-items-center">
                            <div className="col-3"><label className="text-muted" style={{ fontSize: '14px' }}>State</label></div>
                            <div className="col-9"><input className="form-control form-control-sm" value={formData.state} onChange={e => setFormData({...formData, state: e.target.value})} /></div>
                        </div>
                        {/* Pincode */}
                        <div className="row mb-3 align-items-center">
                            <div className="col-3"><label className="text-muted" style={{ fontSize: '14px' }}>Pincode</label></div>
                            <div className="col-9"><input className="form-control form-control-sm" value={formData.pincode} onChange={e => setFormData({...formData, pincode: e.target.value})} /></div>
                        </div>
                        {/* Country */}
                        <div className="row mb-3 align-items-center">
                            <div className="col-3"><label className="text-muted" style={{ fontSize: '14px' }}>Country</label></div>
                            <div className="col-9"><input className="form-control form-control-sm" value={formData.country} onChange={e => setFormData({...formData, country: e.target.value})} /></div>
                        </div>
                        {/* GSTIN */}
                        <div className="row mb-3 align-items-center">
                            <div className="col-3"><label className="text-muted" style={{ fontSize: '14px' }}>GSTIN</label></div>
                            <div className="col-9"><input className="form-control form-control-sm" value={formData.gstin} onChange={e => setFormData({...formData, gstin: e.target.value})} /></div>
                        </div>
                        {/* Website */}
                        <div className="row mb-3 align-items-center">
                            <div className="col-3"><label className="text-muted" style={{ fontSize: '14px' }}>Website</label></div>
                            <div className="col-9"><input className="form-control form-control-sm" value={formData.website} onChange={e => setFormData({...formData, website: e.target.value})} /></div>
                        </div>
                    </div>
                </div>

                {/* ⭐ FOOTER */}
                <div className="p-3 px-4 border-top bg-white d-flex justify-content-end gap-2 shadow-sm rounded-bottom-3">
                    <button className="btn btn-white border px-3 h-40 d-flex align-items-center gap-2 rounded-2" onClick={onClose} style={{ fontSize: '14px', color: '#333' }}>
                        <i className="bi bi-x-circle"></i> Close
                    </button>
                    <button
                        className="btn btn-primary px-3 h-40 d-flex align-items-center gap-2 rounded-2"
                        onClick={handleSave}
                        style={{
                            background: 'linear-gradient(90deg, #3346a8 0%, #2f64c6 100%)',
                            border: 'none',
                            fontSize: '14px',
                            fontWeight: '500'
                        }}
                    >
                        <i className="bi bi-check-circle"></i> Save
                    </button>
                </div>
            </div>

            <style>{`
                .h-40 { height: 40px; }
                .modal-overlay {
                    position: fixed; top: 0; left: 0; width: 100%; height: 100%;
                    background: rgba(0,0,0,0.6); display: flex; align-items: center; justify-content: center; z-index: 9999;
                }
                .modal-box {
                    background: white; border-radius: 12px; width: 100%; max-height: 90vh; margin: 20px;
                    box-shadow: 0 10px 40px rgba(0,0,0,0.3); overflow: hidden; display: flex; flex-direction: column;
                }
                .form-control::placeholder { color: #aaa; opacity: 1; }
                .form-control-sm, .form-select-sm { height: 36px; fontSize: 13px; }
            `}</style>
        </div>
    );
}