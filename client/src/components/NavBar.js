import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="navbar">
          <Link to="/" className="navbar-link">Home</Link>
          <Link to="/lessons" className="navbar-link">Lessons</Link>
          <Link to="/coaching" className="navbar-link">Coaching</Link>
          <Link to="/manage-bookings" className="navbar-link">Bookings</Link>
    </nav>
  );
};

export default Navbar;
