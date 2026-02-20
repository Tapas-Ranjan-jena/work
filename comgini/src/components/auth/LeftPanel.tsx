export default function LeftPanel() {
  return (
    <div
      className="
        col-lg-6
        d-none d-lg-flex
        text-white
        flex-column
        justify-content-between
        left-panel
      "
    >
      {/* TOP CONTENT */}
      <div>

        {/* LOGO */}
        <h4 className="fw-bold logo-text">
          COMGINI
        </h4>

        {/* HEADING */}
        <h2 className="panel-heading mt-5">
          Stay Compliant. <br /> Stay Relaxed.
        </h2>

        {/* FEATURES */}
        <ul className="panel-features mt-4">
          <li>ROC Filing</li>
          <li>GST Compliance</li>
          <li>Income Tax</li>
          <li>Audits & Certifications</li>
        </ul>

      </div>

      {/* FOOTER */}
      <small className="panel-footer">
        © 2025 All Rights Reserved
      </small>
    </div>
  )
}
