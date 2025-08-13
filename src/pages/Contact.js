import React, { useState } from 'react';
import './Contact.css';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
    inquiryType: 'general'
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission here
    console.log('Form submitted:', formData);
    alert('Thank you for your message! We\'ll get back to you soon.');
    
    // Reset form
    setFormData({
      name: '',
      email: '',
      phone: '',
      subject: '',
      message: '',
      inquiryType: 'general'
    });
  };

  return (
    <div className="contact">
      {/* Header Section */}
      <section className="contact-header">
        <div className="container">
          <h1 className="page-title">Contact Us</h1>
          <p className="page-subtitle">
            Ready to plan your Colorado adventure or list your property? We're here to help!
          </p>
        </div>
      </section>

      {/* Contact Information */}
      <section className="section contact-info-section">
        <div className="container">
          <div className="contact-info-grid">
            <div className="contact-card">
              <div className="contact-icon">📧</div>
              <h3>Email Us</h3>
              <p>info@utepassrentals.com</p>
              <p>reservations@utepassrentals.com</p>
            </div>
            
            <div className="contact-card">
              <div className="contact-icon">📞</div>
              <h3>Call Us</h3>
              <p>Main: (719) 555-0123</p>
              <p>Emergency: (719) 555-0124</p>
            </div>
            
            <div className="contact-card">
              <div className="contact-icon">📍</div>
              <h3>Visit Us</h3>
              <p>Ute Pass / Colorado Springs</p>
              <p>Colorado, United States</p>
            </div>
            
            <div className="contact-card">
              <div className="contact-icon">🕐</div>
              <h3>Office Hours</h3>
              <p>Monday - Friday: 8AM - 6PM</p>
              <p>Weekend: 9AM - 5PM</p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Form and Map */}
      <section className="section contact-form-section">
        <div className="container">
          <div className="contact-content">
            <div className="form-container">
              <h2>Send Us a Message</h2>
              <p>Fill out the form below and we'll get back to you within 24 hours.</p>
              
              <form className="contact-form" onSubmit={handleSubmit}>
                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="name">Full Name *</label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  
                  <div className="form-group">
                    <label htmlFor="email">Email Address *</label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>
                
                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="phone">Phone Number</label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                    />
                  </div>
                  
                  <div className="form-group">
                    <label htmlFor="inquiryType">Inquiry Type</label>
                    <select
                      id="inquiryType"
                      name="inquiryType"
                      value={formData.inquiryType}
                      onChange={handleChange}
                    >
                      <option value="general">General Inquiry</option>
                      <option value="booking">Vacation Rental Booking</option>
                      <option value="property">Property Management</option>
                      <option value="support">Customer Support</option>
                    </select>
                  </div>
                </div>
                
                <div className="form-group">
                  <label htmlFor="subject">Subject *</label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                  />
                </div>
                
                <div className="form-group">
                  <label htmlFor="message">Message *</label>
                  <textarea
                    id="message"
                    name="message"
                    rows="6"
                    value={formData.message}
                    onChange={handleChange}
                    required
                  ></textarea>
                </div>
                
                <button type="submit" className="btn submit-btn">
                  Send Message
                </button>
              </form>
            </div>
            
            <div className="map-container">
              <h2>Find Us</h2>
              <p>Located in the heart of the beautiful Ute Pass and Colorado Springs area.</p>
              
              {/* Placeholder for map - you can integrate Google Maps or similar */}
              <div className="map-placeholder">
                <img 
                  src="https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80" 
                  alt="Colorado Springs and Ute Pass Area" 
                />
                <div className="map-overlay">
                  <p>🗺️ Interactive map coming soon</p>
                </div>
              </div>
              
              <div className="location-details">
                <h3>About Our Location</h3>
                <p>
                  We're strategically located in the Ute Pass area, providing easy access to Colorado Springs' 
                  most popular attractions including Pikes Peak, Garden of the Gods, and numerous hiking trails. 
                  Our properties offer the perfect blend of mountain tranquility and city convenience.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="section faq-section">
        <div className="container">
          <h2 className="section-title">Frequently Asked Questions</h2>
          <div className="faq-grid">
            <div className="faq-item">
              <h3>How far in advance should I book?</h3>
              <p>We recommend booking 2-3 months in advance for peak season (summer and winter holidays) and 1-2 months for other times.</p>
            </div>
            
            <div className="faq-item">
              <h3>What's included in the rental?</h3>
              <p>All rentals include linens, towels, kitchen essentials, WiFi, and parking. Specific amenities vary by property.</p>
            </div>
            
            <div className="faq-item">
              <h3>Is there a minimum stay requirement?</h3>
              <p>Most properties have a 2-3 night minimum stay, with extended minimums during peak seasons and holidays.</p>
            </div>
            
            <div className="faq-item">
              <h3>How does property management work?</h3>
              <p>We handle everything from listing creation and guest communication to cleaning and maintenance. You just collect the profits!</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact; 