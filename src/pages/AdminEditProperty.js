import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useProperties } from '../contexts/PropertiesContext';
import ImageUpload from '../components/ImageUpload';
import './AdminAddProperty.css';

const AdminEditProperty = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { getPropertyById, updateProperty } = useProperties();
  
  const [formData, setFormData] = useState({
    name: '',
    pricePerNight: '',
    sqFt: '',
    bedrooms: '',
    beds: '',
    sleeps: '',
    bathrooms: '',
    rooms: [],
    images: [],
    address: '',
    coordinates: { lat: '', lng: '' },
    description: '',
    about: '',
    roomsAndBeds: {
      bedrooms: [],
      bathrooms: '',
      spaces: []
    },
    amenities: {
      essentials: [],
      kitchen: [],
      entertainment: [],
      babyToddler: [],
      laundry: [],
      parking: [],
      safety: [],
      accessibility: [],
      locationType: [],
      nearbyActivities: [],
      suitability: []
    },
    policies: {
      cancellation: []
    },
    houseRules: []
  });

  const [currentRoom, setCurrentRoom] = useState('');
  const [currentBedroom, setCurrentBedroom] = useState({ name: '', bed: '', sleeps: '' });
  const [currentSpace, setCurrentSpace] = useState('');
  const [currentAmenity, setCurrentAmenity] = useState({ category: 'essentials', item: '' });
  const [currentPolicy, setCurrentPolicy] = useState('');
  const [currentRule, setCurrentRule] = useState('');

  // Load existing property data
  useEffect(() => {
    const property = getPropertyById(id);
    if (property) {
      setFormData({
        name: property.name,
        pricePerNight: property.pricePerNight.toString(),
        sqFt: property.sqFt.toString(),
        bedrooms: property.bedrooms.toString(),
        beds: property.beds.toString(),
        sleeps: property.sleeps.toString(),
        bathrooms: property.bathrooms.toString(),
        rooms: property.rooms || [],
        images: property.images || [],
        address: property.address || '',
        coordinates: {
          lat: property.coordinates?.lat?.toString() || '',
          lng: property.coordinates?.lng?.toString() || ''
        },
        description: property.description || '',
        about: property.about || '',
        roomsAndBeds: {
          bedrooms: property.roomsAndBeds?.bedrooms || [],
          bathrooms: property.roomsAndBeds?.bathrooms?.toString() || property.bathrooms.toString(),
          spaces: property.roomsAndBeds?.spaces || []
        },
        amenities: {
          essentials: property.amenities?.essentials || [],
          kitchen: property.amenities?.kitchen || [],
          entertainment: property.amenities?.entertainment || [],
          babyToddler: property.amenities?.babyToddler || [],
          laundry: property.amenities?.laundry || [],
          parking: property.amenities?.parking || [],
          safety: property.amenities?.safety || [],
          accessibility: property.amenities?.accessibility || [],
          locationType: property.amenities?.locationType || [],
          nearbyActivities: property.amenities?.nearbyActivities || [],
          suitability: property.amenities?.suitability || []
        },
        policies: {
          cancellation: property.policies?.cancellation || []
        },
        houseRules: property.houseRules || []
      });
    } else {
      alert('Property not found');
      navigate('/vacation-rentals');
    }
  }, [id, getPropertyById, navigate]);

  const amenityCategories = [
    'essentials', 'kitchen', 'entertainment', 'babyToddler', 'laundry', 
    'parking', 'safety', 'accessibility', 'locationType', 'nearbyActivities', 'suitability'
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name.includes('.')) {
      const [parent, child] = name.split('.');
      setFormData(prev => ({
        ...prev,
        [parent]: {
          ...prev[parent],
          [child]: value
        }
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const addRoom = () => {
    if (currentRoom.trim()) {
      setFormData(prev => ({
        ...prev,
        rooms: [...prev.rooms, currentRoom.trim()]
      }));
      setCurrentRoom('');
    }
  };

  const removeRoom = (index) => {
    setFormData(prev => ({
      ...prev,
      rooms: prev.rooms.filter((_, i) => i !== index)
    }));
  };

  const addBedroom = () => {
    if (currentBedroom.name && currentBedroom.bed) {
      setFormData(prev => ({
        ...prev,
        roomsAndBeds: {
          ...prev.roomsAndBeds,
          bedrooms: [...prev.roomsAndBeds.bedrooms, {
            ...currentBedroom,
            sleeps: parseInt(currentBedroom.sleeps) || 2
          }]
        }
      }));
      setCurrentBedroom({ name: '', bed: '', sleeps: '' });
    }
  };

  const removeBedroom = (index) => {
    setFormData(prev => ({
      ...prev,
      roomsAndBeds: {
        ...prev.roomsAndBeds,
        bedrooms: prev.roomsAndBeds.bedrooms.filter((_, i) => i !== index)
      }
    }));
  };

  const addSpace = () => {
    if (currentSpace.trim()) {
      setFormData(prev => ({
        ...prev,
        roomsAndBeds: {
          ...prev.roomsAndBeds,
          spaces: [...prev.roomsAndBeds.spaces, currentSpace.trim()]
        }
      }));
      setCurrentSpace('');
    }
  };

  const removeSpace = (index) => {
    setFormData(prev => ({
      ...prev,
      roomsAndBeds: {
        ...prev.roomsAndBeds,
        spaces: prev.roomsAndBeds.spaces.filter((_, i) => i !== index)
      }
    }));
  };

  const addAmenity = () => {
    if (currentAmenity.item.trim()) {
      setFormData(prev => ({
        ...prev,
        amenities: {
          ...prev.amenities,
          [currentAmenity.category]: [
            ...prev.amenities[currentAmenity.category],
            currentAmenity.item.trim()
          ]
        }
      }));
      setCurrentAmenity({ ...currentAmenity, item: '' });
    }
  };

  const removeAmenity = (category, index) => {
    setFormData(prev => ({
      ...prev,
      amenities: {
        ...prev.amenities,
        [category]: prev.amenities[category].filter((_, i) => i !== index)
      }
    }));
  };

  const addPolicy = () => {
    if (currentPolicy.trim()) {
      setFormData(prev => ({
        ...prev,
        policies: {
          ...prev.policies,
          cancellation: [...prev.policies.cancellation, currentPolicy.trim()]
        }
      }));
      setCurrentPolicy('');
    }
  };

  const removePolicy = (index) => {
    setFormData(prev => ({
      ...prev,
      policies: {
        ...prev.policies,
        cancellation: prev.policies.cancellation.filter((_, i) => i !== index)
      }
    }));
  };

  const addRule = () => {
    if (currentRule.trim()) {
      setFormData(prev => ({
        ...prev,
        houseRules: [...prev.houseRules, currentRule.trim()]
      }));
      setCurrentRule('');
    }
  };

  const removeRule = (index) => {
    setFormData(prev => ({
      ...prev,
      houseRules: prev.houseRules.filter((_, i) => i !== index)
    }));
  };

  const handleImagesChange = (newImages) => {
    setFormData(prev => ({
      ...prev,
      images: newImages
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Validate required fields
    if (!formData.name || !formData.pricePerNight || !formData.bedrooms) {
      alert('Please fill in all required fields (Name, Price per Night, Bedrooms)');
      return;
    }

    // Convert string numbers to integers
    const propertyData = {
      ...formData,
      pricePerNight: parseInt(formData.pricePerNight),
      sqFt: parseInt(formData.sqFt) || 0,
      bedrooms: parseInt(formData.bedrooms),
      beds: parseInt(formData.beds) || formData.bedrooms,
      sleeps: parseInt(formData.sleeps) || formData.bedrooms * 2,
      bathrooms: parseInt(formData.bathrooms) || 1,
      coordinates: {
        lat: parseFloat(formData.coordinates.lat) || 0,
        lng: parseFloat(formData.coordinates.lng) || 0
      },
      roomsAndBeds: {
        ...formData.roomsAndBeds,
        bathrooms: parseInt(formData.bathrooms) || 1
      }
    };

    updateProperty(id, propertyData);
    alert('Property updated successfully!');
    navigate('/vacation-rentals');
  };

  return (
    <div className="admin-add-property">
      <div className="container">
        <div className="admin-header">
          <h1>Edit Property</h1>
          <p>Update the details for this rental property</p>
        </div>

        <form onSubmit={handleSubmit} className="property-form">
          {/* Basic Information */}
          <section className="form-section">
            <h2>Basic Information</h2>
            <div className="form-grid">
              <div className="form-group">
                <label>Property Name *</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="form-group">
                <label>Price per Night *</label>
                <input
                  type="number"
                  name="pricePerNight"
                  value={formData.pricePerNight}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="form-group">
                <label>Square Feet</label>
                <input
                  type="number"
                  name="sqFt"
                  value={formData.sqFt}
                  onChange={handleInputChange}
                />
              </div>
              <div className="form-group">
                <label>Bedrooms *</label>
                <input
                  type="number"
                  name="bedrooms"
                  value={formData.bedrooms}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="form-group">
                <label>Total Beds</label>
                <input
                  type="number"
                  name="beds"
                  value={formData.beds}
                  onChange={handleInputChange}
                />
              </div>
              <div className="form-group">
                <label>Sleeps</label>
                <input
                  type="number"
                  name="sleeps"
                  value={formData.sleeps}
                  onChange={handleInputChange}
                />
              </div>
              <div className="form-group">
                <label>Bathrooms</label>
                <input
                  type="number"
                  name="bathrooms"
                  value={formData.bathrooms}
                  onChange={handleInputChange}
                />
              </div>
            </div>
          </section>

          {/* Rooms */}
          <section className="form-section">
            <h2>Rooms</h2>
            <div className="add-item-section">
              <div className="add-item-form">
                <input
                  type="text"
                  value={currentRoom}
                  onChange={(e) => setCurrentRoom(e.target.value)}
                  placeholder="Enter room name (e.g., Kitchen, Living Room)"
                />
                <button type="button" onClick={addRoom}>Add Room</button>
              </div>
              <div className="items-list">
                {formData.rooms.map((room, index) => (
                  <span key={index} className="item-tag">
                    {room}
                    <button type="button" onClick={() => removeRoom(index)}>×</button>
                  </span>
                ))}
              </div>
            </div>
          </section>

          {/* Images */}
          <section className="form-section">
            <h2>Images</h2>
            <ImageUpload
              images={formData.images}
              onImagesChange={handleImagesChange}
              propertyName={formData.name}
            />
          </section>

          {/* Location */}
          <section className="form-section">
            <h2>Location</h2>
            <div className="form-group">
              <label>Address</label>
              <input
                type="text"
                name="address"
                value={formData.address}
                onChange={handleInputChange}
                placeholder="Enter full address"
              />
            </div>
            <div className="form-grid">
              <div className="form-group">
                <label>Latitude</label>
                <input
                  type="number"
                  name="coordinates.lat"
                  value={formData.coordinates.lat}
                  onChange={handleInputChange}
                  step="any"
                  placeholder="e.g., 38.9939"
                />
              </div>
              <div className="form-group">
                <label>Longitude</label>
                <input
                  type="number"
                  name="coordinates.lng"
                  value={formData.coordinates.lng}
                  onChange={handleInputChange}
                  step="any"
                  placeholder="e.g., -105.0578"
                />
              </div>
            </div>
          </section>

          {/* Description */}
          <section className="form-section">
            <h2>Description</h2>
            <div className="form-group">
              <label>Short Description</label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                rows="3"
                placeholder="Brief description for property listings"
              />
            </div>
            <div className="form-group">
              <label>About</label>
              <textarea
                name="about"
                value={formData.about}
                onChange={handleInputChange}
                rows="6"
                placeholder="Detailed description about the property, location, and nearby attractions"
              />
            </div>
          </section>

          {/* Bedrooms */}
          <section className="form-section">
            <h2>Bedrooms</h2>
            <div className="add-item-section">
              <div className="bedroom-form">
                <input
                  type="text"
                  value={currentBedroom.name}
                  onChange={(e) => setCurrentBedroom({...currentBedroom, name: e.target.value})}
                  placeholder="Bedroom name"
                />
                <select
                  value={currentBedroom.bed}
                  onChange={(e) => setCurrentBedroom({...currentBedroom, bed: e.target.value})}
                >
                  <option value="">Select bed type</option>
                  <option value="King">King</option>
                  <option value="Queen">Queen</option>
                  <option value="Full">Full</option>
                  <option value="Twin">Twin</option>
                  <option value="Bunk bed">Bunk bed</option>
                  <option value="Sleep sofa/futon">Sleep sofa/futon</option>
                </select>
                <input
                  type="number"
                  value={currentBedroom.sleeps}
                  onChange={(e) => setCurrentBedroom({...currentBedroom, sleeps: e.target.value})}
                  placeholder="Sleeps"
                />
                <button type="button" onClick={addBedroom}>Add Bedroom</button>
              </div>
              <div className="items-list">
                {formData.roomsAndBeds.bedrooms.map((bedroom, index) => (
                  <span key={index} className="item-tag">
                    {bedroom.name}: {bedroom.bed} (sleeps {bedroom.sleeps})
                    <button type="button" onClick={() => removeBedroom(index)}>×</button>
                  </span>
                ))}
              </div>
            </div>
          </section>

          {/* Spaces */}
          <section className="form-section">
            <h2>Additional Spaces</h2>
            <div className="add-item-section">
              <div className="add-item-form">
                <input
                  type="text"
                  value={currentSpace}
                  onChange={(e) => setCurrentSpace(e.target.value)}
                  placeholder="Enter space name (e.g., Deck, Patio)"
                />
                <button type="button" onClick={addSpace}>Add Space</button>
              </div>
              <div className="items-list">
                {formData.roomsAndBeds.spaces.map((space, index) => (
                  <span key={index} className="item-tag">
                    {space}
                    <button type="button" onClick={() => removeSpace(index)}>×</button>
                  </span>
                ))}
              </div>
            </div>
          </section>

          {/* Amenities */}
          <section className="form-section">
            <h2>Amenities</h2>
            <div className="add-item-section">
              <div className="amenity-form">
                <select
                  value={currentAmenity.category}
                  onChange={(e) => setCurrentAmenity({...currentAmenity, category: e.target.value})}
                >
                  {amenityCategories.map(category => (
                    <option key={category} value={category}>
                      {category.charAt(0).toUpperCase() + category.slice(1).replace(/([A-Z])/g, ' $1')}
                    </option>
                  ))}
                </select>
                <input
                  type="text"
                  value={currentAmenity.item}
                  onChange={(e) => setCurrentAmenity({...currentAmenity, item: e.target.value})}
                  placeholder="Enter amenity"
                />
                <button type="button" onClick={addAmenity}>Add Amenity</button>
              </div>
              
              {amenityCategories.map(category => (
                formData.amenities[category].length > 0 && (
                  <div key={category} className="amenity-category">
                    <h4>{category.charAt(0).toUpperCase() + category.slice(1).replace(/([A-Z])/g, ' $1')}</h4>
                    <div className="items-list">
                      {formData.amenities[category].map((amenity, index) => (
                        <span key={index} className="item-tag">
                          {amenity}
                          <button type="button" onClick={() => removeAmenity(category, index)}>×</button>
                        </span>
                      ))}
                    </div>
                  </div>
                )
              ))}
            </div>
          </section>

          {/* Policies */}
          <section className="form-section">
            <h2>Cancellation Policies</h2>
            <div className="add-item-section">
              <div className="add-item-form">
                <input
                  type="text"
                  value={currentPolicy}
                  onChange={(e) => setCurrentPolicy(e.target.value)}
                  placeholder="Enter cancellation policy"
                />
                <button type="button" onClick={addPolicy}>Add Policy</button>
              </div>
              <div className="items-list">
                {formData.policies.cancellation.map((policy, index) => (
                  <span key={index} className="item-tag">
                    {policy}
                    <button type="button" onClick={() => removePolicy(index)}>×</button>
                  </span>
                ))}
              </div>
            </div>
          </section>

          {/* House Rules */}
          <section className="form-section">
            <h2>House Rules</h2>
            <div className="add-item-section">
              <div className="add-item-form">
                <input
                  type="text"
                  value={currentRule}
                  onChange={(e) => setCurrentRule(e.target.value)}
                  placeholder="Enter house rule"
                />
                <button type="button" onClick={addRule}>Add Rule</button>
              </div>
              <div className="items-list">
                {formData.houseRules.map((rule, index) => (
                  <span key={index} className="item-tag">
                    {rule}
                    <button type="button" onClick={() => removeRule(index)}>×</button>
                  </span>
                ))}
              </div>
            </div>
          </section>

          <div className="form-actions">
            <button type="button" onClick={() => navigate('/vacation-rentals')} className="cancel-btn">
              Cancel
            </button>
            <button type="submit" className="submit-btn">
              Update Property
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AdminEditProperty; 