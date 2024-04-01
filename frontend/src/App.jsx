// Imports the React library. This is necessary for any file that uses JSX or React components.
import React, { useEffect, useState } from "react";
import { Route, Routes, useNavigate, Navigate } from "react-router-dom";
import HomePage from "./pages/home/HomePage";
import DashboardPage from "./pages/dashboard/DashboardPage";
import ReportPage from "./pages/report/ReportPage";
import axios from "axios";
// import { createServer } from "miragejs";

import "./App.css";
import Navbar from "./pages/components/navbar/Navbar";
import RegistrationPage from "./pages/register/RegistrationPage";
import LoginPage from "./pages/login/LoginPage";
import Footer from "./pages/components/footer/Footer";
import { useAuth } from "./context/AuthContext";
import ProtectedRoute from "./pages/protectedRoute/ProtectedRoute";

// Defines the App component. In React, components are reusable pieces of UI, and the App component typically serves as the root component that wraps the entire application.
function App() {
  const [userData, setUserData] = useState(null);
  const [loginData, setLoginData] = useState(null);
  const [tasks, setTasks] = useState([]);
  const [currentTask, setCurrentTask] = useState(null);
  const { login, isAuth } = useAuth(); // consuming login function from AuthContext
  const navigate = useNavigate(); //will use this later to make re-directions.

  // // Using Mirage JS to mock Backend server. Testing Axios.
  // function makeServer() {
  //   createServer({
  //     routes() {

  //       // this.post("/api/register", (schema, request) => {
  //       //   let attrs = JSON.parse(request.requestBody);

  //       //   console.log("Received registration data in Mirage (backend):", attrs);

  //       //   //simulating a successful registration with a JSON response
  //       //   return { user: { id: 1, ...attrs } };
  //       // });

  //       // this.post("/api/login", (schema, request) => {
  //       //   let attrs = JSON.parse(request.requestBody);
  //       //   console.log("Received login data in Mirage (backend):", attrs);

  //       //   return { user: { token: "placeholder token", ...attrs } };
  //       // });

  //       this.post("/api/tasks", (schema, request) => {
  //         let attrs = JSON.parse(request.requestBody);
  //         console.log("Adding new task in Mirage (backend):", attrs);

  //         return { task: { id: Math.random(), ...attrs } };
  //       });

  //       //GET all Tasks
  //       this.get("/api/tasks", () => {
  //         console.log("Fetching all tasks in Mirage(backend)");

  //         return {
  //           tasks: [
  //             {
  //               id: 1,
  //               name: "Sample Task",
  //               description: "Sample task from mock backend.",
  //             },
  //           ],
  //         };
  //       });

  //       //Update a task (PUT)
  //       this.put("/api/tasks/:id", (schema, request) => {
  //         let id = request.params.id;
  //         let attrs = JSON.parse(request.requestBody);
  //         console.log(`Updating task ${id} in Mirage (backend):`, attrs);

  //         return { task: id, ...attrs };
  //       });

  //       //Delete a task (Delete)
  //       this.delete("/api/tasks/:id", (schema, request) => {
  //         let id = request.params.id;
  //         console.log(`Deleting task ${id} in Mirage (backend)`);
  //         //Successful delete operation without returning specific data for security
  //         return new Response(204);
  //       });
  //     },
  //   });
  // }

  // makeServer();

  //Registration handler function. This will later make a post to backend. // // *TODO: use Axios to post to backend.
  /**
   * Handles user registration by sending registration data to a backend endpoint.
   *
   * This asynchronous function takes user registration data, sends it to the backend using an HTTP POST request,
   * and updates the application's state with the response data. This typically includes user information and
   * authentication tokens that are crucial for subsequent user sessions and interactions with the application.
   *
   * @param {Object} formData - The user registration data collected from a registration form. This object contains
   * user details such as name, email, and password, structured in a format expected by the backend.
   *
   * The function performs the following steps:
   * 1. Defines the URL endpoint for the registration API.
   * 2. Uses Axios to send a POST request to the backend with the formData as the request body.
   * 3. Upon a successful request, the backend's response data is set to the application's state. This data
   *    might include the registered user's details and a token for authentication purposes.
   * 4. If the request fails, logs the error to the console for debugging. This catch block is crucial for
   *    identifying issues with the registration process, such as network errors or validation issues from the backend.
   *
   * This function is designed to be called when a user submits a registration form. It is critical for initiating
   * a user's experience within the application by registering their account with the backend services.
   *
   * @returns {void} - The function does not return any value but performs state updates based on the response from
   * the backend or logs errors in case of a failure.
   */
  const handleRegistration = async (formData) => {
    const URL = "http://localhost:3000/api/users/register";
    try {
      const response = await axios.post(URL, formData);
      setUserData(response.data); // Updates user data in the state with the response from the backend.
    } catch (error) {
      console.error(
        "Registration failed:",
        error.response ? error.response.data : error
      );
    }
  };

  /**
   * Handles the user login process by submitting login credentials to a backend endpoint.
   *
   * This function is an asynchronous operation that sends user login data to the backend using an HTTP POST request.
   * Upon successful login, it updates the authentication context with the user information and authentication token
   * received from the backend, and then redirects the user to the homepage.
   *
   * @param {Object} formData - The user login data collected from the login form. Typically includes credentials
   * such as email and password.
   *
   * Steps performed by the function:
   * 1. Defines the URL for the login API endpoint.
   * 2. Sends a POST request to the backend with the user's login formData.
   * 3. On successful authentication, destructures the user and token from the response.
   * 4. Calls the login function (assumed to be a context method) to update the application's authentication state
   *    with the received user data and token.
   * 5. Uses the `navigate` function from React Router to redirect the user to the homepage ("/").
   * 6. In case of an error (e.g., invalid credentials or server issues), logs the error details to the console.
   *
   * The function aims to simplify the login process by abstracting the interaction with backend services and
   * managing navigation post-login. It enhances user experience by providing immediate feedback and access to
   * authenticated routes upon successful login.
   *
   * @returns {void} - This function doesn't return a value but performs side effects (state updates and navigation).
   */
  const handleLogin = async (formData) => {
    const URL = "http://localhost:3000/api/users/login";
    try {
      const response = await axios.post(URL, formData);
      const { user, token } = response.data;
      login(user, token); // Update auth context with user data and token
      navigate("/"); // Redirect to the homepage after successful login
    } catch (error) {
      console.error(
        "Login failed:",
        error.response ? error.response.data : error
      );
    }
  };

  /**
   * Asynchronously adds a new task by sending a POST request to the backend
   * and updates the local state to include the newly added task.
   *
   * @param {Object} newTask - The new task to be added. This object should
   * contain all necessary data required by the backend to create a task,
   * such as the task's title, description, etc.
   *
   * The function performs the following steps:
   * 1. Sends a POST request to the backend with the new task data.
   * 2. Upon successful response from the backend, it receives the complete
   *    task object, including any new properties like a unique identifier (`id`)
   *    assigned by the backend.
   * 3. Updates the local state to include this new task, marking it as both
   *    the current task being worked on (`isCurrent`) and not yet completed
   *    (`isCompleted` set to false).
   * 4. In case of an error during the request (e.g., network issues, validation
   *    errors from the backend), logs the error to the console.
   *
   * @returns {void}
   */
  const handleAddTask = async (newTask) => {
    const URL = "http://localhost:3000/api/tasks";
    try {
      // Attempt to add the new task via a POST request.
      const response = await axios.post(URL, newTask, {
        withCredentials: true,
      });
      console.log(response);

      // Construct the added task object with additional local state flags.
      const addedTask = {
        ...response.data.task,
        isCurrent: true,
        isCompleted: false,
      };

      // Update the tasks state array to include the newly added task.
      setTasks((currentTasks) => [...currentTasks, addedTask]);

      // Set this task as the current task.
      setCurrentTask(addedTask);

      console.log("Task added successfully:", addedTask);
    } catch (error) {
      // Log any errors that occur during the task addition.
      console.error(
        "Failed to add task:",
        error.response ? error.response.data : error
      );
    }
  };

  /**
   * Marks a specified task as completed within the list of tasks.
   *
   * This function iterates over the current list of tasks to find the task
   * with the matching `taskId`. It then updates this task's status to indicate
   * that it has been completed (`isCompleted` set to true) and it's no longer
   * the current task being worked on (`isCurrent` set to false). After updating
   * the task's status, the function updates the application's state to reflect
   * these changes.
   *
   * @param {number|string} taskId - The unique identifier of the task to be marked as completed.
   * This identifier should match the `id` property of the task object stored within the tasks state.
   *
   * The function performs the following actions:
   * 1. Iterates over the list of tasks and updates the status of the specified task.
   * 2. Updates the application's tasks state to include the changes made to the task list.
   * 3. Resets the `currentTask` state to `null` since there's no longer an active task being worked on.
   *
   * @returns {void}
   */
  const markTaskAsCompleted = (taskId) => {
    // Iterate over the tasks to find and update the status of the specified task.
    const updatedTasks = tasks.map(
      (task) =>
        task.id === taskId
          ? { ...task, isCompleted: true, isCurrent: false } // Mark the task as completed and not current.
          : task // Leave other tasks unchanged.
    );

    // Update the tasks state with the new list of tasks.
    setTasks(updatedTasks);

    // Reset the current task since the task being marked as completed is no longer active.
    setCurrentTask(null);
  };

  /**
   * Updates the duration of a specific task based on its task ID.
   *
   * This function finds a task by its unique identifier (`taskId`) within the current list of tasks,
   * and then increments its duration by a specified amount of additional seconds (`additionalSeconds`).
   * If a task with the specified ID exists, its duration is updated; otherwise, the tasks remain unchanged.
   * This is particularly useful for tasks that are timed, allowing for adjustments to the duration
   * as more time is spent on them or corrections are needed.
   *
   * @param {number|string} taskId - The unique identifier of the task whose duration needs to be updated.
   * This ID should match the `id` property of one of the task objects in the current state.
   *
   * @param {number} additionalSeconds - The number of seconds to add to the task's current duration.
   * This value should be a positive integer representing the additional time in seconds.
   *
   * The function performs the following steps:
   * 1. Iterates over the list of tasks stored in the application's state.
   * 2. For the task with the matching `taskId`, adds `additionalSeconds` to its current `duration`.
   *    If the task does not already have a `duration` value, it defaults to 0 before adding the additional time.
   * 3. Updates the tasks state with the modified list to reflect the duration change.
   *
   * Note: This operation is immutably performed by creating a new array of task objects, ensuring that
   * the original tasks state is not directly mutated.
   *
   * @returns {void} - The function does not return a value but updates the state directly.
   */
  const updateTaskDuration = (taskId, additionalSeconds) => {
    setTasks((currentTasks) =>
      currentTasks.map((task) =>
        task.id === taskId
          ? { ...task, duration: (task.duration || 0) + additionalSeconds }
          : task
      )
    );
  };

  /**
   * Finalizes a task by setting its final duration and marking it as completed.
   *
   * This function is used to update the status of a task to reflect its completion. It finds a task by its ID
   * and updates its duration to a specified final value, and marks the task as completed. This can be useful
   * in scenarios where tasks have a variable duration and need to be marked complete when finished.
   *
   * @param {number|string} taskId - The unique identifier of the task to finalize. The `taskId` must correspond
   * to the `id` property of a task object within the current list of tasks.
   *
   * @param {number} finalDuration - The final duration value for the task, in seconds. This value replaces
   * the task's current duration and represents the total time spent on the task.
   *
   * The function performs the following steps:
   * 1. Iterates over the list of current tasks stored in the application's state.
   * 2. Finds the task with the given `taskId` and updates its `duration` to `finalDuration` and sets
   *    its `isCompleted` status to `true`.
   * 3. For tasks that do not match the given `taskId`, their properties remain unchanged.
   * 4. Updates the state with the new array of tasks to reflect these changes.
   *
   * This update operation ensures immutability by generating a new tasks array, thus preventing direct
   * mutation of the state. This approach aligns with React's best practices for state management.
   *
   * @returns {void} - The function does not return any value but directly updates the tasks state.
   */
  const finalizeTask = (taskId, finalDuration) => {
    setTasks((currentTasks) =>
      currentTasks.map((task) =>
        task.id === taskId
          ? { ...task, duration: finalDuration, isCompleted: true }
          : task
      )
    );
  };

  return (
    <>
      <Navbar />
      {/* Routes container determining which component to render based on URL */}
      <Routes>
        {/* Route for the home page, rendered only if the user is authenticated */}
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <HomePage
                tasks={tasks}
                onAddTask={handleAddTask}
                currentTask={currentTask}
                taskCompleted={markTaskAsCompleted}
                updateTaskDuration={updateTaskDuration}
                finalizeTask={finalizeTask}
              />
            </ProtectedRoute>
          }
        />
        {/* Routes for dashboard, reports, registration, and login */}
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/report" element={<ReportPage />} />
        <Route
          path="/register"
          element={<RegistrationPage onRegister={handleRegistration} />}
        />
        <Route
          path="/login"
          element={
            !isAuth ? <Navigate to="/" /> : <LoginPage onLogin={handleLogin} />
          }
        ></Route>
      </Routes>
      <Footer />
    </>
  );
}

export default App;
