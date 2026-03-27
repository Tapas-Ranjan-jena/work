import { useState } from "react"
import mastersService from "../../../../services/mastersService"
import toast from "react-hot-toast"

type Props={
  onClose:()=>void
  onSuccess?:()=>void
}

export default function AddClientGroupModal({onClose, onSuccess}:Props){
  const [formData, setFormData] = useState({
    title: "",
    contact_name: "",
    contact_no: "",
    email: ""
  })
  const [loading, setLoading] = useState(false)

  const handleSubmit = async () => {
    if (!formData.title) return toast.error("Title is required")

    setLoading(true)
    try {
      await mastersService.createClientGroup(formData)
      toast.success("Client group added successfully")
      if (onSuccess) onSuccess()
    } catch (error: any) {
      toast.error(error.message || "Failed to add client group")
    } finally {
      setLoading(false)
    }
  }

  return(
    <div
      className="position-fixed top-0 start-0 w-100 h-100 d-flex justify-content-center align-items-center"
      style={{
        background:"rgba(0,0,0,0.2)",
        zIndex:9999
      }}
    >

      <div
        className="bg-white rounded shadow"
        style={{
          width:"600px",
          maxWidth:"95%"
        }}
      >

        {/* HEADER */}
        <div className="d-flex justify-content-between align-items-center border-bottom p-3">
          <h6 className="m-0">Add Client group</h6>
          <i
            className="bi bi-x-lg"
            style={{cursor:"pointer"}}
            onClick={onClose}
          />
        </div>

        {/* BODY */}
        <div className="p-3">

          <div className="row g-3">

            <div className="col-12">
              <label className="form-label small fw-bold text-muted mb-1">Title <span className="text-danger">*</span></label>
              <input 
                className="form-control" 
                placeholder="Title"
                value={formData.title}
                onChange={e => setFormData({...formData, title: e.target.value})}
              />
            </div>

            <div className="col-12">
              <label className="form-label small fw-bold text-muted mb-1">Contact Name</label>
              <input 
                className="form-control" 
                placeholder="Contact Name"
                value={formData.contact_name}
                onChange={e => setFormData({...formData, contact_name: e.target.value})}
              />
            </div>

            <div className="col-12">
              <label className="form-label small fw-bold text-muted mb-1">Contact No</label>
              <input 
                className="form-control" 
                placeholder="Contact No"
                value={formData.contact_no}
                onChange={e => setFormData({...formData, contact_no: e.target.value})}
              />
            </div>

            <div className="col-12">
              <label className="form-label small fw-bold text-muted mb-1">Email ID</label>
              <input 
                className="form-control" 
                placeholder="Email ID"
                value={formData.email}
                onChange={e => setFormData({...formData, email: e.target.value})}
              />
            </div>

          </div>

        </div>

        {/* FOOTER */}
        <div className="border-top p-3 d-flex justify-content-end gap-2">
          <button
            className="btn btn-light btn-sm px-4"
            onClick={onClose}
            disabled={loading}
          >
            Cancel
          </button>

          <button
            className="btn btn-sm px-4"
            style={{background:"#2E388E",color:"#fff"}}
            onClick={handleSubmit}
            disabled={loading}
          >
            {loading ? (
              <span className="spinner-border spinner-border-sm me-2" aria-hidden="true" />
            ) : null}
            Save
          </button>
        </div>

      </div>
    </div>
  )
}