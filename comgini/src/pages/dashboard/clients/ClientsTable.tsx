import { useNavigate } from "react-router-dom";
import type { Client } from "../../../services/clients/types";

interface ClientsTableProps {
  clients: Client[];
  loading: boolean;
  onEdit?: (client: Client) => void;
  onDelete?: (id: number) => void;
}

export default function ClientsTable({ clients, loading, onEdit, onDelete }: ClientsTableProps) {
  const navigate = useNavigate();

  const handleRowClick = (id: number) => {
    navigate(`/clients/${id}`);
  };

  if (loading) {
    return (
      <div className="card shadow-sm p-5 text-center">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
        <p className="mt-2 text-muted">Fetching clients...</p>
      </div>
    );
  }

  if (clients.length === 0) {
    return (
      <div className="card shadow-sm p-5 text-center">
        <h6 className="text-muted mb-0">No clients found.</h6>
      </div>
    );
  }

  return (
    <div className="card shadow-sm">
      <div className="table-responsive">

        <table className="table align-middle mb-0" style={{ borderCollapse: "separate", borderSpacing: "0 0.5rem" }}>

          <thead className="bg-light text-muted" style={{ letterSpacing: "0.5px", fontSize: "0.75rem", textTransform: "uppercase" }}>
            <tr>
              <th className="border-0 rounded-start font-weight-bold p-3">Company Name</th>
              <th className="border-0 font-weight-bold p-3">CIN/LLPIN</th>
              <th className="border-0 font-weight-bold p-3">Email</th>
              <th className="border-0 font-weight-bold p-3">Phone</th>
              <th className="border-0 font-weight-bold p-3">Status</th>
              <th className="border-0 rounded-end font-weight-bold p-3" style={{ width: 100 }}>Actions</th>
            </tr>
          </thead>

          <tbody>
            {clients.map((item) => (
              <tr
                key={item.id}
                onClick={() => handleRowClick(item.id)}
                className="bg-white shadow-sm rounded transition-all hover-shadow"
                style={{ cursor: "pointer", transition: "all 0.2s ease-in-out" }}
                onMouseEnter={(e) => (e.currentTarget.style.transform = "translateY(-1px)") || (e.currentTarget.style.boxShadow = "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)")}
                onMouseLeave={(e) => (e.currentTarget.style.transform = "translateY(0)") || (e.currentTarget.style.boxShadow = "0 1px 2px 0 rgba(0, 0, 0, 0.05)")}
              >
                <td className="p-3 border-0 rounded-start text-dark fw-semibold">{item.name}</td>
                <td className="p-3 border-0 text-muted">{item.cin || '-'}</td>
                <td className="p-3 border-0 text-muted">{item.email}</td>
                <td className="p-3 border-0 text-muted">{item.phone}</td>
                <td className="p-3 border-0">
                  <span className={`badge rounded-pill px-3 py-2 bg-${item.status === 'active' ? 'success' : 'secondary'} bg-opacity-10 text-${item.status === 'active' ? 'success' : 'secondary'}`}>
                    {(item.status || 'inactive').toUpperCase()}
                  </span>
                </td>
                <td className="p-3 border-0 rounded-end">
                  <div className="d-flex gap-2">
                    <button
                      className="btn btn-sm btn-link p-0"
                      onClick={(e) => {
                        e.stopPropagation();
                        onEdit?.(item);
                      }}
                      title="Edit"
                    >
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
                        <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
                      </svg>
                    </button>
                    <button
                      className="btn btn-sm btn-link p-0 text-danger"
                      onClick={(e) => {
                        e.stopPropagation();
                        onDelete?.(item.id);
                      }}
                      title="Delete"
                    >
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="3 6 5 6 21 6"></polyline>
                        <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                        <line x1="10" y1="11" x2="10" y2="17"></line>
                        <line x1="14" y1="11" x2="14" y2="17"></line>
                      </svg>
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>

        </table>

      </div>
    </div>
  )
}
