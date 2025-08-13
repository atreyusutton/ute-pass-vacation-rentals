import React, { useState } from 'react';
import './BookingCalendar.css';

const BookingCalendar = ({ property, onBooking }) => {
  const [selectedDates, setSelectedDates] = useState([]);
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [bookingForm, setBookingForm] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    details: ''
  });

  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const daysOfWeek = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];

  const getDaysInMonth = (date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();

    const days = [];
    
    // Add empty cells for days before the first day of the month
    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push(null);
    }
    
    // Add days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      const dateString = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
      const availability = property.availability[dateString];
      
      days.push({
        day,
        dateString,
        available: availability?.available || false,
        price: availability?.price || property.pricePerNight
      });
    }

    return days;
  };

  const handleDateClick = (dateInfo) => {
    if (!dateInfo.available) return;

    const dateString = dateInfo.dateString;
    
    if (selectedDates.includes(dateString)) {
      setSelectedDates(selectedDates.filter(date => date !== dateString));
    } else {
      // For simple range selection, clear and add new dates
      if (selectedDates.length === 0) {
        setSelectedDates([dateString]);
      } else if (selectedDates.length === 1) {
        const start = new Date(selectedDates[0]);
        const end = new Date(dateString);
        const [startDate, endDate] = start < end ? [start, end] : [end, start];
        
        const rangeDates = [];
        const currentDate = new Date(startDate);
        
        while (currentDate <= endDate) {
          const currentDateString = currentDate.toISOString().split('T')[0];
          if (property.availability[currentDateString]?.available) {
            rangeDates.push(currentDateString);
          }
          currentDate.setDate(currentDate.getDate() + 1);
        }
        
        setSelectedDates(rangeDates);
      } else {
        setSelectedDates([dateString]);
      }
    }
  };

  const calculateTotalCost = () => {
    return selectedDates.reduce((total, dateString) => {
      const availability = property.availability[dateString];
      return total + (availability?.price || property.pricePerNight);
    }, 0);
  };

  const formatDateRange = () => {
    if (selectedDates.length === 0) return '... (... - night(s))';
    
    const sortedDates = selectedDates.sort();
    const startDate = new Date(sortedDates[0]);
    const endDate = new Date(sortedDates[sortedDates.length - 1]);
    
    const formatDate = (date) => {
      return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
    };
    
    return `${formatDate(startDate)} - ${formatDate(endDate)} (${selectedDates.length} night(s))`;
  };

  const nextMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1));
  };

  const prevMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (selectedDates.length === 0) {
      alert('Please select your stay dates');
      return;
    }
    if (!bookingForm.firstName || !bookingForm.lastName || !bookingForm.email || !bookingForm.phone || !bookingForm.details) {
      alert('Please fill in all required fields');
      return;
    }
    
    const booking = {
      ...bookingForm,
      dates: selectedDates,
      totalCost: calculateTotalCost(),
      property: property.id
    };
    
    onBooking && onBooking(booking);
    alert('Booking request submitted! We will contact you soon to confirm.');
  };

  const renderCalendar = () => {
    const days = getDaysInMonth(currentMonth);
    
    return (
      <div className="calendar">
        <div className="calendar-header">
          <button onClick={prevMonth} className="nav-button">‹</button>
          <h3>{monthNames[currentMonth.getMonth()]} {currentMonth.getFullYear()}</h3>
          <button onClick={nextMonth} className="nav-button">›</button>
        </div>
        
        <div className="calendar-grid">
          {daysOfWeek.map(day => (
            <div key={day} className="calendar-day-header">{day}</div>
          ))}
          
          {days.map((dayInfo, index) => (
            <div
              key={index}
              className={`calendar-day ${
                dayInfo ? (
                  dayInfo.available ? 'available' : 'unavailable'
                ) : 'empty'
              } ${
                dayInfo && selectedDates.includes(dayInfo.dateString) ? 'selected' : ''
              }`}
              onClick={() => dayInfo && handleDateClick(dayInfo)}
            >
              {dayInfo && (
                <>
                  <div className="day-number">{dayInfo.day}</div>
                  {dayInfo.available && (
                    <div className="day-price">${dayInfo.price}</div>
                  )}
                </>
              )}
            </div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className="booking-calendar">
      <div className="calendar-legend">
        <div className="legend-item">
          <div className="legend-color available"></div>
          <span>Available</span>
        </div>
        <div className="legend-item">
          <div className="legend-color pending"></div>
          <span>Pending</span>
        </div>
        <div className="legend-item">
          <div className="legend-color booked"></div>
          <span>Booked</span>
        </div>
      </div>

      {renderCalendar()}

      <div className="booking-summary">
        <div className="selected-dates">
          <strong>Dates: {formatDateRange()}</strong>
        </div>
        <div className="cost-breakdown">
          <div>Cost of night(s): ${calculateTotalCost().toFixed(2)}</div>
          <div className="small-text">Plus cleaning fees and tax</div>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="booking-form">
        <div className="form-group">
          <label>First Name*:</label>
          <input
            type="text"
            required
            value={bookingForm.firstName}
            onChange={(e) => setBookingForm({...bookingForm, firstName: e.target.value})}
          />
        </div>
        
        <div className="form-group">
          <label>Last Name*:</label>
          <input
            type="text"
            required
            value={bookingForm.lastName}
            onChange={(e) => setBookingForm({...bookingForm, lastName: e.target.value})}
          />
        </div>

        <div className="form-group">
          <label>Email*:</label>
          <input
            type="email"
            required
            value={bookingForm.email}
            onChange={(e) => setBookingForm({...bookingForm, email: e.target.value})}
          />
        </div>
        
        <div className="form-group">
          <label>Phone*:</label>
          <input
            type="tel"
            required
            value={bookingForm.phone}
            onChange={(e) => setBookingForm({...bookingForm, phone: e.target.value})}
          />
        </div>

        <div className="form-group">
          <label>Details*:</label>
          <textarea
            required
            value={bookingForm.details}
            onChange={(e) => setBookingForm({...bookingForm, details: e.target.value})}
            rows="3"
            placeholder="Please describe your stay requirements, special requests, or questions..."
          />
        </div>

        <button type="submit" className="submit-btn">
          Submit Booking Request
        </button>
      </form>
    </div>
  );
};

export default BookingCalendar; 