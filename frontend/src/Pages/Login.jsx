import React, { useState } from 'react'
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom'
import '../assets/Login.css'

export default function Login({ setIsLoggedIn, setIsArtist }) {

  const navigate = useNavigate()

  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [message, setMessage] = useState("")
  const [isError, setIsError] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!username || !password) {
      setIsError(true)
      setMessage("All fields are required")
      return
    }

    try {
      const res = await axios.post(
        "http://localhost:4000/api/auth/login",
        { username, password },
        { withCredentials: true }
      )

      if (res.data?.user) {
        localStorage.setItem("isLoggedIn", "true")
        localStorage.setItem("role", res.data.user.role)

        setIsLoggedIn(true)
        setIsArtist(res.data.user.role === "artist")

        setIsError(false)
        setMessage("Login successful")

        navigate("/")
      }

    } catch (err) {
      setIsError(true)
      setMessage(err.response?.data?.message || "Login failed")
    }
  }

  return (
    <div className="login-container">
      <div className="login-card">

        <div className="login-header">
          <h1>Welcome Back</h1>
          <p>Login to continue to your account</p>
        </div>

        {message && (
          <p style={{ color: isError ? "red" : "green", textAlign: "center" }}>
            {message}
          </p>
        )}

        <form onSubmit={handleSubmit} className="login-form">

          <div className="form-group">
            <label>Username</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter your username"
            />
          </div>

          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
            />
          </div>

          <button type="submit" className="login-button">
            Login
          </button>

        </form>

        <div className="login-footer">
          <p>
            Don't have an account? <Link to="/register">Register here</Link>
          </p>
        </div>

      </div>
    </div>
  )
}