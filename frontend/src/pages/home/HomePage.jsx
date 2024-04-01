import TimeTracker from "../../components/tracker/timeTracker/TimeTracker";

function HomePage({ tasks, onAddTask, currentTask, taskCompleted, updateTaskDuration, finalizeTask }) {
  return (
    <>
      <TimeTracker
        tasks={tasks}
        onAddTask={onAddTask}
        currentTask={currentTask}
        taskCompleted={taskCompleted}
        updateTaskDuration={updateTaskDuration}
        finalizeTask={finalizeTask}
      ></TimeTracker>
    </>
  );
}

export default HomePage;
