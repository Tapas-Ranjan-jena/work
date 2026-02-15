export default function DashboardHome() {

  // ⭐ Dummy stats (later replace with API data)
  const stats = [
    { title: "Total Clients", value: 128 },
    { title: "Pending Compliance", value: 23 },
    { title: "Completed Tasks", value: 342 },
    { title: "Active Users", value: 14 }
  ]

  return (
    <div className="container-fluid">

      {/* ================= HEADER ================= */}
      <div className="mb-4">
        <h4 className="fw-bold mb-1">Dashboard</h4>
        <p className="text-muted small">
          Welcome back! Here’s an overview of your workspace.
        </p>
      </div>

      {/* ================= STAT CARDS ================= */}
      <div className="row g-3 mb-4">

        {stats.map((item, index) => (
          <div key={index} className="col-12 col-sm-6 col-lg-3">

            <div className="card shadow-sm border-0 h-100">
              <div className="card-body">

                <p className="text-muted small mb-1">
                  {item.title}
                </p>

                <h4 className="fw-bold mb-0">
                  {item.value}
                </h4>

              </div>
            </div>

          </div>
        ))}

      </div>

      {/* ================= QUICK ACTIONS ================= */}
      <div className="row g-3">

        <div className="col-lg-6">
          <div className="card shadow-sm h-100">
            <div className="card-body">

              <h6 className="fw-bold mb-3">
                Recent Activity
              </h6>

              <ul className="list-group list-group-flush small">
                <li className="list-group-item">
                  New client added
                </li>
                <li className="list-group-item">
                  Compliance task updated
                </li>
                <li className="list-group-item">
                  Profile updated
                </li>
              </ul>

            </div>
          </div>
        </div>

        <div className="col-lg-6">
          <div className="card shadow-sm h-100">
            <div className="card-body">

              <h6 className="fw-bold mb-3">
                Quick Actions
              </h6>

              <div className="d-flex flex-wrap gap-2">
                <button className="btn btn-primary btn-sm">
                  Add Client
                </button>

                <button className="btn btn-outline-secondary btn-sm">
                  View Reports
                </button>

                <button className="btn btn-outline-secondary btn-sm">
                  Settings
                </button>
              </div>

            </div>
          </div>
        </div>

      </div>

    </div>
  )
}
