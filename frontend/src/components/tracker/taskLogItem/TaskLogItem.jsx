import React from "react";

function TaskLogItem({ task }) {
  // format the duration to a more readable format
  function formatDuration(duration) {
    if (typeof duration !== "number" || isNaN(duration)) {
      return "00h 00m 00s"; // Return a default or placeholder string
    }
    
    const hours = Math.floor(duration / 3600);
    const minutes = Math.floor((duration % 3600) / 60);
    const seconds = duration % 60;
    return `${hours.toString().padStart(2, "0")}h ${minutes.toString().padStart(2, "0")}m ${seconds.toString().padStart(2, "0")}s`;
  }
  

  return (
    // <li>Item 1</li>
    <div className="task-log-item">
      <div className="task-details">
        <ul>
          <li>
            <h4>{task.name}</h4>
            <p>{task.description}</p>
            {task.isCompleted && (
              <p>Duration: {formatDuration(task.duration)}</p>
            )}
          </li>
        </ul>
      </div>
      {/* <div className="task-actions">
        <button onClick={() => onEdit(task.id)}>Edit</button>
        <button onClick={() => onDelete(task.id)}>Delete</button>
      </div> */}
    </div>
  );
}

export default TaskLogItem;
