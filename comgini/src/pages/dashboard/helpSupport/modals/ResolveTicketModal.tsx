import React, { useState } from "react";
import toast from "react-hot-toast";
import supportService from "../../../../services/supportService";

interface ResolveTicketModalProps {
  show: boolean;
  onHide: () => void;
  ticketId: number | null;
  onSuccess: () => void;
}

export default function ResolveTicketModal({ show, onHide, ticketId, onSuccess }: ResolveTicketModalProps) {
  const [notes, setNotes] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!ticketId) return;
    if (!notes.trim()) {
      toast.error("Please enter resolution notes");
      return;
    }

    setIsLoading(true);
    try {
      const res = await supportService.resolveTicket(ticketId, {
        status: 'resolved',
        resolution_notes: notes
      });
      if (res.success) {
        toast.success("Ticket resolved successfully");
        onSuccess();
        onHide();
      } else {
        toast.error("Failed to resolve ticket");
      }
    } catch (err) {
      console.error(err);
      toast.error("An error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  if (!show) return null;

  return (
    <>
      <div 
        className="modal fade show d-block" 
        tabIndex={-1} 
        style={{ zIndex: 1050 }}
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content border-0 shadow">
            <div className="modal-header py-2">
              <h6 className="modal-title fw-semibold">Resolve Ticket #{ticketId}</h6>
              <button type="button" className="btn-close" onClick={onHide} disabled={isLoading}></button>
            </div>
            <div className="modal-body p-4">
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label className="form-label fw-semibold small">Resolution Notes</label>
                  <textarea 
                    className="form-control form-control-sm" 
                    rows={4} 
                    required
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    placeholder="Enter what was done to fix the issue..."
                  ></textarea>
                </div>
                <div className="d-flex justify-content-end gap-2">
                  <button type="button" className="btn btn-sm btn-light border" onClick={onHide} disabled={isLoading}>Cancel</button>
                  <button type="submit" className="btn btn-sm btn-success px-3" disabled={isLoading}>
                    {isLoading ? "Saving..." : "Confirm Resolve"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      <div className="modal-backdrop fade show" style={{ zIndex: 1040 }} onClick={onHide}></div>
    </>
  );
}
