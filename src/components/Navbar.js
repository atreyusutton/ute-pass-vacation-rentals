import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const isActive = (path) => {
    return location.pathname === path;
  };

  return (
    <nav className="navbar">
      <div className="container">
        <div className="nav-content">
          <Link to="/" className="nav-logo">
            <img src="/images/logo.png" alt="Ute Pass Vacation Rentals Logo" className="logo-image" />
            <h2>Ute Pass Vacation Rentals</h2>
          </Link>
          
          <div className={`nav-links ${isMenuOpen ? 'nav-links-mobile' : ''}`}>
            <Link 
              to="/" 
              className={`nav-link ${isActive('/') ? 'active' : ''}`}
              onClick={() => setIsMenuOpen(false)}
            >
              Home
            </Link>
            <Link 
              to="/vacation-rentals" 
              className={`nav-link ${isActive('/vacation-rentals') ? 'active' : ''}`}
              onClick={() => setIsMenuOpen(false)}
            >
              Vacation Rentals
            </Link>
            <Link 
              to="/property-management" 
              className={`nav-link ${isActive('/property-management') ? 'active' : ''}`}
              onClick={() => setIsMenuOpen(false)}
            >
              Property Management
            </Link>
            <Link 
              to="/contact" 
              className={`nav-link ${isActive('/contact') ? 'active' : ''}`}
              onClick={() => setIsMenuOpen(false)}
            >
              Contact
            </Link>
          </div>
          
          <div className="nav-toggle" onClick={toggleMenu}>
            <span></span>
            <span></span>
            <span></span>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar; 