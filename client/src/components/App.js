import React, { useState } from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import Lessons from './Lessons';
import LessonDetails from './LessonDetails';
import Home from './Home'
import Coaching from './Coaching'


function App() {
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
    <Router>
      <div>
        {/* Navbar */}
        <nav className="navbar">
          <Link to="/" className="navbar-link">Home</Link>
          <Link to="/lessons" className="navbar-link">Lessons</Link>
          <Link to="/coaching" className="navbar-link">Coaching</Link>
        </nav>

        {/* Main content */}
        <Switch>
          {/* Home page */}
          <Route exact path="/">
            <Home />
          </Route>

          {/* Lessons page */}
          <Route exact path="/lessons">
            <Lessons lessons={lessons} />
          </Route>

          {/* Lesson Details page */}
          <Route path="/lessons/:id">
            <LessonDetails lessons={lessons} />
          </Route>

          {/* Coaching page */}
          <Route path="/coaching">
            <Coaching />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
