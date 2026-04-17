import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Register from './Pages/Register.jsx'
import Login from './Pages/Login.jsx'
import Dashboard from './Pages/Dashboard.jsx'
import Musics from './Pages/Musics.jsx'
import UploadMusic from './Pages/UploadMusic.jsx'
import Navbar from './Components/Navbar.jsx'
import MyMusics from './Pages/MyMusics.jsx'
import MyAlbums from './Pages/MyAlbums.jsx'
import Setting from './Pages/Setting.jsx'
import Footer from './Components/Footer.jsx'
import './App.css'
import { useState, useEffect } from 'react'
import { ThemeProvider } from './context/ThemeContext'

function App() {

  const [isArtist, setIsArtist] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);


  useEffect(() => {
    const storedLogin = localStorage.getItem("isLoggedIn");
    const role = localStorage.getItem("role");

    

    if (storedLogin === "true") {
      setIsLoggedIn(true);
      setIsArtist(role === "artist");
    }
  }, []);
  return (
    <ThemeProvider>
      <BrowserRouter>
        <Navbar
          isArtist={isArtist}
          setIsArtist={setIsArtist}
          isLoggedIn={isLoggedIn}
          setIsLoggedIn={setIsLoggedIn}
        />
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login setIsLoggedIn={setIsLoggedIn} setIsArtist={setIsArtist}/>}/>
          <Route path="/musics" element={<Musics />} />
          <Route path="/upload" element={<UploadMusic isArtist={isArtist} />} />
          <Route path='/mymusics' element={<MyMusics isArtist={isArtist} />} />
          <Route path='/myalbums' element={<MyAlbums />} />
          <Route path='/setting' element={<Setting isArtist={isArtist} setIsArtist={setIsArtist} />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </ThemeProvider>
  )
}

export default App
