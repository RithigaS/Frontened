import { useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import '../App.css';

export default function RegisterPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate(); // Initialize useNavigate

  async function register(ev) {
    ev.preventDefault();

    if (!username || !password) {
        alert('Please fill in all fields.');
        return;
    }

    const response = await fetch('http://localhost:4000/register', {
        method: 'POST',
        body: JSON.stringify({ username, password }), // Only username and password
        headers: { 'Content-Type': 'application/json' },
    });

    const data = await response.json();

    if (response.status === 200) {
        alert('Registration successful');
        navigate('/login'); // Redirect to Login page after success
    } else {
        alert(data.message || 'Registration failed');
    }
}


  return (
    <div className="regi">
      <form className="register" onSubmit={register}>
        <div className="reg">
          <h1>Register</h1>
          <input 
            type="text" 
            placeholder="Username" 
            value={username} 
            onChange={ev => setUsername(ev.target.value)} 
            required
          />
          <input 
            type="password" 
            placeholder="Password" 
            value={password} 
            onChange={ev => setPassword(ev.target.value)} 
            required
          />
          <button type="submit">Register</button> 
        </div>
      </form>
    </div>
  );
}
