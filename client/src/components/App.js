// App.js
import React from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import '../index.css'; 
import Home from './Home';
import Lessons from './Lessons';
import Coaching from './Coaching';

function App() {
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
          <Route path="/lessons">
            <Lessons />
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
