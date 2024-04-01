import React from "react";

function Footer() {
    return(
        <>
        <footer className="footer">
        <p>© {new Date().getFullYear()} Francisco Arteaga Vargas. All rights reserved.</p>
        <div className="social-links">
          <a href="https://linkedin.com" target="_blank" rel="">LinkedIn</a>
          <a href="https://twitter.com" target="_blank" rel="">X</a>
          <a href="https://facebook.com" target="_blank" rel="">Facebook</a>
        </div>
      </footer>
      <style jsx>{`
        .footer {
          background-color: #021D49;
          color: white;
          text-align: center;
          padding: 20px;
          margin-top: 20px;
        }

        .footer p {
          margin: 0 0 20px 0; /* Adjusts the bottom margin for spacing */
        }

        .social-links {
          display: flex;
          justify-content: center;
          gap: 20px; /* Creates space between links */
        }

        .social-links a {
          color: white;
          text-decoration: none;
          transition: color 0.3s ease;
        }

      `}</style>
    </>
  );
}

export default Footer