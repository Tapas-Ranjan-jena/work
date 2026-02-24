type Props = {
  onClose: () => void
}

export default function UploadADTModal({ onClose }: Props) {

  return (
    <>
      {/* ===== BACKDROP ===== */}
      <div
        className="position-fixed top-0 start-0 w-100 h-100"
        style={{
          background: "rgba(0,0,0,0.25)",
          zIndex: 1050
        }}
      />

      {/* ===== MODAL WRAPPER ===== */}
      {/* ===== MODAL WRAPPER ===== */}
<div
  className="position-fixed top-50 start-50 translate-middle"
  style={{
    width: "760px",      // ⭐ BIG SIZE (matches your UI)
    maxWidth: "96%",
    zIndex: 1051
  }}
>
        <div className="card shadow-sm" style={{ borderRadius: "8px" }}>

          {/* ===== HEADER ===== */}
          <div className="d-flex justify-content-between align-items-center px-3 py-2 border-bottom">
            <h6 className="m-0">Upload ADT – 1</h6>

            <button
              onClick={onClose}
              className="btn btn-sm"
              style={{ border: "none", background: "transparent" }}
            >
              <i className="bi bi-x-lg"></i>
            </button>
          </div>

          {/* ===== BODY ===== */}
          <div className="px-3 py-2">

            {/* ===== V2 TEXT ===== */}
            <p className="mb-1" style={{ color: "#dc2626", fontSize: "12px" }}>
              Kindly upload the applicable V2 forms in the section below.
            </p>

            {/* ===== LABEL + INPUT ROW ===== */}
            <div className="d-flex align-items-center gap-2 mb-2">

              {/* ⭐ LABEL (YOU WERE MISSING) */}
              <small style={{ minWidth: "95px" }}>
                Choose Form
              </small>

              <input
                type="file"
                className="form-control form-control-sm"
              />

              <button
                className="btn btn-sm"
                style={{
                  background: "#2E388E",
                  color: "#fff",
                  width: "34px",
                  height: "34px"
                }}
              >
                +
              </button>
            </div>

            {/* ===== V3 TEXT ===== */}
            <p className="mb-1" style={{ color: "#dc2626", fontSize: "12px" }}>
              Kindly upload the applicable V3 forms in the section below.
            </p>

            <div className="d-flex align-items-center gap-2">
              <small style={{ minWidth: "95px" }}>
                Choose Form
              </small>

              <input
                type="file"
                className="form-control form-control-sm"
              />
            </div>

          </div>

          {/* ===== FOOTER ===== */}
          <div className="d-flex justify-content-end px-3 py-2 border-top">
            <button
              className="btn btn-sm"
              style={{ background: "#2E388E", color: "#fff" }}
            >
              Upload
            </button>
          </div>

        </div>
      </div>
    </>
  )
}