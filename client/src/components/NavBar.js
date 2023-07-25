import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="navbar">
      <Link className="navbar-link" to="/">Home</Link>
      <Link className="navbar-link" to="/lessons">Lessons</Link>
      <Link className="navbar-link" to="/coaching">Coaching</Link>
    </nav>
  );
};

export default Navbar;
