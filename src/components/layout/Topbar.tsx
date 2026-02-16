export default function Topbar() {
  return (
    <div className="topbar">

      {/* ================= LEFT SIDE ================= */}
      <div className="topbar-left">

        {/* LOGO */}
        <div className="topbar-logo">
          <img src="../../assets/comgini-logo-nav.jpg" alt="logo" />
        </div>

        {/* SEARCH */}
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

        {/* ICONS */}
        <div className="topbar-icon-circle">
          <i className="bi bi-bell"></i>
        </div>

        <div className="topbar-icon-circle">
          <i className="bi bi-envelope"></i>
        </div>

        {/* ⭐ WHITE DIVIDER */}
        <div className="topbar-divider"></div>

        {/* PROFILE */}
        <div className="topbar-profile">
          <div className="avatar">JC</div>
          <span className="profile-name">Jessie Cosenza</span>
        </div>

      </div>

    </div>
  );
}
