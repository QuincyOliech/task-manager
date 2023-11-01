// import React, { useState, useEffect } from "react";
// import { v4 as uuidv4 } from "uuid";
// import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
// import CreateTask from "./CreateTask";
// import DeleteTask from "./DeleteTask";

// const TaskList = () => {
//   const initialItems = [
//     { id: uuidv4(), content: "Task 1" },
//     { id: uuidv4(), content: "Task 2" },
//   ];

//   const [incomplete, setIncomplete] = useState(initialItems);
//   const [complete, setComplete] = useState([]);
//   const [deleted, setDeleted] = useState([]);

//   const [newTask, setNewTask] = useState("");

//   const handleAddTask = () => {
//     if (newTask.trim() !== "") {
//       setIncomplete((prev) => [...prev, { id: uuidv4(), content: newTask }]);
//       setNewTask("");
//     }
//   };

//   const handleEditTask = (id, newContent) => {
//     const updatedTasks = incomplete.map((item) =>
//       item.id === id ? { ...item, content: newContent } : item
//     );
//     setIncomplete(updatedTasks);
//   };

//   const handleDeleteTask = (id) => {
//     const taskToDelete = incomplete.find((item) => item.id === id);
//     setDeleted((prev) => [...prev, taskToDelete]);
//     setIncomplete((prev) => prev.filter((item) => item.id !== id));
//   };

//   const handleDeleteCompletedTask = (id) => {
//     const taskToDelete = complete.find((item) => item.id === id);
//     setDeleted((prev) => [...prev, taskToDelete]);
//     setComplete((prev) => prev.filter((item) => item.id !== id));
//   };

//   const handleEditCompletedTask = (id, newContent) => {
//     const updatedTasks = complete.map((item) =>
//       item.id === id ? { ...item, content: newContent } : item
//     );
//     setComplete(updatedTasks);
//   };

//   const handleRestoreTask = (id) => {
//     const taskToRestore = deleted.find((item) => item.id === id);
//     setIncomplete((prev) => [...prev, taskToRestore]);
//     setDeleted((prev) => prev.filter((item) => item.id !== id));
//   };

//   useEffect(() => {
//     try {
//       const storedIncomplete = JSON.parse(localStorage.getItem("incomplete"));
//       const storedComplete = JSON.parse(localStorage.getItem("complete"));
//       const storedDeleted = JSON.parse(localStorage.getItem("deleted"));

//       if (storedIncomplete) {
//         setIncomplete(storedIncomplete);
//       }
//       if (storedComplete) {
//         setComplete(storedComplete);
//       }
//       if (storedDeleted) {
//         setDeleted(storedDeleted);
//       }
//     } catch (error) {
//       console.error("Error parsing data from localStorage: ", error);
//       localStorage.removeItem("incomplete");
//       localStorage.removeItem("complete");
//       localStorage.removeItem("deleted");
//     }
//   }, []);

//   useEffect(() => {
//     localStorage.setItem("incomplete", JSON.stringify(incomplete));
//     localStorage.setItem("complete", JSON.stringify(complete));
//     localStorage.setItem("deleted", JSON.stringify(deleted));
//   }, [incomplete, complete, deleted]);

//   const handleOnDragEnd = (result) => {
//     const { source, destination } = result;

//     if (!destination) {
//       return;
//     }

//     const item =
//       source.droppableId === "incomplete"
//         ? incomplete[source.index]
//         : complete[source.index];

//     if (destination.droppableId === "complete") {
//       setComplete((prev) => [...prev, item]);
//       if (source.droppableId === "incomplete") {
//         setIncomplete((prev) =>
//           prev.filter((_, index) => index !== source.index)
//         );
//       } else if (source.droppableId === "deleted") {
//         setDeleted((prev) => prev.filter((_, index) => index !== source.index));
//       }
//     } else if (destination.droppableId === "deleted") {
//       setDeleted((prev) => [...prev, item]);
//       if (source.droppableId === "incomplete") {
//         setIncomplete((prev) =>
//           prev.filter((_, index) => index !== source.index)
//         );
//       } else if (source.droppableId === "complete") {
//         setComplete((prev) =>
//           prev.filter((_, index) => index !== source.index)
//         );
//       }
//     }
//   };

//   return (
//     <div className="container mx-auto p-4">
//       <CreateTask addTask={handleAddTask} />
//       <DragDropContext onDragEnd={handleOnDragEnd}>
//         <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//           <Droppable droppableId="incomplete">
//             {(provided) => (
//               <div
//                 className="bg-gray-100 p-4 rounded-lg"
//                 {...provided.droppableProps}
//                 ref={provided.innerRef}
//               >
//                 <h2 className="text-lg font-semibold mb-4">Incomplete</h2>
//                 {incomplete.map((item, index) => (
//                   <Draggable key={item.id} draggableId={item.id} index={index}>
//                     {(provided) => (
//                       <div
//                         className="bg-white p-2 mb-2 flex justify-between items-center"
//                         ref={provided.innerRef}
//                         {...provided.draggableProps}
//                         {...provided.dragHandleProps}
//                       >
//                         <span>{item.content}</span>
//                         <div>
//                           <button
//                             onClick={() => handleDeleteTask(item.id)}
//                             className="text-red-500 hover:text-red-600 mx-2"
//                           >
//                             Delete
//                           </button>
//                         </div>
//                       </div>
//                     )}
//                   </Draggable>
//                 ))}
//                 {provided.placeholder}
//               </div>
//             )}
//           </Droppable>
//           <Droppable droppableId="complete">
//             {(provided) => (
//               <div
//                 className="bg-gray-100 p-4 rounded-lg"
//                 {...provided.droppableProps}
//                 ref={provided.innerRef}
//               >
//                 <h2 className="text-lg font-semibold mb-4">Complete</h2>
//                 {complete.map((item, index) => (
//                   <Draggable key={item.id} draggableId={item.id} index={index}>
//                     {(provided) => (
//                       <div
//                         className="bg-white p-2 mb-2 flex justify-between items-center"
//                         ref={provided.innerRef}
//                         {...provided.draggableProps}
//                         {...provided.dragHandleProps}
//                       >
//                         <span>{item.content}</span>
//                       </div>
//                     )}
//                   </Draggable>
//                 ))}
//                 {provided.placeholder}
//               </div>
//             )}
//           </Droppable>
//           <Droppable droppableId="deleted">
//             {(provided) => (
//               <div
//                 className="bg-gray-100 p-4 rounded-lg"
//                 {...provided.droppableProps}
//                 ref={provided.innerRef}
//               >
//                 <h2 className="text-lg font-semibold mb-4">Deleted</h2>
//                 {deleted.map(
//                   (item) =>
//                     item && (
//                       <DeleteTask
//                         key={item.id}
//                         item={item}
//                         handleDelete={handleDeleteTask}
//                         restoreTask={handleRestoreTask}
//                       />
//                     )
//                 )}

//                 {provided.placeholder}
//               </div>
//             )}
//           </Droppable>
//         </div>
//       </DragDropContext>
//     </div>
//   );
// };

// export default TaskList;
