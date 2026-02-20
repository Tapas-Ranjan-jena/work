import { useNavigate } from "react-router-dom"

type Props = {
  onMenuClick?: () => void
}

export default function PageTopBar({ onMenuClick }: Props) {

  const navigate = useNavigate()

  return (
    <div
      className="d-flex justify-content-between align-items-center mb-3"
      style={{
        background: "#f1f3f5",
        padding: "10px 12px",
        borderRadius: "6px"
      }}
    >

      {/* ⭐ LEFT MENU BUTTON */}
      <button
        onClick={onMenuClick}
        className="btn btn-sm"
        style={{
          width: "36px",
          height: "36px",
          background: "#43ADE2"
        }}
      >
        <i className="bi bi-list"></i>
      </button>

      {/* ⭐ RIGHT DASHBOARD BUTTON */}
      <button
        onClick={() => navigate("/dashboard")}
        className="btn btn-sm d-flex align-items-center gap-2"
        style={{
          background: "#2E388E",
          color: "white"
        }}
      >
        <i className="bi bi-display"></i>
        Dashboard
      </button>

    </div>
  )
}
