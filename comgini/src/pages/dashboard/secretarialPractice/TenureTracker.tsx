import { useState, useEffect } from "react";
import secretarialService from "../../../services/secretarialService";

type DirectorType = "All Directors" | "Director" | "Managing Director" | "Wholetime Director" | "Independent Director" | "Additional Director";

export default function TenureTracker() {
  const [activeTab, setActiveTab] = useState<DirectorType>("All Directors");
  const [tenures, setTenures] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchTenures();
  }, []);

  const fetchTenures = async () => {
    try {
      setLoading(true);
      const res = await secretarialService.getDirectorTenures();
      setTenures(res.data || []);
    } catch (error) {
      console.error("Failed to fetch tenures", error);
    } finally {
      setLoading(false);
    }
  };

  const tabs: DirectorType[] = ["All Directors", "Director", "Managing Director", "Wholetime Director", "Independent Director", "Additional Director"];

  const filteredTenures = activeTab === "All Directors" 
    ? tenures 
    : tenures.filter(t => t.designation === activeTab);

  return (
    <div className="tenure-tracker p-2 p-md-4">
      <nav aria-label="breadcrumb" className="mb-4">
        <ol className="breadcrumb mb-0">
          <li className="breadcrumb-item small"><a href="#" className="text-decoration-none text-primary">Home</a></li>
          <li className="breadcrumb-item small active" aria-current="page">Tenure Tracker</li>
        </ol>
      </nav>

      <div className="d-flex border-bottom mb-4 overflow-auto no-scrollbar" style={{ gap: "2px", flexWrap: "nowrap", WebkitOverflowScrolling: "touch" }}>
        {tabs.map(tab => (
          <button 
            key={tab}
            className={`btn border px-4 py-2 rounded-top rounded-0 bg-white ${activeTab === tab ? "border-bottom-0 text-primary fw-semibold shadow-sm z-1" : "text-muted"}`}
            style={{ 
              fontSize: "14px", 
              borderBottom: activeTab === tab ? "2px solid #3b82f6" : "1px solid #dee2e6",
              whiteSpace: "nowrap"
            }}
            onClick={() => setActiveTab(tab)}
          >
            {tab}
          </button>
        ))}
      </div>

      <div className="card shadow-sm border-0 p-4">
        <div className="d-flex flex-column flex-md-row justify-content-between align-items-start align-items-md-center mb-3 gap-2">
          <h5 className="fw-bold mb-0" style={{ fontSize: "1.1rem" }}>{activeTab} Tracker</h5>
          <div className="text-danger small fw-semibold">
            *Quick Hint: To checkout the previous tenures of a director click on the date of appointment.
          </div>
        </div>

        <div className="d-flex flex-column flex-md-row justify-content-between align-items-start align-items-md-center mb-3 gap-3">
          <div className="d-flex align-items-center gap-2">
            <span className="small text-muted">Show</span>
            <select className="form-select form-select-sm bg-white border" style={{ width: "80px" }}>
              <option>10</option>
            </select>
            <span className="small text-muted">entries</span>
          </div>
          <div className="d-flex align-items-center gap-2 w-100 w-md-auto">
            <span className="small text-muted">Search:</span>
            <input type="text" className="form-control form-control-sm bg-white w-100" style={{ maxWidth: "200px" }} />
          </div>
        </div>

        <div className="table-responsive border rounded overflow-auto mb-3" style={{ minHeight: "200px" }}>
          <table className="table table-hover mb-0" style={{ fontSize: "13px" }}>
            <thead className="bg-secondary bg-opacity-25" style={{ whiteSpace: "nowrap" }}>
              <tr>
                <th className="px-3 py-3 text-center" style={{ width: "50px" }}># <i className="bi bi-caret-up-fill small"></i></th>
                <th className="px-3 py-3">Name of the Company <i className="bi bi-caret-down-fill small text-muted"></i></th>
                <th className="px-3 py-3">Name of {activeTab === "Managing Director" ? "MD" : activeTab === "Wholetime Director" ? "WTD" : activeTab === "Independent Director" ? "ID" : "Director"} <i className="bi bi-caret-down-fill small text-muted"></i></th>
                <th className="px-3 py-3 text-center">DIN <i className="bi bi-caret-down-fill small text-muted"></i></th>
                <th className="px-3 py-3">Date of Appointment as {activeTab === "Managing Director" ? "MD" : activeTab === "Wholetime Director" ? "WTD" : activeTab === "Independent Director" ? "ID" : "Director"} <i className="bi bi-caret-down-fill small text-muted"></i></th>
                <th className="px-3 py-3">Expiry Date <i className="bi bi-caret-down-fill small text-muted"></i></th>
                <th className="px-3 py-3">Tenure <i className="bi bi-caret-down-fill small text-muted"></i></th>
                <th className="px-3 py-3">Date of Birth <i className="bi bi-caret-down-fill small text-muted"></i></th>
                <th className="px-3 py-3">Age of Director <i className="bi bi-caret-down-fill small text-muted"></i></th>
              </tr>
            </thead>
            <tbody>
              {loading && filteredTenures.length === 0 ? (
                <tr><td colSpan={9} className="text-center py-4">Loading tenures...</td></tr>
              ) : filteredTenures.length === 0 ? (
                <tr><td colSpan={9} className="text-center py-4 text-muted opacity-75 fw-medium">No data available in table</td></tr>
              ) : (
                filteredTenures.map((t, idx) => (
                  <tr key={t.id} className="align-middle">
                    <td className="text-center">{idx + 1}</td>
                    <td>{t.company_name}</td>
                    <td className="text-primary fw-semibold">{t.name}</td>
                    <td className="text-center">{t.din}</td>
                    <td>{t.appointment_date}</td>
                    <td className={`${t.days_remaining < 0 ? "text-danger" : "text-success"} fw-medium`}>
                      {t.cessation_date || "N/A"}
                    </td>
                    <td>{t.calculated_tenure_years || t.tenure_years} Years</td>
                    <td>-</td>
                    <td>-</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        <div className="d-flex flex-column flex-sm-row justify-content-between align-items-center bg-white px-2 mt-3 gap-3">
          <div className="small text-muted order-2 order-sm-1">Showing {filteredTenures.length > 0 ? 1 : 0} to {filteredTenures.length} of {filteredTenures.length} entries</div>
          <div className="d-flex gap-0 align-items-center order-1 order-sm-2">
             <button className="btn btn-outline-secondary btn-sm px-3 rounded-start" style={{ fontSize: "12px" }}>Previous</button>
             <span className="border-top border-bottom py-1 px-3 bg-light fw-semibold" style={{ fontSize: "12px", height: "31px", display: "flex", alignItems: "center" }}>1</span>
             <button className="btn btn-outline-secondary btn-sm px-3 rounded-end" style={{ fontSize: "12px" }}>Next</button>
          </div>
        </div>

        <div className="mt-2 position-relative overflow-hidden" style={{ height: "15px", background: "#f8f9fa", borderRadius: "4px" }}>
            <div className="position-absolute bottom-0 w-100 bg-secondary opacity-25" style={{ height: "4px" }}></div>
            <div className="position-absolute bottom-0 bg-secondary" style={{ height: "4px", width: "80%", left: "10%", cursor: "pointer" }}></div>
        </div>
      </div>
    </div>
  );
}
