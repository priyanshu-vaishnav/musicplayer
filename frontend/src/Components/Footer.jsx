import React from "react";
import { Link } from "react-router-dom";
import "../assets/Footer.css";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="footer-container">
        {/* Footer Content */}
        <div className="footer-content">
          <div className="footer-section">
            <h3>Simple Music Player</h3>
            <p>Your favorite music streaming platform</p>
          </div>

          <div className="footer-section">
            <h4>Quick Links</h4>
            <ul>
              <li>
                <Link to="/musics">Browse Musics</Link>
              </li>
              <li>
                <Link to="/login">Login</Link>
              </li>
              <li>
                <Link to="/register">Register</Link>
              </li>
            </ul>
          </div>

          <div className="footer-section">
            <h4>For Artists</h4>
            <ul>
              <li>
                <Link to="/upload">Upload Music</Link>
              </li>
              <li>
                <Link to="/mymusics">My Musics</Link>
              </li>
              <li>
                <Link to="/myalbums">My Albums</Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="footer-bottom">
          <p>&copy; {currentYear} Simple Music Player. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
