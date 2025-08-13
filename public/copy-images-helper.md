# Property Image Upload Guide

This guide explains how to add images to your properties using the universal ZIP download system.

## How It Works

The system creates a ZIP file with properly named images that you can easily extract to your project. **Works on all browsers: Chrome, Safari, Firefox, Edge!**

1. **Enter property name** in the admin form
2. **Select images** from your computer  
3. **Download ZIP** with properly named images + instructions
4. **Extract ZIP** to your project folder
5. **Done!** Images appear on your property

## Process Overview

### Step 1: Upload Images
1. Go to `/admin/add-property` or edit an existing property
2. **Enter the property name first** (required for proper naming)
3. In the Images section, click "📁 Select Images from Computer"
4. Choose multiple images from your computer in the order you want them displayed

### Step 2: Download ZIP
1. Preview shows original filename → new filename
2. Click "📦 Download Images ZIP"
3. A ZIP file downloads: `property-name-images.zip`

### Step 3: Extract and Copy
1. Extract the ZIP file to a temporary location
2. In your project, create: `public/images/properties/property-name/`
3. Copy all image files from the ZIP to this folder
4. Refresh your browser to see the images

## File Organization

### Folder Structure
```
public/images/properties/[property-name-hyphenated]/
```

Examples:
- "Mountain View Cabin" → `public/images/properties/mountain-view-cabin/`
- "Chez Les DuClos" → `public/images/properties/chez-les-duclos/`
- "Downtown Loft" → `public/images/properties/downtown-loft/`

### File Naming
Images are automatically named using the property name + sequential number:
- `mountain-view-cabin1.jpg`
- `mountain-view-cabin2.png`
- `mountain-view-cabin3.jpeg`

## What's in the ZIP

Each ZIP file contains:
- **Properly named image files** (ready to copy)
- **INSTRUCTIONS.txt** with specific steps for your property
- **File mapping** showing original → new names

## Property Name Conversion

The system automatically converts property names to folder-safe names:
- Converts to lowercase
- Replaces spaces with hyphens
- Removes special characters
- Examples:
  - "Mountain View Cabin!" → `mountain-view-cabin`
  - "The Grand Estate" → `the-grand-estate`
  - "Cozy 2BR Apartment" → `cozy-2br-apartment`

## Image Ordering

- Images are numbered in the order you select them
- First selected = image1, second = image2, etc.
- To change order: remove and re-add images in desired sequence
- Existing images: new uploads continue numbering (if you have 3 images, new ones become 4, 5, 6...)

## Step-by-Step Example

**Adding images to "Lakeside Retreat":**

1. **Property Name**: Enter "Lakeside Retreat"
2. **System Creates**: `lakeside-retreat` folder name
3. **Select Images**: Choose `living.jpg`, `bedroom.png`, `kitchen.jpeg`
4. **ZIP Contains**:
   - `lakeside-retreat1.jpg` (was living.jpg)
   - `lakeside-retreat2.png` (was bedroom.png)  
   - `lakeside-retreat3.jpeg` (was kitchen.jpeg)
   - `INSTRUCTIONS.txt`
5. **Extract & Copy**: To `public/images/properties/lakeside-retreat/`
6. **Result**: Images display on property page

## Troubleshooting

### Can't Download ZIP?
- Make sure you've entered a property name
- Check that you've selected some images
- Try a different browser if download fails

### Images Not Showing?
- Verify files are in: `public/images/properties/[property-name]/`
- Check file names match exactly: `property-name1.jpg`, `property-name2.png`, etc.
- Refresh your browser page
- Check browser console for errors

### Wrong Property Folder?
- The folder name is auto-generated from the property name
- If you change the property name, you'll need to rename the folder
- Or create a new folder with the new name

### Need to Add More Images?
- New images will continue the numbering sequence
- If you have 5 images, new ones become 6, 7, 8, etc.
- The ZIP will show the correct numbers for new uploads

## Browser Compatibility

✅ **Chrome** - Full support  
✅ **Safari** - Full support  
✅ **Firefox** - Full support  
✅ **Edge** - Full support  
✅ **Mobile browsers** - Full support  

## Tips for Best Results

- **Name Properties First**: Always enter the property name before selecting images
- **Organize Images**: Arrange images on your computer in the order you want them displayed
- **Use Quality Images**: High-resolution images look better (but consider file size)
- **Check File Types**: Supports JPG, PNG, GIF, WebP
- **Keep Backups**: Save original images in a separate location
- **Test Display**: Check how images look on the property page after copying

This system makes image management simple and consistent across all browsers! 