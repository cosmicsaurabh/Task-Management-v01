import React from "react";
import { Droppable, Draggable } from "react-beautiful-dnd";
import TaskCard from "./TaskCard";

import "./Column.css";
const Column = ({ title, tasks, onDelete, onEdit, onViewDetails }) => {
  return (
    <div className="column">
      <h2>{title}</h2>
      <Droppable droppableId={title}>
        {(provided) => (
          <div ref={provided.innerRef} {...provided.droppableProps}>
            {tasks.map((task, index) => (
              <TaskCard
                key={task.id}
                task={task}
                index={index}
                onDelete={onDelete}
                onEdit={onEdit}
                onViewDetails={onViewDetails}
              />
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </div>
  );
};

export default Column;
