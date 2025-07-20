import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../css/AddPost.css';  // Import the CSS file

function AddPost() {
    const [description, setDescription] = useState('');
    const [reference, setReference] = useState('');
    const [category, setCategory] = useState('');
    const [image, setImage] = useState(null);
    const navigate = useNavigate();

    const handleImage = (e) => {
        setImage(e.target.files[0]);
    }

    const handleCategory = (e) => {
        setCategory(e.target.value);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem('token');
        if (!token) {
            navigate('/alumlogin');
        }
        const formData = new FormData();
        formData.append('description', description);
        formData.append('reference', reference);
        formData.append('category', category);
        formData.append('postImage', image);

        try {
            const response = await axios.post('http://localhost:5000/add-post', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Authorization': `Bearer ${token}`
                }
            
            });
            setDescription('');
            setImage(null);
            setReference('');
            console.log(response);
            alert("Post added Successfully");
        } catch (err) {
            console.log(err);
        }
    }

    return (
        <div className="add-post-container">
            <h1>Add New Post</h1>
            <form className="add-post-form" onSubmit={handleSubmit}>
                <input 
                    type="text" 
                    placeholder="Enter Description" 
                    value={description} 
                    onChange={(e) => setDescription(e.target.value)} 
                    required 
                />
                <input 
                    type="url" 
                    placeholder="Enter Reference URL" 
                    value={reference} 
                    onChange={(e) => setReference(e.target.value)} 
                />
                <input 
                    type="file" 
                    onChange={handleImage} 
                    required 
                />
                <select
                    name="category"
                    value={category}
                    onChange={handleCategory}
                    required
                >
                    <option value="">Select Category</option>
                    <option value="Event">Event</option>
                    <option value="News">News</option>
                    <option value="Job">Job</option>
                    <option value="Internship">Internship</option>
                </select>
                <button type="submit">Submit Post</button>
            </form>
        </div>
    );
}

export default AddPost;
