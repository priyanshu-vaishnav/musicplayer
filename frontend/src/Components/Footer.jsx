import React from "react";
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
                <a href="/musics">Browse Musics</a>
              </li>
              <li>
                <a href="/login">Login</a>
              </li>
              <li>
                <a href="/register">Register</a>
              </li>
            </ul>
          </div>

          <div className="footer-section">
            <h4>For Artists</h4>
            <ul>
              <li>
                <a href="/upload">Upload Music</a>
              </li>
              <li>
                <a href="/mymusics">My Musics</a>
              </li>
              <li>
                <a href="/myalbums">My Albums</a>
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
