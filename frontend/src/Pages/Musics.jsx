import React, { useEffect, useState } from "react";
import axios from "axios";
import "../assets/Musics.css";

function Musics() {

  const [musics, setMusics] = useState([]);
  const [selectedIds, setSelectedIds] = useState([]);
  const [isSelecting, setIsSelecting] = useState(false);
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [message, setMessage] = useState("");
  const [isError, setIsError] = useState(false);
  const [userId, setUserId] = useState(null);
  const [isLoading ,setIsLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredMusics, setFilteredMusics] = useState([]);


 

  const fetchMusics = async () => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/music/allmusics`, { withCredentials: true });


      setMusics(res.data?.musics || []);
      setFilteredMusics(res.data?.musics || []);
      setUserId(res.data.user)
      setIsLoading(false)

    } catch (error) {
      setIsError(true);
      setMessage("Failed to load musics");
    }
  };

  const handleSearch = async (query) => {
    if (!query.trim()) {
      setFilteredMusics(musics);
      return;
    }

    try {
      const res = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/music/search?query=${encodeURIComponent(query)}`, { withCredentials: true });
      setFilteredMusics(res.data?.musics || []);
    } catch (error) {
      setIsError(true);
      setMessage("Failed to search musics");
      setFilteredMusics(musics);
    }
  };
  


  const toggleSelect = () => {
    if (isSelecting) {
      setSelectedIds([]);
    }
    setIsSelecting(!isSelecting);
  };

  const handleSelect = (id) => {
    if (!isSelecting) return;

    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]);
  };


  const handleLikeCount = async (id) => {
    const res = await axios.post(`${import.meta.env.VITE_API_BASE_URL}/api/music/like/${id}`, {}, { withCredentials: true });
    fetchMusics();

  };

   useEffect(() => {
    fetchMusics();
  }, []);  
  console.log(userId);

  useEffect(() => {
    const debounceTimer = setTimeout(() => {
      handleSearch(searchQuery);
    }, 300);

    return () => clearTimeout(debounceTimer);
  }, [searchQuery, musics]);


  const handleSubmit = async () => {

    if (!title || selectedIds.length === 0) {
      setIsError(true);
      setMessage("Title and at least one music required");
      return;
    }

    try {
      await axios.post(`${import.meta.env.VITE_API_BASE_URL}/api/music/createalbum`, { title, desc, musicIds: selectedIds }, { withCredentials: true });

      setIsError(false);
      setMessage("Album created successfully");

      setTitle("");
      setDesc("");
      setSelectedIds([]);
      setIsSelecting(false);

    } catch (error) {
      setIsError(true);
      setMessage(error.response?.data?.message || "Failed to create album");
    }
  };

  

  return (

    <div className="musics-container">
      {isLoading && <h2>Loading...</h2>}

      <div className="musics-header">
        <h2>Music Library</h2>
        <div className="search-container">
          <input
            type="text"
            placeholder="Search music by title or description..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="search-input"
          />
        </div>
        <button onClick={toggleSelect} className="select-btn">
          {isSelecting ? "Cancel Selection" : "Start Selection"}
        </button>
      </div>



      <div className="music-grid">
        {filteredMusics.map((item) => (
          <div
            key={item._id}
            onClick={() => handleSelect(item._id)}
            className={`music-card ${selectedIds.includes(item._id) ? "selected" : ""
              }`}
          >
            <h3>{item.title}</h3>
            <p>{item.desc}</p>

            {item.song && (
              <audio controls src={item.song} />
            )}

            <div className="artistInfo">
              <p>Artist: {item.artist?.username || "Unknown Artist"}</p>

              {item.artist?.profilePic && (
                <img
                  src={item.artist.profilePic}
                  alt="not found"
                  width="50"
                />
              )}
            </div>




            <img
              src= "../src/assets/love.png"
              alt=""
              width="30px"
              style={{ backgroundColor: item.likedBy?.includes(userId) ? "red" : "white", borderRadius: '20px', border: '2px solid var(--border)', cursor: 'pointer' }}
              onClick={(e) => {
                e.stopPropagation();
                handleLikeCount(item._id);
              }}
            />

            <p>Liked by:{item.likedBy.length}</p>

          </div>
        ))}
      </div>

      {message && (
        <p style={{ color: isError ? "red" : "green" }}>
          {message}
        </p>
      )}

      <div className="publish-section">
        <h3>Create Album</h3>

        <input
          type="text"
          placeholder="Album Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <input
          type="text"
          placeholder="Album Description"
          value={desc}
          onChange={(e) => setDesc(e.target.value)}
        />

        <button onClick={handleSubmit} className="publish-btn">
          Publish Album
        </button>
      </div>

    </div>
  );
}

export default Musics;