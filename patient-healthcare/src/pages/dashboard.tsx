import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './dashboard.css';

const Dashboard: React.FC = () => {
     const [selectedLanguage, setSelectedLanguage] = useState<string>('');
   const [activeModule, setActiveModule] = useState<string>('dashboard');

  useEffect(() => {
    // Get the selected language from localStorage
    const language = localStorage.getItem('selectedLanguage');
    setSelectedLanguage(language || 'English');
  }, []);

  const sidebarModules = [
    { id: 'dashboard', name: 'Dashboard', icon: '🏠' },
    { id: 'see-doctor', name: 'See Doctor', icon: '👨‍⚕️' },
    { id: 'appointments', name: 'My Appointments', icon: '📅' },
    { id: 'wait-time', name: 'Wait Time', icon: '⏰' },
    { id: 'hospital-map', name: 'Hospital Map', icon: '🗺️' },
    { id: 'payment', name: 'Make Payment', icon: '💳' },
    { id: 'ambulance', name: 'Ambulance Booking', icon: '🚑' },
    { id: 'transportation', name: 'Transportation Help', icon: '🚗' },
    { id: 'diagnostic-van', name: 'Diagnostic Van Booking', icon: '🚐' },
    { id: 'next-visit', name: 'Next Visit Alert', icon: '🔔' }
  ];

  const renderModuleContent = () => {
    switch (activeModule) {
      case 'dashboard':
        return (
          <div className="main-content">
            <div className="welcome-section">
              <h2>Welcome to Patient Healthcare Portal</h2>
              <p>Manage your healthcare needs efficiently</p>
            </div>
            
                         <div className="quick-stats">
               <div className="stat-card">
                 <div className="stat-icon">📊</div>
                 <div className="stat-info">
                   <h3>5</h3>
                   <p>Upcoming Appointments</p>
                 </div>
               </div>
               <div className="stat-card">
                 <div className="stat-icon">💊</div>
                 <div className="stat-info">
                   <h3>3</h3>
                   <p>Active Prescriptions</p>
                 </div>
               </div>
               <div className="stat-card">
                 <div className="stat-icon">🏥</div>
                 <div className="stat-info">
                   <h3>12</h3>
                   <p>Total Visits</p>
                 </div>
               </div>
             </div>

            <div className="recent-activity">
              <h3>Recent Activity</h3>
              <div className="activity-list">
                <div className="activity-item">
                  <div className="activity-icon">📅</div>
                  <div className="activity-content">
                    <h4>Appointment Scheduled</h4>
                    <p>Dr. Smith - Cardiology - Tomorrow 10:00 AM</p>
                  </div>
                </div>
                <div className="activity-item">
                  <div className="activity-icon">💳</div>
                  <div className="activity-content">
                    <h4>Payment Completed</h4>
                    <p>Lab Test Payment - $75.00</p>
                  </div>
                </div>
                <div className="activity-item">
                  <div className="activity-icon">📋</div>
                  <div className="activity-content">
                    <h4>Prescription Updated</h4>
                    <p>Blood pressure medication renewed</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      
      case 'see-doctor':
        return (
          <div className="main-content">
            <h2>Find and Book Doctor</h2>
            <div className="doctor-search">
              <input type="text" placeholder="Search for doctors, specialties..." className="search-input" />
              <button className="search-btn">Search</button>
            </div>
            <div className="specialties-grid">
              <div className="specialty-card">
                <div className="specialty-icon">❤️</div>
                <h3>Cardiology</h3>
                <p>Heart and cardiovascular health</p>
              </div>
              <div className="specialty-card">
                <div className="specialty-icon">🧠</div>
                <h3>Neurology</h3>
                <p>Brain and nervous system</p>
              </div>
              <div className="specialty-card">
                <div className="specialty-icon">👶</div>
                <h3>Pediatrics</h3>
                <p>Child healthcare</p>
              </div>
              <div className="specialty-card">
                <div className="specialty-icon">🦴</div>
                <h3>Orthopedics</h3>
                <p>Bones and joints</p>
              </div>
            </div>
          </div>
        );

      case 'appointments':
        return (
          <div className="main-content">
            <h2>My Appointments</h2>
            <div className="appointments-list">
              <div className="appointment-card upcoming">
                <div className="appointment-date">
                  <span className="day">15</span>
                  <span className="month">Dec</span>
                </div>
                <div className="appointment-details">
                  <h3>Dr. Sarah Johnson</h3>
                  <p>Cardiology Consultation</p>
                  <span className="time">10:00 AM - 11:00 AM</span>
                </div>
                <div className="appointment-actions">
                  <button className="btn-primary">Reschedule</button>
                  <button className="btn-secondary">Cancel</button>
                </div>
              </div>
              <div className="appointment-card">
                <div className="appointment-date">
                  <span className="day">18</span>
                  <span className="month">Dec</span>
                </div>
                <div className="appointment-details">
                  <h3>Dr. Michael Chen</h3>
                  <p>Blood Test</p>
                  <span className="time">2:00 PM - 2:30 PM</span>
                </div>
                <div className="appointment-actions">
                  <button className="btn-primary">Reschedule</button>
                  <button className="btn-secondary">Cancel</button>
                </div>
              </div>
            </div>
          </div>
        );

      case 'wait-time':
        return (
          <div className="main-content">
            <h2>Current Wait Times</h2>
            <div className="wait-times">
              <div className="wait-time-card">
                <h3>Emergency Department</h3>
                <div className="wait-time">45 minutes</div>
                <div className="status moderate">Moderate Wait</div>
              </div>
              <div className="wait-time-card">
                <h3>Outpatient Clinic</h3>
                <div className="wait-time">15 minutes</div>
                <div className="status low">Low Wait</div>
              </div>
              <div className="wait-time-card">
                <h3>Radiology</h3>
                <div className="wait-time">30 minutes</div>
                <div className="status moderate">Moderate Wait</div>
              </div>
            </div>
          </div>
        );

      case 'hospital-map':
        return (
          <div className="main-content">
            <h2>Hospital Map</h2>
            <div className="map-container">
              <div className="map-placeholder">
                <div className="map-icon">🗺️</div>
                <h3>Interactive Hospital Map</h3>
                <p>Find departments, facilities, and parking areas</p>
                <button className="btn-primary">Open Map</button>
              </div>
            </div>
            <div className="facilities-list">
              <h3>Quick Navigation</h3>
              <div className="facility-grid">
                <div className="facility-item">🏥 Emergency</div>
                <div className="facility-item">💊 Pharmacy</div>
                <div className="facility-item">🅿️ Parking</div>
                <div className="facility-item">🍽️ Cafeteria</div>
                <div className="facility-item">🛗 Elevators</div>
                <div className="facility-item">🚻 Restrooms</div>
              </div>
            </div>
          </div>
        );

      case 'payment':
        return (
          <div className="main-content">
            <h2>Make Payment</h2>
            <div className="payment-section">
              <div className="payment-methods">
                <h3>Payment Methods</h3>
                <div className="payment-options">
                  <div className="payment-option">
                    <input type="radio" name="payment" id="card" />
                    <label htmlFor="card">💳 Credit/Debit Card</label>
                  </div>
                  <div className="payment-option">
                    <input type="radio" name="payment" id="upi" />
                    <label htmlFor="upi">📱 UPI</label>
                  </div>
                  <div className="payment-option">
                    <input type="radio" name="payment" id="netbanking" />
                    <label htmlFor="netbanking">🏦 Net Banking</label>
                  </div>
                </div>
              </div>
              <div className="payment-form">
                <h3>Payment Details</h3>
                <input type="text" placeholder="Card Number" className="form-input" />
                <div className="form-row">
                  <input type="text" placeholder="MM/YY" className="form-input" />
                  <input type="text" placeholder="CVV" className="form-input" />
                </div>
                <input type="text" placeholder="Card Holder Name" className="form-input" />
                <button className="btn-primary">Pay Now</button>
              </div>
            </div>
          </div>
        );

      case 'ambulance':
        return (
          <div className="main-content">
            <h2>Ambulance Booking</h2>
            <div className="ambulance-booking">
              <div className="emergency-contact">
                <h3>🚨 Emergency Contact</h3>
                <div className="emergency-number">108</div>
                <p>24/7 Emergency Ambulance Service</p>
              </div>
              <div className="booking-form">
                <h3>Book Ambulance</h3>
                <input type="text" placeholder="Pickup Address" className="form-input" />
                <input type="text" placeholder="Destination Hospital" className="form-input" />
                <select className="form-input">
                  <option>Select Ambulance Type</option>
                  <option>Basic Ambulance</option>
                  <option>Advanced Life Support</option>
                  <option>Cardiac Ambulance</option>
                </select>
                <input type="text" placeholder="Contact Number" className="form-input" />
                <textarea placeholder="Additional Notes" className="form-input"></textarea>
                <button className="btn-primary">Book Ambulance</button>
              </div>
            </div>
          </div>
        );

      case 'transportation':
        return (
          <div className="main-content">
            <h2>Transportation Help</h2>
            <div className="transportation-options">
              <div className="transport-card">
                <div className="transport-icon">🚗</div>
                <h3>Taxi Service</h3>
                <p>Book a taxi to and from hospital</p>
                <button className="btn-primary">Book Taxi</button>
              </div>
              <div className="transport-card">
                <div className="transport-icon">🚌</div>
                <h3>Hospital Shuttle</h3>
                <p>Free shuttle service within hospital campus</p>
                <button className="btn-primary">Check Schedule</button>
              </div>
              <div className="transport-card">
                <div className="transport-icon">🛣️</div>
                <h3>Route Planning</h3>
                <p>Find best route to hospital</p>
                <button className="btn-primary">Plan Route</button>
              </div>
            </div>
          </div>
        );

      case 'diagnostic-van':
        return (
          <div className="main-content">
            <h2>Diagnostic Van Booking</h2>
            <div className="diagnostic-van-booking">
              <div className="van-info">
                <h3>🏥 Mobile Diagnostic Services</h3>
                <p>Get diagnostic tests done at your doorstep</p>
                <div className="services-list">
                  <div className="service-item">🩸 Blood Tests</div>
                  <div className="service-item">💓 ECG</div>
                  <div className="service-item">🫁 X-Ray</div>
                  <div className="service-item">🔬 Pathology</div>
                </div>
              </div>
              <div className="booking-form">
                <h3>Book Diagnostic Van</h3>
                <input type="text" placeholder="Full Name" className="form-input" />
                <input type="text" placeholder="Address" className="form-input" />
                <input type="text" placeholder="Contact Number" className="form-input" />
                <input type="date" className="form-input" />
                <select className="form-input">
                  <option>Select Test Type</option>
                  <option>Complete Blood Count</option>
                  <option>Diabetes Screening</option>
                  <option>Cardiac Profile</option>
                  <option>General Health Checkup</option>
                </select>
                <button className="btn-primary">Book Van</button>
              </div>
            </div>
          </div>
        );

      case 'next-visit':
        return (
          <div className="main-content">
            <h2>Next Visit Alert</h2>
            <div className="visit-alerts">
              <div className="alert-card urgent">
                <div className="alert-icon">🔴</div>
                <div className="alert-content">
                  <h3>Follow-up Visit Due</h3>
                  <p>Dr. Sarah Johnson - Cardiology</p>
                  <span className="alert-date">Due: December 20, 2024</span>
                </div>
                <button className="btn-primary">Book Now</button>
              </div>
              <div className="alert-card">
                <div className="alert-icon">🟡</div>
                <div className="alert-content">
                  <h3>Annual Checkup</h3>
                  <p>General Health Assessment</p>
                  <span className="alert-date">Due: January 15, 2025</span>
                </div>
                <button className="btn-primary">Schedule</button>
              </div>
              <div className="alert-card">
                <div className="alert-icon">🟢</div>
                <div className="alert-content">
                  <h3>Dental Checkup</h3>
                  <p>Dr. Robert Wilson - Dentistry</p>
                  <span className="alert-date">Due: February 5, 2025</span>
                </div>
                <button className="btn-primary">Schedule</button>
              </div>
            </div>
          </div>
        );

      default:
        return <div className="main-content"><h2>Select a module from the sidebar</h2></div>;
    }
  };

  return (
    <div className="dashboard-layout">
      {/* Sidebar */}
             <div className="sidebar">
                 <div className="sidebar-header">
           <h2>🏥 Healthcare</h2>
         </div>
        
        <nav className="sidebar-nav">
          {sidebarModules.map((module) => (
            <button
              key={module.id}
              className={`sidebar-item ${activeModule === module.id ? 'active' : ''}`}
              onClick={() => setActiveModule(module.id)}
            >
                             <span className="sidebar-icon">{module.icon}</span>
               <span className="sidebar-text">{module.name}</span>
            </button>
          ))}
        </nav>

        <div className="sidebar-footer">
                     <div className="language-info">
             <span className="language-icon">🌐</span>
             <span>{selectedLanguage}</span>
           </div>
           <Link to="/language" className="sidebar-link">
             <span className="sidebar-icon">⚙️</span>
             <span>Settings</span>
           </Link>
           <Link to="/login" className="sidebar-link">
             <span className="sidebar-icon">🚪</span>
             <span>Logout</span>
           </Link>
        </div>
      </div>

      {/* Main Content */}
      <div className="main-layout">
        {/* Header */}
        <header className="main-header">
          <div className="header-left">
            <h1>Welcome User!</h1>
          </div>
          <div className="header-right">
            <div className="user-info">
              <span className="user-avatar">👤</span>
              <span className="user-name">John Doe</span>
            </div>
            <div className="header-actions">
              <button className="header-btn">🔔</button>
              <button className="header-btn">📧</button>
            </div>
          </div>
        </header>

        {/* Content Area */}
        <main className="content-area">
          {renderModuleContent()}
        </main>
      </div>
    </div>
  );
};

export default Dashboard; 