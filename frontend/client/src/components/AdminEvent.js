// components/AdminEvent.js
import React, { useState } from 'react';
import axios from 'axios';

function AdminEvent() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState('');
  const [location, setLocation] = useState('');
  const [image, setImage] = useState(null);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    setError('');

    if (!title || !description || !date || !location || !image) {
      setError('All fields are required');
      return;
    }

    const formData = new FormData();
    formData.append('title', title);
    formData.append('description', description);
    formData.append('date', date);
    formData.append('location', location);
    formData.append('image', image);

    try {
      const response = await axios.post('http://localhost:5000/addEvent', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',  // Important for file upload
        }
      });
      setMessage(response.data.message);
      setTitle('');
      setDescription('');
      setDate('');
      setLocation('');
      setImage(null);
    } catch (err) {
      setError('Error adding event');
    }
  };

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  return (
    <div className="container">
      <h2>Admin - Add Event</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Title</label>
          <input
            type="text"
            className="form-control"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label>Description</label>
          <textarea
            className="form-control"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label>Date</label>
          <input
            type="date"
            className="form-control"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label>Location</label>
          <input
            type="text"
            className="form-control"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label>Event Image</label>
          <input
            type="file"
            className="form-control"
            onChange={handleImageChange}
          />
        </div>
        <button type="submit" className="btn btn-primary">Add Event</button>
      </form>
      {message && <p className="text-success">{message}</p>}
      {error && <p className="text-danger">{error}</p>}
    </div>
  );
}

export default AdminEvent;
