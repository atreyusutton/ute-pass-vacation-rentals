import React, { createContext, useContext, useState } from 'react';

const PropertiesContext = createContext();

export const useProperties = () => {
  const context = useContext(PropertiesContext);
  if (!context) {
    throw new Error('useProperties must be used within a PropertiesProvider');
  }
  return context;
};

export const PropertiesProvider = ({ children }) => {
  const [properties, setProperties] = useState([
    {
      id: 'chez-les-duclos',
      name: 'Chez Les DuClos',
      pricePerNight: 250,
      sqFt: 2654,
      bedrooms: 4,
      beds: 5,
      sleeps: 8,
      bathrooms: 3,
      rooms: ['Kitchen', 'Living Room', 'Dining Area', 'Deck', 'Patio', 'Porch', 'Lower Level Walkout', 'Garage'],
      address: '123 Pine Ridge Drive, Woodland Park, CO 80863',
      coordinates: { lat: 38.9939, lng: -105.0578 },
      description: `Upon your arrival to this cozy cabin nestled in the Ponderosa Pines and Aspen groves, you will enjoy scenic views of Pikes Peak and the Sangre de Cristos mountain range. See if you can spot the elusive Stellers Jay, the greedy white-breasted nut hatcher, curious little chipmunks, and the occasional herd of mule deer.`,
      about: `From the balcony, either with your morning cup of coffee or your evening mug of hot cocoa, immerse yourself in the peaceful surroundings that Chez Les DuClos provides.

The sites of interest in the area will keep you busy when out and about. You are only 20 minutes away from the Colorado Wolf and Wildlife Center in Divide, Co. Within 45 minutes or closer you will find Garden of the Gods, Manitou Cliff Dwellings, Seven Falls, Manitou Springs and the Pikes Peak Cog Railroad, the North Pole Amusement Park, Cave of the Winds, Cripple Creek with its casinos, the Molly Kathleen Gold Mine, Cripple Creek Train, and more. It's a short 15 minutes to the Florissant Fossil Beds National Park and Trails. Colorado Springs is 35 miles away where you will find the famous Cheyenne Mountain Park Zoo and many other interesting attractions. The Air Force Academy is approximately 38 miles from the cabin. Breckenridge and Denver are approximately 1 ½ hours away.

The quaint towns of Divide and Woodland Park are home to unique dining options, charming stores, as well as grocery stores, drug stores, a Walmart Supercenter and theatre. Several churches are located in this area as well.`,
      roomsAndBeds: {
        bedrooms: [
          { name: 'Bedroom 1', bed: 'Sleep sofa/futon', sleeps: 2 },
          { name: 'Bedroom 2', bed: 'King', sleeps: 2 },
          { name: 'Bedroom 3', bed: 'Queen', sleeps: 2 },
          { name: 'Bedroom 4 - Master', bed: 'King', sleeps: 2 }
        ],
        bathrooms: 3,
        spaces: ['Lower Level Walkout', 'Garage', 'Deck', 'Patio', 'Porch']
      },
      amenities: {
        essentials: ['Internet', 'Linens provided', 'Towels Provided', 'Heating', 'Wireless Internet', 'Fireplace', 'Toilet Paper', 'Paper Towels', 'Basic Soaps', 'Shampoo', 'Free wifi'],
        kitchen: ['Microwave', 'Refrigerator', 'Dishes & Utensils', 'Coffee Maker', 'Drip and Keurig', 'Kitchen', 'Crock Pot', 'Dishwasher', 'Stove', 'Toaster', 'Oven', 'Grill', 'Blender', 'Dining table', 'Kitchen island'],
        entertainment: ['Television', 'RoKu available', 'Satellite/Cable', 'DVD Player', 'Smart TV'],
        babyToddler: ['Games for Kids'],
        laundry: ['Washing machine', 'Clothes dryer'],
        parking: ['Parking', 'Detached 2 car Garage is available for guest use', 'Garage', 'Available for guest use'],
        safety: ['Smoke detector', 'Fire extinguisher', 'Carbon monoxide detector'],
        accessibility: ['Wheelchair inaccessible'],
        locationType: ['Rural', 'Mountain'],
        nearbyActivities: ['Fishing', 'Golf', 'Hiking', 'Wildlife viewing', 'Mountain biking', 'Mountain climbing', 'Rock climbing', 'Cross country skiing'],
        suitability: ['Minimum Age Limit for Renters: 25']
      },
      policies: {
        cancellation: [
          '100% refund of amount paid if you cancel at least 30 days before check-in.',
          '50% refund of amount paid (minus the service fee) if you cancel at least 14 days before check-in.',
          'No refund if you cancel less than 14 days before check-in'
        ]
      },
      houseRules: [
        'You will be responsible for any damage to the rental property caused by you or your party during your stay.',
        'Check in after 4:00 PM',
        'Check out before 10:00 AM',
        'Maximum overnight guests: 10',
        'Minimum age to rent: 25',
        'Children allowed: ages 0-17',
        'No pets allowed',
        'No events allowed',
        'No smoking allowed',
        'Cars can be parked in front of the home and in the Garage.'
      ],
      availability: {
        // Sample availability data - in real app this would come from a booking system
        '2025-07-08': { available: true, price: 250 },
        '2025-07-09': { available: true, price: 250 },
        '2025-07-10': { available: true, price: 250 },
        '2025-07-11': { available: true, price: 250 },
        '2025-07-12': { available: true, price: 250 },
        '2025-07-24': { available: true, price: 250 },
        '2025-07-25': { available: true, price: 250 },
        '2025-07-26': { available: true, price: 250 },
        '2025-07-27': { available: true, price: 250 },
        '2025-07-28': { available: true, price: 250 },
        '2025-07-29': { available: true, price: 250 },
        '2025-07-31': { available: true, price: 250 }
      }
    }
  ]);

  const addProperty = (property) => {
    const newProperty = {
      ...property,
      id: property.name.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, ''),
      availability: {}
    };
    setProperties(prev => [...prev, newProperty]);
  };

  const updateProperty = (id, updatedProperty) => {
    setProperties(prev => prev.map(property => 
      property.id === id ? { ...updatedProperty, id } : property
    ));
  };

  const getPropertyById = (id) => {
    return properties.find(property => property.id === id);
  };

  const value = {
    properties,
    addProperty,
    updateProperty,
    getPropertyById
  };

  return (
    <PropertiesContext.Provider value={value}>
      {children}
    </PropertiesContext.Provider>
  );
}; 