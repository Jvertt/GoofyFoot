import React, { useState, useEffect } from 'react';
import '../index.css';

const Coaching = () => {
  const [coaches, setCoaches] = useState([]);

  useEffect(() => {
    fetch('http://localhost:5555/users')
      .then(response => response.json())
      .then(data => setCoaches(data));
  }, []);

  return (
    <div className="coaching">
      <h1>Our Coaches</h1>
      {coaches.map(coach => (
        <div key={coach.id} className="coach-card">
          <h2>{coach.name}</h2>
          <p>{coach.email}</p>
        </div>
      ))}
    </div>
  );
};

export default Coaching;
