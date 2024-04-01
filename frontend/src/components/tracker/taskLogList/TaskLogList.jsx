import React from "react";
import TaskLogItem from "../taskLogItem/TaskLogItem";

function TaskLogList({ tasks }) {
  return (
    // <ul>
    //   <TaskLogItem></TaskLogItem>
    // </ul>
    <div className="Task-log-list">
      {tasks.map((task) => (
        <TaskLogItem
          key={task.id}
          task={task}
          // onEdit={editTask}
          // onDelete={deleteTask}
        ></TaskLogItem>
      ))}
    </div>
  );
}

export default TaskLogList;
