import React from 'react';
import { useNavigate } from 'react-router-dom';
import './options.css';

const Options: React.FC = () => {
  const navigate = useNavigate();

  const handleBack = () => {
    navigate('/language');
  };

  const handleManualForm = () => {
    navigate('/form');
  };

  const handleAssistance = () => {
    navigate('/assistance');
  };

  return (
    <div className="options-container">
      {/* Floating Elements */}
      <div className="floating-elements">
        <div className="floating-element"></div>
        <div className="floating-element"></div>
        <div className="floating-element"></div>
      </div>
      
      <div className="options-card">
        <div className="options-header">
          <div className="options-icon">
            <svg fill="currentColor" viewBox="0 0 24 24">
              <path d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 0 01.293.707V19a2 2 0 01-2 2z"/>
            </svg>
          </div>
          <h1 className="options-title">How would you like to proceed?</h1>
          <p className="options-subtitle">Choose the option that works best for you</p>
          <p className="options-description">We offer both manual form filling and virtual assistance to make your healthcare journey smooth</p>
        </div>
        
        <div className="options-grid">
          <div className="option-card manual-option" onClick={handleManualForm}>
            <div className="option-icon">
              <svg fill="currentColor" viewBox="0 0 24 24">
                <path d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 0 01.293.707V19a2 2 0 01-2 2z"/>
              </svg>
            </div>
            <h3 className="option-title">Continue Manually</h3>
            <p className="option-description">Fill out the form yourself with our guided interface</p>
          </div>
          
          <div className="option-card assistance-option" onClick={handleAssistance}>
            <div className="option-icon">
              <svg fill="currentColor" viewBox="0 0 24 24">
                <path d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-2-2V10a2 2 0 012-2h8z"/>
              </svg>
            </div>
            <h3 className="option-title">Need Assistance</h3>
            <p className="option-description">Get help from our Virtual Doctor/Nurse assistant</p>
          </div>
        </div>
        
        <button className="back-btn" onClick={handleBack}>
          ← Back to Language Selection
        </button>
      </div>
    </div>
  );
};

export default Options; 