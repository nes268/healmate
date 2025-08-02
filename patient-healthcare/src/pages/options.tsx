import React from 'react';
import { useNavigate } from 'react-router-dom';
import './options.css';

const Options: React.FC = () => {
  const navigate = useNavigate();

  const handleBack = () => {
    navigate('/language');
  };

  const handleFormOption = () => {
    navigate('/form');
  };

  const handleAssistanceOption = () => {
    navigate('/assistance');
  };

  return (
    <div className="options-container">
      <div className="options-card">
        <div className="options-header">
          <button onClick={handleBack} className="back-button">
            ← Back
          </button>
          <h2>How would you like to proceed?</h2>
          <p>Choose the option that works best for you</p>
        </div>
        
        <div className="options-grid">
          <button onClick={handleFormOption} className="option-button manual-option">
            <div className="option-icon">
              <svg className="icon-svg" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
              </svg>
            </div>
            <h3>Continue Manually</h3>
            <p>Fill out the form yourself</p>
          </button>
          
          <button onClick={handleAssistanceOption} className="option-button assistance-option">
            <div className="option-icon">
              <svg className="icon-svg" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-2-2V10a2 2 0 012-2h8z"></path>
              </svg>
            </div>
            <h3>Need Assistance</h3>
            <p>Get help from Virtual Doctor/Nurse</p>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Options; 