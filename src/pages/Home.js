import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './Home.css';

const Home = () => {
  const [heroStyle, setHeroStyle] = useState({});

  useEffect(() => {
    // Check if custom hero image exists and apply it
    const img = new Image();
    img.onload = () => {
      setHeroStyle({
        background: `linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)), url('/images/hero-bg.png')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center'
      });
    };
    img.onerror = () => {
      // Keep default gradient if image doesn't exist
      setHeroStyle({});
    };
    img.src = '/images/hero-bg.png';
  }, []);

  return (
    <div className="home">
      {/* Hero Section */}
      <section className="hero" style={heroStyle}>
        <div className="hero-overlay">
          <div className="container">
            <div className="hero-content">
              <h1 className="hero-title">Welcome to Ute Pass Vacation Rentals</h1>
              <p className="hero-subtitle">
                Vacation Property Management in the Beautiful Ute Pass Region
              </p>
              <div className="hero-buttons">
                <Link to="/vacation-rentals" className="btn">
                  Explore Rentals
                </Link>
                <Link to="/contact" className="btn btn-secondary">
                  Get In Touch
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Overview */}
      <section className="section services-overview">
        <div className="container">
          <h2 className="section-title">Our Services</h2>
          <p className="section-subtitle">
            Everything you need for the perfect Colorado getaway
          </p>
          <div className="services-grid">
            <div className="service-card">
              <div className="service-icon">🏔️</div>
              <h3>Vacation Rentals</h3>
              <p>
                Discover our handpicked collection of premium vacation rentals throughout the Ute Pass 
                and Colorado Springs area. From cozy mountain cabins to luxury homes with stunning views, 
                each property is carefully selected and maintained to provide an unforgettable experience.
              </p>
              <Link to="/vacation-rentals" className="service-link">
                Browse Properties →
              </Link>
            </div>

            <div className="service-card">
              <div className="service-icon">🏡</div>
              <h3>Property Management</h3>
              <p>
                Maximize your property's potential with our comprehensive management services. We handle 
                everything from guest communication and cleaning to maintenance and marketing, ensuring 
                your investment generates optimal returns while maintaining the highest standards.
              </p>
              <Link to="/property-management" className="service-link">
                Learn More →
              </Link>
            </div>

            <div className="service-card">
              <div className="service-icon">📞</div>
              <h3>Contact & Support</h3>
              <p>
                We are dedicated to help with all your needs. Whether you're planning your 
                perfect Colorado vacation or considering our property management services, we're ready 
                to provide personalized assistance and answer any questions you may have.
              </p>
              <Link to="/contact" className="service-link">
                Get In Touch →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="section about">
        <div className="container">
          <h2 className="section-title">About Our Family Business</h2>
          <p className="section-subtitle">
            Family-owned rental management with a personal touch since 2008
          </p>
          <div className="about-content">
            <div className="about-text">
              <p>
                Our story began in 2008 when Judy agreed to help a friend manage their vacation rental. 
                What started as a simple favor quickly grew into something special as word spread about 
                our exceptional service and personal attention to detail.
              </p>
              <p>
                From that single property, we've grown into a trusted family operation serving the 
                beautiful Ute Pass and Colorado Springs area. Our team includes family members who each 
                bring their unique strengths - from maintenance and financial management to guest relations 
                and daily operations.
              </p>
              <p>
                Today, we continue the tradition Judy started: treating every property owner like family 
                and every guest like a valued friend. We handle everything from guest communication to 
                property maintenance, ensuring your investment thrives while you enjoy peace of mind.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Family Values Section */}
      <section className="section family-values">
        <div className="container">
          <div className="values-content">
            <div className="values-text">
              <h2>What Sets Us Apart</h2>
              <div className="values-grid">
                <div className="value-item">
                  <div className="value-icon">👨‍👩‍👧‍👦</div>
                  <h3>Family-Owned Since 2008</h3>
                  <p>Three generations of family members working together to provide exceptional service with a personal touch.</p>
                </div>
                <div className="value-item">
                  <div className="value-icon">🤝</div>
                  <h3>Personal Relationships</h3>
                  <p>We treat every property owner like family and stay in close contact to ensure your needs are always met.</p>
                </div>
                <div className="value-item">
                  <div className="value-icon">🏆</div>
                  <h3>Proven Track Record</h3>
                  <p>Built our reputation through word of mouth and consistent excellence in property management and guest satisfaction.</p>
                </div>
                <div className="value-item">
                  <div className="value-icon">🔧</div>
                  <h3>Comprehensive Care</h3>
                  <p>From maintenance to guest relations, we handle every detail so you can enjoy the benefits without the stress.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="section cta">
        <div className="container">
          <div className="cta-content">
            <h2>Ready to Experience the Family Difference?</h2>
            <p>
              Join the property owners who trust their investments to our caring, professional family team. 
              Let us show you what personalized service really means.
            </p>
            <div className="cta-buttons">
              <Link to="/vacation-rentals" className="btn">
                View Properties
              </Link>
              <Link to="/contact" className="btn btn-secondary">
                Contact Our Family
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home; 