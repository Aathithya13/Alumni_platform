import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Navbar from './Navbar';

function StaffLogin() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();
  
    const handleSubmit = async (e) => {
      e.preventDefault();
      try {
        // Sending POST request to the backend API for login
        const response = await axios.post('http://localhost:5000/stafflogin', { username, password });
  
        // Checking if the token is returned in the response
        if (response.data.token) {
          // Storing the token in localStorage
          localStorage.setItem('token', response.data.token);
  
          // Navigate to the alumni dashboard on successful login
          navigate('/AdminDashBoard');
  
          // Clear the error state
          setError('');
          setMessage('Login successful!');
        } else if (response.data.error) {
          // If there's an error from the backend, display it
          setError(response.data.error);
          setMessage('');
        }
      } catch (err) {
        // General error handling for any unexpected issues
        if (err.response && err.response.status === 401) {
          setError('Invalid credentials. Please try again.');
        } else {
          setError('An error occurred during login.');
        }
        setMessage('');
      }
    };
  
    return (
      <>
        <Navbar />
        <div style={{ maxWidth: '400px', margin: '50px auto', textAlign: 'center' }}>
          <h2>Login</h2>
          <form onSubmit={handleSubmit}>
            <div style={{ marginBottom: '10px' }}>
              <label>Username:</label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                style={{ width: '100%', padding: '8px', marginTop: '5px' }}
              />
            </div>
            <div style={{ marginBottom: '20px' }}>
              <label>Password:</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                style={{ width: '100%', padding: '8px', marginTop: '5px' }}
              />
            </div>
            <button
              type="submit"
              style={{
                width: '100%',
                padding: '10px',
                backgroundColor: '#007BFF',
                color: '#fff',
                border: 'none',
                borderRadius: '5px',
                cursor: 'pointer',
              }}
            >
              Login
            </button>
            {message && <p style={{ color: 'green', marginTop: '10px' }}>{message}</p>}
            {error && <p style={{ color: 'red', marginTop: '10px' }}>{error}</p>}
          </form>
        </div>
      </>
    );
}

export default StaffLogin
