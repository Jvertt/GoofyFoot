import React, { useState } from 'react';
import { Link, Switch, Route } from 'react-router-dom';
import LessonDetails from './LessonDetails';

const Lessons = () => {
  const [lessons] = useState([
    {
      id: 1,
      title: '1-on-1 Lesson',
      description: 'One-on-one experience with an instructor. This lesson lasts 90 minutes.',
      isOneOnOne: true,
      isGroupLesson: false,
      isSemiPrivate: false,
    },
    {
      id: 2,
      title: 'Group Lesson',
      description: 'Group lesson with multiple participants. This lesson lasts 60 minutes.',
      isOneOnOne: false,
      isGroupLesson: true,
      isSemiPrivate: false,
    },
    {
      id: 3,
      title: 'Semi Private Lesson',
      description: 'Semi-private lesson with a small group of participants. This lesson lasts 75 minutes.',
      isOneOnOne: false,
      isGroupLesson: false,
      isSemiPrivate: true,
    },
  ]);

  
  return (
    <div className="lessons">
      <h1>All Lessons</h1>
      {lessons.map(lesson => (
        <div key={lesson.id} className="lesson-card">
          <h2>{lesson.title}</h2>
          <p>{lesson.description}</p>
          <Link to={`/lessons/${lesson.id}`}>View Details</Link>
        </div>
      ))}
    </div>
  );
};

export default Lessons;
