import React, { useEffect, useState } from 'react';

import axios from 'axios';
import '../css/AluPortal.css';
import StudNavbar from './StudNavbar';

function StudAluPortal() {
    const [data, setData] = useState([]); 
    const [batches, setBatches] = useState([]); 
    const [selectedBatch, setSelectedBatch] = useState('all'); 

    
    useEffect(() => {
        const fetchAlumni = async (batch) => {
            try {
                const response = await axios.get(`http://localhost:5000/batch?batch=${batch}`);
                setData(response.data);
            } catch (err) {
                console.log(err);
            }
        };

        const fetchBatches = async () => {
            try {
                const response = await axios.get('http://localhost:5000/batches');
                setBatches(['all', ...response.data]); 
            } catch (err) {
                console.log(err);
            }
        };

        fetchAlumni(selectedBatch);
        fetchBatches();
    }, [selectedBatch]);

    const handleBatchClick = (batch) => {
        setSelectedBatch(batch); 
    };

    const formatDate = (dob) => {
        const date = new Date(dob);
        return date.toISOString().split('T')[0]; 
    };

    return (
        <div>
            <StudNavbar/>

            
            <div className="batch-buttons container mt-3">
                {batches.map((batch, index) => (
                    <button
                        key={index}
                        className={`btn ${selectedBatch === batch ? 'btn-primary' : 'btn-secondary'} mr-2`}
                        onClick={() => handleBatchClick(batch)}
                    >
                        {batch}
                    </button>
                ))}
            </div>

            <div className="container mt-4">
                <h1 className="text-center mb-4">Alumni Portal</h1>
                <div className="row">
                    {data && data.length > 0 ? (
                        data.map((datas, index) => (
                            <div className="col-md-4" key={index}>
                                <div className="card mb-4 user-card">
                                    <img
                                        src={`http://localhost:5000/images/${datas.profileImage}`}
                                        className="card-img-top user-image"
                                        alt={datas.username}
                                    />
                                    <div className="card-body">
                                        <h5 className="card-title">{datas.username}</h5>
                                        <p className="card-text"><strong>Email:</strong> {datas.email}</p>
                                        <p className="card-text"><strong>Batch:</strong> {datas.batch}</p>
                                        <p className="card-text"><strong>DOB:</strong> {formatDate(datas.dob)}</p>
                                        <a href={`/StudAluProfile/${datas._id}`} className="btn btn-primary">
                                            View Profile
                                        </a>
                                    </div>
                                </div>
                            </div>
                        ))
                    ) : (
                        <p>No alumni data found.</p> 
                    )}
                </div>
            </div>
        </div>
    );
}

export default StudAluPortal;
