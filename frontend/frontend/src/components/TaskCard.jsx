import React from "react";

const TaskCard = ({ title, description, icon, color, completed, onToggle, onDelete, onUpdate }) => {
  return (
    <div className={`p-4 rounded-lg shadow-md flex justify-between items-start ${color}`}>
      <div>
        <h3 className={`text-lg font-semibold ${completed ? "line-through text-gray-500" : ""}`}>
          {icon} {title}
        </h3>
        <p className="text-sm text-gray-700 mt-1">{description}</p>
      </div>

      <div className="flex flex-col items-end gap-2">
        <button onClick={onToggle} className="text-sm px-2 py-1 bg-green-100 rounded hover:bg-green-200">
          {completed ? "Mark Incomplete" : "Mark Complete"}
        </button>

        <button onClick={onUpdate} className="text-sm px-2 py-1 bg-blue-100 rounded hover:bg-blue-200">
          Update
        </button>

        <button onClick={onDelete} className="text-sm px-2 py-1 bg-red-100 rounded hover:bg-red-200">
          Delete
        </button>
      </div>
    </div>
  );
};


export default TaskCard;
