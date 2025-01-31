import React, { useState, useContext } from 'react';
import { Link, Navigate } from 'react-router-dom'; // Import Navigate for redirection
import { UserContext } from '../UserContext';

const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const { setUserInfo } = useContext(UserContext); 
  const [redirect, setRedirect] = useState(false); // State to handle redirection
  const [successMessage, setSuccessMessage] = useState(''); // New state for success message

  async function login(ev) {
    ev.preventDefault();
    try {
      const response = await fetch('http://localhost:4000/login', {
        method: 'POST',
        body: JSON.stringify({ username, password }),
        headers: { 'Content-Type': 'application/json' },
      });
  
      const data = await response.json();
      if (response.ok) {
        // Set username in UserContext
        setUserInfo({ username: data.username });
  
        // Store username in localStorage for ProfilePage to access
        localStorage.setItem('username', data.username);  // Save username in localStorage
  
        setSuccessMessage("Logged in successfully! Redirecting... 🚀✨");
        alert("✅ Login Successful! 🎉🔓"); // Optional alert
        setTimeout(() => setRedirect(true), 2000); // Redirect after 2 seconds
      } else {
        alert(data.message || "Invalid Username or Password");
      }
    } catch (err) {
      console.log("Error during login:", err);
      alert("Login Failed.. Please try again");
    }
  }
  

  // Redirect to home if login is successful
  if (redirect) {
    return <Navigate to="/home" />;
  }

  return (
    <div className="login-form-container">
      <form className="login-form" onSubmit={login}>
        <div className="login-form-content">
          <h1 className="login-title">Login</h1>
          <input 
            type="text" 
            className="login-input" 
            placeholder="Username" 
            value={username} 
            onChange={ev => setUsername(ev.target.value)} 
            required
          />
          <input 
            type="password" 
            className="login-input" 
            placeholder="Password" 
            value={password} 
            onChange={ev => setPassword(ev.target.value)} 
            required
          />
          <button type="submit" className="login-btn">Login</button> 
          
          <div className="create-account-link">
            <p>Don't have an account? 
              <Link to="/register">
                <button type="button" className="create-account-btn">Create Account</button>
              </Link>
            </p>
          </div>
        </div>
        {successMessage && <div className="success-message">{successMessage}</div>}
      </form>
    </div>
  );
};

export default LoginPage;
