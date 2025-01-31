import React from "react";
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from "react-router-dom";
import "./App.css";
import IndexPage from "./Pages/IndexPage";
import RegisterPage from "./Pages/RegistrationPage";
import LoginPage from "./Pages/LoginPage";
import { UserContextProvider } from "./UserContext";
import CreateBlogPage from "./Pages/CreateBlogPage";
import Header from "./Header";
import About from "./About";
import Post from "./ContactPage"; // Ensure Post is used for /contact
import MyBlogPage from "./Pages/MyBlogPage";
import ProfilePage from "./Pages/ProfilePage";


const App = () => {
  return (
    <UserContextProvider>
      <Router>
        <AppContent />
      </Router>
    </UserContextProvider>
  );
};

const AppContent = () => {
  const location = useLocation(); // Get the current location

  // List of routes where we don't want the video to be displayed
  const noVideoRoutes = [
    "/login", 
    "/register", 
    "/blogs/create", 
    "/about", 
    "/contact", 
    "/home", 
    "/blogs", 
    "/profile"
  ];

  return (
    <div className="app-container">
      {/* Conditionally render the video only on specific routes */}
      {!noVideoRoutes.includes(location.pathname) && (
        <div className="vid">
          <video autoPlay loop muted style={{ width: '85%', height: '85%', objectFit: 'cover' }}>
            <source src="https://cdn.dribbble.com/users/1145170/screenshots/14074857/media/257c5590a684ef3a9c76fd48f33b7d2d.mp4" type="video/mp4" />
          </video>
        </div>
      )}

      {/* Conditional Header content */}
      {location.pathname === "/" && (
        <div className="header-content">
          <div className="header-content-box">
            <h1 className="blog-intro">Welcome to Our Creative Blog</h1>
            <h2 className="subtitle">
              Dive into a world of inspiration, creativity, and stories that move you.<br />
              Join our community and be part of the conversation!
            </h2>
            <Link to="/login">
              <button className="start-button">Start Your Journey</button>
            </Link>
          </div>
        </div>
      )}

      {/* Routes for different pages */}
      <Routes>
        <Route index element={<IndexPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/blogs" element={<MyBlogPage />} />
        <Route path="/blogs/create" element={<CreateBlogPage />} />
        <Route path="/home" element={<Header />} />
        <Route path="/about" element={<About />} />
        {/* Updated route for /contact, using ContactPage component */}
        <Route path="/contact" element={<Post />} />
        <Route path="/profile" element={<ProfilePage />} />
      </Routes>
    </div>
  );
};

export default App;
