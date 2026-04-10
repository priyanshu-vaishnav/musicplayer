import React, { useState, useEffect } from 'react'
import axios from 'axios'
import '../assets/uploadMusic.css'


export default function UploadMusic({isArtist}) {

  const [file, setFile] = useState(null)
  const [title, setTitle] = useState("")
  const [desc, setDesc] = useState("")
  const [loading, setLoading] = useState(false)
  const [msg,setMsg] = useState("")

    const handleSubmit = async (event) => {
        event.preventDefault()

        const formData = new FormData()
        formData.append("music", file)
        formData.append("title", title)
        formData.append("desc", desc)

        try {
          setLoading(true)
          await axios.post(
            "http://localhost:4000/api/music/upload",
            formData,
            {
              withCredentials: true
            }
          )
          setMsg('Upload successful')
        } catch (error) {
          setMsg(error.response?.data?.message || 'Upload failed')
        } finally {
          setLoading(false)
        }
    }

    useEffect(() => {
      if (msg) {
        const timer = setTimeout(() => {
          setMsg("")
        }, 5000)
        return () => clearTimeout(timer)
      }
    }, [msg])

   return (
     <div className="upload-container">
    
  
    <form className="upload-form" onSubmit={handleSubmit}>
      <h1>Upload Music</h1>

    
      <div className="form-group">
        <label>Song</label>
        <input
          type="file"
          onChange={(e) => setFile(e.target.files[0])}
          required
        />
        {file && <div className="muted">Selected: {file.name}</div>}
      </div>

      <div className="form-group">
        <label>Title</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
      </div>

      <div className="form-group">
        <label>Description</label>
        <input
          type="text"
          value={desc}
          onChange={(e) => setDesc(e.target.value)}
          required
        />
      </div>

      <button type="submit" className="upload-btn" disabled={!file || loading}>
        {loading ? 'Uploading...' : 'Upload'}
      </button>
     
   {isArtist ? null:<p style={{backgroundColor:"red",padding:'10px',borderRadius:'10px'}}>Please login as artist to upload musics !</p>}
   {msg && <p>{msg}</p>}
    </form>

  </div>
)

}
