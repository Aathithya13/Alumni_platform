import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Navbar3 from './Navbar3';


function StaffRegister() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [dept, setDept] = useState('');
  const [password, setPassword] = useState('');
  
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Clear previous messages
    setError('');
    setMessage('');

    // Validate data
    if (!username || !email || !dept || !password) {
      setError('All fields are required.');
      return;
    }

    const formData = new FormData();
    formData.append('username', username);
    formData.append('email', email);
    formData.append('dept', dept);
    formData.append('password', password);

    try {
      const response = await axios.post('http://localhost:5000/staffregister', formData, {
        headers: {
          'Content-Type': 'application/json'
        }
      });

      setMessage(response.data.message);
      navigate('/StaffLogin');
    } catch (err) {
      // Display error message from server
      if (err.response && err.response.data && err.response.data.error) {
        setError(err.response.data.error);
      } else {
        setError('An error occurred. Please try again.');
      }
    }
  };

  return (
    <>
      <Navbar3/>
      <div className="container mt-5">
        <h2 className="text-center mb-4">Register</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="username" className="form-label">Username:</label>
            <input
              type="text"
              className="form-control"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">Email:</label>
            <input
              type="email"
              className="form-control"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="dept" className="form-label">Department:</label>
            <input
              type="text"
              className="form-control"
              id="dept"
              value={dept}
              placeholder="Eg. CSE"
              onChange={(e) => setDept(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label">Password:</label>
            <input
              type="password"
              className="form-control"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="text-center">
            <button type="submit" className="btn btn-primary">Register</button>
          </div>
          {message && <p className="text-success text-center mt-3">{message}</p>}
          {error && <p className="text-danger text-center mt-3">{error}</p>}
        </form>
      </div>
    </>
  );
}

export default StaffRegister;
