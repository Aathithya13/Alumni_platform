import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import '../css/Post.css'; // Assuming you name the CSS file Post.css
import Navbar from './Navbar';

function Post() {
    const [post, setPost] = useState(null);
    const { id } = useParams();

    useEffect(() => {
        const fetchPost = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/post/${id}`);
                setPost(response.data.post);
            } catch (err) {
                console.log(err);
            }
        };
        fetchPost();
    }, [id]);

    if (!post) {
        return <div>Loading...</div>;
    }

    return (
        <>
        <Navbar/>
        <div className="post-container">
            {post.image && (
                <img
                    src={`http://localhost:5000/posts/${post.image}`}
                    alt="Post"
                    className="post-image"
                />
            )}
            <p className="post-description">Description:{post.description}</p>
            {post.reference && (
                <p className="post-reference">
                    Reference: <a href={post.reference}>{post.reference}</a>
                </p>
            )}
            <p>category:{post.category}</p>
            <p>Date:{post.Date}</p>
        </div>
        </>
    );
}

export default Post;
