import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';

const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();  // Use useLocation hook to get current route
  const subtitles = [
    "📖 Explore new ideas, one post at a time!",
    "✍️ Write, Share, and Inspire the world!",
    "📢 Your thoughts deserve to be heard!",
    "🎨 Creativity begins with a single word!",
    "🌍 Connect with writers across the globe!",
    "🔥 Start your journey to becoming a great blogger!"
  ];

  const [subtitleIndex, setSubtitleIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setSubtitleIndex((prevIndex) => (prevIndex + 1) % subtitles.length);
    }, 1000);

    return () => clearInterval(interval);
  }, [subtitles.length]);

  return (
    <div className="head">
      {/* Fixed Navbar */}
      <header className="header">
        <nav className="nav">
          <Link to="/home" className="nav-btn">Home</Link>
          <Link to="/blogs" className="nav-btn">Blog</Link>
          <Link to="/blogs/create" className="nav-btn">Create Post</Link>
          <Link to="/profile" className="nav-btn">Profile</Link>
          <Link to="/contact" className="nav-btn">Contact</Link>
        </nav>
      </header>

      <main className="main">
        {/* Conditionally render background image and subtitle */}
        {/* Only show this content when not on the Create Post page */}
        {location.pathname !== "/blogs/create" && location.pathname !== "/blogs" && (
          <div className="welcome-container">
            <h1 className="welcome-text">✨ Welcome to Our Blog! ✨</h1>
            <p className="sub-text">{subtitles[subtitleIndex]}</p>

            <button className="create-post-btn" onClick={() => navigate('/blogs/create')}>
              ✨ Create a Post ✨
            </button>
          </div>
        )}
      </main>
    </div>
  );
};

export default Header;
