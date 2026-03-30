import { useState } from "react"
import { useNavigate } from "react-router-dom"
import ImportExcelModal from "../modals/ImportExcelModal"
import checklistService from "../../../../services/checklistService"
import toast from "react-hot-toast"
import type { ChecklistItem } from "../../../../services/checklistTypes"

export default function AddChecklist() {
  const navigate = useNavigate()
  const [openImport, setOpenImport] = useState(false)
  const [title, setTitle] = useState("")
  const [items, setItems] = useState<ChecklistItem[]>([{ siNo: 1, particular: "" }])
  const [loading, setLoading] = useState(false)

  const handleAddRow = () => {
    setItems([...items, { siNo: items.length + 1, particular: "" }])
  }

  const handleRemoveRow = () => {
    if (items.length > 1) {
      setItems(items.slice(0, -1))
    }
  }

  const handleItemChange = (index: number, value: string) => {
    const newItems = [...items]
    newItems[index].particular = value
    setItems(newItems)
  }

  const handleSubmit = async () => {
    if (!title.trim()) {
      toast.error("Please enter a checklist title")
      return
    }
    if (items.some(item => !item.particular.trim())) {
      toast.error("Please fill in all particulars or remove empty rows")
      return
    }

    setLoading(true)
    try {
      const res = await checklistService.createChecklist({ title, items })
      if (res.success) {
        toast.success(res.message || "Checklist created successfully")
        navigate("/checklist")
      } else {
        toast.error(res.message || "Failed to create checklist")
      }
    } catch (error) {
      console.error("Error creating checklist:", error)
      toast.error("An error occurred while creating checklist")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="card border-0 p-3">
      {/* ⭐ HEADER */}
      <div className="d-flex justify-content-between mb-3">
        <h6 className="fw-semibold">Add Checklist</h6>
        <div className="d-flex gap-2">
          <button
            onClick={() => setOpenImport(true)}
            className="btn btn-sm text-white"
            style={{ background: "#2E388E" }}
          >
            Import Excel
          </button>
          <button
            className="btn btn-sm text-white"
            style={{ background: "#2E388E" }}
          >
            Download Template
          </button>
          <button
            onClick={() => navigate("/checklist")}
            className="btn btn-sm text-white"
            style={{ background: "#2E388E" }}
          >
            Back
          </button>
        </div>
      </div>

      {/* ⭐ TITLE INPUT */}
      <label className="mb-1">Checklist Title</label>
      <input
        className="form-control mb-3"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Enter checklist title"
      />

      {/* ⭐ TABLE */}
      <div className="table-responsive">
        <table className="table table-bordered">
          <thead>
            <tr>
              <th style={{ width: "80px" }}>Sr. No.</th>
              <th>Particulars</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item, index) => (
              <tr key={index}>
                <td className="text-center">{item.siNo}</td>
                <td>
                  <input
                    className="form-control form-control-sm border-0"
                    value={item.particular}
                    onChange={(e) => handleItemChange(index, e.target.value)}
                    placeholder="Enter particular"
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* ⭐ ROW BUTTONS */}
      <div className="d-flex gap-2">
        <button
          className="btn btn-sm text-white"
          style={{ background: "#2E388E" }}
          onClick={handleAddRow}
        >
          Add Row
        </button>
        <button
          className="btn btn-sm text-white"
          style={{ background: "#2E388E" }}
          onClick={handleRemoveRow}
          disabled={items.length <= 1}
        >
          Remove Row
        </button>
      </div>

      {/* ⭐ SUBMIT */}
      <button
        className="btn btn-sm mt-3 text-white"
        style={{ background: "#2E388E", width: "120px" }}
        onClick={handleSubmit}
        disabled={loading}
      >
        {loading ? <span className="spinner-border spinner-border-sm me-1"></span> : null}
        Submit
      </button>

      {/* ⭐ IMPORT EXCEL MODAL */}
      <ImportExcelModal
        show={openImport}
        onClose={() => setOpenImport(false)}
      />
    </div>
  )
}