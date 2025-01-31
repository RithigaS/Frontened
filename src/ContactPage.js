import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate hook for navigation
import './App.css';

const Footer = () => {
  const [email, setEmail] = useState('');
  const navigate = useNavigate(); // Initialize useNavigate hook

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here (e.g., send email or API call)
    alert('Form submitted!');
  };

  const handleSubscribe = (e) => {
    e.preventDefault();
    // Handle the subscription logic here, open email client with pre-filled message
    const subject = 'Subscription Successful';
    const body = `Thank you for subscribing! Your email is: ${email}`;
    const mailtoLink = `mailto:rithigasadhasivam@gamail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    
    // Redirect to mailto link
    window.location.href = mailtoLink;

    // After sending email, show success message
    alert('Subscription successful! Check your email for confirmation.');
  };

  const handleLogout = () => {
    // Clear any user session data or authentication tokens here
    localStorage.removeItem('authToken'); // For example, remove authentication token

    alert('Logging out...');
    navigate('/login'); // Navigate to the login page
  };

  return (
    <div>
      <link
        rel="stylesheet"
        href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.7.2/css/all.min.css"
        integrity="sha512-Evv84Mr4kqVGRNSgIGL/F/aIDqQb7xQ2vcrdIwxfjThSH8CSR7PBEakCr51Ck+w+/U6swU2Im1vVX0SVk9ABhg=="
        crossOrigin="anonymous"
        referrerPolicy="no-referrer"
      />
      <footer className="footer">
        {/* Contact Form */}
        <div className="contact-form">
          <h3>Contact Us</h3>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="name">Name</label>
              <input type="text" id="name" name="name" placeholder="Your Name" required />
            </div>
            <div className="form-group">
              <label htmlFor="location">Location</label>
              <input type="text" id="location" name="location" placeholder="Your Location" required />
            </div>
            <div className="form-group">
              <label htmlFor="message">Message</label>
              <textarea id="message" name="message" placeholder="Your Message" required></textarea>
            </div>
            <button type="submit" className="submit-button">Send Message</button>
          </form>
        </div>

        {/* Subscribe Section */}
        <div className="subscribe-section">
          <h3>Subscribe to Our Blog</h3>
          <form onSubmit={handleSubscribe} className="subscribe-form">
            <input
              type="email"
              id="subscribe-email"
              name="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <button type="submit" className="subscribe-button">Subscribe</button>
          </form>
        </div>

        {/* Logout Button */}
        <div className="logout-section">
          <button className="logout-button" onClick={handleLogout}>
            Logout
          </button>
        </div>

        {/* Social Media Links */}
        <div className="footer-social-media">
          <div className="footer-social-links">
            <a href="https://www.facebook.com" className="social-icon" aria-label="Facebook">
              <i className="fa-brands fa-facebook"></i>
            </a>
            <a href="https://youtube.com" className="social-icon" aria-label="YouTube">
              <i className="fa-brands fa-youtube"></i>
            </a>
            <a href="https://www.instagram.com" className="social-icon" aria-label="Instagram">
              <i className="fa-brands fa-instagram"></i>
            </a>
            <a href="https://www.twitter.com" className="social-icon" aria-label="Twitter">
              <i className="fa-brands fa-twitter"></i>
            </a>
            <a href="https://github.com/RithigaS" className="social-icon" aria-label="GitHub">
              <i className="fa-brands fa-github"></i>
            </a>
            <a href="https://wa.me/9342813454" className="social-icon" aria-label="WhatsApp">
              <i className="fa-brands fa-whatsapp"></i>
            </a>
            <a href="mailto:rithigasadhasivam@gamail.com" className="social-icon" aria-label="Email">
              <i className="fa-solid fa-envelope"></i>
            </a>
          </div>
        </div>

        {/* Footer Bar */}
        <div className="footer-bar">
          <p className="footer-copy">
            Copyright &copy; 2025; Designed by <b>Rithiga</b>
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Footer;
