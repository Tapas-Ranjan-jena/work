import React, { useState } from "react";
import { Modal } from "react-bootstrap";

interface AddTicketModalProps {
  show: boolean;
  onHide: () => void;
}

export default function AddTicketModal({ show, onHide }: AddTicketModalProps) {
  const [weblink, setWeblink] = useState("");
  const [description, setDescription] = useState("");
  const [expectedSolution, setExpectedSolution] = useState("");
  const [file, setFile] = useState<File | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // API logic will go here
    onHide();
  };

  return (
    <Modal show={show} onHide={onHide} centered size="lg">
      <Modal.Header closeButton className="border-bottom py-2">
        <Modal.Title className="fs-5 fw-semibold mx-auto">Add Ticket</Modal.Title>
      </Modal.Header>
      <Modal.Body className="p-4">
        <form onSubmit={handleSubmit}>
          {/* Weblink */}
          <div className="row mb-3 align-items-center">
            <div className="col-md-5">
              <label className="fw-semibold" style={{ fontSize: "14px" }}>
                Weblink of the page where issue found
              </label>
            </div>
            <div className="col-md-7">
              <input
                type="text"
                className="form-control form-control-sm"
                value={weblink}
                onChange={(e) => setWeblink(e.target.value)}
              />
            </div>
          </div>

          {/* Description */}
          <div className="row mb-3 align-items-center">
            <div className="col-md-5">
              <label className="fw-semibold" style={{ fontSize: "14px" }}>
                Description of Issue
              </label>
            </div>
            <div className="col-md-7">
              <input
                type="text"
                className="form-control form-control-sm"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>
          </div>

          {/* Solution Expected */}
          <div className="row mb-3 align-items-center">
            <div className="col-md-5">
              <label className="fw-semibold" style={{ fontSize: "14px" }}>
                Solution Expected
              </label>
            </div>
            <div className="col-md-7">
              <input
                type="text"
                className="form-control form-control-sm"
                value={expectedSolution}
                onChange={(e) => setExpectedSolution(e.target.value)}
              />
            </div>
          </div>

          {/* Supporting Documents */}
          <div className="row mb-4 align-items-center">
            <div className="col-md-5">
              <label className="fw-semibold" style={{ fontSize: "14px" }}>
                Supporting Documents (if any)
              </label>
            </div>
            <div className="col-md-7">
              <input
                type="file"
                className="form-control-file border p-1 rounded w-100"
                style={{ fontSize: "13px" }}
                onChange={(e) => setFile(e.target.files ? e.target.files[0] : null)}
              />
            </div>
          </div>

          {/* Submit */}
          <div>
            <button
              type="submit"
              className="btn btn-primary px-4"
              style={{
                background: "#1f3b8a", // Matching the dark blue submit button in screenshot
                borderColor: "#1f3b8a",
                borderRadius: "4px",
                fontSize: "14px"
              }}
            >
              Submit
            </button>
          </div>
        </form>
      </Modal.Body>
    </Modal>
  );
}
