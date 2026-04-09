import { useRef, useState, useEffect } from "react"
import { createPortal } from "react-dom"
import businessManagerService from "../../../../services/businessManagerService"
import dropdownService from "../../../../services/dropdownService"

type Props = {
  open: boolean
  onClose: () => void
}

export default function AddInsuranceModal({ open, onClose }: Props) {
  const fileRef = useRef<HTMLInputElement>(null)
  
  const [formData, setFormData] = useState({
    company_id: 0,
    insurance_company: "",
    broker_name: "",
    policy_type: "",
    policy_number: "",
    sum_insured: "",
    policy_commencement_date: "",
    renewal_date: "",
    start_from: "",
    expiry_date: "",
    amount_paid: "",
    mode_of_payment: "",
    asset_insured: "",
    payment_date: "",
    key_terms: "",
    alert_user: "",
    alert_before: "30",
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
            ...formData,
            sum_insured: Number(formData.sum_insured),
            amount_paid: Number(formData.amount_paid)
        };
        console.log("Sending Payload:", payload);
        
        await businessManagerService.createInsurance(payload as any);
        onClose();
    } catch (e: any) {
        console.error("Failed to default save", e, e.response?.data);
        alert("Failed to save insurance: " + (e.response?.data?.message || "Internal Error"));
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
      {/* ⭐ LOWERED POSITION */}
      <div className="d-flex justify-content-center" style={{ paddingTop: "70px" }}>
        <div className="modal-dialog" style={{ maxWidth: "1200px" }}>
          <div className="modal-content">

            {/* ================= HEADER ================= */}
            <div className="modal-header">
              <h5 className="fw-semibold m-0">Add Insurance</h5>
              <button className="btn-close" onClick={onClose}></button>
            </div>

            {/* ================= BODY ================= */}
            <div className="modal-body px-4">
              <div className="row gy-3 gx-4">

                {/* ===== LEFT COLUMN ===== */}
                <div className="col-md-6">

                  <div className="row align-items-center mb-3">
                    <label className="col-4 small">Company name</label>
                    <div className="col-8">
                      <select className="form-select" value={formData.company_id} onChange={e => setFormData({...formData, company_id: Number(e.target.value)})}>
                        <option value={0}>Select</option>
                        {clients.map(c => <option key={c.id} value={c.id}>{c.company_name}</option>)}
                      </select>
                    </div>
                  </div>

                  <div className="row align-items-center mb-3">
                    <label className="col-4 small">Name of Insurance Broker / Agent</label>
                    <div className="col-8">
                      <input className="form-control" placeholder="Broker/Agent Name" value={formData.broker_name} onChange={e => setFormData({...formData, broker_name: e.target.value})} />
                    </div>
                  </div>

                  <div className="row align-items-center mb-3">
                    <label className="col-4 small">Sum Insured (In Rs.)</label>
                    <div className="col-8">
                      <input className="form-control" placeholder="Sum Insured (In Rs.)" value={formData.sum_insured} onChange={e => setFormData({...formData, sum_insured: e.target.value})} />
                    </div>
                  </div>

                  <div className="row align-items-center mb-3">
                    <label className="col-4 small">Policy Commencement Date</label>
                    <div className="col-8">
                      <input type="date" className="form-control" value={formData.policy_commencement_date} onChange={e => setFormData({...formData, policy_commencement_date: e.target.value})} />
                    </div>
                  </div>

                  <div className="row align-items-center mb-3">
                    <label className="col-4 small">Start From</label>
                    <div className="col-8">
                      <input type="date" className="form-control" value={formData.start_from} onChange={e => setFormData({...formData, start_from: e.target.value})} />
                    </div>
                  </div>

                  <div className="row align-items-center mb-3">
                    <label className="col-4 small">Asset Insured</label>
                    <div className="col-8">
                      <input className="form-control" placeholder="Asset Insured" value={formData.asset_insured} onChange={e => setFormData({...formData, asset_insured: e.target.value})} />
                    </div>
                  </div>

                  <div className="row align-items-center mb-3">
                    <label className="col-4 small">Payment date</label>
                    <div className="col-8">
                      <input type="date" className="form-control" value={formData.payment_date} onChange={e => setFormData({...formData, payment_date: e.target.value})} />
                    </div>
                  </div>

                  <div className="row align-items-center mb-3">
                    <label className="col-4 small">Key Terms</label>
                    <div className="col-8">
                      <input className="form-control" placeholder="Key Terms" value={formData.key_terms} onChange={e => setFormData({...formData, key_terms: e.target.value})} />
                    </div>
                  </div>

                  <div className="row align-items-center mb-3">
                    <label className="col-4 small">Alert User</label>
                    <div className="col-8">
                      <input className="form-control" placeholder="Alert User" value={formData.alert_user} onChange={e => setFormData({...formData, alert_user: e.target.value})} />
                    </div>
                  </div>

                </div>

                {/* ===== RIGHT COLUMN ===== */}
                <div className="col-md-6">

                  <div className="row align-items-center mb-3">
                    <label className="col-4 small">Name of Insurance Company</label>
                    <div className="col-8">
                      <input className="form-control" placeholder="Insurance Company" value={formData.insurance_company} onChange={e => setFormData({...formData, insurance_company: e.target.value})} />
                    </div>
                  </div>

                  <div className="row align-items-center mb-3">
                    <label className="col-4 small">Policy Type</label>
                    <div className="col-8">
                      <input className="form-control" placeholder="Policy Type" value={formData.policy_type} onChange={e => setFormData({...formData, policy_type: e.target.value})} />
                    </div>
                  </div>

                  <div className="row align-items-center mb-3">
                    <label className="col-4 small">Policy Number</label>
                    <div className="col-8">
                      <input className="form-control" placeholder="Policy Number" value={formData.policy_number} onChange={e => setFormData({...formData, policy_number: e.target.value})} />
                    </div>
                  </div>

                  <div className="row align-items-center mb-3">
                    <label className="col-4 small">Policy/Renewal Date</label>
                    <div className="col-8">
                      <input type="date" className="form-control" value={formData.renewal_date} onChange={e => setFormData({...formData, renewal_date: e.target.value})} />
                    </div>
                  </div>

                  <div className="row align-items-center mb-3">
                    <label className="col-4 small">Expiry Date</label>
                    <div className="col-8">
                      <input type="date" className="form-control" value={formData.expiry_date} onChange={e => setFormData({...formData, expiry_date: e.target.value})} />
                    </div>
                  </div>

                  <div className="row align-items-center mb-3">
                    <label className="col-4 small">Amount Paid (In Rs.)</label>
                    <div className="col-8">
                      <input className="form-control" placeholder="Amount Paid (In Rs.)" value={formData.amount_paid} onChange={e => setFormData({...formData, amount_paid: e.target.value})} />
                    </div>
                  </div>

                  <div className="row align-items-center mb-3">
                    <label className="col-4 small">Mode of Payment</label>
                    <div className="col-8">
                      <input className="form-control" placeholder="Mode of Payment" value={formData.mode_of_payment} onChange={e => setFormData({...formData, mode_of_payment: e.target.value})} />
                    </div>
                  </div>

                  <div className="row align-items-center mb-3">
                    <label className="col-4 small">Remarks</label>
                    <div className="col-8">
                      <input className="form-control" placeholder="Remarks" value={formData.remarks} onChange={e => setFormData({...formData, remarks: e.target.value})} />
                    </div>
                  </div>

                  <div className="row align-items-center mb-3">
                    <label className="col-4 small">Alert Before</label>
                    <div className="col-8">
                      <select className="form-select" value={formData.alert_before} onChange={e => setFormData({...formData, alert_before: e.target.value})}>
                        <option value="15">15 Days</option>
                        <option value="30">30 Days</option>
                        <option value="60">60 Days</option>
                      </select>
                    </div>
                  </div>

                </div>

              </div>
            </div>

            {/* ================= FOOTER ================= */}
            <div className="modal-footer d-flex justify-content-between">

              {/* ⭐ REAL FILE PICKER */}
              <>
                <input
                  ref={fileRef}
                  type="file"
                  hidden
                  onChange={(e) => {
                    const file = e.target.files?.[0]
                    if (file) console.log("Selected:", file.name)
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