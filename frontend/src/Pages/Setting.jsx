import React, { useState, useEffect } from "react";
import axios from "axios";
import "../assets/Setting.css";
import { useNavigate } from "react-router-dom";

function Setting({ isArtist, setIsArtist }) {

    const navigate = useNavigate();
  const [userDetail, setUserDetails] = useState(null);
  const [loading, setLoading] = useState(true);

  const handleRoleChange = async () => {
    try {
      const res = await axios.patch(
        "http://localhost:4000/api/auth/change-role",
        {},
        { withCredentials: true }
      );

      if (res.data.success) {
        localStorage.setItem("role", "artist");
        setIsArtist(true);
        setUserDetails(prev => ({ ...prev, role: "artist" }));
        alert("Role updated to Artist");
        navigate("/login");
      }
    } catch (err) {
      alert("Failed to update role");
    }
  };

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get(
          "http://localhost:4000/api/auth/mydetails",
          { withCredentials: true }
        );
        setUserDetails(res.data);
      } catch (error) {
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  if (loading) {
    return <h2 style={{ textAlign: "center", marginTop: "40px" }}>Loading...</h2>;
  }

  if (!userDetail) {
    return <h2 style={{ textAlign: "center", marginTop: "40px" }}>User not found</h2>;
  }

  return (
    <div className="setting-page">

      {/* ===== User Info Card ===== */}
      <div className="userBox">
        <h3>User Details</h3>
        <p>Profile Picture:</p><img src={userDetail.profilePic} alt="profilePic" style={{width:'100px',height:"100px",borderRadius:'50%'}} />
        <p><strong>Username:</strong> {userDetail.username}</p>
        <p><strong>Email:</strong> {userDetail.email}</p>
        <p>
          <strong>Role:</strong> {userDetail.role}
          {userDetail.role === "artist" && (
            <span className="artist-badge">Artist</span>
          )}
        </p><strong>Total Musics:</strong> 
        {userDetail.musics && (
          <p>{userDetail.musics}</p>
        )}
      </div>

      {/* ===== Role Section ===== */}
      <div className="role-section">
        {isArtist ? (
          <>
            <h3>You are an Artist</h3>
            <p>Your account has artist privileges.</p>
          </>
        ) : (
          <>
            <h3>You are a User</h3>
            <p>Want to become an Artist?</p>
            <button onClick={handleRoleChange}>Change Role</button>
          </>
        )}
      </div>

    </div>
  );
}

export default Setting;