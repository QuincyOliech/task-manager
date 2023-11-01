import React, { useState } from 'react';
import { AiFillDelete, AiFillEdit } from 'react-icons/ai';
​
const TaskCard = ({ taskId, content, onDragStart, onDelete, onEdit }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedContent, setEditedContent] = useState(content);
​
  const handleDragStart = (e) => {
    onDragStart(e, taskId);
  };
​
  const handleDeleteClick = () => {
    onDelete(taskId);
  };
​
  const handleEditClick = () => {
    setIsEditing(true);
  };
​
  const handleEditChange = (e) => {
    setEditedContent(e.target.value);
  };
​
  const handleEditSubmit = (e) => {
    e.preventDefault();
    onEdit(taskId, editedContent);
    setIsEditing(false);
  };
​
  return (
    <div className="bg-gray-300 p-2 mb-2 rounded shadow flex items-center" draggable onDragStart={handleDragStart}>
      {isEditing ? (
        <form onSubmit={handleEditSubmit} className="flex-grow">
          <input type="text" value={editedContent} onChange={handleEditChange} autoFocus />
          <button className="bg-black hover:bg-green-600 text-white px-2 mt-2 ml-6 text-m rounded" type="submit">
            Save
          </button>
        </form>
      ) : (
        <>
          <div className="flex-grow">{content}</div>
          <div>
            <button className="text-red-600 rounded-md hover:text-green-900 mr-4" onClick={handleDeleteClick}>
              <AiFillDelete />
            </button>
            <button className="text-green-600 rounded-md hover:text-green-900 mr-4 mb-2" onClick={handleEditClick}>
              <AiFillEdit className="text-xl" />
            </button>
          </div>
        </>
      )}
    </div>
  );
};
​
export default TaskCard;
