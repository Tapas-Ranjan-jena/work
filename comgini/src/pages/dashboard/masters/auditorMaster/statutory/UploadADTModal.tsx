import { useState, useEffect } from "react"
import mastersService from "../../../../../services/mastersService"
import type { Auditor } from "../../../../../types/masters.types"
import toast from "react-hot-toast"

type Props = {
  onClose: () => void
  onSuccess?: () => void
}

export default function UploadADTModal({ onClose, onSuccess }: Props) {
  const [v2File, setV2File] = useState<File | null>(null)
  const [v3File, setV3File] = useState<File | null>(null)
  const [auditors, setAuditors] = useState<Auditor[]>([])
  const [selectedAuditor, setSelectedAuditor] = useState<number>(0)
  const [loading, setLoading] = useState(false)

  // Determine current category based on URL to fetch correct auditors
  const currentCategory = window.location.pathname.includes("secretarial") ? "secretarial" :
                          window.location.pathname.includes("cost") ? "cost" :
                          window.location.pathname.includes("internal") ? "internal" : "statutory"

  useEffect(() => {
    fetchAuditors()
  }, [])

  const fetchAuditors = async () => {
    try {
      const data = await mastersService.getAuditors(currentCategory)
      setAuditors(data)
    } catch (error) {
      console.error("Failed to fetch auditors for dropdown:", error)
    }
  }

  const handleUpload = async () => {
    if (!selectedAuditor) return toast.error("Please select an auditor format first")
    if (!v2File && !v3File) return toast.error("Please select at least one form")

    setLoading(true)
    try {
      const formData = new FormData()
      formData.append("auditor_id", selectedAuditor.toString())
      if (v2File) formData.append("file_v2", v2File)
      if (v3File) formData.append("file_v3", v3File)
      
      await mastersService.uploadADT1(formData)
      
      toast.success("Form(s) uploaded successfully")
      onSuccess?.()
      onClose()
    } catch (error: any) {
      toast.error(error.message || "Failed to upload forms")
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <div
        className="position-fixed top-0 start-0 w-100 h-100"
        style={{
          background: "rgba(0,0,0,0.25)",
          zIndex: 1050
        }}
        onClick={onClose}
      />

      <div
        className="position-fixed top-50 start-50 translate-middle"
        style={{
          width: "760px",
          maxWidth: "96%",
          zIndex: 1051
        }}
      >
        <div className="card shadow border-0" style={{ borderRadius: "12px" }}>
          <div className="d-flex justify-content-between align-items-center px-4 py-3 border-bottom bg-light rounded-top">
            <h6 className="m-0 fw-bold">Upload ADT – 1</h6>
            <button
              onClick={onClose}
              className="btn-close"
              aria-label="Close"
            ></button>
          </div>

          <div className="px-4 py-4">
            <div className="mb-4">
              <label className="form-label small fw-bold text-muted mb-1">Select Auditor <span className="text-danger">*</span></label>
              <select 
                className="form-select shadow-sm"
                value={selectedAuditor}
                onChange={(e) => setSelectedAuditor(Number(e.target.value))}
              >
                <option value={0}>-- Select Firm / Auditor --</option>
                {auditors.map(a => (
                  <option key={a.id} value={a.id}>{a.firm_name || a.auditor_name}</option>
                ))}
              </select>
            </div>

            <div className="mb-4">
              <p className="mb-2 fw-bold text-danger" style={{ fontSize: "13px" }}>
                Kindly upload the applicable V2 forms in the section below.
              </p>
              <div className="d-flex align-items-center gap-3">
                <small className="text-muted fw-bold" style={{ minWidth: "100px" }}>Choose Form</small>
                <input
                  type="file"
                  className="form-control"
                  onChange={(e) => setV2File(e.target.files?.[0] || null)}
                  accept=".pdf,.doc,.docx"
                />
                <button
                  className="btn btn-primary d-flex align-items-center justify-content-center"
                  style={{ width: "38px", height: "38px" }}
                >
                  <i className="bi bi-plus-lg"></i>
                </button>
              </div>
            </div>

            <div className="mb-2">
              <p className="mb-2 fw-bold text-danger" style={{ fontSize: "13px" }}>
                Kindly upload the applicable V3 forms in the section below.
              </p>
              <div className="d-flex align-items-center gap-3">
                <small className="text-muted fw-bold" style={{ minWidth: "100px" }}>Choose Form</small>
                <input
                  type="file"
                  className="form-control"
                  onChange={(e) => setV3File(e.target.files?.[0] || null)}
                  accept=".pdf,.doc,.docx"
                />
              </div>
            </div>
          </div>

          <div className="d-flex justify-content-end px-4 py-3 border-top bg-light rounded-bottom">
            <button
              className="btn btn-secondary btn-sm me-2 px-4 shadow-sm"
              onClick={onClose}
              disabled={loading}
            >
              Cancel
            </button>
            <button
              className="btn btn-sm px-5 shadow-sm"
              style={{ background: "#2E388E", color: "#fff" }}
              onClick={handleUpload}
              disabled={loading}
            >
              {loading ? (
                <>
                  <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                  Uploading...
                </>
              ) : "Upload"}
            </button>
          </div>
        </div>
      </div>
    </>
  )
}