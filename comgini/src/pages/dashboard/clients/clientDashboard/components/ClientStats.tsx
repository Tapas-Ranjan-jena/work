export default function ClientStats() {

  const stats = [
    {
      title: "Tasks",
      value: "0",
      color: "linear-gradient(90deg,#4fa4d3,#4a93be)",
      icon: "bi-grid-fill"
    },
    {
      title: "Invoice Value",
      value: "",
      color: "linear-gradient(90deg,#4b4fb3,#3b3f95)",
      icon: "bi-file-earmark-text-fill"
    },
    {
      title: "Payments",
      value: "",
      color: "linear-gradient(90deg,#43c192,#36a97c)",
      icon: "bi-check-square-fill"
    },
    {
      title: "Due",
      value: "",
      color: "linear-gradient(90deg,#ff6767,#ff5252)",
      icon: "bi-cash-stack"
    }
  ]

  return (
    <div className="row g-3 mb-3">

      {stats.map((item, index) => (
        <div key={index} className="col-lg-3">

          <div
            className="client-stats"
            style={{
              background: item.color,
              padding: "14px 18px",
              borderRadius: "8px",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between"
            }}
          >

            {/* LEFT SIDE ICON */}
            {/* LEFT SIDE ICON */}
            <div
              style={{
                width: "52px",           // ⭐ bigger icon container
                height: "52px",
                borderRadius: "0px",     // ⭐ remove box tilt feeling
                background: "transparent", // ⭐ REMOVE blur background
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "#fff",
                fontSize: "26px"         // ⭐ bigger icon size
              }}
            >
              <i className={`bi ${item.icon}`}></i>
            </div>

            {/* RIGHT TEXT */}
            <div style={{ textAlign: "right", color: "#fff" }}>

              {item.value && (
                <div
                  style={{
                    fontSize: "14px",
                    fontWeight: 600,
                    lineHeight: "1"
                  }}
                >
                  {item.value}
                </div>
              )}

              <div
                style={{
                  fontSize: "12px",
                  opacity: .95
                }}
              >
                {item.title}
              </div>

            </div>

          </div>

        </div>
      ))}

    </div>
  )
}
