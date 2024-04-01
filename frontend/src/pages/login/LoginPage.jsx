import React from "react";
import { useForm } from "react-hook-form";

function LoginPage({ onLogin }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const emailRegex = /^\S+@\S+$/i;
  const passwordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/i;

  const onSubmit = (data) => {
    console.log("Form data in LoginPage: ", data);
    onLogin(data);
  };

  return (
    <>
      <style jsx>{`
        form {
          max-width: 400px;
          margin: auto;
          padding: 20px;
          background-color: #fff;
          border-radius: 5px;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        }
        h2 {
          text-align: center;
          margin-bottom: 20px;
          color: #021d49;
        }
        label {
          display: block;
          margin-bottom: 0.5rem;
          color: #333;
        }
        input[type="email"],
        input[type="password"] {
          width: 100%;
          padding: 10px;
          margin-bottom: 20px;
          border: 1px solid #ccc;
          border-radius: 4px;
        }
        .loginButton {
          width: 100%;
          background-color: #007bff;
          color: white;
          padding: 10px;
          border: none;
          border-radius: 4px;
          cursor: pointer;
          font-weight: bold;
        }
        .loginButton:hover {
          background-color: #0056b3;
        }
        span {
          color: red;
          font-size: 0.875em;
        }
      `}</style>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label htmlFor="email">E-mail:</label>
          <input
            id="email"
            type="email"
            placeholder="johndoe@gmail.com"
            {...register("email", {
              required: "E-mail is required",
              pattern: {
                value: emailRegex,
                message: "Entered value does not match e-mail format",
              },
            })}
          ></input>
          {errors.email && <span>{errors.email.message}</span>}
        </div>
        <label htmlFor="password">Password:</label>
        <input
          id="password"
          type="password"
          placeholder="Password"
          {...register("password", {
            required: "Password is required",
            minLength: 8,
            pattern: {
              value: passwordRegex,
              message:
                "Password must contain at least 8 characters, one uppercase, one lowercase, one number, and one special character",
            },
          })}
        ></input>
        {errors.password && <span>{errors.password.message}</span>}
        <br></br>
        <button className="loginButton" type="submit">
          Login
        </button>
      </form>
    </>
  );
}
export default LoginPage;
