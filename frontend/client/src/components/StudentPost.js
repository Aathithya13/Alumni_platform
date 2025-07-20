import React, { useEffect, useState } from 'react';
import axios from 'axios';

function StudentPost() {
  const [posts, setPosts] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get('http://localhost:5000/posts');
        setPosts(response.data); 
        console.log(response.data);
      } catch (error) {
        console.error('Error fetching posts:', error);
        setError('Could not fetch posts. Try again later.');
      }
    };

    fetchPosts();
  }, []);

  return (
    <div>
      <h2>Student Posts</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <ul>
        {posts.map((post, index) => (
          <li key={index}>
            <strong>{post.title}</strong>: {post.content}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default StudentPost;
