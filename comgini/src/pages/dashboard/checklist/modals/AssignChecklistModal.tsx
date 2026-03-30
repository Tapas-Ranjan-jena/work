import { useState, useEffect } from "react"
import assignmentService from "../../../../services/assignmentService"
import checklistService from "../../../../services/checklistService"
import type { UserLookup, CompanyLookup } from "../../../../services/assignmentTypes"
import type { Checklist } from "../../../../services/checklistTypes"
import toast from "react-hot-toast"

type Props = {
  show: boolean
  onClose: () => void
  onSuccess?: () => void
}

export default function AssignChecklistModal({ show, onClose, onSuccess }: Props) {
  const [makers, setMakers] = useState<UserLookup[]>([])
  const [checkers, setCheckers] = useState<UserLookup[]>([])
  const [companies, setCompanies] = useState<CompanyLookup[]>([])
  const [checklists, setChecklists] = useState<Checklist[]>([])
  const [loading, setLoading] = useState(false)

  const [formData, setFormData] = useState({
    makerId: "",
    checkerId: "",
    companyId: "",
    checklistId: "",
    dueDate: ""
  })

  useEffect(() => {
    if (show) {
      const fetchLookups = async () => {
        try {
          const [makersRes, checkersRes, companiesRes, checklistsRes] = await Promise.all([
            assignmentService.lookupUsers('maker'),
            assignmentService.lookupUsers('checker'),
            assignmentService.lookupCompanies(),
            checklistService.getChecklists(1, 100) // Get top 100 checklists
          ])

          if (makersRes.success) setMakers(makersRes.data)
          if (checkersRes.success) setCheckers(checkersRes.data)
          if (companiesRes.success) setCompanies(companiesRes.data)
          if (checklistsRes.success) setChecklists(checklistsRes.data)
        } catch (error) {
          console.error("Error fetching lookups:", error)
          toast.error("Failed to load dropdown data")
        }
      }
      fetchLookups()
    }
  }, [show])

  const handleAssign = async () => {
    const { makerId, checkerId, companyId, checklistId, dueDate } = formData
    if (!makerId || !checkerId || !companyId || !checklistId || !dueDate) {
      toast.error("Please fill in all fields")
      return
    }

    setLoading(true)
    try {
      const res = await assignmentService.assignChecklist(formData)
      if (res.success) {
        toast.success(res.message || "Checklist assigned successfully")
        if (onSuccess) onSuccess()
        onClose()
      } else {
        toast.error(res.message || "Failed to assign checklist")
      }
    } catch (error) {
      console.error("Error assigning checklist:", error)
      toast.error("An error occurred while assigning")
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
      <div className="bg-white p-4 shadow-lg" style={{ width: "520px", borderRadius: "12px" }}>

        {/* ⭐ HEADER */}
        <div className="d-flex justify-content-between align-items-center mb-3 border-bottom pb-2">
          <h6 className="fw-semibold m-0 text-primary">Particulars of Assignment</h6>
          <button className="btn btn-sm btn-light p-0 border-0" onClick={onClose}>
            <i className="bi bi-x-lg"></i>
          </button>
        </div>

        {/* ⭐ FORM */}
        <div className="row g-3">
          <div className="col-md-6">
            <label className="form-label small fw-medium">Maker</label>
            <select 
              className="form-select form-select-sm"
              value={formData.makerId}
              onChange={(e) => setFormData({ ...formData, makerId: e.target.value })}
            >
              <option value="">Select Maker</option>
              {makers.map(u => <option key={u.id} value={u.id}>{u.name}</option>)}
            </select>
          </div>

          <div className="col-md-6">
            <label className="form-label small fw-medium">Checker</label>
            <select 
              className="form-select form-select-sm"
              value={formData.checkerId}
              onChange={(e) => setFormData({ ...formData, checkerId: e.target.value })}
            >
              <option value="">Select Checker</option>
              {checkers.map(u => <option key={u.id} value={u.id}>{u.name}</option>)}
            </select>
          </div>

          <div className="col-md-6">
            <label className="form-label small fw-medium">Name of Company</label>
            <select 
              className="form-select form-select-sm"
              value={formData.companyId}
              onChange={(e) => setFormData({ ...formData, companyId: e.target.value })}
            >
              <option value="">Select Company</option>
              {companies.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
            </select>
          </div>

          <div className="col-md-6">
            <label className="form-label small fw-medium">Checklist</label>
            <select 
              className="form-select form-select-sm"
              value={formData.checklistId}
              onChange={(e) => setFormData({ ...formData, checklistId: e.target.value })}
            >
              <option value="">Select Checklist</option>
              {checklists.map(cl => <option key={cl.id} value={cl.id}>{cl.title}</option>)}
            </select>
          </div>

          <div className="col-md-6">
            <label className="form-label small fw-medium">Due Date</label>
            <input 
              type="date"
              className="form-control form-control-sm"
              value={formData.dueDate}
              onChange={(e) => setFormData({ ...formData, dueDate: e.target.value })}
            />
          </div>
        </div>

        {/* ⭐ FOOTER */}
        <div className="d-flex justify-content-end mt-4 pt-3 border-top gap-2">
          <button onClick={onClose} className="btn btn-sm btn-light border" disabled={loading}>
            Cancel
          </button>
          <button
            className="btn btn-sm text-white px-4"
            style={{ background: "#2E388E" }}
            onClick={handleAssign}
            disabled={loading}
          >
            {loading ? <span className="spinner-border spinner-border-sm me-1"></span> : null}
            Assign
          </button>
        </div>

      </div>
    </div>
  )
}