import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useProperties } from '../contexts/PropertiesContext';
import { useAvailableImages } from '../utils/imageUtils';
import './VacationRentals.css';

// Component for individual property card with dynamic image loading
const PropertyCard = ({ property }) => {
  const { images: availableImages, loading: imagesLoading } = useAvailableImages(property.id);

  const handleImageError = (e) => {
    console.warn('Failed to load property card image:', e.target.src);
    e.target.src = 'https://via.placeholder.com/300x200/e5e7eb/6b7280?text=Image+Unavailable';
  };

  return (
    <div className="property-card">
      <div className="property-image">
        {imagesLoading ? (
          <div className="image-loading">
            <div className="loading-spinner">🔄</div>
            <p>Loading...</p>
          </div>
        ) : availableImages && Array.isArray(availableImages) && availableImages.length > 0 ? (
          <img
            src={availableImages[0]}
            alt={property.name}
            onError={handleImageError}
          />
        ) : (
          <div className="no-image">
            <div className="no-image-content">
              <span>📸</span>
              <p>Images<br />Coming Soon</p>
            </div>
          </div>
        )}
        <div className="property-price">
          ${property.pricePerNight}/night
        </div>
      </div>
      
      <div className="property-info">
        <h3>{property.name}</h3>
        <p className="property-description">{property.description}</p>
        
        <div className="property-details">
          <span>{property.sqFt} sq ft</span>
          <span>{property.bedrooms} bed{property.bedrooms !== 1 ? 's' : ''}</span>
          <span>{property.bathrooms} bath{property.bathrooms !== 1 ? 's' : ''}</span>
          <span>Sleeps {property.sleeps}</span>
        </div>
        
        <div className="property-amenities">
          {property.rooms && property.rooms.slice(0, 3).map((room, index) => (
            <span key={index} className="amenity-tag">{room}</span>
          ))}
          {property.rooms && property.rooms.length > 3 && (
            <span className="amenity-tag">+{property.rooms.length - 3} more</span>
          )}
        </div>
        
        <Link to={`/property/${property.id}`} className="view-property-btn">
          View Details & Book
        </Link>
        
        <div className="property-admin-actions">
          <Link to={`/admin/edit-property/${property.id}`} className="edit-property-btn-small">
            Edit Property
          </Link>
        </div>
      </div>
    </div>
  );
};

const VacationRentals = () => {
  const { properties } = useProperties();
  const [searchTerm, setSearchTerm] = useState('');
  const [priceRange, setPriceRange] = useState('all');
  const [bedrooms, setBedrooms] = useState('all');
  const [sortBy, setSortBy] = useState('name');

  // Filter properties based on search criteria
  const filteredProperties = properties.filter(property => {
    const matchesSearch = property.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         property.description.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesPrice = priceRange === 'all' || 
                        (priceRange === 'under-200' && property.pricePerNight < 200) ||
                        (priceRange === '200-300' && property.pricePerNight >= 200 && property.pricePerNight <= 300) ||
                        (priceRange === 'over-300' && property.pricePerNight > 300);
    
    const matchesBedrooms = bedrooms === 'all' || property.bedrooms.toString() === bedrooms;
    
    return matchesSearch && matchesPrice && matchesBedrooms;
  });

  // Sort properties
  const sortedProperties = [...filteredProperties].sort((a, b) => {
    switch (sortBy) {
      case 'price-low':
        return a.pricePerNight - b.pricePerNight;
      case 'price-high':
        return b.pricePerNight - a.pricePerNight;
      case 'bedrooms':
        return b.bedrooms - a.bedrooms;
      case 'name':
      default:
        return a.name.localeCompare(b.name);
    }
  });

  return (
    <div className="vacation-rentals">
      <div className="container">
        {/* Hero Section */}
        <section className="rentals-hero">
          <h1>Vacation Rentals</h1>
          <p>
            Discover our collection of premium vacation rentals in the beautiful Colorado Springs
            and Ute Pass area. Each property is carefully selected and maintained to provide you
            with an unforgettable mountain getaway.
          </p>
        </section>

        {/* Search and Filter */}
        <section className="search-filters">
          <div className="search-bar">
            <input
              type="text"
              placeholder="Search properties..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <div className="filters">
            <select value={priceRange} onChange={(e) => setPriceRange(e.target.value)}>
              <option value="all">All Prices</option>
              <option value="under-200">Under $200</option>
              <option value="200-300">$200 - $300</option>
              <option value="over-300">Over $300</option>
            </select>
            
            <select value={bedrooms} onChange={(e) => setBedrooms(e.target.value)}>
              <option value="all">All Bedrooms</option>
              <option value="1">1 Bedroom</option>
              <option value="2">2 Bedrooms</option>
              <option value="3">3 Bedrooms</option>
              <option value="4">4+ Bedrooms</option>
            </select>
            
            <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
              <option value="name">Sort by Name</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="bedrooms">Most Bedrooms</option>
            </select>
          </div>
        </section>

        {/* Results Summary */}
        <section className="results-summary">
          <p>Showing {sortedProperties.length} {sortedProperties.length === 1 ? 'property' : 'properties'}</p>
          {/* Admin Link - Hidden in production */}
          <Link to="/admin/add-property" className="admin-link">
            + Add Property (Admin)
          </Link>
        </section>

        {/* Properties Grid */}
        <section className="properties-grid">
          {sortedProperties.length === 0 ? (
            <div className="no-results">
              <h3>No properties found</h3>
              <p>Try adjusting your search criteria to see more results.</p>
            </div>
          ) : (
            sortedProperties.map((property) => (
              <PropertyCard key={property.id} property={property} />
            ))
          )}
        </section>

        {/* Call to Action */}
        <section className="rentals-cta">
          <div className="cta-content">
            <h2>Need Help Finding the Perfect Rental?</h2>
            <p>
              Our family team is here to help you find the ideal vacation rental for your Colorado getaway.
              Contact us for personalized recommendations and assistance with your booking.
            </p>
            <Link to="/contact" className="btn">
              Contact Our Family Team
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
};

export default VacationRentals; 