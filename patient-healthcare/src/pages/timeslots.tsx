import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './timeslots.css';

const TimeSlots: React.FC = () => {
  const navigate = useNavigate();
  const [selectedSlot, setSelectedSlot] = useState<string | null>(null);
  const [selectedTime, setSelectedTime] = useState<string>('');
  const [selectedWaitTime, setSelectedWaitTime] = useState<string>('');

  const handleBack = () => {
    navigate('/assistance');
  };

  const selectTimeSlot = (element: HTMLElement, time: string, waitTime: string) => {
    // Remove previous selection
    const allSlots = document.querySelectorAll('.time-slot');
    allSlots.forEach(slot => {
      slot.classList.remove('selected');
    });

    // Add selection to clicked slot
    element.classList.add('selected');
    setSelectedSlot(time);
    setSelectedTime(time);
    setSelectedWaitTime(waitTime);

    // Enable book button
    const bookBtn = document.getElementById('bookSlotBtn');
    if (bookBtn) {
      bookBtn.classList.remove('disabled');
      bookBtn.removeAttribute('disabled');
    }
  };

  const showDashboard = () => {
    if (selectedSlot) {
      alert(`Appointment booked for ${selectedTime} with ${selectedWaitTime} wait time!`);
      navigate('/options');
    }
  };

  return (
    <div className="timeslots-container">
      {/* Floating Elements */}
      <div className="floating-elements">
        <div className="floating-element"></div>
        <div className="floating-element"></div>
        <div className="floating-element"></div>
      </div>
      
      <div className="timeslots-card">
        <div className="timeslots-header">
          <button onClick={handleBack} className="back-button">
            ← Back
          </button>
          <h1>Available Time Slots</h1>
          <p>Choose your preferred appointment time</p>
        </div>
        
        <div className="timeslots-content">
          <div className="timeslots-grid">
            <div 
              className="time-slot available" 
              onClick={(e) => selectTimeSlot(e.currentTarget, '9:00 AM', '15 mins')}
            >
              <div className="slot-content">
                <div className="slot-time">9:00 AM</div>
                <div className="slot-wait-time">Wait Time: 15 mins</div>
                <div className="slot-status">Available</div>
              </div>
            </div>
            
            <div 
              className="time-slot available" 
              onClick={(e) => selectTimeSlot(e.currentTarget, '10:30 AM', '25 mins')}
            >
              <div className="slot-content">
                <div className="slot-time">10:30 AM</div>
                <div className="slot-wait-time">Wait Time: 25 mins</div>
                <div className="slot-status">Available</div>
              </div>
            </div>
            
            <div 
              className="time-slot busy" 
              onClick={(e) => selectTimeSlot(e.currentTarget, '2:00 PM', '45 mins')}
            >
              <div className="slot-content">
                <div className="slot-time">2:00 PM</div>
                <div className="slot-wait-time">Wait Time: 45 mins</div>
                <div className="slot-status">Busy</div>
              </div>
            </div>
            
            <div 
              className="time-slot available" 
              onClick={(e) => selectTimeSlot(e.currentTarget, '3:30 PM', '20 mins')}
            >
              <div className="slot-content">
                <div className="slot-time">3:30 PM</div>
                <div className="slot-wait-time">Wait Time: 20 mins</div>
                <div className="slot-status">Available</div>
              </div>
            </div>
            
            <div className="time-slot unavailable">
              <div className="slot-content">
                <div className="slot-time">5:00 PM</div>
                <div className="slot-wait-time">Fully Booked</div>
                <div className="slot-status">Not Available</div>
              </div>
            </div>
            
            <div 
              className="time-slot available" 
              onClick={(e) => selectTimeSlot(e.currentTarget, '6:30 PM', '10 mins')}
            >
              <div className="slot-content">
                <div className="slot-time">6:30 PM</div>
                <div className="slot-wait-time">Wait Time: 10 mins</div>
                <div className="slot-status">Available</div>
              </div>
            </div>
          </div>
          
          <button 
            id="bookSlotBtn" 
            onClick={showDashboard} 
            className="book-slot-btn disabled" 
            disabled
          >
            Book Selected Time Slot
          </button>
        </div>
      </div>
    </div>
  );
};

export default TimeSlots; 