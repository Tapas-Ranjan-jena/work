export default function ClientDetails() {

  return (
    <div
      style={{
        border:"1px solid #e2e2e2",
        borderRadius:"6px",
        overflow:"hidden",
        background:"#fff"
      }}
    >

      {/* ⭐ GRID TABLE */}
      <div className="client-details-grid">

        {/* ROW 1 */}
        <div className="details-row">
          <div className="details-label dark">CIN</div>
          <div className="details-value grey">U26932RJ1996PLC01246</div>

          <div className="details-label dark">Company Name</div>
          <div className="details-value grey">Ari Infratech Limited</div>
        </div>

        {/* ROW 2 */}
        <div className="details-row">
          <div className="details-label dark">Authorized Capital</div>
          <div className="details-value grey">5000000</div>

          <div className="details-label dark">Email</div>
          <div className="details-value grey">ari@arinfratech.com</div>
        </div>

        {/* ROW 3 */}
        <div className="details-row">
          <div className="details-label dark">Paid up Capital</div>
          <div className="details-value grey">5000000</div>

          <div className="details-label dark">Whether Listed</div>
          <div className="details-value grey">Unlisted</div>
        </div>

        {/* ⭐ PAN WITH PREFILL BUTTON */}
        <div className="details-row">
          <div className="details-label dark">PAN</div>

          <div className="details-value grey d-flex justify-content-between align-items-center">

            AAFCA9416Q

            <button
              style={{
                background:"linear-gradient(90deg,#3346a8,#2fa0dc)",
                color:"#fff",
                border:"none",
                borderRadius:"4px",
                fontSize:"12px",
                padding:"3px 10px"
              }}
            >
              Prefill
            </button>

          </div>

          <div className="details-label dark">TAN</div>
          <div className="details-value grey">-</div>
        </div>

        {/* ROW */}
        <div className="details-row">
          <div className="details-label dark">class of Company</div>
          <div className="details-value grey">Public</div>

          <div className="details-label dark">Status</div>
          <div className="details-value grey">Active</div>
        </div>

        {/* ⭐ FULL WIDTH ADDRESS (EXCEPTION) */}
        <div className="details-row full">
          <div className="details-label dark">Address</div>
          <div className="details-value grey" style={{gridColumn:"span 3"}}></div>
        </div>

        <div className="details-row full">
          <div className="details-label dark">
            Address where books of accounts are maintained
          </div>
          <div className="details-value grey" style={{gridColumn:"span 3"}}></div>
        </div>

      </div>

    </div>
  )
}
