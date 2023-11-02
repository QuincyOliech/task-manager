import React, { useState } from "react";

const CreateTask = ({addTask}) => {
  const [task, setTask] = useState("");

  const handleAddTask = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("https://65437f5c01b5e279de20773a.mockapi.io/api/users/1/tasks", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: task,
          completed: false,
        }),
      });

      const data = await response.json();
      console.log("Task added:", data);
      addTask(data);
      setTask("");
    } catch (error) {
      console.error("Error adding task:", error);
    }
  };

  return (
    <div className="flex flex-col items-center mt-8 m-6 sm:flex-row sm:justify-center">
      <input
        type="text"
        value={task}
        onChange={(e) => setTask(e.target.value)}
        className="border border-gray-300 rounded-md p-2 w-full sm:w-64"
        placeholder="Add a new task"
      />
      <button onClick={handleAddTask} className="bg-custom-blue hover:bg-blue-500 ml-4  text-white py-2 px-4 rounded mt-2 sm:mt-0">
        Add Task
      </button>
    </div>
  );
};

export default CreateTask;
