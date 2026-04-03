import { useState } from "react"
import api from "../../../../api/api"
import toast from "react-hot-toast"

interface Props {
  show: boolean
  onClose: () => void
  onSuccess: (data: any) => void
}

export default function UploadMGTModal({ show, onClose, onSuccess }: Props) {
  const [file, setFile] = useState<File | null>(null)
  const [uploading, setUploading] = useState(false)

  const handleUpload = async () => {
    if (!file) {
      toast.error("Please choose a file first")
      return
    }

    try {
      setUploading(true)
      const formData = new FormData()
      formData.append("file", file)
      
      const response = await api.post("/rta-services/upload-mgt", formData, {
        headers: { "Content-Type": "multipart/form-data" }
      })

      if (response.data.success) {
        toast.success("Form uploaded successfully")
        onSuccess(response.data.data)
        onClose()
      } else {
        toast.error(response.data.message || "Failed to upload form")
      }
    } catch (error) {
      console.error("Upload error", error)
      toast.error("An error occurred during upload")
    } finally {
      setUploading(false)
    }
  }

  if (!show) return null

  return (
    <div
      className="modal fade show d-block"
      style={{ background: "rgba(0,0,0,0.5)", zIndex: 1050 }}
    >
      <div className="modal-dialog modal-lg modal-dialog-centered">
        <div className="modal-content border-0 shadow-lg" style={{ borderRadius: "12px" }}>
          
          <div className="modal-header border-bottom py-3">
            <h5 className="modal-title fw-bold">Upload MGT-7/7A</h5>
            <button type="button" className="btn-close" onClick={onClose}></button>
          </div>

          <div className="modal-body p-4 text-start">
            <div className="border rounded overflow-hidden">
                <div className="row g-0 align-items-center">
                    <div className="col-md-2 bg-light border-end px-3 py-3 fw-bold small">Choose Form</div>
                    <div className="col-md-7 px-3 py-3">
                        <input 
                            type="file" 
                            className="form-control form-control-sm border shadow-none" 
                            accept=".pdf,.xlsx,.xls"
                            onChange={(e) => setFile(e.target.files?.[0] || null)}
                        />
                    </div>
                    <div className="col-md-3 px-3 py-3 text-end">
                        <button 
                            className="btn btn-primary px-4 fw-bold" 
                            style={{ background: "#2b4cb3", minWidth: "120px" }}
                            onClick={handleUpload}
                            disabled={uploading}
                        >
                          {uploading ? <span className="spinner-border spinner-border-sm me-2"></span> : "UPLOAD"}
                        </button>
                    </div>
                </div>
            </div>
            
            <div className="mt-4 text-center">
                <p className="text-danger fw-medium small mb-0">
                  Please upload the form MGT-7/7A for autofilling the capital structure.
                </p>
            </div>
          </div>

          <div className="modal-footer bg-light p-2 border-top text-end rounded-bottom d-flex justify-content-end">
             <i className="bi bi-x-square-fill text-muted h4 mb-0" style={{ cursor: "pointer" }} onClick={onClose}></i>
          </div>
        </div>
      </div>
    </div>
  )
}
