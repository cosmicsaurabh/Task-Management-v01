import React, { useState } from "react";
import AddToDoModal from "./AddToDoModal";
import Modal from "./Modal";
import axios from "axios";
import "./AddToDo.css";

const AddToDo = ({ tasks, setTasks, isupdated, setIsupdated }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleSave = async (newTask) => {
    const taskWithId = {
      ...newTask,
      createdat: new Date().toLocaleString(),
      status: "todo",
    };
    try {
      // Add the new task to the 'todo' list
      const response = await axios.post(`${process.env.REACT_APP_BASE_BACKEND_URL}/api/v1/tasks/new`, taskWithId);
      // const response = await axios.post("/api/v1/tasks/new", taskWithId);
      ////console.log("ADD KRNE BOLA",taskWithId," ---",isupdated)
      setIsupdated(!isupdated);
      ////console.log("ADD KRNE BOLA",taskWithId," ---",isupdated)

      // ////console.log("Response from server:", response.data);

      // Update the tasks state with the newly created task
      setTasks((prevTasks) => ({
        ...prevTasks,
        todo: [...prevTasks.todo, response.data.user], // Add the created task from the response
      }));
    } catch (error) {
      //console.log("Error creating task:", error);
    }
    setIsModalOpen(false);
  };

  return (
    <>
      {/* <button className = 'AddNewToDo-button' onClick={() => setIsModalOpen(true)}>Add Task</button>
            {isModalOpen && (
            <Modal onClose={() => setEditingTask(null)}>
                <EditTaskForm 
                    task={editingTask} 
                    onSave={handleSave} 
                    onClose={() => setIsModalOpen(false)}
                />
            </Modal>
            )} */}

      <div className="Add-task-container">
        <button
          className="AddNewToDo-button"
          onClick={() => setIsModalOpen(true)}
        >
          Add Task
        </button>
        {/* Add Task Modal */}
        {isModalOpen && (
          <Modal onClose={() => setIsModalOpen(false)}>
            <AddToDoModal
              onSave={handleSave}
              onClose={() => setIsModalOpen(false)}
            />
          </Modal>
        )}
      </div>
    </>
  );
};

export default AddToDo;
