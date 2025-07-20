import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Navbar1 from './Navbar1';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faEnvelope, faLock, faBuilding, faUpload } from '@fortawesome/free-solid-svg-icons';
import '../css/StudRegister.css';

function StudRegister() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [department, setDepartment] = useState('');
  const [profileImage, setProfile] = useState();
  const navigate = useNavigate();

  const handleImage = (e) => {
    setProfile(e.target.files[0]);
  };

  const handleChange = (e) => {
    setDepartment(e.target.value);
  };

  

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    if (!profileImage) {
      alert('Please upload a profile image!');
      return;
    }
  
    const formData = new FormData();
    formData.append('username', username);
    formData.append('email', email);
    formData.append('department', department);
    formData.append('password', password);
    formData.append('profileImage', profileImage);
  
    try {
      const response = await axios.post('http://localhost:5000/studentRegister', formData, {
        headers: {
          "Content-Type": "multipart/form-data"
        }
      });
      navigate('/studentLogin');
      console.log(response.data);
    } catch (err) {
      console.error("Error: ", err);
    }
  };
  

  return (
    <div>
      <Navbar1 />
      <div className='stud-container'>
        <div className='stud-container1'>
          <div className='stud-image'>
            <img src='https://images.freeimages.com/images/premium/previews/2917/29173422-college-student-vertical.jpg' alt='Student Registration' />
          </div>
          <div className='stud-form-container'>
            <h1>Student Register</h1>
            <form onSubmit={handleSubmit}>
              <div className="stud-input-group">
                <FontAwesomeIcon icon={faUser} />
                <input
                  type='text'
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="Enter Your Username"
                  required
                />
              </div>
              <div className="stud-input-group">
                <FontAwesomeIcon icon={faEnvelope} />
                <input
                  type='email'
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter Your Email"
                  required
                />
              </div>
              <div className="stud-input-group">
                <FontAwesomeIcon icon={faBuilding} />
                <select
                  name="department"
                  value={department}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select Department</option>
                  <option value="CSE">CSE</option>
                  <option value="IT">IT</option>
                  <option value="AIDS">AIDS</option>
                </select>
              </div>
              <div className="stud-input-group">
                <FontAwesomeIcon icon={faLock} />
                <input
                  type='password'
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter Your Password"
                  required
                />
              </div>
              <div className="stud-input-group">
                <FontAwesomeIcon icon={faUpload} />
                <input
                  type='file'
                  onChange={handleImage}
                />
              </div>
              <button type='submit'>Submit</button>
              <p>Do you have an account? <a href='/studentlogin'>Login</a></p>
            </form>
            
          </div>
        </div>
      </div>
    </div>
  );
}

export default StudRegister;
