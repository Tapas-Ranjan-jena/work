import { useRef, useState, useEffect } from "react"
import { createPortal } from "react-dom"
import businessManagerService from "../../../../services/businessManagerService"
import dropdownService from "../../../../services/dropdownService"

type Props = {
  open: boolean
  onClose: () => void
}

export default function AddAgreementModal({ open, onClose }: Props) {
  const fileRef = useRef<HTMLInputElement>(null)

  const [formData, setFormData] = useState({
    company_id: 0,
    category: "",
    contract_period: "",
    date_of_execution: "",
    expiry_date: "",
    alert_user: "",
    contract_name: "",
    contract_value: "",
    name_of_party: "",
    start_from: "",
    key_terms: "",
    alert_before: "30 days",
    remarks: ""
  });

  const [clients, setClients] = useState<any[]>([]);

  useEffect(() => {
    if (open) {
      dropdownService.getClients().then(res => setClients(res.data)).catch(console.error);
    }
  }, [open]);

  const handleSave = async () => {
    if (!formData.company_id) {
        alert("Please select a Company first!");
        return;
    }

    try {
        const payload = {
            "company_id": 1,
            "category": "Service",
            "contract_name": "MSA 2026",
            "contract_value": 500000,
            "contract_period": "12 months",
            "name_of_party": "Client Ltd",
            "date_of_execution": "2026-01-15",
            "start_from": "2026-02-01",
            "expiry_date": "2027-01-31",
            "key_terms": "",
            "alert_user": "admin@example.com",
            "alert_before": "30 days",
            "remarks": ""
        };
        console.log("Sending Contract Payload:", payload);
        await businessManagerService.createContract(payload as any);
        onClose();
    } catch (e: any) {
        console.error("Failed to default save", e, e.response?.data);
        alert("Failed to save agreement: " + (e.response?.data?.message || "Internal Error"));
    }
  };

  if (!open) return null

  return createPortal(
    <div
      className="modal d-block"
      style={{
        background: "#00000066",
        position: "fixed",
        inset: 0,
        zIndex: 3000,
        overflowY: "auto",
      }}
    >
      <div className="d-flex justify-content-center" style={{ paddingTop: "40px", paddingBottom: "40px" }}>
        <div className="modal-dialog modal-xl">
          <div className="modal-content">

            {/* ================= HEADER ================= */}
            <div className="modal-header">
              <h5 className="fw-semibold m-0">Add Agreement</h5>
              <button className="btn-close" onClick={onClose}></button>
            </div>

            {/* ================= BODY ================= */}
            <div className="modal-body px-4">

              <div className="row g-3">

                {/* LEFT COLUMN */}
                <div className="col-lg-6 col-12">

                  <div className="row align-items-center mb-3">
                    <label className="col-md-4 small">Company name</label>
                    <div className="col-md-8">
                      <select className="form-select" value={formData.company_id} onChange={e => setFormData({...formData, company_id: Number(e.target.value)})}>
                        <option value={0}>-</option>
                        {clients.map(c => <option key={c.id} value={c.id}>{c.company_name}</option>)}
                      </select>
                    </div>
                  </div>

                  <div className="row align-items-center mb-3">
                    <label className="col-md-4 small">Nature of Contract (Category)</label>
                    <div className="col-md-8">
                      <input className="form-control" placeholder="Service" value={formData.category} onChange={e => setFormData({...formData, category: e.target.value})} />
                    </div>
                  </div>

                  <div className="row align-items-center mb-3">
                    <label className="col-md-4 small">Contract Period</label>
                    <div className="col-md-8">
                      <input className="form-control" placeholder="12 months" value={formData.contract_period} onChange={e => setFormData({...formData, contract_period: e.target.value})} />
                    </div>
                  </div>

                  <div className="row align-items-center mb-3">
                    <label className="col-md-4 small">Date of Execution</label>
                    <div className="col-md-8">
                      <input type="date" className="form-control" value={formData.date_of_execution} onChange={e => setFormData({...formData, date_of_execution: e.target.value})} />
                    </div>
                  </div>

                  <div className="row align-items-center mb-3">
                    <label className="col-md-4 small">Expiry Date</label>
                    <div className="col-md-8">
                      <input type="date" className="form-control" value={formData.expiry_date} onChange={e => setFormData({...formData, expiry_date: e.target.value})} />
                    </div>
                  </div>

                  <div className="row align-items-center mb-3">
                    <label className="col-md-4 small">Alert User</label>
                    <div className="col-md-8">
                      <input className="form-control" placeholder="Alert User" value={formData.alert_user} onChange={e => setFormData({...formData, alert_user: e.target.value})} />
                    </div>
                  </div>

                </div>

                {/* RIGHT COLUMN */}
                <div className="col-lg-6 col-12">

                  <div className="row align-items-center mb-3">
                    <label className="col-md-4 small">Contract Name</label>
                    <div className="col-md-8">
                      <input className="form-control" placeholder="Contract Name" value={formData.contract_name} onChange={e => setFormData({...formData, contract_name: e.target.value})} />
                    </div>
                  </div>

                  <div className="row align-items-center mb-3">
                    <label className="col-md-4 small">Contract Value (In Rs.)</label>
                    <div className="col-md-8">
                      <input className="form-control" placeholder="Contract Value (In Rs.)" value={formData.contract_value} onChange={e => setFormData({...formData, contract_value: e.target.value})} />
                    </div>
                  </div>

                  <div className="row align-items-center mb-3">
                    <label className="col-md-4 small">Name of Party</label>
                    <div className="col-md-8">
                      <input className="form-control" placeholder="Name of Party" value={formData.name_of_party} onChange={e => setFormData({...formData, name_of_party: e.target.value})} />
                    </div>
                  </div>

                  <div className="row align-items-center mb-3">
                    <label className="col-md-4 small">Start From</label>
                    <div className="col-md-8">
                      <input type="date" className="form-control" value={formData.start_from} onChange={e => setFormData({...formData, start_from: e.target.value})} />
                    </div>
                  </div>

                  <div className="row align-items-center mb-3">
                    <label className="col-md-4 small">Key Terms</label>
                    <div className="col-md-8">
                      <input className="form-control" placeholder="Key Terms" value={formData.key_terms} onChange={e => setFormData({...formData, key_terms: e.target.value})} />
                    </div>
                  </div>

                  <div className="row align-items-center mb-3">
                    <label className="col-md-4 small">Alert Before</label>
                    <div className="col-md-8">
                      <select className="form-select" value={formData.alert_before} onChange={e => setFormData({...formData, alert_before: e.target.value})}>
                        <option value="15 days">15 Days</option>
                        <option value="30 days">30 Days</option>
                        <option value="60 days">60 Days</option>
                      </select>
                    </div>
                  </div>

                </div>

                {/* FULL WIDTH REMARKS */}
                <div className="col-12">
                  <div className="row align-items-center">
                    <label className="col-md-2 small">Remarks</label>
                    <div className="col-md-10">
                      <textarea className="form-control" rows={3} value={formData.remarks} onChange={e => setFormData({...formData, remarks: e.target.value})}></textarea>
                    </div>
                  </div>
                </div>

              </div>

            </div>

            {/* ================= FOOTER ================= */}
            <div className="modal-footer d-flex justify-content-between">

              <>
                <input
                  ref={fileRef}
                  type="file"
                  hidden
                  onChange={(e) => {
                    const file = e.target.files?.[0]
                    if (file) console.log("Selected file:", file.name)
                  }}
                />

                <button
                  className="btn btn-light border"
                  onClick={() => fileRef.current?.click()}
                >
                  <i className="bi bi-camera me-1"></i>
                  Upload File
                </button>
              </>

              <div className="d-flex gap-2">
                <button className="btn btn-outline-secondary" onClick={onClose}>
                  Close
                </button>

                <button className="btn btn-primary" onClick={handleSave}>
                  Save
                </button>
              </div>

            </div>

          </div>
        </div>
      </div>
    </div>,
    document.body
  )
}