import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../../context/AuthContext";

//  Creating a Navbar component for housing links to different pages components
function Navbar() {

  return (
    <>
      <style jsx>{`

        .container {
          display: flex;
          justify-content: space-between;
          padding: 1rem;
        }

        .navbar {
          width: 100%;
          display: flex;
          justify-content: space-between;
        }

        .nav-links, .auth-links {
          display: flex;
        }

        .nav-links a, .auth-links a {
          text-decoration: none;
          color: white;
          margin-right: 20px;
        }

        @media (max-width: 600px) {
          .navbar {
            flex-direction: column;
            align-items: center;
          }

          .nav-links, .auth-links {
            flex-direction: column;
            align-items: center;
          }

          .nav-links a, .auth-links a {
            margin-bottom: 10px;
          }
      `}</style>
      <header>
        <h1>Time Tracking App</h1>
        <div className="container">
          <nav className="navbar">
            <div className="nav-links">
              <Link to="/">Home</Link>
            </div>
            <div className="auth-links">
              <Link to="/register">Register</Link>
              <Link to="/login">Login</Link>
            </div>
          </nav>
        </div>
      </header>
    </>
  );
}

export default Navbar;
