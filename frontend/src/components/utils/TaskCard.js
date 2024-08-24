import React from "react";
import "./TaskCard.css";
const TaskCard = ({ index, task, onDelete, onEdit, onViewDetails }) => {
  return (
    <div className="task-card" draggable="true">
      <h3 className="card-title">{task.title}</h3>
      <p className="card-description">{task.description}</p>
      <small className="card-createdat">Created at: {task.createdat}</small>

      <div className="card-buttons">
        <button className="delete-button" onClick={() => onDelete(task._id)}>
          Delete
        </button>
        <button className="edit-button" onClick={() => onEdit(task)}>
          Edit
        </button>
        <button
          className="viewDetails-button"
          onClick={() => onViewDetails(task)}
        >
          View Details
        </button>
      </div>
    </div>
  );
};

export default TaskCard;
