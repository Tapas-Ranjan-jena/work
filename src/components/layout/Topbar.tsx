export default function Topbar() {
  return (
    <div className="topbar">

      {/* ================= LEFT SIDE ================= */}
      <div className="topbar-left">

        {/* ⭐ LOGO SLOT */}
        <div className="topbar-logo">
          <img src="/logo.svg" alt="logo" />
        </div>

        {/* ⭐ SEARCH WITH ICON */}
        <div className="topbar-search-wrapper">
          <i className="bi bi-search search-icon"></i>
          <input
            className="topbar-search"
            placeholder="Type to search..."
          />
        </div>

      </div>

      {/* ================= RIGHT SIDE ================= */}
      <div className="topbar-right">

        {/* ⭐ Bootstrap Icons */}
        <i className="bi bi-bell topbar-icon"></i>
        <i className="bi bi-envelope topbar-icon"></i>

        <div className="topbar-profile">
          <div className="avatar">JC</div>
          <span className="profile-name">Jessie Cosenza</span>
        </div>

      </div>

    </div>
  );
}
