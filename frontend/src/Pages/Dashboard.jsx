import React, { useEffect, useState } from "react";
import axios from "axios";
import "../assets/Dashboard.css";
import { API_BASE_URL } from '../config';

function Dashboard() {
  const [totalMusics, setTotalMusics] = useState(0);
  const [recentMusics, setRecentMusics] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const storedLogin = localStorage.getItem("isLoggedIn");
    setIsLoggedIn(storedLogin === "true");
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const res = await axios.get(`${API_BASE_URL}/api/music/allmusics`, { withCredentials: true });

      const musics = res.data?.musics || [];
      setTotalMusics(musics.length);
      setRecentMusics(musics.slice(0, 6));
    } catch (err) {
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="dashboardContainer">
        <h2>Loading...</h2>
      </div>
    );
  }

  return (
    <div className="dashboardContainer">
      {/* Welcome Section */}
      <section className="welcomeSection">
        <h1>Welcome to Simple Music Player</h1>
        <p>Your music streaming platform</p>
        {!isLoggedIn && (
          <div className="buttonGroup">
            <a href="/login" className="btn btnPrimary">
              Login
            </a>
            <a href="/register" className="btn btnSecondary">
              Register
            </a>
          </div>
        )}
      </section>

      {/* Stats Section */}
      <section className="statsSection">
        <div className="statCard">
          <p className="statNumber">{totalMusics}</p>
          <p className="statLabel">Total Musics</p>
        </div>
      </section>

      {/* Featured Musics Section */}
      <section className="featuredSection">
        <h2>Featured Musics</h2>
        {recentMusics.length > 0 ? (
          <div className="musicGrid">
            {recentMusics.map((music) => (
              <div key={music._id} className="musicCard">
                <div className="musicImage">
                  {music.thumbnail ? (
                    <img src={music.thumbnail} alt={music.title} />
                  ) : (
                    <div className="placeholder">🎵</div>
                  )}
                </div>
                <div className="musicInfo">
                  <h3 className="musicTitle">{music.title}</h3>
                  <p className="musicArtist">
                    {typeof music.artist === "object"
                      ? music.artist?.username || "Unknown"
                      : music.artist || "Unknown"}
                  </p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="noContent">No musics available</p>
        )}
      </section>

      {/* Navigation Links */}
      <section className="navSection">
        {isLoggedIn && (
          <div className="navLinks">
            <a href="/mymusics" className="navLink">
              My Musics
            </a>
            <a href="/upload" className="navLink">
              Upload
            </a>
            <a href="/setting" className="navLink">
              Settings
            </a>
          </div>
        )}
        <a href="/musics" className="navLink primary">
          Browse All Musics
        </a>
      </section>
    </div>
  );
}

export default Dashboard;
