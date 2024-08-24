import React, { useState } from "react";
import Modal from "./Modal";
import "./ViewDetailsModal.css";
const ViewDetailsModal = ({ task, onClose }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <Modal onClose={onClose}>
      <div className="view-details-modal">
        <h2>Task Details</h2>
        <p>
          <strong>Title:</strong> {task.title}
        </p>
        <p>
          <strong>Description:</strong> {task.description}
        </p>
        <p>
          <strong>Created At:</strong> {task.createdat}
        </p>
        <button className="save-button" onClick={onClose}>
          Close
        </button>
      </div>
    </Modal>
  );
};

export default ViewDetailsModal;
