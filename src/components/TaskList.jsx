import React, { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import { FaTrash, FaEdit, FaCheckCircle, FaTrashRestore } from "react-icons/fa"; // Import icons from react-icons

const TaskList = () => {
  const [incomplete, setIncomplete] = useState([]);
  const [complete, setComplete] = useState([]);
  const [deleted, setDeleted] = useState([]);
  const [newTask, setNewTask] = useState("");

  const handleAddTask = () => {
    if (newTask.trim() !== "") {
      setIncomplete((prev) => [...prev, { id: uuidv4(), content: newTask }]);
      setNewTask("");
    }
  };

  const handleEditTask = (id, newContent) => {
    const updatedTasks = incomplete.map((item) =>
      item?.id === id ? { ...item, content: newContent } : item
    );
    setIncomplete(updatedTasks);
  };

  const handleDeleteTask = (id) => {
    const taskToDelete = incomplete.find((item) => item?.id === id);
    setDeleted((prev) => [...prev, taskToDelete]);
    setIncomplete((prev) => prev.filter((item) => item?.id !== id));
  };

  const handleDeleteCompletedTask = (id) => {
    const taskToDelete = complete.find((item) => item?.id === id);
    setDeleted((prev) => [...prev, taskToDelete]);
    setComplete((prev) => prev.filter((item) => item?.id !== id));
  };

  const handleEditCompletedTask = (id, newContent) => {
    const updatedTasks = complete.map((item) =>
      item?.id === id ? { ...item, content: newContent } : item
    );
    setComplete(updatedTasks);
  };

  const handleRestoreTask = (id) => {
    const taskToRestore = deleted.find((item) => item?.id === id);
    setIncomplete((prev) => [...prev, taskToRestore]);
    setDeleted((prev) => prev.filter((item) => item?.id !== id));
  };

  useEffect(() => {
    try {
      const storedIncomplete = JSON.parse(localStorage.getItem("incomplete"));
      const storedComplete = JSON.parse(localStorage.getItem("complete"));
      const storedDeleted = JSON.parse(localStorage.getItem("deleted"));

      if (storedIncomplete) {
        setIncomplete(storedIncomplete);
      }
      if (storedComplete) {
        setComplete(storedComplete);
      }
      if (storedDeleted) {
        setDeleted(storedDeleted);
      }
    } catch (error) {
      console.error("Error parsing data from localStorage: ", error);
      localStorage.removeItem("incomplete");
      localStorage.removeItem("complete");
      localStorage.removeItem("deleted");
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("incomplete", JSON.stringify(incomplete));
    localStorage.setItem("complete", JSON.stringify(complete));
    localStorage.setItem("deleted", JSON.stringify(deleted));
  }, [incomplete, complete, deleted]);

  const handleOnDragEnd = (result) => {
    const { source, destination } = result;

    if (!destination) {
      return;
    }

    const item =
      source.droppableId === "incomplete"
        ? incomplete[source.index]
        : complete[source.index];

    if (destination.droppableId === "complete") {
      setComplete((prev) => [...prev, item]);
      if (source.droppableId === "incomplete") {
        setIncomplete((prev) => prev.filter((_, index) => index !== source.index));
      } else if (source.droppableId === "deleted") {
        setDeleted((prev) => prev.filter((_, index) => index !== source.index));
      }
    } else if (destination.droppableId === "deleted") {
      setDeleted((prev) => [...prev, item]);
      if (source.droppableId === "incomplete") {
        setIncomplete((prev) => prev.filter((_, index) => index !== source.index));
      } else if (source.droppableId === "complete") {
        setComplete((prev) => prev.filter((_, index) => index !== source.index));
      }
    }
  };

  return (
    <div className="p-4 sm:p-8 md:p-16 lg:p-20">
      <div className="flex flex-col items-center mt-8 sm:flex-row sm:justify-center">
        <input
          type="text"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          className="border border-gray-300 rounded-md p-2 w-full sm:w-auto"
          placeholder="Add a new task"
        />
        <button
          onClick={handleAddTask}
          className="bg-custom-blue ml-4 hover:bg-blue-500 text-white py-2 px-4 m-4 rounded font-semibold"
        >
          Add Task
        </button>
      </div>
      <DragDropContext onDragEnd={handleOnDragEnd}>
        <div className="flex flex-col sm:flex-row justify-center space-x-0 sm:space-x-4 mt-8">
          <Droppable droppableId="incomplete">
            {(provided) => (
              <div
                className="w-full sm:w-1/3 p-4 rounded-lg mt-4 bg-gray-100 border-4 border-yellow-400"
                {...provided.droppableProps}
                ref={provided.innerRef}
              >
                <h2 className="text-lg font-semibold mb-4">Incomplete</h2>
                {incomplete.map((item, index) => (
                  <Draggable key={item?.id} draggableId={item?.id || index.toString()} index={index}>
                    {(provided) => (
                      <div
                        className="bg-white p-2 mb-2 flex justify-between items-center rounded-md"
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                      >
                        <div className="flex items-center">
                          <FaCheckCircle className="text-green-500 mr-2" />
                          <span>{item?.content || ''}</span>
                        </div>
                        <div className="space-x-2">
                          <button
                            onClick={() => handleDeleteTask(item?.id)}
                            className="text-red-500 hover:font-semibold border-2 p-2 rounded-md border-red-600 hover:bg-red-600 hover:text-white"
                          >
                            <FaTrash /> Delete
                          </button>
                          <button
                            onClick={() =>
                              handleEditTask(
                                item?.id,
                                prompt("Edit task:", item?.content || '')
                              )
                            }
                            className="text-blue-500  hover:font-semibold border-2 p-2 rounded-md border-blue-600 hover:bg-blue-600 hover:text-white"
                          >
                            <FaEdit /> Edit
                          </button>
                        </div>
                      </div>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
          <Droppable droppableId="complete">
            {(provided) => (
              <div
                className="w-full sm:w-1/3 bg-gray-100 border-4 border-green-600  p-4 rounded-lg mt-4 "
                {...provided.droppableProps}
                ref={provided.innerRef}
              >
                <h2 className="text-lg font-semibold mb-4">Complete</h2>
                {complete.map((item, index) => (
                  <Draggable key={item?.id} draggableId={item?.id || index.toString()} index={index}>
                    {(provided) => (
                      <div
                        className="bg-white p-2 mb-2 flex justify-between items-center rounded-md"
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                      >
                        <div className="flex items-center">
                          <FaCheckCircle className="text-green-500 mr-2" />
                          <span>{item?.content || ""}</span>
                        </div>
                        <div className="space-x-2">
                          <button
                            onClick={() =>
                              handleDeleteCompletedTask(item?.id)
                            }
                            className="text-red-500 hover:font-semibold border-2 p-2 rounded-md border-red-600 hover:bg-red-600 hover:text-white"
                          >
                            <FaTrash /> Delete
                          </button>
                          <button
                            onClick={() =>
                              handleEditCompletedTask(
                                item?.id,
                                prompt("Edit task:", item?.content || "")
                              )
                            }
                            className="text-blue-500  hover:font-semibold border-2 p-2 rounded-md border-blue-600 hover:bg-blue-600 hover:text-white"
                          >
                            <FaEdit /> Edit
                          </button>
                        </div>
                      </div>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
          <Droppable droppableId="deleted">
            {(provided) => (
              <div
                className="w-full sm:w-1/3 bg-gray-100 border-4 border-red-600 p-4 rounded-lg mt-4 "
                {...provided.droppableProps}
                ref={provided.innerRef}
              >
                <h2 className="text-lg font-semibold mb-4">Deleted</h2>
                {deleted.map((item, index) => (
                  <div
                    key={item?.id || index.toString()}
                    className="bg-white p-2 mb-2 flex justify-between items-center rounded-md"
                  >
                    <div className="flex items-center">
                      <FaCheckCircle className="text-green-500 mr-4" />
                      <span>{item?.content || ""}</span>
                    </div>
                    <button
                      onClick={() => handleRestoreTask(item?.id)}
                      className="text-green-500 hover:font-semibold border-2 p-2 rounded-md border-green-600 hover:bg-green-600 hover:text-white"
                    >
                      <FaTrashRestore /> Restore
                    </button>
                  </div>
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

export default TaskList;
