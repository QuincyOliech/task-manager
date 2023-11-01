// import React, { useState } from "react";

// const CreateTask = ({ addTask }) => {
//   const [newTask, setNewTask] = useState("");

//   const handleAddTask = () => {
//     if (newTask.trim() !== "") {
//       addTask(newTask);
//       setNewTask("");
//     }
//   };

//   return (
//     <div className="flex flex-col items-center mt-8 sm:flex-row sm:justify-center">
//       <input
//         type="text"
//         value={newTask}
//         onChange={(e) => setNewTask(e.target.value)}
//         className="border border-gray-300 rounded-md p-2 w-full sm:w-64"
//         placeholder="Add a new task"
//       />
//       <button
//         onClick={handleAddTask}
//         className="bg-custom-blue ml-4 hover:bg-blue-500 text-white py-2 px-4 rounded mt-2 sm:mt-0"
//       >
//         Add Task
//       </button>
//     </div>
//   );
// };

// export default CreateTask;

// import React, { useState } from "react";

// const CreateTask = ({ addTask }) => {
//   const [newTask, setNewTask] = useState("");

//   const handleAddTask = () => {
//     if (newTask.trim() !== "") {
//       addTask(newTask);
//       setNewTask("");
//     }
//   };

//   return (
//     <div className="flex flex-col items-center mt-8 sm:flex-row sm:justify-center">
//       <input
//         type="text"
//         value={newTask}
//         onChange={(e) => setNewTask(e.target.value)}
//         className="border border-gray-300 rounded-md p-2 w-full sm:w-64"
//         placeholder="Add a new task"
//       />
//       <button
//         onClick={handleAddTask}
//         className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded mt-2 sm:mt-0"
//       >
//         Add Task
//       </button>
//     </div>
//   );
// };

// export default CreateTask;
