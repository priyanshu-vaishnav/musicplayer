import axios from "axios";
import React, { useEffect, useState } from "react";
import "../assets/MyMusics.css";

function MyMusics() {

  const [musics, setMusics] = useState([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    fetchMyMusics();
  }, []);

  const fetchMyMusics = async () => {
    try {
      const res = await axios.get(
        "http://localhost:4000/api/music/mymusics",
        { withCredentials: true }
      );

      setMusics(res.data?.musics || []);
      setIsError(false);
      setMessage("");

    } catch (err) {
      setIsError(true);
      setMessage(
        err.response?.data?.msg || "Failed to load musics"
      );
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="myMusicsContainer">
        <h3>Loading...</h3>
      </div>
    );
  }

  return (
    <div className="myMusicsContainer">

      <h2>My Musics</h2>

      {message && (
        <p style={{ color: isError ? "red" : "green" }}>
          {message}
        </p>
      )}

      {musics.length === 0 ? (
        <p>No musics found.</p>
      ) : (
        <div className="musicGrid">
          {musics.map((music) => (
            <div key={music._id} className="musicBox">

              <h3>{music.title}</h3>
              <p>{music.desc}</p>

              {music.artist?.profilePic && (
                <img
                  src={music.artist.profilePic}
                  alt="noImage"
                  className="artistImg"
                />
              )}

              {music.song && (
                <audio controls className="audioPlayer">
                  <source src={music.song} type="audio/mpeg" />
                </audio>
              )}

            </div>
          ))}
        </div>
      )}

    </div>
  );
}

export default MyMusics;