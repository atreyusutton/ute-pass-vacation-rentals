import React from 'react';
import { Link } from 'react-router-dom';
import './PropertyManagement.css';

const PropertyManagement = () => {
  const services = [
    {
      icon: '📋',
      title: 'Complete Property Setup',
      description: 'Professional photography, compelling property descriptions, and competitive pricing strategy to maximize your property\'s appeal and revenue potential.'
    },
    {
      icon: '👥',
      title: 'Guest Management',
      description: 'End-to-end guest communication, from inquiry to check-out, ensuring exceptional experiences that lead to positive reviews and repeat bookings.'
    },
    {
      icon: '🧹',
      title: 'Cleaning & Maintenance',
      description: 'Professional cleaning services after each stay and proactive maintenance to keep your property in pristine condition and protect your investment.'
    },
    {
      icon: '📊',
      title: 'Revenue Optimization',
      description: 'Dynamic pricing strategies, market analysis, and booking optimization to maximize your rental income throughout all seasons.'
    },
    {
      icon: '🛡️',
      title: 'Insurance & Protection',
      description: 'Comprehensive insurance coverage and guest screening to protect your property from damage and ensure peace of mind.'
    },
    {
      icon: '📈',
      title: 'Performance Analytics',
      description: 'Detailed reporting on occupancy rates, revenue, expenses, and market trends to help you make informed decisions about your investment.'
    }
  ];

  const benefits = [
    'Hands-off property management - we handle everything',
    'Professional marketing across multiple platforms',
    'Competitive management fees with transparent pricing',
    'Local expertise in Ute Pass and Colorado Springs markets',
    '24/7 emergency response and guest support',
    'Regular property inspections and maintenance coordination'
  ];

  return (
    <div className="property-management">
      {/* Header Section */}
      <section className="management-header">
        <div className="container">
          <h1 className="page-title">Property Management Services</h1>
          <p className="page-subtitle">
            Maximize your investment potential with our comprehensive short-term rental management solutions
          </p>
        </div>
      </section>

      {/* Introduction Section */}
      <section className="section intro-section">
        <div className="container">
          <div className="intro-content">
            <div className="intro-text">
              <h2>Why Choose Ute Pass Vacation Rentals for Property Management?</h2>
              <p>
                Transform your Colorado property into a profitable vacation rental with our full-service management approach. 
                We combine local market expertise with proven strategies to maximize your revenue while maintaining the 
                highest standards of guest satisfaction and property care.
              </p>
              <p>
                Our comprehensive management services allow you to enjoy the benefits of rental income without the daily 
                responsibilities. From marketing and bookings to cleaning and maintenance, we handle every aspect of your 
                short-term rental business.
              </p>
              <Link to="/contact" className="btn">Get Started Today</Link>
            </div>
            <div className="intro-image">
              <img src="https://images.unsplash.com/photo-1560518883-ce09059eeffa?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80" alt="Property Management" />
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="section services-section">
        <div className="container">
          <h2 className="section-title">Our Management Services</h2>
          <p className="section-subtitle">
            Everything you need to succeed in the short-term rental market
          </p>
          <div className="services-grid">
            {services.map((service, index) => (
              <div key={index} className="service-item">
                <div className="service-icon">{service.icon}</div>
                <h3>{service.title}</h3>
                <p>{service.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="section benefits-section">
        <div className="container">
          <div className="benefits-content">
            <div className="benefits-text">
              <h2>Benefits of Our Management Program</h2>
              <ul className="benefits-list">
                {benefits.map((benefit, index) => (
                  <li key={index}>
                    <span className="checkmark">✓</span>
                    {benefit}
                  </li>
                ))}
              </ul>
            </div>
            <div className="benefits-stats">
              <div className="stat-item">
                <div className="stat-number">95%</div>
                <div className="stat-label">Average Occupancy Rate</div>
              </div>
              <div className="stat-item">
                <div className="stat-number">$2,500</div>
                <div className="stat-label">Average Monthly Revenue</div>
              </div>
              <div className="stat-item">
                <div className="stat-number">4.8★</div>
                <div className="stat-label">Average Guest Rating</div>
              </div>
              <div className="stat-item">
                <div className="stat-number">48hrs</div>
                <div className="stat-label">Average Response Time</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="section process-section">
        <div className="container">
          <h2 className="section-title">How It Works</h2>
          <p className="section-subtitle">
            Getting started is simple and straightforward
          </p>
          <div className="process-steps">
            <div className="step">
              <div className="step-number">1</div>
              <h3>Property Assessment</h3>
              <p>We evaluate your property and provide recommendations for maximizing its rental potential.</p>
            </div>
            <div className="step">
              <div className="step-number">2</div>
              <h3>Setup & Marketing</h3>
              <p>Professional photography, listing creation, and marketing across all major booking platforms.</p>
            </div>
            <div className="step">
              <div className="step-number">3</div>
              <h3>Guest Management</h3>
              <p>We handle all guest communications, bookings, check-ins, and support throughout their stay.</p>
            </div>
            <div className="step">
              <div className="step-number">4</div>
              <h3>Ongoing Operations</h3>
              <p>Cleaning, maintenance, reporting, and continuous optimization to maximize your returns.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="section cta-section">
        <div className="container">
          <div className="cta-content">
            <h2>Ready to Maximize Your Property's Potential?</h2>
            <p>
              Let us help you turn your Colorado property into a successful vacation rental. 
              Contact us today for a free consultation and property assessment.
            </p>
            <div className="cta-buttons">
              <Link to="/contact" className="btn">Get Free Consultation</Link>
              <Link to="/vacation-rentals" className="btn btn-secondary">View Our Portfolio</Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default PropertyManagement; 