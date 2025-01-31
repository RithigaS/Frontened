import React, { useState, useEffect } from 'react';

const ProfilePage = () => {
  const [username, setUsername] = useState('');
  const [portfolio, setPortfolio] = useState('');
  const [blogsCount, setBlogsCount] = useState(0);
  const [bio, setBio] = useState('');
  const [github, setGithub] = useState('');
  const [linkedin, setLinkedin] = useState('');
  const [twitter, setTwitter] = useState('');
  const [skills, setSkills] = useState('');
  const [profilePicture, setProfilePicture] = useState(null);  // Added state for profile picture
  const [picturePreview, setPicturePreview] = useState(null);  // To display the preview

  useEffect(() => {
    const token = localStorage.getItem('token');
    const storedUsername = localStorage.getItem('username');

    if (storedUsername) {
      setUsername(storedUsername);
    }

    if (token) {
      fetch('http://localhost:4000/profile', {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((res) => res.json())
        .then((data) => {
          setPortfolio(data.portfolio || '');
          setBlogsCount(data.blogsCount || 0);
          setBio(data.bio || '');
          setGithub(data.github || '');
          setLinkedin(data.linkedin || '');
          setTwitter(data.twitter || '');
          setSkills(data.skills || '');
          // Assuming the backend provides a profile picture URL (update accordingly)
          setProfilePicture(data.profilePicture || null);  
        })
        .catch((err) => {
          console.error('Error fetching profile data:', err);
          alert('Error loading profile data');
        });
    }
  }, []);

  const handleSave = () => {
    const storedUsername = localStorage.getItem('username');
    if (!storedUsername) {
      alert('Username not found, please log in again.');
      return;
    }

    const body = {
      username: storedUsername,
      portfolio,
      bio,
      github,
      linkedin,
      twitter,
      skills,
      // Include profilePicture if there's one
      profilePicture,
    };

    fetch('http://localhost:4000/profile', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.message === 'Profile updated successfully') {
          alert('Profile updated successfully!');
        } else {
          alert(data.message || 'Failed to update profile');
        }
      })
      .catch((err) => {
        console.error('Error updating profile:', err);
        alert('Failed to update profile');
      });
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    window.location.href = '/';
  };

  // Handle file upload
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setProfilePicture(file);  // Update the profilePicture state
      setPicturePreview(URL.createObjectURL(file));  // Display preview of the image
    }
  };

  return (
    <div className="profile-page">
      <h2>Profile</h2>

      {/* Profile Picture Section moved to the top */}
      <div>
        <label><strong>Profile Picture:</strong></label>
        <div>
          {/* Display current profile picture */}
          {profilePicture && (
            <img src={picturePreview || URL.createObjectURL(profilePicture)} alt="Profile" width="100" height="100" />
          )}
          <div>
            <input type="file" onChange={handleFileChange} />
            <p>Click to upload a profile picture</p>
          </div>
        </div>
      </div>

      <div className="profile-info">
        <p><strong>Username:</strong> {username || 'Username not available'}</p>

        <label><strong>Portfolio Link:</strong></label>
        <input type="url" value={portfolio} onChange={(e) => setPortfolio(e.target.value)} placeholder="Enter your portfolio URL" />

        <label><strong>Bio:</strong></label>
        <textarea value={bio} onChange={(e) => setBio(e.target.value)} placeholder="Write a short bio..." />

        <label><strong>GitHub:</strong></label>
        <input type="url" value={github} onChange={(e) => setGithub(e.target.value)} placeholder="GitHub profile URL" />

        <label><strong>LinkedIn:</strong></label>
        <input type="url" value={linkedin} onChange={(e) => setLinkedin(e.target.value)} placeholder="LinkedIn profile URL" />

        <label><strong>Twitter:</strong></label>
        <input type="url" value={twitter} onChange={(e) => setTwitter(e.target.value)} placeholder="Twitter profile URL" />

        <label><strong>Skills:</strong></label>
        <input type="text" value={skills} onChange={(e) => setSkills(e.target.value)} placeholder="e.g. React, Node.js, MongoDB" />

        <p><strong>Blogs Created:</strong> {blogsCount !== undefined ? blogsCount : 'Loading...'}</p>
      </div>

      <div className="modal-actions">
        <button className="logout-btn" onClick={handleLogout}>Logout</button>
        <button className="save-btn" onClick={handleSave}>Save Changes</button>
      </div>
    </div>
  );
};

export default ProfilePage;
