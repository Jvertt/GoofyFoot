import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const LessonDetails = ({ lessons }) => {
  const { id } = useParams();
  const lesson = lessons.find(lesson => lesson.id === parseInt(id));

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  if (!lesson) {
    return <div>Loading...</div>;
  }

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post('http://127.0.0.1:5555/bookings', {
        name,
        email,
        lesson_id: lesson.id,
      });

      // handle response as needed
      console.log(response.data);

      // Reset the input fields after successful submission
      setName('');
      setEmail('');
    } catch (error) {
      // handle error as needed
      console.error(error);
    }
  };

  return (
    <div className="lesson-details">
      <h2>{lesson.title}</h2>
      <p>{lesson.description}</p>
      <form onSubmit={handleFormSubmit}>
        <label>Name:</label>
        <input type="text" value={name} onChange={e => setName(e.target.value)} />
        <label>Email:</label>
        <input type="email" value={email} onChange={e => setEmail(e.target.value)} />
        <button type="submit">Book Lesson</button>
      </form>
    </div>
  );
};

export default LessonDetails;
