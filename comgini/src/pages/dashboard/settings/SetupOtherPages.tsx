
const PlaceholderPage = ({ title }: { title: string }) => (
  <div className="p-4">
    <h5 className="fw-bold mb-4">{title}</h5>
    <div className="card shadow-sm border-0 p-5 text-center">
      <div className="text-muted">
        <i className="bi bi-gear-wide-connected" style={{ fontSize: "48px" }}></i>
        <p className="mt-3">The {title} settings page is under construction.</p>
      </div>
    </div>
  </div>
);

export const SetupCompanyFirm = () => <PlaceholderPage title="Company / Firm" />;
