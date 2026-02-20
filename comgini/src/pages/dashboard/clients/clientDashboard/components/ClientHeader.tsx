export default function ClientHeader() {
  return (
    <div
      style={{
        background: "#ECECEF",
        padding: "10px 14px",
        paddingBottom: "14px",
        marginBottom: "14px",
        borderBottom: "0.2px solid #62667E",
        borderRadius: "6px",        // ⭐ added radius
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        fontSize: "14px"
      }}
    >
      {/* LEFT SIDE */}
      <div>
        <span style={{ fontWeight: 600 }}>
          Client Name -
        </span>{" "}
        <span style={{ letterSpacing: ".2px" }}>
          24 MOONTIMES NEWS PRIVATE LIMITED
        </span>
      </div>

      {/* RIGHT SIDE */}
      <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
        <span>Switch Client :</span>

        <select
          style={{
            height: "28px",
            borderRadius: "4px",
             width: "140px", 
            border: "1px solid #cfcfcf",
            padding: "2px 6px",
            fontSize: "13px",
            background: "#fff"
          }}
        >
          <option>--</option>
        </select>
      </div>
    </div>
  )
}
