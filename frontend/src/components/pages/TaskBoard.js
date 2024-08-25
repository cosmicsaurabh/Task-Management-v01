import React, { useState, useEffect } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import TaskCard from "../utils/TaskCard";
import Modal from "../utils/Modal";
import EditTaskForm from "../utils/EditTaskForm";
import AddToDo from "../utils/AddToDo";
import SearchBar from "../SearchBar";
import ViewDetailsModal from "../utils/ViewDetailsModal";
import axios from "axios";
import "./TaskBoard.css";
import "../utils/Column.css";


const initialTasks = {
  todo: [],
  inprogress: [],
  done: [],
};
const TaskBoard = () => {
  const [tasks, setTasks] = useState(initialTasks);
  const [editingTask, setEditingTask] = useState(null);
  const [viewingTask, setViewingTask] = useState(null);
  const [isupdated, setIsupdated] = useState(false);
  // ////console.log("i ama ta first ",tasks);

  const fetchAllUsers = async () => {
    try {
      const { data } = await axios.get(`${process.env.REACT_APP_BASE_BACKEND_URL}/api/v1/tasks`);
      ////console.log("Fetched tasks:", data.taskss); // Add this line for debugging
      return data.taskss;
    } catch (error) {
      //console.log("Error fetching taskss:", error);
      return [];
    }
  };

  // ////console.log("i am after fetch all taskss ");
  const setFun = async () => {
    const taskss = await fetchAllUsers();
    ////console.log("Tasks before filtering:", taskss); // Add this line for debugging
    const todo = taskss.filter((user) => user.status === "todo");
    const inprogress = taskss.filter((user) => user.status === "inprogress");
    const done = taskss.filter((user) => user.status === "done");
    ////console.log("Filtered tasks:", { todo, inprogress, done }); // Add this line for debugging

    setTasks({ todo, inprogress, done });
  };

  useEffect(() => {
    setFun();
  }, [isupdated]);
  ////////////////////////////////////
  const onDragEnd = async (result) => {
    const { source, destination } = result;

    if (
      !destination ||
      (source.droppableId === destination.droppableId &&
        source.index === destination.index)
    ) {
      return;
    }

    const sourceItems = Array.from(tasks[source.droppableId]);
    const destinationItems = Array.from(tasks[destination.droppableId]);

    const [movedTask] = sourceItems.splice(source.index, 1);

    if (source.droppableId === destination.droppableId) {
      // sourceItems.splice(destination.index, 0, movedTask);
      // setTasks(prevTasks => ({
      //     ...prevTasks,
      //     [source.droppableId]: sourceItems,
      // }));
    } else {
      // If the columns are different, move the task and update its status
      movedTask.status = destination.droppableId;
      destinationItems.splice(destination.index, 0, movedTask);

      setTasks((prevTasks) => ({
        ...prevTasks,
        [source.droppableId]: sourceItems,
        [destination.droppableId]: destinationItems,
      }));
    }
    await handleUpdate(movedTask);
  };

  const handleDelete = async (taskid) => {
    await axios.delete(`${process.env.REACT_APP_BASE_BACKEND_URL}/api/v1/tasks/delete/${taskid}`);

    setIsupdated(!isupdated);
  };

  const handleUpdate = async (updatedTask) => {
    // ////console.log(updatedTask.status)
    try {
      const idd = updatedTask._id;
      await axios.put(`${process.env.REACT_APP_BASE_BACKEND_URL}/api/v1/tasks/edit/${idd}`, {
        title: updatedTask.title,
        description: updatedTask.description,
        status: updatedTask.status,
      });

      setEditingTask(null);
    } catch (error) {
      //console.log("Error updating task:", error);
    }
    //BCS IO HAVE ALREADY CHANGE THE UI
    setIsupdated(!isupdated);
  };

  const handleView = (task) => {
    setViewingTask(task); // Open the modal with task details
  };
  const closeModal = () => {
    setViewingTask(null); // Close the modal
  };
  // ////console.log("i am at last  ", tasks)

  return (
    <div className="Mainpage-container">
      <AddToDo
        tasks={tasks}
        setTasks={setTasks}
        isupdated={isupdated}
        setIsupdated={setIsupdated}
        className=""
      />

      {editingTask && (
        <Modal onClose={() => setEditingTask(null)}>
          <EditTaskForm task={editingTask} onSave={handleUpdate} />
        </Modal>
      )}
      {viewingTask && (
        <ViewDetailsModal task={viewingTask} onClose={closeModal} />
      )}

      <SearchBar />
      <DragDropContext onDragEnd={onDragEnd}>
        <div className="task-board">
          <Droppable droppableId="todo">
            {(provided) => (
              <div
                className="column"
                ref={provided.innerRef}
                {...provided.droppableProps}
              >
                <h2 className="column-heading">TODO</h2>
                {tasks.todo.map((task, index) =>
                  task ? (
                    <Draggable
                      key={task._id}
                      draggableId={task._id}
                      index={index}
                    >
                      {(provided) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                        >
                          <TaskCard
                            task={task}
                            onDelete={handleDelete}
                            onEdit={() => setEditingTask(task)}
                            onViewDetails={handleView}
                          />
                        </div>
                      )}
                    </Draggable>
                  ) : null,
                )}
                {provided.placeholder}
              </div>
            )}
          </Droppable>

          <Droppable droppableId="inprogress">
            {(provided) => (
              <div
                className="column"
                ref={provided.innerRef}
                {...provided.droppableProps}
              >
                <h2 className="column-heading">IN PROGRESS</h2>
                {tasks.inprogress.map((task, index) => (
                  <Draggable
                    key={task._id}
                    draggableId={task._id}
                    index={index}
                  >
                    {(provided) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                      >
                        <TaskCard
                          task={task}
                          onDelete={handleDelete}
                          onEdit={() => setEditingTask(task)}
                          onViewDetails={handleView}
                        />
                      </div>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>

          <Droppable droppableId="done">
            {(provided) => (
              <div
                className="column"
                ref={provided.innerRef}
                {...provided.droppableProps}
              >
                <h2 className="column-heading">DONE</h2>
                {tasks.done.map((task, index) => (
                  <Draggable
                    key={task._id}
                    draggableId={task._id}
                    index={index}
                  >
                    {(provided) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                      >
                        <TaskCard
                          task={task}
                          onDelete={handleDelete}
                          onEdit={() => setEditingTask(task)}
                          onViewDetails={handleView}
                        />
                      </div>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </div>
      </DragDropContext>
    </div>
  );
};

export default TaskBoard;
