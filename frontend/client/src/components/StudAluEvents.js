// components/AllEvents.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';

import { useNavigate } from 'react-router-dom';
import StudNavbar from './StudNavbar';

function StudAluEvents() {
  const [events, setEvents] = useState([]);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await axios.get('http://localhost:5000/allEvent');
        setEvents(response.data);
      } catch (err) {
        setError('Error fetching events');
      }
    };

    fetchEvents();
  }, []);

  const handleEvent = ()=>{
    navigate("/addEvents")
  }
  return (
    <>
    <StudNavbar/>
    <div className="container">
      <h2>All Events</h2>
      <div className="row">
        {events.map(event => (
          <div className="col-md-4" key={event._id}>
            <div className="card">
              {event.image && <img src={`http://localhost:5000/public/events/${event.image}`} className="card-img-top" alt={event.title} />}
              <div className="card-body">
                <h5 className="card-title">{event.title}</h5>
                <p className="card-text">{event.description}</p>
                <p className="card-text">Date: {new Date(event.date).toLocaleDateString()}</p>
                <p className="card-text">Location: {event.location}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
    </>
  );
}

export default StudAluEvents;
