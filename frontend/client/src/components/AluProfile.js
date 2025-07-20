import React, { useEffect, useState } from 'react';
import '../css/AluProfile.css'; // Import the CSS for the profile card
import Navbar from './Navbar';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const AluProfile = () => {
  const [Details, setDetails] = useState(null); // Set default state as null
  const navigate = useNavigate();

  const handleShow=()=>{
    navigate('/alumnidashboard')
  }

  useEffect(() => {
    const fetchDetails = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        navigate('/alumnilogin');
      }
      try {
        const response = await axios.get('http://localhost:5000/details', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        console.log(response.data);
        setDetails(response.data.user); // Assuming response.data.user is an object, not an array
      } catch (err) {
        console.log(err);
      }
    };
    fetchDetails();
  }, [navigate]);

  if (!Details) {
    return <p>Loading...</p>; 
  }

  return (
    <>
      <Navbar />
      <div className="profile-card">
        <div className="profile-header">
          <img
            src={`http://localhost:5000/images/${Details.profileImage}`} 
            alt="Profile"
            className="profile-img"
          />
        </div>
        <div className="profile-body">
          <h3>{Details.username}</h3>
          <p><b>Batch:</b>{Details.batch}</p>
          <p>
          <b>DOB:</b>
          {Details.dob && !isNaN(new Date(Details.dob)) 
          ? new Date(Details.dob).toISOString().split("T")[0] 
            : "Invalid Date"}
          </p>
          <p><b>Email:</b>{Details.email}</p>

          <div className="profile-stats">
            <div>
              <h4>{Details.posts.length}</h4>
              <p>Posts</p>
            </div>
          </div>

          <button className="profile-button" onClick={handleShow}>Show more</button>
        </div>
      </div>
    </>
  );
};

export default AluProfile;
