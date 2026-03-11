import { useEffect, useState, useMemo } from 'react';
import { useOutletContext } from 'react-router-dom';
import registrationService from '../../../../../services/registrationService';
import type { ExpiringRegistration } from '../../../../../services/registrationService';

export default function DueExpiryList() {
  const { search } = useOutletContext<{ search: string }>();
  const [items, setItems] = useState<ExpiringRegistration[]>([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  useEffect(() => {
    const fetchDueExpiries = async () => {
      setLoading(true);
      try {
        const data = await registrationService.getExpiringRegistrations(30);
        setItems(data.filter(item => item.days_remaining > 0));
      } catch (error) {
        console.error("Failed to fetch due expiries", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDueExpiries();
  }, []);

  // Filter items based on search
  const filteredItems = useMemo(() => {
    if (!search) return items;
    const lowerSearch = search.toLowerCase();
    return items.filter(item =>
      item.company_name.toLowerCase().includes(lowerSearch) ||
      item.document_type.toLowerCase().includes(lowerSearch)
    );
  }, [items, search]);

  // Paginate filtered items
  const paginatedItems = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return filteredItems.slice(startIndex, startIndex + itemsPerPage);
  }, [filteredItems, currentPage]);

  const totalPages = Math.ceil(filteredItems.length / itemsPerPage);

  return (
    <div className="table-responsive border rounded mt-3">
      <table className="table table-sm table-bordered table-hover align-middle mb-0">
        <thead className="bg-light">
          <tr>
            <th className="fw-semibold">Company Name</th>
            <th className="fw-semibold">Particulars</th>
            <th className="fw-semibold">Expiry date</th>
            <th className="fw-semibold text-center">Days Remaining</th>
            <th style={{ width: 40 }}>
              <i className="bi bi-list"></i>
            </th>
          </tr>
        </thead>

        <tbody>
          {loading ? (
            <tr>
              <td colSpan={5} className="text-center py-4 text-muted">
                <div className="spinner-border spinner-border-sm text-primary me-2" role="status"></div>
                Loading...
              </td>
            </tr>
          ) : paginatedItems.length > 0 ? (
            paginatedItems.map((item, idx) => (
              <tr key={idx} className={item.days_remaining <= 7 ? 'table-danger' : item.days_remaining <= 15 ? 'table-warning' : ''}>
                <td>{item.company_name}</td>
                <td>{item.document_type}</td>
                <td>{item.expiry_date}</td>
                <td className="text-center fw-bold">{item.days_remaining}</td>
                <td className="text-center">
                  <i className="bi bi-three-dots-vertical"></i>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={5} className="text-center text-muted py-4">
                No record found{search ? ` for "${search}"` : ''}.
              </td>
            </tr>
          )}
        </tbody>
      </table>

      <div className="d-flex justify-content-between align-items-center p-2 small text-muted bg-light">
        <span>
          Showing {paginatedItems.length > 0 ? (currentPage - 1) * itemsPerPage + 1 : 0} to{" "}
          {Math.min(currentPage * itemsPerPage, filteredItems.length)} of {filteredItems.length} records
        </span>
        <div className="btn-group btn-group-sm shadow-sm">
          <button
            className="btn btn-white border px-3"
            disabled={currentPage === 1}
            onClick={() => setCurrentPage(p => p - 1)}
          >
            <i className="bi bi-chevron-left"></i>
          </button>
          <button
            className="btn btn-white border px-3"
            disabled={currentPage >= totalPages}
            onClick={() => setCurrentPage(p => p + 1)}
          >
            <i className="bi bi-chevron-right"></i>
          </button>
        </div>
      </div>
    </div>
  );
}
