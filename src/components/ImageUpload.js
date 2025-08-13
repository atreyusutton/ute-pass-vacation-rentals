import React, { useState, useRef } from 'react';
import JSZip from 'jszip';
import './ImageUpload.css';

const ImageUpload = ({ images, onImagesChange, propertyName }) => {
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [previewUrls, setPreviewUrls] = useState([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [draggedIndex, setDraggedIndex] = useState(null);
  const [dragOverIndex, setDragOverIndex] = useState(null);
  const fileInputRef = useRef(null);

  // Convert property name to hyphenated format
  const getHyphenatedName = (name) => {
    if (!name || name.trim() === '') {
      return 'new-property';
    }
    return name.toLowerCase()
      .replace(/[^a-z0-9\s-]/g, '') // Remove special characters except spaces and hyphens
      .replace(/\s+/g, '-') // Replace spaces with hyphens
      .replace(/-+/g, '-') // Replace multiple hyphens with single hyphen
      .replace(/^-|-$/g, ''); // Remove leading/trailing hyphens
  };

  const handleFileSelect = (e) => {
    const files = Array.from(e.target.files);
    const imageFiles = files.filter(file => file.type.startsWith('image/'));
    
    if (imageFiles.length !== files.length) {
      alert('Please select only image files (jpg, png, gif, etc.)');
    }

    setSelectedFiles(prev => [...prev, ...imageFiles]);

    // Create preview URLs
    const newPreviewUrls = imageFiles.map(file => ({
      file,
      url: URL.createObjectURL(file),
      name: file.name
    }));
    
    setPreviewUrls(prev => [...prev, ...newPreviewUrls]);
  };

  const removeSelectedFile = (index) => {
    const newFiles = selectedFiles.filter((_, i) => i !== index);
    const newPreviews = previewUrls.filter((_, i) => i !== index);
    
    // Revoke the URL to free memory
    URL.revokeObjectURL(previewUrls[index].url);
    
    setSelectedFiles(newFiles);
    setPreviewUrls(newPreviews);
  };

  // Drag and drop handlers
  const handleDragStart = (e, index) => {
    setDraggedIndex(index);
    e.dataTransfer.effectAllowed = 'move';
    e.target.style.opacity = '0.5';
  };

  const handleDragEnd = (e) => {
    e.target.style.opacity = '1';
    setDraggedIndex(null);
    setDragOverIndex(null);
  };

  const handleDragOver = (e, index) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
    setDragOverIndex(index);
  };

  const handleDragLeave = () => {
    setDragOverIndex(null);
  };

  const handleDrop = (e, dropIndex) => {
    e.preventDefault();
    setDragOverIndex(null);
    
    if (draggedIndex === null || draggedIndex === dropIndex) return;
    
    // Reorder files
    const newFiles = [...selectedFiles];
    const newPreviews = [...previewUrls];
    
    const draggedFile = newFiles[draggedIndex];
    const draggedPreview = newPreviews[draggedIndex];
    
    // Remove dragged items
    newFiles.splice(draggedIndex, 1);
    newPreviews.splice(draggedIndex, 1);
    
    // Insert at new position
    newFiles.splice(dropIndex, 0, draggedFile);
    newPreviews.splice(dropIndex, 0, draggedPreview);
    
    setSelectedFiles(newFiles);
    setPreviewUrls(newPreviews);
  };

  const createAndDownloadZip = async () => {
    if (selectedFiles.length === 0) {
      alert('Please select some images first');
      return;
    }

    if (!propertyName || propertyName.trim() === '') {
      alert('Please enter a property name first');
      return;
    }

    setIsProcessing(true);

    try {
      const zip = new JSZip();
      const hyphenatedName = getHyphenatedName(propertyName);
      const currentImageCount = images.length;

      // Create instructions content using the current order
      const instructionsContent = `
PROPERTY IMAGE SETUP INSTRUCTIONS
=====================================

Property: ${propertyName}
Folder: ${hyphenatedName}

STEP 1: Extract this ZIP file
-----------------------------
Extract all files to a temporary location on your computer.

STEP 2: Create the folder structure
-----------------------------------
In your project, create this folder path:
public/images/properties/${hyphenatedName}/

STEP 3: Copy the images
-----------------------
Copy all the image files from this ZIP to:
public/images/properties/${hyphenatedName}/

The files are properly named in your chosen order:
${selectedFiles.map((file, index) => {
  const fileExtension = file.name.split('.').pop();
  const imageNumber = currentImageCount + index + 1;
  return `${hyphenatedName}${imageNumber}.${fileExtension}`;
}).join('\n')}

STEP 4: Refresh your browser
----------------------------
After copying the files, refresh your property page to see the images.

That's it! Your images are now ready to display on your property.

Original file mapping (in your chosen order):
${selectedFiles.map((file, index) => {
  const fileExtension = file.name.split('.').pop();
  const imageNumber = currentImageCount + index + 1;
  return `${file.name} → ${hyphenatedName}${imageNumber}.${fileExtension}`;
}).join('\n')}
      `;

      // Add instructions file to ZIP
      zip.file('INSTRUCTIONS.txt', instructionsContent);

      // Add images to ZIP with proper naming in the reordered sequence
      const imagePaths = [];
      for (let i = 0; i < selectedFiles.length; i++) {
        const file = selectedFiles[i];
        const fileExtension = file.name.split('.').pop();
        const imageNumber = currentImageCount + i + 1;
        const fileName = `${hyphenatedName}${imageNumber}.${fileExtension}`;
        
        // Add file to ZIP
        zip.file(fileName, file);
        
        // Track the path for the component state
        imagePaths.push(`/images/properties/${hyphenatedName}/${fileName}`);
      }

      // Generate and download ZIP
      const zipBlob = await zip.generateAsync({ type: 'blob' });
      
      // Create download link
      const url = URL.createObjectURL(zipBlob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${hyphenatedName}-images.zip`;
      a.click();
      URL.revokeObjectURL(url);

      // Update the images in the component
      onImagesChange([...images, ...imagePaths]);

      alert(`✅ Downloaded ZIP with ${selectedFiles.length} image(s) in your chosen order!\n\nExtract the ZIP and copy the files to:\npublic/images/properties/${hyphenatedName}/`);
      
      // Clear selected files
      setSelectedFiles([]);
      previewUrls.forEach(preview => URL.revokeObjectURL(preview.url));
      setPreviewUrls([]);
      fileInputRef.current.value = '';

    } catch (error) {
      console.error('Error creating ZIP:', error);
      alert('Error creating ZIP file. Please try again.');
    } finally {
      setIsProcessing(false);
    }
  };

  const removeExistingImage = (index) => {
    const newImages = images.filter((_, i) => i !== index);
    onImagesChange(newImages);
  };

  const hyphenatedName = getHyphenatedName(propertyName);

  return (
    <div className="image-upload">
      <div className="upload-section">
        <h3>Upload Images</h3>
        <div className="feature-info">
          <p>📦 <strong>ZIP Download Mode</strong> - Works on all browsers (Chrome, Safari, Firefox, Edge)</p>
        </div>
        {propertyName && (
          <div className="property-info">
            <p><strong>Property:</strong> {propertyName}</p>
            <p><strong>Folder:</strong> public/images/properties/{hyphenatedName}/</p>
            <p><strong>ZIP Name:</strong> {hyphenatedName}-images.zip</p>
          </div>
        )}
        <div className="file-input-wrapper">
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileSelect}
            multiple
            accept="image/*"
            className="file-input"
          />
          <button 
            type="button" 
            onClick={() => fileInputRef.current.click()}
            className="select-files-btn"
            disabled={!propertyName || propertyName.trim() === ''}
          >
            Select Images from Computer
          </button>
          {(!propertyName || propertyName.trim() === '') && (
            <p className="warning-text">Please enter a property name first</p>
          )}
        </div>

        {selectedFiles.length > 0 && (
          <div className="selected-files">
            <div className="selected-files-header">
              <h4>Selected Files ({selectedFiles.length})</h4>
              {selectedFiles.length > 1 && (
                <p className="reorder-hint">🔄 Drag images to reorder them before download</p>
              )}
            </div>
            <div className={`file-previews ${selectedFiles.length > 1 ? 'reorderable' : ''}`}>
              {previewUrls.map((preview, index) => {
                const fileExtension = preview.file.name.split('.').pop();
                const imageNumber = images.length + index + 1;
                const newFileName = `${hyphenatedName}${imageNumber}.${fileExtension}`;
                
                return (
                  <div 
                    key={`${preview.name}-${index}`}
                    className={`file-preview ${selectedFiles.length > 1 ? 'draggable' : ''} ${dragOverIndex === index ? 'drag-over' : ''}`}
                    draggable={selectedFiles.length > 1}
                    onDragStart={(e) => selectedFiles.length > 1 && handleDragStart(e, index)}
                    onDragEnd={handleDragEnd}
                    onDragOver={(e) => selectedFiles.length > 1 && handleDragOver(e, index)}
                    onDragLeave={handleDragLeave}
                    onDrop={(e) => selectedFiles.length > 1 && handleDrop(e, index)}
                  >
                    <div className="image-order-number">{index + 1}</div>
                    <img src={preview.url} alt={preview.name} />
                    <div className="file-info">
                      <span className="file-name" title={preview.name}>
                        {preview.name}
                      </span>
                      <span className="new-name" title={newFileName}>
                        → {newFileName}
                      </span>
                      <button 
                        type="button" 
                        onClick={() => removeSelectedFile(index)}
                        className="remove-btn"
                      >
                        ×
                      </button>
                    </div>
                    {selectedFiles.length > 1 && (
                      <div className="drag-handle">⋮⋮</div>
                    )}
                  </div>
                );
              })}
            </div>
            <button 
              type="button" 
              onClick={createAndDownloadZip}
              className="add-images-btn"
              disabled={isProcessing}
            >
              {isProcessing ? '📦 Creating ZIP...' : '📦 Download Images ZIP'}
            </button>
            <p className="zip-info">
              ✨ ZIP will contain properly named images in your chosen order + setup instructions
            </p>
          </div>
        )}
      </div>

      {images.length > 0 && (
        <div className="existing-images">
          <h3>Property Images ({images.length})</h3>
          <div className="image-list">
            {images.map((imagePath, index) => (
              <div key={index} className="image-item">
                <img 
                  src={imagePath} 
                  alt={`Property ${index + 1}`}
                  onError={(e) => {
                    e.target.src = 'https://via.placeholder.com/150x100/3b82f6/white?text=Image+Not+Found';
                  }}
                />
                <div className="image-info">
                  <span className="image-path">{imagePath}</span>
                  <button 
                    type="button" 
                    onClick={() => removeExistingImage(index)}
                    className="remove-btn"
                  >
                    ×
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ImageUpload; 