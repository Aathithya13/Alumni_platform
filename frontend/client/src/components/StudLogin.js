import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Navbar1 from './Navbar1';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faLock } from '@fortawesome/free-solid-svg-icons';
import '../css/StudLogin.css'; // Importing CSS styles

function StudLogin() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/studentLogin', {
        username,
        password,
      });
      if (response.data.token) {
        localStorage.setItem('token', response.data.token);
        navigate('/studentDashBoard');
      } else {
        console.log(response.data.err);
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <Navbar1 />
      <div className="Container">
        <div className="Container1">
          <div className="img-Container">
            <img
              src="https://th.bing.com/th/id/OIP.ZG-mtqOAnZhuypUgOmzGbgHaE8?w=259&h=180&c=7&r=0&o=5&dpr=1.3&pid=1.7"
              alt="Student Login"
            />
          </div>
          <div className="form-Container">
            <h1>Student Login</h1>
            <form onSubmit={handleSubmit}>
              <div className="input-container">
                <FontAwesomeIcon icon={faUser} className="input-icon" />
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="Enter Your username"
                  required
                />
              </div>
              <div className="input-container">
                <FontAwesomeIcon icon={faLock} className="input-icon" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  required
                />
              </div>
              <button type="submit">Submit</button>
            </form>
            <p>
              Do you want to <a href="/studentregister">SignUp</a>?
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default StudLogin;
