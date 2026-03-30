import React, { useState } from "react";
import toast from "react-hot-toast";
import supportService from "../../../../services/supportService";

interface AddTicketModalProps {
  show: boolean;
  onHide: () => void;
  onSuccess: () => void;
}

export default function AddTicketModal({ show, onHide, onSuccess }: AddTicketModalProps) {
  const [formData, setFormData] = useState({
    subject: "",
    category: "bug",
    priority: "low",
    description: "",
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.subject || !formData.description) {
      toast.error("Please fill all required fields");
      return;
    }

    setIsLoading(true);
    try {
      const res = await supportService.createTicket(formData);
      if (res.success) {
        toast.success("Ticket raised successfully");
        onSuccess();
        onHide();
      } else {
        toast.error("Failed to raise ticket");
      }
    } catch (err) {
      console.error(err);
      toast.error("An error occurred while raising the ticket");
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
        role="dialog"
        style={{ zIndex: 1050 }}
      >
        <div className="modal-dialog modal-lg modal-dialog-centered" role="document">
          <div className="modal-content border-0 shadow">
            <div className="modal-header border-bottom py-2 d-flex justify-content-between align-items-center">
              <h6 className="modal-title fw-semibold mx-auto">Add Ticket</h6>
              <button 
                type="button" 
                className="btn-close ms-0" 
                onClick={onHide}
                disabled={isLoading}
              ></button>
            </div>
            <div className="modal-body p-4">
              <form onSubmit={handleSubmit}>
                {/* Subject */}
                <div className="row mb-3 align-items-center">
                  <div className="col-md-5">
                    <label className="fw-semibold" style={{ fontSize: "14px" }}>
                      Subject <span className="text-danger">*</span>
                    </label>
                  </div>
                  <div className="col-md-7">
                    <input
                      type="text"
                      className="form-control form-control-sm"
                      required
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    />
                  </div>
                </div>

                {/* Category */}
                <div className="row mb-3 align-items-center">
                  <div className="col-md-5">
                    <label className="fw-semibold" style={{ fontSize: "14px" }}>
                      Category
                    </label>
                  </div>
                  <div className="col-md-7">
                    <select
                      className="form-select form-select-sm"
                      value={formData.category}
                      onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    >
                      <option value="bug">Bug</option>
                      <option value="feature">Feature Request</option>
                      <option value="improvement">Improvement</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                </div>

                {/* Priority */}
                <div className="row mb-3 align-items-center">
                  <div className="col-md-5">
                    <label className="fw-semibold" style={{ fontSize: "14px" }}>
                      Priority
                    </label>
                  </div>
                  <div className="col-md-7">
                    <select
                      className="form-select form-select-sm"
                      value={formData.priority}
                      onChange={(e) => setFormData({ ...formData, priority: e.target.value })}
                    >
                      <option value="low">Low</option>
                      <option value="medium">Medium</option>
                      <option value="high">High</option>
                      <option value="critical">Critical</option>
                    </select>
                  </div>
                </div>

                {/* Description */}
                <div className="row mb-4 align-items-start">
                  <div className="col-md-5">
                    <label className="fw-semibold mt-1" style={{ fontSize: "14px" }}>
                      Description <span className="text-danger">*</span>
                    </label>
                  </div>
                  <div className="col-md-7">
                    <textarea
                      className="form-control form-control-sm"
                      rows={4}
                      required
                      value={formData.description}
                      onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    ></textarea>
                  </div>
                </div>

                {/* Submit */}
                <div className="d-flex justify-content-start">
                  <button
                    type="submit"
                    className="btn btn-primary px-4"
                    disabled={isLoading}
                    style={{
                      background: "#1f3b8a", 
                      borderColor: "#1f3b8a",
                      borderRadius: "4px",
                      fontSize: "14px"
                    }}
                  >
                    {isLoading ? "Submitting..." : "Submit"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      {/* Modal Backdrop */}
      <div 
        className="modal-backdrop fade show" 
        style={{ zIndex: 1040 }}
        onClick={onHide}
      ></div>
    </>
  );
}
