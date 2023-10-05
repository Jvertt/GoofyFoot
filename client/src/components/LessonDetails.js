import React, { useState, useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import axios from 'axios';

const LessonDetails = ({ lessons }) => {
  const { id } = useParams();
  const history = useHistory();
  const lesson = lessons.find(lesson => lesson.id === parseInt(id));

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [coaches, setCoaches] = useState([]);
  const [selectedCoach, setSelectedCoach] = useState('');
  const [showConfirmation, setShowConfirmation] = useState(false);

  useEffect(() => {
    const fetchCoaches = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:5555/users');
        setCoaches(response.data);
        setSelectedCoach(response.data[0].id);  // default to the first coach
      } catch (error) {
        console.error(error);
      }
    };

    fetchCoaches();
  }, []);

  if (!lesson) {
    return <div>Loading...</div>;
  }

  console.log(selectedCoach)

  const handleFormSubmit = async () => {
    try {
      // Log the data being sent in the request for debugging
      console.log({
        name,
        email,
        lesson_id: lesson.id,
        coach_id: selectedCoach,
      });
  
      const response = await axios.post('http://127.0.0.1:5555/bookings', {
        name,
        email,
        lesson_id: lesson.id,
        coach_id: selectedCoach,
      });
  
      // handle response as needed
      console.log(response.data);
  
      // Reset the input fields after successful submission
      setName('');
      setEmail('');
  
      // redirect to home
      history.push('/');
    } catch (error) {
      // handle error as needed
      console.error(error);
    }
  };
  

  return (
    <div className="lesson-details">
      <h2>{lesson.title}</h2>
      <p>{lesson.description}</p>
      <form onSubmit={(e) => { e.preventDefault(); setShowConfirmation(true); }}>
        <label>Name:</label>
        <input type="text" value={name} onChange={e => setName(e.target.value)} />
        <label>Email:</label>
        <input type="email" value={email} onChange={e => setEmail(e.target.value)} />
        <label>Coach:</label>
        <select value={selectedCoach} onChange={e => setSelectedCoach(e.target.value)}>
          {coaches.map(coach => (
            <option key={coach.id} value={coach.id}>{coach.name}</option>
          ))}
        </select>
        <button type="submit">Book Lesson</button>
      </form>

      {showConfirmation && (
  <div className="confirmation-overlay">
    <div className="confirmation-popup">
      <h3>Confirm Booking</h3>
      <p>Please confirm the following information:</p>
      <p>Name: {name}</p>
      <p>Email: {email}</p>
      <p>Coach: {coaches.find(coach => coach.id === parseInt(selectedCoach)).name}</p>
      <button onClick={handleFormSubmit}>Confirm</button>
      <button onClick={() => setShowConfirmation(false)}>Cancel</button>
    </div>
  </div>
)}
    </div>
  );
};

export default LessonDetails;