import React, { useState } from "react";
import "./AddToDoModal.css";
const AddToDoModal = ({ onSave, onClose }) => {
  const [task, setTask] = useState({
    title: "",
    description: "",
  });

  const handleSave = () => {
    if (onSave) {
      onSave(task);
    }
  };

  return (
    <div className="modal-content">
      <input
        type="text"
        placeholder="Task Title"
        value={task.title}
        onChange={(e) => setTask({ ...task, title: e.target.value })}
        required
      />
      <textarea
        placeholder="Task Description"
        value={task.description}
        onChange={(e) => setTask({ ...task, description: e.target.value })}
        required
      />
      <button onClick={handleSave} className="save-button">
        Save Task
      </button>
      <button onClick={onClose} className="save-button">
        Cancel
      </button>
    </div>
  );
};

export default AddToDoModal;
