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
    <div className="notification-settings text-start">
      <h5 className="fw-bold mb-4">Notification Settings</h5>
      
      <div className="card shadow-sm border-0">
        <div className="card-header bg-white border-bottom p-2 d-flex flex-column flex-md-row justify-content-between align-items-stretch align-items-md-center gap-3">
          <div className="d-flex align-items-center gap-2">
            <select className="form-select form-select-sm" style={{ width: "75px" }}>
              <option value="100">100</option>
              <option value="50">50</option>
            </select>
            <button className="btn btn-sm btn-light border p-1 px-2 shadow-none"><i className="bi bi-eye-slash"></i></button>
          </div>
          
          <div className="d-flex flex-column flex-sm-row align-items-stretch align-items-sm-center gap-2">
             <select className="form-select form-select-sm py-2 px-3" style={{ minWidth: "150px" }}>
              <option value="">- Category -</option>
              <option value="Assignment">Assignment</option>
              <option value="Client">Client</option>
            </select>
            <div className="position-relative flex-grow-1">
              <input type="text" className="form-control form-control-sm ps-3 pe-4 py-2" placeholder="Search" style={{ minWidth: "180px", background: "#fff" }} />
              <i className="bi bi-search position-absolute end-0 top-50 translate-middle-y me-2 text-muted" style={{ fontSize: "12px" }}></i>
            </div>
          </div>
        </div>

        <div className="table-responsive border rounded-bottom overflow-auto">
          <table className="table table-hover align-middle mb-0" style={{ fontSize: "13.5px" }}>
            <thead className="table-light">
              <tr className="text-nowrap">
                <th className="fw-semibold px-3 py-3" style={{ minWidth: "220px" }}>Event</th>
                <th className="fw-semibold px-3" style={{ minWidth: "150px" }}>Notify to</th>
                <th className="fw-semibold px-3" style={{ minWidth: "130px" }}>Category</th>
                <th className="fw-semibold text-center px-3" style={{ minWidth: "120px" }}>Enable email</th>
                <th className="fw-semibold text-center px-3" style={{ minWidth: "120px" }}>Enable web</th>
                <th className="fw-semibold text-center px-3" style={{ width: "60px", minWidth: "60px" }}><i className="bi bi-list"></i></th>
              </tr>
            </thead>
            <tbody>
              {events.map((e) => (
                <tr key={e.id} className="text-nowrap">
                  <td className="px-3 py-3 text-dark fw-medium">{e.event}</td>
                  <td className="px-3 text-muted">—</td>
                  <td className="px-3 text-muted">{e.category}</td>
                  <td className="text-center px-3">
                    <div 
                      className={`status-circle mx-auto ${e.enableEmail ? "active shadow-sm" : ""}`}
                      onClick={() => toggleStatus(e.id, 'email')}
                    >
                      <i className="bi bi-check-lg" style={{ display: e.enableEmail ? 'block' : 'none' }}></i>
                    </div>
                  </td>
                  <td className="text-center px-3">
                    <div 
                      className={`status-circle mx-auto ${e.enableWeb ? "active shadow-sm" : ""}`}
                      onClick={() => toggleStatus(e.id, 'web')}
                    >
                      <i className="bi bi-check-lg" style={{ display: e.enableWeb ? 'block' : 'none' }}></i>
                    </div>
                  </td>
                  <td className="text-center px-3">
                    <button className="btn btn-sm text-secondary border-0 p-1"><i className="bi bi-pencil-square fs-6"></i></button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <style>{`
        .status-circle {
          width: 24px;
          height: 24px;
          border-radius: 50%;
          border: 1.5px solid #cbd5e1;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          color: transparent;
          transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1);
          background: #fff;
        }
        .status-circle:hover {
           border-color: #3346a8;
           background: #f8fafc;
        }
        .status-circle.active {
          background-color: #3b82f6;
          border-color: #3b82f6;
          color: #fff;
        }
        ::-webkit-scrollbar { height: 6px; }
        ::-webkit-scrollbar-thumb { background: #cbd5e1; border-radius: 10px; }
        .table-responsive { scrollbar-gutter: stable; }
      `}</style>
    </div>
  );
}
