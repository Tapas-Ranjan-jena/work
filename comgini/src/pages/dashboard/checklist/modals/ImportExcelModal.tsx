import { useState } from "react"
import checklistService from "../../../../services/checklistService"
import toast from "react-hot-toast"

type Props = {
  show: boolean
  onClose: () => void
  onSuccess?: () => void
}

export default function ImportExcelModal({ show, onClose, onSuccess }: Props) {
  const [file, setFile] = useState<File | null>(null)
  const [loading, setLoading] = useState(false)

  const handleSubmit = async () => {
    if (!file) {
      toast.error("Please select an Excel file")
      return
    }

    setLoading(true)
    try {
      const res = await checklistService.importChecklist(file)
      if (res.success) {
        toast.success(res.message || "Checklist imported successfully")
        if (onSuccess) onSuccess()
        onClose()
      } else {
        toast.error(res.message || "Failed to import checklist")
      }
    } catch (error) {
      console.error("Error importing checklist:", error)
      toast.error("An error occurred while importing")
    } finally {
      setLoading(false)
    }
  }

  if (!show) return null

  return (
    <div
      className="position-fixed top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center"
      style={{ background: "rgba(0,0,0,0.35)", zIndex: 1050 }}
    >
      <div className="bg-white p-3 shadow-lg" style={{ width: "420px", borderRadius: "10px" }}>

        {/* ⭐ HEADER */}
        <div className="d-flex justify-content-between align-items-center mb-3 border-bottom pb-2">
          <h6 className="fw-semibold m-0 text-primary">Import Checklist from Excel</h6>
          <button className="btn btn-sm btn-light p-0 border-0" onClick={onClose}>
            <i className="bi bi-x-lg"></i>
          </button>
        </div>

        {/* ⭐ FILE INPUT */}
        <div className="mb-3">
          <input 
            type="file" 
            className="form-control form-control-sm" 
            accept=".xlsx, .xls"
            onChange={(e) => setFile(e.target.files ? e.target.files[0] : null)}
          />
        </div>

        <div className="mb-3 p-2 bg-light border-start border-4 border-warning rounded">
          <small className="text-muted" style={{ fontSize: "11px" }}>
            <i className="bi bi-info-circle me-1"></i>
            Importing this Excel file will append entries to your checklist. Please review the template format before proceeding.
          </small>
        </div>

        {/* ⭐ FOOTER */}
        <div className="d-flex justify-content-end mt-4 gap-2">
          <button 
            onClick={onClose} 
            className="btn btn-sm btn-light border"
            disabled={loading}
          >
            Cancel
          </button>
          <button 
            onClick={handleSubmit} 
            className="btn btn-sm text-white px-3"
            style={{ background: "#2E388E" }}
            disabled={loading}
          >
            {loading ? <span className="spinner-border spinner-border-sm me-1"></span> : null}
            Upload & Import
          </button>
        </div>

      </div>
    </div>
  )
}