import React from "react";
import { useState } from "react";
import { useForm } from "react-hook-form";

function TaskLoggerForm({ task, onAddTask }) {
  const [tasks, setTasks] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const { register, handleSubmit, reset } = useForm();
  

  const onSubmit = (data) => {
    onAddTask(data);
    reset(); //Reset form fields after click submit
    setShowForm(false); //Hide pop up after submission
  };

  return (
    <>
      <button onClick={() => setShowForm(true)}>Add New Task</button>

      {showForm && (
        <div className="form-modal">
          <form onSubmit={handleSubmit(onSubmit)} className="task-form">
          <button className="close-button" onClick={() => setShowForm(false)}>
            x
          </button>
            <input
              {...register("name", { required: true })}
              placeholder="Task Name"
            />
            <textarea
              {...register("description", { required: true })}
              placeholder="Task Description"
            />
            <button type="submit">Log Task</button>
          </form>
        </div>
      )}

      <style jsx>{`
        .form-modal {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background-color: rgba(0, 0, 0, 0.5);
          display: flex;
          justify-content: center;
          align-items: center;
        }

        .task-form {
          background: white;
          padding: 20px;
          border-radius: 5px;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
          display: flex;
          flex-direction: column;
          gap: 10px;
          position: relative; /* This ensures the form itself is also properly positioned for the close button */
        }

        .close-button {
          position: absolute;
          top: -20px; /* Adjust these values to correctly position the button as needed */
          right: -50px;
          border: none;
          background: none;
          color: white;
          font-size: 1rem;
          cursor: pointer;
        }

        .close-button:hover {
          color: #ccc;
        }

        .task-form input,
        .task-form textarea {
          padding: 10px;
          margin-bottom: 10px;
          border: 1px solid #ccc;
          border-radius: 4px;
        }

        .task-form button {
          background-color: #007bff;
          color: white;
          padding: 10px 20px;
          border: none;
          border-radius: 4px;
          cursor: pointer;
        }

        .task-form button:hover {
          background-color: #0056b3;
        }
      `}</style>
    </>
  );
}

export default TaskLoggerForm;
