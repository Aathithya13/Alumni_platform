import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import '../css/EditPost.css';  // Import the CSS file

function EditPost() {
    const { id } = useParams();  
    const [description, setDescription] = useState('');  
    const [reference, setReference] = useState(''); 
    const [category, setCategory] = useState(''); 
    const [image, setImage] = useState(null); 
    const [currentImage, setCurrentImage] = useState('');  
    const navigate = useNavigate();  

    const handleImage = (e) => {
        setImage(e.target.files[0]); 
    };

    const handleCategory = (e) => {
        setCategory(e.target.value);
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/post/${id}`);
                const { image, description, reference, category } = response.data.post;
                
                setCurrentImage(image);  
                setDescription(description);  
                setReference(reference);  
                setCategory(category);  
            } catch (err) {
                console.log(err);
            }
        };
        fetchData();  
    }, [id]);  

    const handleSubmit = async (e) => {
        e.preventDefault(); 
        const token = localStorage.getItem('token');
        const formData = new FormData();  
        formData.append('description', description);
        formData.append('reference', reference);
        formData.append('category', category);
        if (image) {
            formData.append('postImage', image);  
        }

        try {
            const response = await axios.post(`http://localhost:5000/edit/${id}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Authorization': `Bearer ${token}`
                }
            });
            console.log(response.data);
            navigate(`/post/${id}`);  
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <div className="edit-post-container">
            <h1>Edit Post</h1>
            <form className="edit-post-form" onSubmit={handleSubmit}>
                <label htmlFor="description">Description</label>
                <input 
                    type="text"
                    id="description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Description"
                    required
                />
                <label htmlFor="reference">Reference Link</label>
                <input 
                    type="url"
                    id="reference"
                    value={reference}
                    onChange={(e) => setReference(e.target.value)}
                    placeholder="Reference Link"
                    required
                />
                {currentImage && (
                    <>
                        <label>Current Image</label>
                        <img 
                            src={`http://localhost:5000/public/posts/${currentImage}`} 
                            alt="Current Post" 
                            width="200" 
                        />
                    </>
                )}
                <label htmlFor="image">Upload New Image</label>
                <input 
                    type="file"
                    id="image"
                    onChange={handleImage}
                />
                <label htmlFor="category">Category</label>
                <select
                    id="category"
                    name="category"
                    value={category}
                    onChange={handleCategory}
                    required
                >
                    <option value="">Select Category</option>
                    <option value="Event">Event</option>
                    <option value="News">News</option>
                    <option value="Jobs">Jobs</option>
                    <option value="Internship">Internship</option>
                </select>
                <button type="submit">Submit</button>
            </form>
        </div>
    );
}

export default EditPost;
