import { useEffect, useState } from 'react';
import registrationService from '../../services/registrationService';
import type { ExpiringRegistration } from '../../services/registrationService';

export default function ExpiringRegistrations() {
    const [expiringItems, setExpiringItems] = useState<ExpiringRegistration[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchExpiring = async () => {
            try {
                const data = await registrationService.getExpiringRegistrations(30);
                setExpiringItems(data);
            } catch (error) {
                console.error('Failed to fetch expiring registrations', error);
            } finally {
                setIsLoading(false);
            }
        };
        fetchExpiring();
    }, []);

    const getRowClass = (days: number) => {
        if (days <= 7) return 'table-danger';
        if (days <= 30) return 'table-warning';
        return '';
    };

    if (isLoading) return <div className="text-center p-3 small text-muted">Loading expiring registrations...</div>;

    return (
        <div className="mt-4">
            <h6 className="fw-bold mb-3">Expiring Registrations</h6>
            <div className="table-responsive border rounded">
                <table className="table table-sm table-bordered align-middle mb-0" style={{ fontSize: '0.85rem' }}>
                    <thead className="table-light">
                        <tr>
                            <th>Company Name</th>
                            <th>Document Type</th>
                            <th>Document Number</th>
                            <th>Expiry Date</th>
                            <th>Days Remaining</th>
                        </tr>
                    </thead>
                    <tbody>
                        {expiringItems.length === 0 ? (
                            <tr>
                                <td colSpan={5} className="text-center py-3 text-muted">No expiring items found.</td>
                            </tr>
                        ) : (
                            expiringItems.map((item, index) => (
                                <tr key={index} className={getRowClass(item.days_remaining)}>
                                    <td>{item.company_name}</td>
                                    <td>{item.document_type}</td>
                                    <td>{item.document_number}</td>
                                    <td>{new Date(item.expiry_date).toLocaleDateString()}</td>
                                    <td className="fw-semibold">{item.days_remaining} Days</td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
