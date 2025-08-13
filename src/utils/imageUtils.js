import React from 'react';

// Utility function to check if an image exists with timeout
const checkImageExists = (src) => {
  return new Promise((resolve) => {
    const img = new Image();
    const timeout = setTimeout(() => {
      img.onload = null;
      img.onerror = null;
      resolve(false);
    }, 3000); // 3 second timeout
    
    img.onload = () => {
      clearTimeout(timeout);
      resolve(true);
    };
    
    img.onerror = () => {
      clearTimeout(timeout);
      resolve(false);
    };
    
    try {
      img.src = src;
    } catch (error) {
      clearTimeout(timeout);
      resolve(false);
    }
  });
};

// Get all available images for a property by checking sequentially
export const getAvailableImages = async (propertyId) => {
  if (!propertyId) {
    return [];
  }
  
  const images = [];
  let imageIndex = 1;
  let consecutiveNotFound = 0;
  const maxConsecutiveNotFound = 3; // Stop after 3 consecutive missing images
  
  try {
    // Check up to 50 images (reasonable limit)
    while (imageIndex <= 50 && consecutiveNotFound < maxConsecutiveNotFound) {
      const imagePath = `/images/properties/${propertyId}/${propertyId}${imageIndex}.jpg`;
      
      try {
        const exists = await checkImageExists(imagePath);
        
        if (exists) {
          images.push(imagePath);
          consecutiveNotFound = 0; // Reset counter
        } else {
          consecutiveNotFound++;
        }
      } catch (error) {
        console.warn(`Error checking image ${imagePath}:`, error);
        consecutiveNotFound++;
      }
      
      imageIndex++;
    }
  } catch (error) {
    console.error('Error in getAvailableImages:', error);
  }
  
  return images;
};

// Save custom image order to localStorage
export const saveImageOrder = (propertyId, orderedImages) => {
  if (!propertyId || !orderedImages) {
    return;
  }
  
  try {
    const imageOrders = JSON.parse(localStorage.getItem('imageOrders') || '{}');
    imageOrders[propertyId] = orderedImages;
    localStorage.setItem('imageOrders', JSON.stringify(imageOrders));
  } catch (error) {
    console.error('Error saving image order:', error);
  }
};

// Load custom image order from localStorage
export const loadImageOrder = (propertyId) => {
  if (!propertyId) {
    return null;
  }
  
  try {
    const imageOrders = JSON.parse(localStorage.getItem('imageOrders') || '{}');
    return imageOrders[propertyId] || null;
  } catch (error) {
    console.error('Error loading image order:', error);
    return null;
  }
};

// Apply custom ordering to images array
export const applyCustomOrder = (images, propertyId) => {
  if (!images || !Array.isArray(images) || images.length === 0) {
    return images || [];
  }
  
  try {
    const customOrder = loadImageOrder(propertyId);
    if (!customOrder || !Array.isArray(customOrder) || customOrder.length !== images.length) {
      return images; // Return original order if no custom order or mismatch
    }
    
    // Reorder images based on saved order, filter out any invalid entries
    const reorderedImages = customOrder
      .map(imagePath => images.find(img => img === imagePath))
      .filter(Boolean);
    
    // If reordering resulted in missing images, return original order
    if (reorderedImages.length !== images.length) {
      return images;
    }
    
    return reorderedImages;
  } catch (error) {
    console.error('Error applying custom order:', error);
    return images;
  }
};

// Clear saved image order for a property (useful when images change)
export const clearImageOrder = (propertyId) => {
  if (!propertyId) {
    return;
  }
  
  try {
    const imageOrders = JSON.parse(localStorage.getItem('imageOrders') || '{}');
    delete imageOrders[propertyId];
    localStorage.setItem('imageOrders', JSON.stringify(imageOrders));
  } catch (error) {
    console.error('Error clearing image order:', error);
  }
};

// Clear all saved image orders (useful for debugging)
export const clearAllImageOrders = () => {
  try {
    localStorage.removeItem('imageOrders');
  } catch (error) {
    console.error('Error clearing all image orders:', error);
  }
};

// Hook for React components to use available images
export const useAvailableImages = (propertyId) => {
  const [images, setImages] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  
  React.useEffect(() => {
    if (!propertyId) {
      setImages([]);
      setLoading(false);
      return;
    }
    
    const loadImages = async () => {
      setLoading(true);
      try {
        const availableImages = await getAvailableImages(propertyId);
        
        // If no images found, clear any cached image order to prevent issues
        if (!availableImages || availableImages.length === 0) {
          clearImageOrder(propertyId);
          setImages([]);
        } else {
          const orderedImages = applyCustomOrder(availableImages, propertyId);
          
          // Double-check that the ordered images are valid
          if (!orderedImages || !Array.isArray(orderedImages) || orderedImages.length === 0) {
            // If ordering failed, clear the cached order and use original
            clearImageOrder(propertyId);
            setImages(availableImages);
          } else {
            setImages(orderedImages);
          }
        }
      } catch (error) {
        console.error('Error loading images for property:', propertyId, error);
        // Clear any cached order on error to prevent persistent issues
        clearImageOrder(propertyId);
        setImages([]);
      } finally {
        setLoading(false);
      }
    };
    
    loadImages();
  }, [propertyId]);
  
  return { images, loading };
}; 