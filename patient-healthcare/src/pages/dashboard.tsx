import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './dashboard.css';

const Dashboard: React.FC = () => {
  const [selectedLanguage, setSelectedLanguage] = useState<string>('');

  useEffect(() => {
    // Get the selected language from localStorage
    const language = localStorage.getItem('selectedLanguage');
    setSelectedLanguage(language || 'English');
  }, []);

  return (
    <div className="dashboard-container">
      <div className="dashboard-content">
        <div className="dashboard-header">
          <h1>Welcome to Patient Healthcare</h1>
          <p>Selected Language: {selectedLanguage}</p>
        </div>
        
        <div className="dashboard-cards">
          <div className="dashboard-card">
            <h3>Book Appointment</h3>
            <p>Schedule your next medical appointment</p>
            <button className="dashboard-btn">Book Now</button>
          </div>
          
          <div className="dashboard-card">
            <h3>View Records</h3>
            <p>Access your medical history and reports</p>
            <button className="dashboard-btn">View Records</button>
          </div>
          
          <div className="dashboard-card">
            <h3>Find Doctor</h3>
            <p>Search for specialists in your area</p>
            <button className="dashboard-btn">Find Doctor</button>
          </div>
          
          <div className="dashboard-card">
            <h3>Emergency</h3>
            <p>Get immediate medical assistance</p>
            <button className="dashboard-btn emergency-btn">Emergency</button>
          </div>
        </div>
        
        <div className="dashboard-footer">
          <Link to="/language" className="language-link">Change Language</Link>
          <Link to="/login" className="logout-link">Logout</Link>
        </div>
      </div>
    </div>
  );
};

export default Dashboard; 