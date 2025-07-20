import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Navbar from './Navbar';
import '../css/AluPosts.css';  // Import the CSS file

function Posts() {
    const [posts, setPosts] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchPosts = async () => {
            const token = localStorage.getItem('token');
            if (!token) {
                navigate('/alumnilogin');
                return;
            }

            try {
                const response = await axios.get('http://localhost:5000/my-posts', {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });
                setPosts(response.data.posts || []);
            } catch (err) {
                console.error(err);
                navigate('/alumnilogin');
            }
        };

        fetchPosts();
    }, [navigate]);

    const handleAddPost = () => {
        navigate('/alumniaddpost');
    };

    const handleViewPost = (id) => {
        navigate(`/post/${id}`);  
    };

    const handleDeletePost = async(id) =>{
        const token = localStorage.getItem('token');
        const confirmDelete = window.confirm("Do you really want to delete this post?");
        
        if (confirmDelete) {
            try {
                await axios.delete(`http://localhost:5000/delete/${id}`,{
                    headers:{
                        Authorization:`Bearer ${token}`
                    }
                });
                alert("Post deleted successfully!");
                navigate('/alumniposts');  
            } catch (error) {
                console.error("Error deleting post:", error);
                alert("Failed to delete post.");
            }
        } else {
            alert("Post deletion cancelled.");
        }
    }

    const handleEditPost = (id) =>{
        navigate(`/edit/${id}`);
    }

    return (
        <>
        <Navbar />
        <div className="dashboard-container">
            <div className="dashboard-header">
                <h2>Posts</h2>
                <button className="add-post-button" onClick={handleAddPost}>Add Post</button>
            </div>
            <ul className="posts-list">
                {posts.map(post => (
                    <li key={post._id} className="post-item">
                        <img src={`http://localhost:5000/public/posts/${post.image}`} alt={post.description} />
                        <div>
                            <p>Title: {post.description}</p>
                            {post.reference && <p>Reference Link: <a href={post.reference}>{post.reference}</a></p>}
                            <p>category:{post.category}</p>
                            <p>Date:{post.Date}</p>
                            <button className="view-post-button" onClick={() => handleViewPost(post._id)}>
                                View Post
                            </button>
                            <button className="edit-post-button" onClick={()=> handleEditPost(post._id)}>
                                Edit
                            </button>
                            <button className='delete-post-button' onClick={()=>{handleDeletePost(post._id)}} >Delete</button>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
        </>
    );
}

export default Posts;
