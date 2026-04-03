import { useState } from "react"

export default function DocumentsTab() {
  const [attachments, setAttachments] = useState([{ id: 1, type: "", file: null }])

  const initialDocuments = [
    { name: "PART I-ISSUER DETAILS_NSDL", type: "word", hasPdf: true },
    { name: "PART II-SECURITY DETAILS FOR EQUITY SHARES_NSDL", type: "word", hasPdf: true },
    { name: "DECLARATION FOR FREEZE-UNFREEZE OF ISIN", type: "word", hasPdf: true },
    { name: "UNDERTAKING CDSL", type: "word", hasPdf: true },
    { name: "MASTER CREATION FORM_CDSL", type: "word", hasPdf: true },
    { name: "TRIPARTITE-AGREEMENT_NSDL", type: "word", hasPdf: true },
    { name: "TRIPARTITE-AGREEMENT_CDSL", type: "word", hasPdf: true },
    { name: "NETWORTH CERTIFICATE", type: "word", hasPdf: true },
    { name: "DETAILS OF SECURITIES", type: "excel", hasPdf: true },
    { name: "CTC OF BOARD RESOLUTION", type: "word", hasPdf: true }
  ]

  const addAttachmentRow = () => {
    setAttachments([...attachments, { id: attachments.length + 1, type: "", file: null }])
  }

  return (
    <div className="p-4 bg-white text-start shadow-sm" style={{ fontSize: "14px" }}>
      <div className="d-flex justify-content-end gap-2 mb-4">
          <button className="btn btn-primary d-flex align-items-center gap-2 shadow-none px-3 py-2 fw-bold" style={{ background: "#2b4cb3" }}>
            <i className="bi bi-plus-lg"></i> Import Form
          </button>
          <button className="btn btn-primary d-flex align-items-center gap-2 shadow-none px-4 py-2 fw-bold" style={{ background: "#2b4cb3" }}>
            <i className="bi bi-arrow-left-circle"></i> Back
          </button>
      </div>

      <div className="table-responsive border rounded mb-5">
        <table className="table table-bordered table-sm mb-0 align-middle text-center small">
          <thead className="bg-light text-uppercase">
            <tr>
              <th className="py-3 px-3 text-start" style={{ width: "350px" }}>Title of Document</th>
              <th className="py-3">View</th>
              <th className="py-3">Word File</th>
              <th className="py-3">Pdf File</th>
              <th className="py-3" style={{ width: "180px" }}>Upload Signed Document</th>
              <th className="py-3" style={{ width: "200px" }}>Uploaded Document</th>
            </tr>
          </thead>
          <tbody>
            {initialDocuments.map((doc, idx) => (
              <tr key={idx}>
                <td className="text-start px-3 py-2 fw-bold text-uppercase">{doc.name}</td>
                <td className="py-2 text-primary"><i className="bi bi-eye h5 mb-0" style={{ cursor: "pointer" }}></i></td>
                <td className="py-2">
                    <i className={`bi ${doc.type === "excel" ? "bi-file-earmark-excel text-success" : "bi-file-earmark-word text-primary"} h5 mb-0`} style={{ cursor: "pointer" }}></i>
                </td>
                <td className="py-2">
                    <i className="bi bi-file-earmark-pdf text-danger h5 mb-0" style={{ cursor: "pointer" }}></i>
                </td>
                <td className="py-2">
                   <button className="btn btn-primary btn-sm px-4 shadow-none" style={{ backgroundColor: "#2b4cb3" }}>Upload</button>
                </td>
                <td className="py-2 text-muted fst-italic">No file uploaded</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <h6 className="fw-bold mb-3 text-uppercase border-bottom pb-2">Other Attachments</h6>
      <div className="table-responsive border rounded mb-5">
          <table className="table table-bordered table-sm mb-0 align-middle">
              <thead className="bg-light">
                  <tr>
                      <th className="py-2 px-3 text-center" style={{ width: "80px" }}>Sr. No</th>
                      <th className="py-2 px-3">Attachment Type</th>
                      <th className="py-2 px-3">Attachment</th>
                      <th className="py-2 px-3 text-center" style={{ width: "100px" }}>
                          <button className="btn btn-primary btn-sm px-3 shadow-none fw-bold" style={{ backgroundColor: "#2b4cb3" }} onClick={addAttachmentRow}>Add row</button>
                      </th>
                  </tr>
              </thead>
              <tbody>
                  {attachments.map((att, idx) => (
                      <tr key={att.id}>
                          <td className="text-center py-2">{idx + 1}.</td>
                          <td className="p-1">
                              <select className="form-select form-select-sm border shadow-none">
                                  <option value="">Select type</option>
                                  <option value="other">Other Document</option>
                              </select>
                          </td>
                          <td className="p-1">
                              <input type="file" className="form-control form-control-sm border shadow-none" />
                          </td>
                          <td className="text-center py-2">
                              <button className="btn btn-link text-danger p-0 shadow-none"><i className="bi bi-trash"></i></button>
                          </td>
                      </tr>
                  ))}
              </tbody>
          </table>
      </div>

      <div className="text-start">
          <button className="btn btn-primary px-5 py-2 fw-bold" style={{ backgroundColor: "#2b4cb3" }}>Submit</button>
      </div>
    </div>
  )
}
