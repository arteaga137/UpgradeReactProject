import React from "react";
import { useForm } from "react-hook-form";

function RegistrationPage({ onRegister }) {
  //setting the handleRegister function via prop
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const emailRegex = /^\S+@\S+$/i;
  const passwordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/i;

  // *TODO: Delete the reference schema, once you set it up accordingly in the backend
  // data = {
  //     firstName: '',
  //     lastName:'',
  //     email: '',
  //     password: ''
  // }

  //function to handle form submission
  const onSubmit = (data) => {
    console.log("Form data in RegistrationPage: ", data);
    // send the data to app component through props
    onRegister(data); // call the handleRegister function passed by prop. This should send the data from the form to the app component to later send to backend using axios
  };

  return (
    <>
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <label htmlFor="firstName">First Name:</label>
        <input id="firstName" placeholder="John" {...register("firstName", { required: true })} />
        {errors.firstName && <span> This field is required </span>}
      </div>
      <div>
        <label htmlFor="lastName">Last Name:</label>
        <input id="lastName" placeholder="Doe" {...register("lastName", { required: true })} />
        {errors.lastName && <span> This field is required </span>}
      </div>
      <div>
        <label htmlFor="email">Email:</label>
        <input
          id="email"
          type="email"
          placeholder="johndoe@email.com"
          {...register("email", {
            required: "E-mail is required",
            pattern: emailRegex,
          })}
        ></input>
        {errors.email && <span>{errors.email.message}</span>}
      </div>
      <div>
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
      </div>
      <button className="register-button" type="submit">Register</button>
    </form>
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
    input,
    input[type="text"],
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
    </>
  );
}

export default RegistrationPage;
