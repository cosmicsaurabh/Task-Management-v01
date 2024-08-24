import React, { useState } from "react";
// import { updateTask } from '../api';
import "./EditTaskForm.css";

const EditTaskForm = ({ task, onSave }) => {
  const [title, setTitle] = useState(task.title);
  const [description, setDescription] = useState(task.description);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave({ ...task, title, description });
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="Modal-title">
        <h4>Title</h4>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>
      <div className="Modal-description">
        <h4>Description</h4>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>
      <button className="save-button" type="submit">
        Save
      </button>
    </form>
  );
};

export default EditTaskForm;
