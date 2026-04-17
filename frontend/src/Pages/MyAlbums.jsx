import React, { useState, useEffect } from 'react'
import axios from 'axios'
import '../assets/MyAlbums.css'

function MyAlbums() {

  const [albums, setAlbums] = useState([])
  const [message, setMessage] = useState("")
  const [isError, setIsError] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchAlbums()
  }, [])

  const fetchAlbums = async () => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/music/myalbums`, { withCredentials: true })

      setAlbums(res.data?.albums || [])
    } catch (error) {
      setIsError(true)
      setMessage("Failed to load albums")
    } finally {
      setLoading(false)
    }
  }

  const deleteAlbum = async (id) => {
    try {
      await axios.delete(`${import.meta.env.VITE_API_BASE_URL}/api/music/deletealbum/${id}`, { withCredentials: true })

      setAlbums(prev => prev.filter(album => album._id !== id))
      setIsError(false)
      setMessage("Album deleted successfully")

    } catch (err) {
      setIsError(true)
      setMessage("Failed to delete album")
    }
  }

  setTimeout(() => {
    setMessage("")
  }, 3000)

  if (loading) {
    return <div className="myAlbumsContainer"><h3>Loading...</h3></div>
  }

  return (
    <div className="myAlbumsContainer">

      {message && (
        <p style={{ color: isError ? "red" : "green", textAlign: "center" }}>
          {message}
        </p>
      )}

      {albums.length === 0 ? (
        <h2 className="no-albums">No albums found</h2>
      ) : (
        albums.map((album) => (
          <div key={album._id} className="albumBox">

            <h3>{album.title}</h3>
            <p>{album.desc}</p>

            {album.musics?.length > 0 ? (
              album.musics.map((music) => (
                <div key={music._id} className="music-item">
                  <p>{music.title}</p>
                  {music.song && (
                    <audio controls>
                      <source src={music.song} type="audio/mpeg" />
                    </audio>
                  )}
                </div>
              ))
            ) : (
              <h3 className="no-songs" style={{ backgroundColor: "red" }}>
                No songs in this album
              </h3>
            )}

            <button
              onClick={() => deleteAlbum(album._id)}
              className="deleteAlbumBtn"
            >
              Delete Album
            </button>

          </div>
        ))
      )}

    </div>
  )
}

export default MyAlbums