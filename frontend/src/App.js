import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import Home from './components/Home';
import VideoPlayer from './components/VideoPlayer';
import Upload from './components/Upload';
import Login from './components/Login';
import Register from './components/Register';
import Dashboard from './components/Dashboard';
import WatchLater from './components/WatchLater';
import AuthContext from './contexts/AuthContext';
import './App.css';

function App() {
  const [user, setUser] = useState(null);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('token');
    const userData = localStorage.getItem('user');
    
    if (token && userData) {
      setUser(JSON.parse(userData));
    }
    setLoading(false);
  }, []);

  const login = (userData, token) => {
    setUser(userData);
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(userData));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-yt-black">
        <div className="text-white text-xl">Loading...</div>
      </div>
    );
  }

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      <Router>
        <div className="bg-yt-black min-h-screen text-white">
          <Navbar 
            onMenuToggle={() => setSidebarCollapsed(!sidebarCollapsed)} 
          />
          
          <div className="flex pt-16">
            <Sidebar collapsed={sidebarCollapsed} />
            
            <main className={`flex-1 transition-all duration-300 ${
              sidebarCollapsed ? 'ml-16' : 'ml-64'
            }`}>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/video/:id" element={<VideoPlayer />} />
                <Route path="/upload" element={
                  user ? <Upload /> : <Navigate to="/login" />
                } />
                <Route path="/dashboard" element={
                  user ? <Dashboard /> : <Navigate to="/login" />
                } />
                <Route path="/watch-later" element={
                  user ? <WatchLater /> : <Navigate to="/login" />
                } />
                <Route path="/login" element={
                  !user ? <Login /> : <Navigate to="/" />
                } />
                <Route path="/register" element={
                  !user ? <Register /> : <Navigate to="/" />
                } />
              </Routes>
            </main>
          </div>
        </div>
      </Router>
    </AuthContext.Provider>
  );
}

export default App;
