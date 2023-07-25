import React from 'react';
import { Link } from 'react-router-dom';

function NavBar () {
  return (
    <nav className="nav-bar">
      <Link to="/login" className="nav-link">Login</Link>
      <Link to="/products" className="nav-link">Products</Link>
      {/* TODO: Add more links as necessary */}
    </nav>
  );
};

export default NavBar;
