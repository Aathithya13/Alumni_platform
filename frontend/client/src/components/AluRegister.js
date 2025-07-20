import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Navbar from './Navbar';
import 'bootstrap/dist/css/bootstrap.min.css';

const AluRegister = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [batch, setBatch] = useState('');
    const [dob, setDob] = useState('');
    const [password, setPassword] = useState('');
    const [profileImage, setProfileImage] = useState(null); 
    const [error, setError] = useState('');
    const [message, setMessage] = useState('');
    const navigate = useNavigate();

    const handleImageChange = (e) => {
        setProfileImage(e.target.files[0]);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        setError('');
        setMessage('');

        if (!username || !email || !batch || !dob || !password) {
            setError('All fields are required.');
            return;
        }

        const formData = new FormData();
        formData.append('username', username);
        formData.append('email', email);
        formData.append('batch', batch);
        formData.append('dob', dob);
        formData.append('password', password);
        if (profileImage) {
            formData.append('profileImage', profileImage);
        }

        try {
            const response = await axios.post('http://localhost:5000/register', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            setMessage(response.data.message);
            navigate('/alumnilogin');
        } catch (err) {
            if (err.response && err.response.data && err.response.data.error) {
                setError(err.response.data.error);
            } else {
                setError('An error occurred. Please try again.');
            }
        }
    };

    return (
        <>
            <Navbar />
            <div className="container mt-5">
                <div className="row justify-content-center">
                    <div className="col-md-6">
                        <div className="card shadow-lg">
                            <div className="card-body">
                                <h2 className="card-title text-center mb-4">Alumni Registration</h2>
                                <form onSubmit={handleSubmit}>
                                    <div className="mb-3">
                                        <label className="form-label">Username</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            value={username}
                                            onChange={(e) => setUsername(e.target.value)}
                                        />
                                    </div>
                                    <div className="mb-3">
                                        <label className="form-label">Email</label>
                                        <input
                                            type="email"
                                            className="form-control"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                        />
                                    </div>
                                    <div className="mb-3">
                                        <label className="form-label">Batch</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            value={batch}
                                            onChange={(e) => setBatch(e.target.value)}
                                        />
                                    </div>
                                    <div className="mb-3">
                                        <label className="form-label">Date of Birth</label>
                                        <input
                                            type="date"
                                            className="form-control"
                                            value={dob}
                                            onChange={(e) => setDob(e.target.value)}
                                        />
                                    </div>
                                    <div className="mb-3">
                                        <label className="form-label">Password</label>
                                        <input
                                            type="password"
                                            className="form-control"
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                        />
                                    </div>
                                    <div className="mb-3">
                                        <label className="form-label">Profile Image</label>
                                        <input
                                            type="file"
                                            className="form-control"
                                            onChange={handleImageChange}
                                        />
                                    </div>
                                    <button type="submit" className="btn btn-primary w-100">
                                        Register
                                    </button>
                                    {message && <div className="alert alert-success mt-3">{message}</div>}
                                    {error && <div className="alert alert-danger mt-3">{error}</div>}
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default AluRegister;
