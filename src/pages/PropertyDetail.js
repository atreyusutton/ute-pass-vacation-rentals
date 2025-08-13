import React, { useState, useEffect, useRef } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useProperties } from '../contexts/PropertiesContext';
import { useAvailableImages, saveImageOrder, clearImageOrder } from '../utils/imageUtils';
import BookingCalendar from '../components/BookingCalendar';
import './PropertyDetail.css';

const PropertyDetail = () => {
  const { id } = useParams();
  const { getPropertyById } = useProperties();
  const property = getPropertyById(id);
  const { images: availableImages, loading: imagesLoading } = useAvailableImages(id);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [progress, setProgress] = useState(0);
  const [isEditMode, setIsEditMode] = useState(false);
  const [draggedIndex, setDraggedIndex] = useState(null);
  const [dragOverIndex, setDragOverIndex] = useState(null);
  const [localImages, setLocalImages] = useState([]);
  const [imageError, setImageError] = useState(false);
  const thumbnailsRef = useRef(null);
  const autoPlayRef = useRef(null);
  const progressRef = useRef(null);

  // Update local images when available images change
  useEffect(() => {
    try {
      if (availableImages && Array.isArray(availableImages)) {
        setLocalImages([...availableImages]);
        setImageError(false);
      } else {
        setLocalImages([]);
      }
    } catch (error) {
      console.error('Error updating local images:', error);
      setLocalImages([]);
      setImageError(true);
    }
  }, [availableImages]);

  // Reset current image index when switching properties or when images change
  useEffect(() => {
    if (localImages && localImages.length > 0) {
      if (currentImageIndex >= localImages.length) {
        setCurrentImageIndex(0);
      }
    } else {
      setCurrentImageIndex(0);
    }
  }, [localImages, id]);

  // Auto-advance images every 5 seconds (disabled in edit mode)
  useEffect(() => {
    if (!localImages || localImages.length <= 1 || !isAutoPlaying || imagesLoading || isEditMode || imageError) {
      setProgress(0);
      return;
    }

    let startTime = Date.now();
    const duration = 5000; // 5 seconds

    const updateProgress = () => {
      try {
        const elapsed = Date.now() - startTime;
        const progressPercent = (elapsed / duration) * 100;
        
        if (progressPercent >= 100) {
          setCurrentImageIndex(prevIndex => (prevIndex + 1) % localImages.length);
          startTime = Date.now(); // Reset timer
          setProgress(0);
        } else {
          setProgress(progressPercent);
        }
      } catch (error) {
        console.error('Error updating progress:', error);
        setProgress(0);
      }
    };

    progressRef.current = setInterval(updateProgress, 50); // Update every 50ms for smooth progress

    return () => {
      if (progressRef.current) {
        clearInterval(progressRef.current);
      }
    };
  }, [localImages, isAutoPlaying, currentImageIndex, imagesLoading, isEditMode, imageError]);

  // Scroll thumbnails to keep active image visible
  useEffect(() => {
    try {
      if (thumbnailsRef.current && localImages && localImages.length > 0 && !isEditMode && !imageError) {
        const container = thumbnailsRef.current;
        const activeThumb = container.children[currentImageIndex];
        if (activeThumb) {
          const containerRect = container.getBoundingClientRect();
          const thumbRect = activeThumb.getBoundingClientRect();
          
          // Check if thumbnail is not fully visible
          if (thumbRect.left < containerRect.left || thumbRect.right > containerRect.right) {
            activeThumb.scrollIntoView({
              behavior: 'smooth',
              block: 'nearest',
              inline: 'center'
            });
          }
        }
      }
    } catch (error) {
      console.error('Error scrolling thumbnails:', error);
    }
  }, [currentImageIndex, localImages, isEditMode, imageError]);

  useEffect(() => {
    if (!property) return;
    
    // Initialize Google Maps
    try {
      if (window.google && property.coordinates) {
        const map = new window.google.maps.Map(document.getElementById('property-map'), {
          center: property.coordinates,
          zoom: 15,
        });
        
        new window.google.maps.Marker({
          position: property.coordinates,
          map: map,
          title: property.name,
        });
      }
    } catch (error) {
      console.error('Error initializing Google Maps:', error);
    }
  }, [property]);

  const handleImageChange = (newIndex) => {
    try {
      if (newIndex >= 0 && newIndex < localImages.length) {
        setCurrentImageIndex(newIndex);
        setProgress(0);
        if (!isEditMode) {
          // Pause auto-play when user manually navigates (only in view mode)
          setIsAutoPlaying(false);
          
          // Clear existing intervals
          if (autoPlayRef.current) {
            clearInterval(autoPlayRef.current);
          }
          if (progressRef.current) {
            clearInterval(progressRef.current);
          }
          
          // Resume auto-play after 10 seconds of inactivity
          setTimeout(() => {
            setIsAutoPlaying(true);
          }, 10000);
        }
      }
    } catch (error) {
      console.error('Error changing image:', error);
    }
  };

  const toggleEditMode = () => {
    try {
      if (isEditMode) {
        // Save the current order when exiting edit mode
        saveImageOrder(id, localImages);
        // Force reload images to apply new order
        window.location.reload();
      }
      setIsEditMode(!isEditMode);
      setIsAutoPlaying(!isEditMode); // Enable auto-play when exiting edit mode
    } catch (error) {
      console.error('Error toggling edit mode:', error);
    }
  };

  const handleDragStart = (e, index) => {
    try {
      setDraggedIndex(index);
      e.dataTransfer.effectAllowed = 'move';
      e.target.style.opacity = '0.5';
    } catch (error) {
      console.error('Error starting drag:', error);
    }
  };

  const handleDragEnd = (e) => {
    try {
      e.target.style.opacity = '1';
      setDraggedIndex(null);
      setDragOverIndex(null);
    } catch (error) {
      console.error('Error ending drag:', error);
    }
  };

  const handleDragOver = (e, index) => {
    try {
      e.preventDefault();
      e.dataTransfer.dropEffect = 'move';
      setDragOverIndex(index);
    } catch (error) {
      console.error('Error during drag over:', error);
    }
  };

  const handleDragLeave = () => {
    try {
      setDragOverIndex(null);
    } catch (error) {
      console.error('Error during drag leave:', error);
    }
  };

  const handleDrop = (e, dropIndex) => {
    try {
      e.preventDefault();
      setDragOverIndex(null);
      
      if (draggedIndex === null || draggedIndex === dropIndex) return;
      
      const newImages = [...localImages];
      const draggedImage = newImages[draggedIndex];
      
      // Remove the dragged item
      newImages.splice(draggedIndex, 1);
      
      // Insert at new position
      newImages.splice(dropIndex, 0, draggedImage);
      
      setLocalImages(newImages);
      
      // Update current image index if needed
      if (currentImageIndex === draggedIndex) {
        setCurrentImageIndex(dropIndex);
      } else if (draggedIndex < currentImageIndex && dropIndex >= currentImageIndex) {
        setCurrentImageIndex(currentImageIndex - 1);
      } else if (draggedIndex > currentImageIndex && dropIndex <= currentImageIndex) {
        setCurrentImageIndex(currentImageIndex + 1);
      }
    } catch (error) {
      console.error('Error during drop:', error);
    }
  };

  const nextImage = () => {
    try {
      if (localImages && localImages.length > 0) {
        const newIndex = (currentImageIndex + 1) % localImages.length;
        handleImageChange(newIndex);
      }
    } catch (error) {
      console.error('Error going to next image:', error);
    }
  };

  const prevImage = () => {
    try {
      if (localImages && localImages.length > 0) {
        const newIndex = (currentImageIndex - 1 + localImages.length) % localImages.length;
        handleImageChange(newIndex);
      }
    } catch (error) {
      console.error('Error going to previous image:', error);
    }
  };

  const handleImageError = (e) => {
    console.warn('Failed to load image:', e.target.src);
    e.target.src = 'https://via.placeholder.com/800x500/e5e7eb/6b7280?text=Image+Unavailable';
  };

  const handleThumbnailError = (e) => {
    console.warn('Failed to load thumbnail:', e.target.src);
    e.target.src = 'https://via.placeholder.com/150x100/e5e7eb/6b7280?text=Image+Unavailable';
  };

  if (!property) {
    return (
      <div className="property-detail">
        <div className="container">
          <div className="not-found">
            <h1>Property Not Found</h1>
            <p>The property you're looking for doesn't exist.</p>
            <Link to="/vacation-rentals" className="btn">
              Back to Properties
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const handleBooking = (booking) => {
    console.log('Booking submitted:', booking);
    // In a real app, this would send the booking to your backend
  };

  // Safe check for valid current image index
  const safeCurrentIndex = Math.max(0, Math.min(currentImageIndex, (localImages?.length || 1) - 1));

  return (
    <div className="property-detail">
      <div className="container">
        {/* Header */}
        <div className="property-header">
          <div className="breadcrumb">
            <Link to="/vacation-rentals">Vacation Rentals</Link>
            <span> / </span>
            <span>{property.name}</span>
          </div>
          <h1>{property.name}</h1>
          <div className="property-stats">
            <span>House {property.sqFt} sq. ft</span>
            <span>Bedrooms {property.bedrooms}</span>
            <span>Beds {property.beds}</span>
            <span>Sleeps {property.sleeps}</span>
            <span>Bathrooms {property.bathrooms}</span>
          </div>
          <div className="property-actions">
            <Link to={`/admin/edit-property/${property.id}`} className="edit-property-btn">
              Edit Property
            </Link>
            <button 
              onClick={() => {
                clearImageOrder(id);
                window.location.reload();
              }}
              className="clear-cache-btn"
              title="Clear image order cache and refresh"
            >
              🗑️ Reset Image Order
            </button>
          </div>
          <div className="property-rooms">
            {property.rooms.map((room, index) => (
              <span key={index} className="room-tag">
                {room}
              </span>
            ))}
          </div>
        </div>

        {/* Image Gallery */}
        <div className="image-gallery">
          {imagesLoading ? (
            <div className="images-loading">
              <div className="loading-content">
                <h3>🔄 Loading Images...</h3>
                <p>Checking available property images</p>
              </div>
            </div>
          ) : localImages && localImages.length > 0 && !imageError ? (
            <>
              {/* Edit Mode Controls */}
              {localImages.length > 1 && (
                <div className="image-controls">
                  <button 
                    className={`edit-order-btn ${isEditMode ? 'active' : ''}`}
                    onClick={toggleEditMode}
                  >
                    {isEditMode ? '💾 Save Order' : '🔄 Edit Order'}
                  </button>
                  {isEditMode && (
                    <p className="edit-mode-hint">
                      📌 Drag thumbnails below to reorder images
                    </p>
                  )}
                </div>
              )}
              
              <div className="main-image">
                <img
                  src={localImages[safeCurrentIndex]}
                  alt={property.name}
                  onError={handleImageError}
                />
                {localImages.length > 1 && !isEditMode && (
                  <>
                    <button className="image-nav prev" onClick={prevImage}>‹</button>
                    <button className="image-nav next" onClick={nextImage}>›</button>
                    <div className="image-counter">
                      {safeCurrentIndex + 1} / {localImages.length}
                    </div>
                    <div className="auto-play-controls">
                      <button 
                        className={`auto-play-btn ${isAutoPlaying ? 'playing' : 'paused'}`}
                        onClick={() => setIsAutoPlaying(!isAutoPlaying)}
                        title={isAutoPlaying ? 'Pause slideshow' : 'Play slideshow'}
                      >
                        {isAutoPlaying ? '⏸️' : '▶️'}
                      </button>
                    </div>
                    {isAutoPlaying && localImages.length > 1 && (
                      <div className="auto-play-progress">
                        <div 
                          className="progress-bar" 
                          style={{ width: `${progress}%` }}
                        />
                      </div>
                    )}
                  </>
                )}
              </div>
              {localImages.length > 1 && (
                <div className={`image-thumbnails ${isEditMode ? 'edit-mode' : ''}`} ref={thumbnailsRef}>
                  {localImages.map((imagePath, index) => (
                    <img
                      key={`${imagePath}-${index}`}
                      src={imagePath}
                      alt={`${property.name} view ${index + 1}`}
                      className={`
                        ${index === safeCurrentIndex ? 'active' : ''} 
                        ${isEditMode ? 'draggable' : ''} 
                        ${dragOverIndex === index ? 'drag-over' : ''}
                      `}
                      onClick={() => !isEditMode && handleImageChange(index)}
                      draggable={isEditMode}
                      onDragStart={(e) => isEditMode && handleDragStart(e, index)}
                      onDragEnd={handleDragEnd}
                      onDragOver={(e) => isEditMode && handleDragOver(e, index)}
                      onDragLeave={handleDragLeave}
                      onDrop={(e) => isEditMode && handleDrop(e, index)}
                      style={{ cursor: isEditMode ? 'grab' : 'pointer' }}
                      onError={handleThumbnailError}
                    />
                  ))}
                </div>
              )}
            </>
          ) : (
            <div className="no-images">
              <div className="no-images-content">
                <h3>📸 Images Coming Soon</h3>
                <p>Property images will be available shortly</p>
                {imageError && (
                  <p style={{ fontSize: '0.9rem', color: '#ef4444', marginTop: '0.5rem' }}>
                    There was an issue loading images. Please try refreshing the page.
                  </p>
                )}
              </div>
            </div>
          )}
        </div>

        <div className="property-content">
          <div className="main-content">
            {/* Description */}
            <section className="property-section">
              <h2>About</h2>
              <p className="property-description">{property.description}</p>
              <div className="property-about">
                {property.about.split('\n\n').map((paragraph, index) => (
                  <p key={index}>{paragraph}</p>
                ))}
              </div>
            </section>

            {/* Rooms and Beds */}
            <section className="property-section">
              <h2>Rooms and Beds</h2>
              <div className="rooms-beds-grid">
                <div className="bedrooms-section">
                  <h3>Bedrooms: {property.roomsAndBeds.bedrooms.length} (Sleeps: {property.sleeps})</h3>
                  <div className="bedrooms-list">
                    {property.roomsAndBeds.bedrooms.map((bedroom, index) => (
                      <div key={index} className="bedroom-item">
                        <strong>{bedroom.name}</strong>
                        <span>{bedroom.bed}</span>
                        {bedroom.sleeps && <span>Sleeps {bedroom.sleeps}</span>}
                      </div>
                    ))}
                  </div>
                </div>
                <div className="spaces-section">
                  <h3>Additional Spaces</h3>
                  <div className="spaces-list">
                    {property.roomsAndBeds.spaces.map((space, index) => (
                      <span key={index} className="space-tag">{space}</span>
                    ))}
                  </div>
                </div>
              </div>
            </section>

            {/* Amenities */}
            <section className="property-section">
              <h2>Amenities</h2>
              <div className="amenities-grid">
                {Object.entries(property.amenities).map(([category, items]) => (
                  <div key={category} className="amenity-category">
                    <h3>{category.charAt(0).toUpperCase() + category.slice(1).replace(/([A-Z])/g, ' $1')}</h3>
                    <ul>
                      {items.map((item, index) => (
                        <li key={index}>{item}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </section>

            {/* Policies */}
            <section className="property-section">
              <h2>Policies</h2>
              <div className="policies">
                <h3>Cancellation Policy</h3>
                <ul>
                  {property.policies.cancellation.map((policy, index) => (
                    <li key={index}>{policy}</li>
                  ))}
                </ul>
              </div>
            </section>

            {/* House Rules */}
            <section className="property-section">
              <h2>House Rules</h2>
              <ul className="house-rules">
                {property.houseRules.map((rule, index) => (
                  <li key={index}>{rule}</li>
                ))}
              </ul>
            </section>

            {/* Location */}
            <section className="property-section">
              <h2>Location</h2>
              <p className="property-address">{property.address}</p>
              <div id="property-map" className="property-map">
                {/* Google Maps will be initialized here */}
                <div className="map-placeholder">
                  <p>Map loading... (Google Maps API integration)</p>
                  <p>📍 {property.address}</p>
                </div>
              </div>
            </section>
          </div>

          <div className="sidebar-content">
            {/* Price and Booking */}
            <div className="booking-widget">
              <div className="price-display">
                <span className="price">${property.pricePerNight}</span>
                <span className="price-period">/ night</span>
              </div>
              <BookingCalendar 
                property={property} 
                onBooking={handleBooking}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PropertyDetail; 