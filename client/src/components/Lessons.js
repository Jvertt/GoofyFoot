import React, { useState, useEffect } from 'react';

const Lessons = () => {
  const [lessons, setLessons] = useState([]);

  useEffect(() => {
    fetch('http://localhost:5555/lessons')
      .then(response => response.json())
      .then(data => setLessons(data));
  }, []);

  return (
    <div className="lessons">
      <h1>All Lessons</h1>
      {lessons.map(lesson => (
        <div key={lesson.id} className="lesson-card">
          <h2>{lesson.title}</h2>
          <p>{lesson.description}</p>
        </div>
      ))}
    </div>
  );
};

export default Lessons;
