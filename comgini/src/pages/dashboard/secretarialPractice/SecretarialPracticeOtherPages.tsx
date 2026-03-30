export const PlaceholderPage = ({ title }: { title: string }) => (
  <div className="p-4 bg-white shadow-sm rounded text-start">
    <h5 className="fw-bold mb-3">{title}</h5>
    <div className="alert alert-info py-4 text-center">
      <i className="bi bi-info-circle me-2"></i> This page is currently under development.
    </div>
  </div>
);
