import React, { useEffect, useState } from 'react';
import '../css/Profile.css'; 
import { useParams,useNavigate } from 'react-router-dom';
import axios from 'axios';
import Navbar1 from './Navbar1';

const Profile = () => {
  const [Details, setDetails] = useState(null); 
  const { id } = useParams(); 
  const navigate = useNavigate();
  
  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/profile/${id}`);
        console.log(response.data);
        setDetails(response.data.user);
      } catch (err) {
        console.log(err);
      }
    };
    fetchDetails();
  }, [id]);

  if (!Details) {
    return <p>Loading...</p>; 
  }

  const formatDate = (dob) => {
    const date = new Date(dob);
    return date.toISOString().split('T')[0]; 
  };

  const ViewPost=(id)=>{
    navigate(`/post1/${id}`)
  }

  return (
    <>
      <Navbar1 />
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
          <p><b>Batch:</b> {Details.batch}</p>
          <p><b>DOB:</b> {Details.dob ? formatDate(new Date(Details.dob).toISOString().split("T")[0]) : "N/A"}</p>
          <p><b>Email:</b> {Details.email}</p>

          <div className="profile-stats">
            <div>
              <h4>{Details.posts.length}</h4>
              <p>Posts</p>
            </div>
          </div>
        </div>
      </div>

      <div className="posts-section">
        <h1>User's Posts</h1>
        <div className="posts-grid">
          {Details.posts.map((post, index) => (
            <div key={post._id} className="post-card">
              <img
                src={`http://localhost:5000/posts/${post.image}`} 
                alt={`Post ${index + 1}`}
                className="post-img"
              />
              <div className="post-overlay">
                <p>Description:{post.description}</p>
                <a href={post.reference}>Reference</a>
                <button className='button' onClick={()=>{ViewPost(post._id)}}>View Post</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Profile;
