import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { PropertiesProvider } from './contexts/PropertiesContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import VacationRentals from './pages/VacationRentals';
import PropertyDetail from './pages/PropertyDetail';
import PropertyManagement from './pages/PropertyManagement';
import Contact from './pages/Contact';
import AdminAddProperty from './pages/AdminAddProperty';
import AdminEditProperty from './pages/AdminEditProperty';
import './App.css';

function App() {
  return (
    <PropertiesProvider>
      <Router>
        <div className="App">
          <Navbar />
          <main>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/vacation-rentals" element={<VacationRentals />} />
              <Route path="/property/:id" element={<PropertyDetail />} />
              <Route path="/property-management" element={<PropertyManagement />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/admin/add-property" element={<AdminAddProperty />} />
              <Route path="/admin/edit-property/:id" element={<AdminEditProperty />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </PropertiesProvider>
  );
}

export default App; 