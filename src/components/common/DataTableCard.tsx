import React from "react"

type Props = {
  title?: string
  addButton?: React.ReactNode
  children: React.ReactNode

  showToolbar?: boolean
  showEntries?: boolean
  showExport?: boolean
  showSearch?: boolean

  leftTools?: React.ReactNode
  rightTools?: React.ReactNode
}

export default function DataTableCard({
  title,
  addButton,
  children,
  showToolbar = false,
  showEntries = false,
  showExport = false,
  showSearch = false,
  leftTools,
  rightTools
}: Props) {

  /* ⭐ AUTO ADD BLACK CIRCLE AROUND + ICON */
  const renderAddButton = () => {

    if (!addButton) return null
    if (!React.isValidElement(addButton)) return addButton

    const btn = addButton as React.ReactElement<any>

    const newChildren = React.Children.map(
      btn.props.children,
      (child: any) => {

        if (typeof child === "string" && child.includes("+")) {
          return (
            <>
              <span
                style={{
                  width: "18px",
                  height: "18px",
                  borderRadius: "50%",
                  border: "1.5px solid #000",
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "13px",
                  marginRight: "6px",
                  lineHeight: "1"
                }}
              >
                +
              </span>
              {child.replace("+", "").trim()}
            </>
          )
        }

        return child
      }
    )

    return React.cloneElement(btn, {}, newChildren)
  }

  return (
    <div className="mb-3">

      {/* ================= HEADER ================= */}
      {(title || addButton) && (
        <div
          style={{
            background: "#F5F5F6",
            padding: "10px 14px",
            border: "1px solid #e2e2e2",
            borderBottom: "none",
            borderRadius: "6px 6px 0 0",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center"
          }}
        >
          <h6 className="fw-semibold m-0">{title}</h6>
          {renderAddButton()}
        </div>
      )}

      {/* ================= CARD BODY ================= */}
      <div
        style={{
          border: "1px solid #e2e2e2",
          borderRadius: title ? "0 0 6px 6px" : "6px",
          overflow: "hidden",
          background: "#fff"
        }}
      >

        {/* ================= TOOLBAR ================= */}
        {showToolbar && (
          <div
            className="d-flex justify-content-between align-items-center flex-wrap gap-2"
            style={{
              background: "#fff",
              borderBottom: "1px solid #e2e2e2",
              padding: "8px 10px"
            }}
          >

            {/* LEFT */}
            <div className="d-flex align-items-center gap-2 flex-wrap">

              {showEntries && (
                <>
                  <select
                    className="form-select form-select-sm"
                    style={{ width: "70px" }}
                  >
                    <option>100</option>
                  </select>

                  <button
                    className="btn btn-light btn-sm"
                    style={{ border: "1px solid #c6c6c6" }}
                  >
                    <i className="bi bi-eye"></i>
                  </button>
                </>
              )}

              {leftTools}

            </div>

            {/* RIGHT */}
            <div className="d-flex align-items-center gap-2">

              {rightTools}

              {showExport && (
                <>
                  <button
                    className="btn btn-light btn-sm"
                    style={{ border: "1px solid #c6c6c6" }}
                  >
                    Excel
                  </button>

                  <button
                    className="btn btn-light btn-sm"
                    style={{ border: "1px solid #c6c6c6" }}
                  >
                    Print
                  </button>
                </>
              )}

              {showSearch && (
                <div style={{ position: "relative" }}>
                  <i
                    className="bi bi-search"
                    style={{
                      position: "absolute",
                      left: "8px",
                      top: "50%",
                      transform: "translateY(-50%)",
                      fontSize: "13px",
                      color: "#888",
                      pointerEvents: "none"
                    }}
                  />

                  <input
                    className="form-control form-control-sm"
                    placeholder="Search"
                    style={{
                      width: "180px",
                      paddingLeft: "26px"
                    }}
                  />
                </div>
              )}

            </div>

          </div>
        )}

        {/* ================= TABLE CONTENT ================= */}
        <div className="mobile-table-scroll">
          {children}
        </div>


        {/* ⭐⭐⭐ BOTTOM FOOTER (YOUR NEW PART) ⭐⭐⭐ */}
        <div
          style={{
            background: "#F5F5F6",
            borderTop: "1px solid #e2e2e2",
            padding: "6px 10px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            fontSize: "12px",
            color: "#555"
          }}
        >
          {/* LEFT TEXT */}
          <div>
            0-0 / 0
          </div>

          {/* RIGHT BUTTONS */}
          <div className="d-flex gap-1">

            <button
              className="btn btn-light btn-sm"
              style={{ padding: "2px 6px", border: "1px solid #c6c6c6" }}
            >
              «
            </button>

            <button
              className="btn btn-light btn-sm"
              style={{ padding: "2px 6px", border: "1px solid #c6c6c6" }}
            >
              »
            </button>

          </div>
        </div>

      </div>
    </div>
  )
}
