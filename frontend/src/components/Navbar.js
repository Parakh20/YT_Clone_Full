import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AuthContext from '../contexts/AuthContext';

const Navbar = ({ onMenuToggle }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      // Implement search functionality
      console.log('Searching for:', searchQuery);
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <nav className="fixed top-0 left-0 right-0 bg-yt-black z-50 border-b border-yt-gray">
      <div className="flex items-center justify-between px-4 py-2">
        <div className="flex items-center space-x-4">
          <button 
            onClick={onMenuToggle}
            className="p-2 hover:bg-yt-gray rounded-full transition-colors"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
          
          <Link to="/" className="flex items-center space-x-1">
            <svg className="w-8 h-8 text-yt-red" fill="currentColor" viewBox="0 0 24 24">
              <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.43L15.818 12l-6.273 3.568z"/>
            </svg>
            <span className="text-xl font-semibold">YouTube Clone</span>
          </Link>
        </div>

        <form onSubmit={handleSearch} className="flex-1 max-w-2xl mx-8">
          <div className="flex">
            <input
              type="text"
              placeholder="Search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="flex-1 px-4 py-2 bg-yt-darker border border-yt-gray rounded-l-full focus:outline-none focus:border-yt-blue"
            />
            <button 
              type="submit"
              className="px-6 py-2 bg-yt-gray border border-yt-gray rounded-r-full hover:bg-yt-light-gray transition-colors"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </button>
          </div>
        </form>

        <div className="flex items-center space-x-4">
          {user ? (
            <>
              <Link 
                to="/upload"
                className="p-2 hover:bg-yt-gray rounded-full transition-colors"
                title="Upload Video"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
                </svg>
              </Link>
              
              <div className="relative group">
                <button className="flex items-center space-x-2 p-2 hover:bg-yt-gray rounded-full transition-colors">
                  <div className="w-8 h-8 bg-yt-blue rounded-full flex items-center justify-center">
                    <span className="text-sm font-semibold">
                      {user.username.charAt(0).toUpperCase()}
                    </span>
                  </div>
                </button>
                
                <div className="absolute right-0 mt-2 w-48 bg-yt-dark border border-yt-gray rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all">
                  <Link 
                    to="/dashboard" 
                    className="block px-4 py-2 hover:bg-yt-gray rounded-t-lg"
                  >
                    Your Channel
                  </Link>
                  <Link 
                    to="/watch-later" 
                    className="block px-4 py-2 hover:bg-yt-gray"
                  >
                    Watch Later
                  </Link>
                  <button 
                    onClick={handleLogout}
                    className="block w-full text-left px-4 py-2 hover:bg-yt-gray rounded-b-lg"
                  >
                    Sign Out
                  </button>
                </div>
              </div>
            </>
          ) : (
            <Link 
              to="/login"
              className="px-4 py-2 border border-yt-blue text-yt-blue rounded-full hover:bg-yt-blue hover:text-white transition-colors"
            >
              Sign In
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
