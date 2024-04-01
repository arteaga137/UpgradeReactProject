import React, { useState, useEffect } from "react";
import Buttons from "../buttons/Buttons";
import TaskLoggerForm from "../taskLoggerForm/TaskLoggerForm";
import TaskLogList from "../taskLogList/TaskLogList";

function TimeTracker({
  tasks,
  onAddTask,
  currentTask,
  taskCompleted,
  finalizeTask,
  updateTaskDuration,
}) {
  const [seconds, setSeconds] = useState(0);
  const [runningTime, setRunningTime] = useState(null);
  const [sessionStartTime, setSessionStartTime] = useState(null);

  useEffect(() => {
    return () => clearInterval(runningTime);
  }, [runningTime]);

  function start() {
    if (!runningTime) {
      setSessionStartTime(Date.now());
    }
    if (!runningTime && currentTask) {
      const interval = setInterval(() => {
        setSeconds((prevSeconds) => prevSeconds + 1);
      }, 1000);
      setRunningTime(interval);
    }
  }

  function stop() {
    if (sessionStartTime) {
      const sessionEndTime = Date.now();
      const sessionDuration = (sessionEndTime - sessionStartTime) / 1000; // Convert milliseconds to seconds
      updateTaskDuration(currentTask.id, sessionDuration);
      setSessionStartTime(null); // Reset session start time for the next session
    }
    clearInterval(runningTime);
    setRunningTime(null);
  }

  function reset() {
    if (currentTask) {
      stop(); // Stop the timer first to ensure any ongoing session is concluded.

      // Directly using tasks state here might not reflect the latest updates immediately due to setState's asynchronous nature.
      // However, assuming the stop function updates the current task's duration correctly,
      // and that update is immediately reflected in the tasks state (which might not always be the case),
      // you should retrieve the updated task duration from the state.
      const taskToUpdate = tasks.find((task) => task.id === currentTask.id);

      if (taskToUpdate) {
        const totalDuration = taskToUpdate.duration || 0; // Ensure we have a numeric value
        console.log(
          "Total duration for current task:",
          totalDuration,
          "seconds"
        );

        // Now finalize the task using its ID and the retrieved duration.
        finalizeTask(taskToUpdate.id, totalDuration);
      } else {
        console.log("Current task not found in the updated tasks list.");
      }
    } else {
      console.log("No current task to finalize.");
    }

    setSeconds(0); // Reset the seconds for the next task, irrespective of current task status.
  }

  // Convert seconds to HH:MM:SS format
  const formatTime = (totalSeconds) => {
    const hours = Math.floor(totalSeconds / 3600)
      .toString()
      .padStart(2, "0");
    const minutes = Math.floor((totalSeconds % 3600) / 60)
      .toString()
      .padStart(2, "0");
    const seconds = (totalSeconds % 60).toString().padStart(2, "0");
    return `${hours}:${minutes}:${seconds}`;
  };

  const containerStyle = {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    minHeight: "50vh",
  };

  const timeDisplayStyle = {
    fontSize: "3rem",
    margin: "10px 0",
    textAlign: "center",
  };

  // Corrected return statement placement
  return (
    <>
      <div className="container" style={containerStyle}>
        <div className="time-display" style={timeDisplayStyle}>
          {formatTime(seconds)}
        </div>
        <TaskLoggerForm onAddTask={onAddTask} task={tasks} />
        <Buttons onStart={start} onStop={stop} onReset={reset} />
        <TaskLogList tasks={tasks} />
      </div>
    </>
  );
}

export default TimeTracker;
