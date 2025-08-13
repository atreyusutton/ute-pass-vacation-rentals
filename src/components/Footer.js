import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <div className="footer-section">
            <h3>Ute Pass Vacation Rentals</h3>
            <p>Your gateway to unforgettable experiences in the beautiful Ute Pass and Colorado Springs area.</p>
          </div>
          
          <div className="footer-section">
            <h4>Quick Links</h4>
            <ul>
              <li><Link to="/">Home</Link></li>
              <li><Link to="/vacation-rentals">Vacation Rentals</Link></li>
              <li><Link to="/property-management">Property Management</Link></li>
              <li><Link to="/contact">Contact</Link></li>
            </ul>
          </div>
          
          <div className="footer-section">
            <h4>Contact Info</h4>
            <p>Ute Pass / Colorado Springs, CO</p>
            <p>Phone: (719) 555-0123</p>
            <p>Email: info@utepassrentals.com</p>
          </div>
        </div>
        
        <div className="footer-bottom">
          <p>&copy; 2024 Ute Pass Vacation Rentals. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 