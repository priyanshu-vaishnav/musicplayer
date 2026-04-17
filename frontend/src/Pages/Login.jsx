import React, { useState } from 'react'
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom'
import '../assets/Login.css'
import { API_BASE_URL } from '../config'

export default function Login({ setIsLoggedIn, setIsArtist }) {

  const navigate = useNavigate()

  const [email, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [message, setMessage] = useState("")
  const [isError, setIsError] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!email || !password) {
      setIsError(true)
      setMessage("All fields are required")
      return
    }

    try {
      const res = await axios.post(`${API_BASE_URL}/api/auth/login`, { email, password }, { withCredentials: true })

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
            <label>Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter your email"
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