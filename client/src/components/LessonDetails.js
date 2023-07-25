import React from 'react';
import { useParams } from 'react-router-dom';

const LessonDetails = ({ lessons }) => {
  const { id } = useParams();
  const lesson = lessons.find(lesson => lesson.id === parseInt(id));

  if (!lesson) {
    return <div>Loading...</div>; // Handle the case when the lesson data is not available yet
  }

  return (
    <div className="lesson-details">
      <h2>{lesson.title}</h2>
      <p>{lesson.description}</p>
      <form>
        <label>Name:</label>
        <input type="text" />
        <label>Email:</label>
        <input type="email" />
        <button type="submit">Book Lesson</button>
      </form>
    </div>
  );
};

export default LessonDetails;
