import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "../assets/Navbar.css";
import menu from "../assets/menu.png";
import { useTheme } from "../hooks/useTheme";

const Navbar = ({ isArtist, isLoggedIn, setIsLoggedIn, setIsArtist }) => {

  const navigate = useNavigate();
  const [showMenu, setShowMenu] = useState(false);
  const { isDark, toggleTheme } = useTheme();

  const handleLogout = async () => {
    try {
      await axios.post(
        "http://localhost:4000/api/auth/logout",
        {},
        { withCredentials: true }
      );

      localStorage.removeItem("role");
      localStorage.removeItem("isLoggedIn");
      setIsLoggedIn(false);
      setIsArtist(false);
      navigate("/login");
    } catch (error) {
    }
  };

  const handleHamburger = () => {
    setShowMenu(prev => !prev);
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-logo">
          MusicApp
        </Link>

          <div className="hamburger" onClick={handleHamburger}>
            <img src={menu} alt="menu" width="29px" />
          </div>
        <div className={`nav-links ${showMenu ? "active" : ""}`}>


          {!isLoggedIn && <Link to="/register" className="nav-link">Register</Link>}
          {!isLoggedIn && <Link to="/login" className="nav-link">Login</Link>}
          {isArtist && isLoggedIn && <Link to="/upload" className="nav-link">Upload</Link>}
          {!isArtist && isLoggedIn && <Link to="/musics" className="nav-link">Musics</Link>}
          {isArtist && isLoggedIn && <Link to="/mymusics" className="nav-link">MyMusics</Link>}
          {isLoggedIn && <Link to="/myalbums" className="nav-link">MyAlbums</Link>}
          {isLoggedIn && <Link to="/setting" className="nav-link">Setting</Link>}
          
          <button className="theme-toggle" onClick={toggleTheme} title={isDark ? "Light Mode" : "Dark Mode"}>
            {isDark ? "☀️" : "🌙"}
          </button>

          {isLoggedIn && (
            <button onClick={handleLogout} className="logout-btn">
              Logout
            </button>
          )}

        </div>
      </div>
    </nav>
  );
};

export default Navbar;