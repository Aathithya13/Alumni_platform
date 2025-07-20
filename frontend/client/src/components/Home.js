import React, { useState, useEffect } from 'react';
import Navbar2 from './Navbar2';
import '../css/Home.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function Home() {
  const [posts, setPosts] = useState([]);
  const [category, setCategory] = useState('Event');
  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/option');
  }

  const handlePost=()=>{
    navigate('/option');
  }

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/category?category=${category}`);
        setPosts(response.data);
      } catch (err) {
        console.error("Error fetching posts:", err);
        setPosts([]);
      }
    };

    fetchPosts();
  }, [category]);

  return (
    <div>
      <Navbar2 />
      <div className='Home-container'>
        <div className='Home-start'>
          <div className='Home-title'>
            <h2 className='Home-one'>KAMARAJ COLLEGE OF ENGINEERING AND TECHNOLOGY</h2>
            <h3 className='Home-one'>Alumni Association Platform</h3>
            <p className='Home-one'>United by shared experiences</p>
            <div className='Home-one'>
              <button onClick={handleClick}>Click here to Register</button>
            </div>
          </div>
          <div className='Home-image'>
            <img 
              src='https://www.bing.com/th?id=OLC.7CGl5xLO6hm2wA480x360&w=316&h=180&c=8&rs=1&qlt=90&o=6&dpr=1.3&pid=3.1&rm=2' 
              alt='Kamaraj College' 
            />
          </div>
        </div>
        <div className='Home-main'>
          <h1>Our Focus</h1>
          <p>
            Our alumni association platform is dedicated to fostering a vibrant community 
            that connects past and present students, empowering them to share experiences 
            and resources. By creating lifelong relationships, we facilitate mentorship and 
            networking opportunities that inspire personal and professional growth. Our mission 
            is to unite alumni in a shared purpose, encouraging collaboration on projects that 
            make a positive impact on society. Together, we celebrate our legacy, support each 
            other, and pave the way for future generations to thrive.
          </p>
        </div>

        <div className='Home-images-section'>
          <div className='Home-image-item'>
            <a href='loginoption'>
              <img 
                src='https://th.bing.com/th/id/OIP.OFqw_vtMgv3OnOcH5Q9aEwHaHa?rs=1&pid=ImgDetMain' 
                alt='Description of  1' 
              />
            </a>
            <h3>Share Moments</h3>
            <p>Events, News, Stories</p>
          </div>
          <div className='Home-image-item'>
            <a href='/loginoption'>
              <img 
                src='https://creazilla-store.fra1.digitaloceanspaces.com/icons/3431998/jobs-icon-md.png' 
                alt='Description of e 2' 
              />
            </a>
            <h3>Opportunity</h3>
            <p>Jobs, Internships</p>
          </div>
          <div className='Home-image-item'>
            <a href='/loginoption'>
              <img 
                src='https://static.vecteezy.com/system/resources/previews/000/450/102/original/vector-chat-icon.jpg' 
                alt='Description of 3' 
              />
            </a>
            <h3>Student Request</h3>
            <p>Student Requests / Queries</p>
          </div>
        </div>

        {/* Cate Section Logic */}
        <div className='Home-Cate'>
          <div className="category-buttons">
            <button onClick={() => setCategory('Event')}>Events</button>
            <button onClick={() => setCategory('Job')}>Jobs</button>
            <button onClick={() => setCategory('Internship')}>Internships</button>
            <button onClick={() => setCategory('News')}>News</button>
          </div>

          <div className="Home-posts">
            {posts.length > 0 ? (
              posts.map(post => (
                <div key={post._id} className="Home-post">
                  <img src={`http://localhost:5000/posts/${post.image}`} alt="Post" />
                  <h3>Description: {post.description}</h3>
                  <p>Reference: {post.reference}</p>
                  <p>Category: {post.category}</p>
                  <p>Date: {new Date(post.Date).toLocaleDateString()}</p>
                </div>
              ))
            ) : (
              <p>No posts available for the selected category.</p>
            )}
          </div>
        </div>

      </div>
    </div>
  );
}

export default Home;
