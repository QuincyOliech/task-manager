import React, { useEffect, useState } from "react";
import {
  DragDropContext,
  Draggable,
  Droppable
} from "react-beautiful-dnd";
import CreateTask from "./CreateTask";

const TaskList = () => {
  const [tasks, setTasks] = useState([]);
  const [deletedTasks, setDeletedTasks] = useState([]);

  const addTask = (newTask) => {
    setTasks([...tasks, newTask]);
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = () => {
    fetch("https://65437f5c01b5e279de20773a.mockapi.io/api/tasks")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Task not added");
        }
        return response.json();
      })
      .then((data) => {
        setTasks(data);
      })
      .catch((error) => {
        console.error("Error fetching tasks: ", error);
      });
  };

  const handleDelete = (taskId) => {
    const taskToDelete = tasks.find((task) => task.id === taskId);
    setDeletedTasks([...deletedTasks, taskToDelete]);
    setTasks(tasks.filter((task) => task.id !== taskId));
  };

  const handleRestore = (taskId) => {
    const taskToRestore = deletedTasks.find((task) => task.id === taskId);
    setDeletedTasks(deletedTasks.filter((task) => task.id !== taskId));
    setTasks([...tasks, taskToRestore]);
  };

  const handleEdit = (taskId, newTitle) => {
    setTasks(
      tasks.map((task) =>
        task.id === taskId ? { ...task, title: newTitle } : task
      )
    );
  };

  const onDragEnd = (result) => {
    const { source, destination } = result;

    if (!destination) {
      return;
    }

    const updatedTasks = [...tasks];

    if (
      source.droppableId === "incomplete" &&
      destination.droppableId === "deleted"
    ) {
      let incomplete_task = updatedTasks.filter(
        (task) => !task.completed
      )[source.index];
      handleDelete(incomplete_task.id);
    } else if (
      source.droppableId === "complete" &&
      destination.droppableId === "deleted"
    ) {
      let complete_task = updatedTasks.filter((task) => task.completed)[
        source.index
      ];
      handleDelete(complete_task.id);
    } else if (
      source.droppableId === "incomplete" &&
      destination.droppableId === "complete"
    ) {
      let incomplete_task = updatedTasks.filter(
        (task) => !task.completed
      )[source.index];
      updatedTasks.forEach(function (task) {
        if (task.id === incomplete_task.id) {
          task.completed = true;
        }
      });
      setTasks(updatedTasks);
    } else if (
      source.droppableId === "complete" &&
      destination.droppableId === "incomplete"
    ) {
      let complete_task = updatedTasks.filter((task) => task.completed)[
        source.index
      ];
      updatedTasks.forEach(function (task) {
        if (task.id === complete_task.id) {
          task.completed = false;
        }
      });
      setTasks(updatedTasks);
    }
  };

  return (
    <div>
      <CreateTask addTask={addTask} />
      <div className="container mx-auto mt-5">
        <h1 className="text-3xl font-bold text-center mb-5">Task List</h1>
        <DragDropContext onDragEnd={onDragEnd}>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <Droppable droppableId="incomplete">
              {(provided) => (
                <div
                  className="bg-gray-100 p-3 rounded border-yellow-400 border-4 mt-4"
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                >
                  <h2 className="text-lg font-semibold mb-3">Incomplete</h2>
                  {tasks
                    .filter((task) => !task.completed)
                    .map((task, index) => (
                      <Draggable
                        key={task.id}
                        draggableId={task.id.toString()}
                        index={index}
                      >
                        {(provided) => (
                          <div
                            className="bg-white p-3 mb-3 rounded"
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            ref={provided.innerRef}
                          >
                            <span>{task.title}</span>
                            <div className="mt-2">
                              <button
                                className="mr-2 p-1 bg-red-500 text-white rounded"
                                onClick={() => handleDelete(task.id)}
                              >
                                Delete
                              </button>
                              <button
                                className="p-1 bg-blue-500 text-white rounded"
                                onClick={() =>
                                  handleEdit(task.id, prompt("Edit task", task.title))
                                }
                              >
                                Edit
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
                  className="bg-gray-100 p-3 rounded border-green-600 border-4 mt-4"
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                >
                  <h2 className="text-lg font-semibold mb-3">Complete</h2>
                  {tasks
                    .filter((task) => task.completed)
                    .map((task, index) => (
                      <Draggable
                        key={task.id}
                        draggableId={task.id.toString()}
                        index={index}
                      >
                        {(provided) => (
                          <div
                            className="bg-white p-3 mb-3 rounded"
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            ref={provided.innerRef}
                          >
                            <span>{task.title}</span>
                            <div className="mt-2 flex justify-end">
                              <button
                                className="mr-2 p-1 bg-red-500 text-white rounded"
                                onClick={() => handleDelete(task.id)}
                              >
                                Delete
                              </button>
                              <button
                                className="p-1 bg-blue-500 text-white rounded"
                                onClick={() =>
                                  handleEdit(task.id, prompt("Edit task", task.title))
                                }
                              >
                                Edit
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
                  className="bg-gray-100 p-3 rounded border-red-600 border-4 mt-4"
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                >
                  <h2 className="text-lg font-semibold mb-3">Deleted</h2>
                  {deletedTasks.map((task) => (
                    <div key={task.id} className="bg-white p-3 mb-3 rounded">
                      <span>{task.title}</span>
                      <button
                        className="ml-2 p-1 bg-green-500 text-white rounded"
                        onClick={() => handleRestore(task.id)}
                      >
                        Restore
                      </button>
                    </div>
                  ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </div>
        </DragDropContext>
        <p className="text-center mt-4">
          (Drag and drop tasks to move them between lists)
        </p>
      </div>
    </div>
  );
};

export default TaskList;


