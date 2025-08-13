# Ute Pass Vacation Rentals

A modern, responsive React application for Ute Pass Vacation Rentals - a premium vacation rental company serving the Colorado Springs and Ute Pass area.

## Features

- **Home Page**: Welcome section with company overview and service excerpts
- **Vacation Rentals**: Property listings with search and filter functionality
- **Property Management**: Comprehensive information about property management services
- **Contact**: Contact form, company information, and FAQ section
- **Responsive Design**: Optimized for desktop, tablet, and mobile devices
- **Modern UI**: Clean, professional design with smooth animations and transitions

## Pages Overview

### 🏠 Home
- Hero section with stunning Colorado imagery
- About section highlighting the company's mission
- Service overview cards linking to other pages
- Call-to-action sections for engagement

### 🏔️ Vacation Rentals
- Property grid with high-quality images
- Search functionality by name and location
- Filter by property type (cabins, luxury, condos)
- Property details with amenities and pricing
- Booking integration (ready for backend implementation)

### 🏡 Property Management
- Comprehensive service offerings
- Benefits and statistics showcase
- Step-by-step process explanation
- Success metrics and testimonials section

### 📞 Contact
- Multi-channel contact information
- Interactive contact form
- Location information and map placeholder
- Frequently asked questions
- Office hours and emergency contact

## Technology Stack

- **React 18**: Latest React with hooks and modern patterns
- **React Router 6**: Client-side routing for seamless navigation
- **CSS3**: Modern CSS with Grid, Flexbox, and animations
- **Responsive Design**: Mobile-first approach with breakpoints
- **Modern Typography**: Inter font family for clean readability

## Getting Started

### Prerequisites
- Node.js (version 14 or higher)
- npm or yarn package manager

### Installation

1. Clone the repository or download the project files
2. Navigate to the project directory
3. Install dependencies:
   ```bash
   npm install
   ```

4. Start the development server:
   ```bash
   npm start
   ```

5. Open your browser and visit `http://localhost:3000`

### Available Scripts

- `npm start`: Runs the app in development mode
- `npm build`: Builds the app for production
- `npm test`: Launches the test runner
- `npm eject`: Ejects from Create React App (one-way operation)

## Project Structure

```
src/
├── components/
│   ├── Navbar.js          # Navigation component
│   ├── Navbar.css
│   ├── Footer.js          # Footer component
│   └── Footer.css
├── pages/
│   ├── Home.js            # Home page component
│   ├── Home.css
│   ├── VacationRentals.js # Property listings page
│   ├── VacationRentals.css
│   ├── PropertyManagement.js # Management services page
│   ├── PropertyManagement.css
│   ├── Contact.js         # Contact page
│   └── Contact.css
├── App.js                 # Main app component with routing
├── App.css
├── index.js              # App entry point
└── index.css             # Global styles
```

## Customization

### Adding Your Assets
Replace the placeholder images with your actual property photos and company assets:

1. **Property Images**: Update the image URLs in `VacationRentals.js`
2. **Hero Images**: Replace background images in CSS files
3. **Company Logo**: Add your logo to the navbar component
4. **Contact Information**: Update phone numbers, emails, and addresses

### Styling
- Global styles are in `src/index.css`
- Component-specific styles are in individual CSS files
- Color scheme can be customized by updating CSS custom properties
- Responsive breakpoints are set for tablets (768px) and mobile devices

### Content Updates
- Property data is currently hardcoded in `VacationRentals.js`
- Contact information is in the footer and contact page
- Service descriptions are in the respective page components

## Integration Ready

The app is prepared for easy integration with:
- **Backend APIs**: Property data, contact forms, bookings
- **Payment Systems**: Stripe, PayPal, or other payment processors
- **Booking Systems**: Calendar integration, availability checking
- **CMS**: Content management for property listings and pages
- **Analytics**: Google Analytics, conversion tracking
- **Maps**: Google Maps integration for location services

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Future Enhancements

Potential features to add:
- [ ] Property booking system with calendar integration
- [ ] User authentication and profiles
- [ ] Property management dashboard
- [ ] Payment processing integration
- [ ] Real-time availability checking
- [ ] Guest review system
- [ ] Multi-language support
- [ ] Dark mode theme
- [ ] Progressive Web App (PWA) features

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is proprietary and confidential. All rights reserved by Ute Pass Vacation Rentals.

## Contact

For questions about this application or our services:
- Email: info@utepassrentals.com
- Phone: (719) 555-0123
- Website: [Coming Soon]

---

Built with ❤️ for the beautiful Colorado Springs and Ute Pass area. 