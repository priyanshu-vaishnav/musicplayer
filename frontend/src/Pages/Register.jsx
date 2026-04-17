import React, { useState } from 'react'
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom'
import '../assets/Register.css'
import { API_BASE_URL } from '../config'

export default function Register() {

  const navigate = useNavigate()

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    role: ""
  })

  const [profilePic, setProfilePic] = useState(null)
  const [message, setMessage] = useState("")
  const [isError, setIsError] = useState(false)

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!formData.username || !formData.email || !formData.password || !formData.role) {
      setIsError(true)
      setMessage("All fields are required")
      return
    }

    const data = new FormData()
    data.append("username", formData.username)
    data.append("email", formData.email)
    data.append("password", formData.password)
    data.append("role", formData.role)
    if (profilePic) {
      data.append("profilePic", profilePic)
    }

    try {
      const res = await axios.post(`${API_BASE_URL}/api/auth/register`, data, { headers: { "Content-Type": "multipart/form-data" } })

      setIsError(false)
      setMessage("Registration successful")
      navigate("/login")

    } catch (err) {
      setIsError(true)
      setMessage(err.response?.data?.message || "Registration failed")
    }
  }

  return (
    <div className="register-container">
      <div className="register-card">

        <div className="register-header">
          <h1>Create Account</h1>
          <p>Join us to explore amazing music</p>
        </div>

        {message && (
          <p style={{ color: isError ? "red" : "green", textAlign: "center" }}>
            {message}
          </p>
        )}

        <form onSubmit={handleSubmit} className="register-form">

          <div className="form-group">
            <label>Username</label>
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              placeholder="Enter username"
            />
          </div>

          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter email"
            />
          </div>

          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter password"
            />
          </div>

          <div className="form-group">
            <label>Role</label>
            <select
              name="role"
              value={formData.role}
              onChange={handleChange}
            >
              <option value="">Select Role</option>
              <option value="user">User</option>
              <option value="artist">Artist</option>
            </select>
          </div>

          <div className="form-group">
            <label>Profile Picture</label>
            <input
              type="file"
              onChange={(e) => setProfilePic(e.target.files[0])}
            />
          </div>

          <button type="submit" className="register-button">
            Register
          </button>

        </form>

        <div className="register-footer">
          <p>
            Already have an account? <Link to="/login">Login here</Link>
          </p>
        </div>

      </div>
    </div>
  )
}