import { useState, useEffect, useCallback } from "react"
import IncorporationModal from "./IncorporationModal"
import incorporationService from "../../../../services/incorporation/incorporation.service"
import type { Incorporation } from "../../../../services/incorporation/types"
import type { Pagination } from "../../../../services/clients/types"

export default function RunLLPList() {

  const [incorporations, setIncorporations] = useState<Incorporation[]>([])
  const [pagination, setPagination] = useState<Pagination>({ page: 1, limit: 10, total: 0 })
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState("")
  const [openModal, setOpenModal] = useState(false)
  const [selectedIncorporation, setSelectedIncorporation] = useState<Incorporation | null>(null)
  const [successMessage, setSuccessMessage] = useState("")
  const [searchQuery, setSearchQuery] = useState("")
  const [debouncedSearch, setDebouncedSearch] = useState("")

  // ⭐ Debounce search
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearch(searchQuery)
      setPagination(prev => ({ ...prev, page: 1 })) // Reset to page 1 on search
    }, 500)

    return () => clearTimeout(handler)
  }, [searchQuery])

  const fetchIncorporations = useCallback(async () => {
    setIsLoading(true)
    setError("")
    try {
      const response = await incorporationService.getIncorporations(pagination.page, pagination.limit, debouncedSearch)
      setIncorporations(response.data)
      setPagination(response.pagination)
    } catch (err: any) {
      setError(err.message || "Failed to fetch data")
    } finally {
      setIsLoading(false)
    }
  }, [pagination.page, pagination.limit, debouncedSearch])

  useEffect(() => {
    fetchIncorporations()
  }, [fetchIncorporations])

  const handleCreate = () => {
    setSelectedIncorporation(null)
    setOpenModal(true)
  }

  const handleEdit = (inc: Incorporation) => {
    setSelectedIncorporation(inc)
    setOpenModal(true)
  }

  const handleSuccess = () => {
    setSuccessMessage("Incorporation saved successfully")
    fetchIncorporations()
    setTimeout(() => setSuccessMessage(""), 3000)
  }

  const handleNext = () => {
    if (pagination.page * pagination.limit < pagination.total) {
      setPagination(prev => ({ ...prev, page: prev.page + 1 }))
    }
  }

  const handlePrevious = () => {
    if (pagination.page > 1) {
      setPagination(prev => ({ ...prev, page: prev.page - 1 }))
    }
  }

  return (
    <div className="card border-0 p-3">

      {/* ⭐ FULL IMPORTANT NOTICE */}
      <div
        className="mb-3"
        style={{
          background: "#f4e3c1",
          borderLeft: "4px solid orange",
          padding: "14px"
        }}
      >
        <div className="fw-semibold mb-2">
          <i className="bi bi-exclamation-triangle text-danger me-2"></i>
          Important Notice
        </div>

        <small>
          Please review all forms and entered data carefully before submission.
          If you notice any missing information, unnecessary fields, or discrepancies,
          kindly reach out to us after completing the form.
          <br /><br />

          CompyRelaxis will not be held responsible for any issues arising due to
          frequent changes in MCA functionality. As MCA updates its systems regularly,
          some changes may not be immediately reflected on our software. While we
          continuously work to keep everything updated, occasional inconsistencies
          may occur.
        </small>

        <hr style={{ borderTop: "1px dashed #333" }} />

        <small className="text-danger">
          Re-submission is not supported on CompyRelaxis. If your form is under
          re-submission, please do not edit or submit it through CompyRelaxis.
        </small>

        <ul className="mb-1">
          <li>Create a new entry on the MCA portal.</li>
          <li>Prevent you from re-submitting the form on MCA portal.</li>
        </ul>

        <small>
          We cannot be held responsible for any additional charges or issues caused
          by such actions. Thank you for your understanding.
        </small>
      </div>

      {successMessage && (
        <div className="alert alert-success small py-2 d-flex align-items-center justify-content-between mb-3">
          <span><i className="bi bi-check-circle-fill me-2"></i>{successMessage}</span>
          <button className="btn-close" onClick={() => setSuccessMessage("")} style={{ fontSize: '0.7rem' }}></button>
        </div>
      )}

      {error && (
        <div className="alert alert-danger small py-2 mb-3">
          {error}
        </div>
      )}

      {/* ⭐ HEADER (RESPONSIVE FIX) */}
      <div className="d-flex flex-wrap justify-content-between align-items-center gap-2 mb-2">
        <h6 className="fw-semibold m-0">Particulars of RUN-LLP</h6>

        <button
          onClick={handleCreate}
          className="btn btn-sm text-white ms-auto ms-md-0 d-flex align-items-center gap-1"
          style={{ background: "#2E388E" }}
        >
          <i className="bi bi-plus-lg"></i> Create Incorporation
        </button>
      </div>

      {/* ⭐ SEARCH */}
      <div className="d-flex justify-content-end mb-2">
        <div className="position-relative w-100 w-sm-auto" style={{ maxWidth: "240px" }}>
          <input
            className="form-control form-control-sm ps-4"
            placeholder="Search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <i className="bi bi-search position-absolute top-50 start-0 translate-middle-y ms-2"></i>
        </div>
      </div>

      {/* ⭐ TABLE */}
      <div className="table-responsive">
        <table className="table table-bordered align-middle mb-0" style={{ fontSize: '0.85rem' }}>
          <thead className="table-light">
            <tr>
              <th>LLP Name</th>
              <th>Purpose</th>
              <th>MCA User</th>
              <th>SRN</th>
              <th>Status</th>
              <th>Last Submitted</th>
              <th className="text-center">Actions</th>
            </tr>
          </thead>

          <tbody>
            {isLoading ? (
              <tr>
                <td colSpan={7} className="text-center py-4">
                  <div className="spinner-border spinner-border-sm text-primary me-2"></div>
                  Loading incorporations...
                </td>
              </tr>
            ) : incorporations.length === 0 ? (
              <tr>
                <td colSpan={7} className="text-center py-4 text-muted">
                  No records found.
                </td>
              </tr>
            ) : (
              incorporations.map((inc: any) => (
                <tr key={inc.id}>
                  <td>{inc.llpName || inc.proposed_name_1 || "-"}</td>
                  <td>{inc.purpose || inc.proposed_name_2 || "-"}</td>
                  <td>{inc.mcaUser || inc.mca_user || "-"}</td>
                  <td>{inc.srn || "-"}</td>
                  <td>
                    <span className={`badge ${inc.status?.toLowerCase() === 'approved' || inc.submission_status?.toLowerCase() === 'approved' ? 'bg-success' :
                      inc.status?.toLowerCase() === 'rejected' || inc.submission_status?.toLowerCase() === 'rejected' ? 'bg-danger' :
                        inc.status?.toLowerCase() === 'submitted' || inc.submission_status?.toLowerCase() === 'submitted' ? 'bg-primary' : 'bg-secondary'
                      }`}>
                      {inc.status ? inc.status.toUpperCase() : inc.submission_status ? inc.submission_status.toUpperCase() : "PENDING"}
                    </span>
                  </td>
                  <td>{inc.lastSubmitted ? new Date(inc.lastSubmitted).toLocaleDateString() : inc.created_at ? new Date(inc.created_at).toLocaleDateString() : "-"}</td>
                  <td className="text-center">
                    <button
                      className="btn btn-sm btn-outline-primary py-0 px-2"
                      onClick={() => handleEdit(inc)}
                    >
                      <i className="bi bi-pencil-square"></i> Edit
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* ⭐ TABLE FOOTER */}
      <div className="d-flex flex-wrap justify-content-between align-items-center mt-2 gap-2">
        <small className="text-muted">
          Showing {incorporations.length > 0 ? (pagination.page - 1) * pagination.limit + 1 : 0} to {Math.min(pagination.page * pagination.limit, pagination.total)} of {pagination.total} entries
        </small>

        <div>
          <button
            className="btn btn-sm btn-light border me-2"
            onClick={handlePrevious}
            disabled={pagination.page === 1 || isLoading}
          >
            Previous
          </button>
          <button
            className="btn btn-sm btn-light border"
            onClick={handleNext}
            disabled={pagination.page * pagination.limit >= pagination.total || isLoading}
          >
            Next
          </button>
        </div>
      </div>

      <IncorporationModal
        show={openModal}
        incorporation={selectedIncorporation}
        onClose={() => setOpenModal(false)}
        onSuccess={handleSuccess}
      />
    </div>
  )
}
