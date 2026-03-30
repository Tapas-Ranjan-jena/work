import { useState } from "react";

interface NotificationEvent {
  id: number;
  event: string;
  category: string;
  enableEmail: boolean;
  enableWeb: boolean;
}

export default function NotificationSettings() {
  const [events, setEvents] = useState<NotificationEvent[]>([
    { id: 1, event: "Assignment task created", category: "Assignment", enableEmail: true, enableWeb: true },
    { id: 2, event: "Assignment task updated", category: "Assignment", enableEmail: true, enableWeb: true },
    { id: 3, event: "Assignment task assigned", category: "Assignment", enableEmail: true, enableWeb: true },
    { id: 4, event: "Assignment task started", category: "Assignment", enableEmail: true, enableWeb: true },
    { id: 5, event: "Assignment task finished", category: "Assignment", enableEmail: true, enableWeb: true },
    { id: 6, event: "Assignment task reopened", category: "Assignment", enableEmail: true, enableWeb: true },
    { id: 7, event: "Assignment task deleted", category: "Assignment", enableEmail: true, enableWeb: true },
    { id: 8, event: "Assignment task commented", category: "Assignment", enableEmail: true, enableWeb: true },
    { id: 9, event: "Assignment comment added", category: "Assignment", enableEmail: true, enableWeb: true },
    { id: 10, event: "Assignment comment replied", category: "Assignment", enableEmail: true, enableWeb: true },
    { id: 11, event: "Client signup", category: "Client", enableEmail: true, enableWeb: true },
  ]);

  const toggleStatus = (id: number, type: 'email' | 'web') => {
    setEvents(events.map(e => {
      if (e.id === id) {
        return {
          ...e,
          enableEmail: type === 'email' ? !e.enableEmail : e.enableEmail,
          enableWeb: type === 'web' ? !e.enableWeb : e.enableWeb
        };
      }
      return e;
    }));
  };

  return (
    <div className="notification-settings">
      <h5 className="fw-bold mb-4">Notification Settings</h5>
      
      <div className="card shadow-sm border-0">
        <div className="card-header bg-white border-bottom p-3 d-flex justify-content-between align-items-center">
          <div className="d-flex align-items-center gap-2">
            <select className="form-select form-select-sm" style={{ width: "70px" }}>
              <option value="100">100</option>
              <option value="50">50</option>
            </select>
            <button className="btn btn-sm btn-light border p-1 px-2"><i className="bi bi-eye-slash"></i></button>
          </div>
          <div className="d-flex align-items-center gap-3">
             <select className="form-select form-select-sm" style={{ width: "150px" }}>
              <option value="">- Category -</option>
              <option value="Assignment">Assignment</option>
              <option value="Client">Client</option>
            </select>
            <div className="position-relative">
              <input type="text" className="form-control form-control-sm ps-3 pe-4" placeholder="Search" style={{ width: "200px" }} />
              <i className="bi bi-search position-absolute end-0 top-50 translate-middle-y me-2 text-muted" style={{ fontSize: "12px" }}></i>
            </div>
          </div>
        </div>
        <div className="table-responsive">
          <table className="table table-hover align-middle mb-0" style={{ fontSize: "13px" }}>
            <thead className="table-light">
              <tr>
                <th className="fw-semibold px-3">Event</th>
                <th className="fw-semibold">Notify to</th>
                <th className="fw-semibold">Category</th>
                <th className="fw-semibold text-center">Enable email</th>
                <th className="fw-semibold text-center">Enable web</th>
                <th className="fw-semibold text-center"><i className="bi bi-list"></i></th>
              </tr>
            </thead>
            <tbody>
              {events.map((e) => (
                <tr key={e.id}>
                  <td className="px-3 text-dark">{e.event}</td>
                  <td></td>
                  <td className="text-muted">{e.category}</td>
                  <td className="text-center">
                    <div 
                      className={`status-circle mx-auto ${e.enableEmail ? "active" : ""}`}
                      onClick={() => toggleStatus(e.id, 'email')}
                    >
                      <i className="bi bi-check-lg"></i>
                    </div>
                  </td>
                  <td className="text-center">
                    <div 
                      className={`status-circle mx-auto ${e.enableWeb ? "active" : ""}`}
                      onClick={() => toggleStatus(e.id, 'web')}
                    >
                      <i className="bi bi-check-lg"></i>
                    </div>
                  </td>
                  <td className="text-center">
                    <button className="btn btn-sm text-secondary p-0"><i className="bi bi-pencil-square"></i></button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <style>{`
        .status-circle {
          width: 20px;
          height: 20px;
          border-radius: 50%;
          border: 1px solid #dee2e6;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          color: transparent;
          transition: all 0.2s;
        }
        .status-circle.active {
          background-color: #f1f3f5;
          color: #adb5bd;
        }
      `}</style>
    </div>
  );
}
