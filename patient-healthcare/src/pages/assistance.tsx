import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './assistance.css';

const Assistance: React.FC = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    age: '',
    pinCode: '',
    symptoms: ''
  });
  const [departmentSuggestion, setDepartmentSuggestion] = useState('');
  const [showDepartment, setShowDepartment] = useState(false);

  const handleBack = () => {
    navigate('/options');
  };

  const startVoiceAssistance = () => {
    // Voice assistance functionality would go here
    console.log('Starting voice assistance...');
  };

  const repeatInstruction = () => {
    // Repeat instruction functionality
    console.log('Repeating instruction...');
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const suggestDepartment = (symptoms: string) => {
    const departmentMap: { [key: string]: string } = {
      'chest-pain': 'Cardiology',
      'headache': 'Neurology',
      'fever': 'General Medicine',
      'stomach-pain': 'Gastroenterology',
      'joint-pain': 'Orthopedics',
      'breathing-difficulty': 'Pulmonology',
      'skin-issues': 'Dermatology',
      'eye-problems': 'Ophthalmology'
    };

    const suggestedDept = departmentMap[symptoms];
    if (suggestedDept) {
      setDepartmentSuggestion(suggestedDept);
      setShowDepartment(true);
    } else {
      setShowDepartment(false);
    }
  };

  const handleSymptomsChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { value } = e.target;
    setFormData(prev => ({
      ...prev,
      symptoms: value
    }));
    suggestDepartment(value);
  };

  const assistantShowTimeSlots = () => {
    // Navigate to time slots or submit form
    console.log('Form submitted:', formData);
    alert('Health assessment form submitted successfully!');
    navigate('/timeslots');
  };

  return (
    <div className="assistance-container">
      <div className="assistance-card">
        <div className="assistance-header">
          <button onClick={handleBack} className="back-button">
            ← Back
          </button>
          <h1>Virtual Assistant</h1>
          <p>Dr. Sarah is here to help you</p>
        </div>
        
        <div className="assistance-content-wrapper">
          {/* Animated Character Section */}
          <div className="character-section">
            {/* Animated Doctor Character */}
            <div className="character-container">
              <div className="character-avatar">
                <svg className="character-icon" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2C13.1 2 14 2.9 14 4C14 5.1 13.1 6 12 6C10.9 6 10 5.1 10 4C10 2.9 10.9 2 12 2ZM21 9V7L15 7.5V9C15 10.1 14.1 11 13 11S11 10.1 11 9V7.5L5 7V9C5 10.1 4.1 11 3 11S1 10.1 1 9V7C1 6.4 1.4 6 2 6H22C22.6 6 23 6.4 23 7V9C23 10.1 22.1 11 21 11S19 10.1 19 9ZM12 8C13.1 8 14 8.9 14 10V22H10V10C10 8.9 10.9 8 12 8Z"/>
                </svg>
              </div>
              
              {/* Floating Animation Elements */}
              <div className="floating-element floating-1"></div>
              <div className="floating-element floating-2"></div>
            </div>
            
            {/* Speech Bubble */}
            <div className="speech-bubble">
              <div className="speech-bubble-arrow"></div>
              <div className="speech-text">
                Hello! I'm Dr. Sarah. I'll help you book your appointment step by step. Let's start with your basic information.
              </div>
              
              {/* Voice Indicator */}
              <div className="voice-indicator hidden">
                <div className="voice-bars">
                  <div className="voice-bar"></div>
                  <div className="voice-bar"></div>
                  <div className="voice-bar"></div>
                  <div className="voice-bar"></div>
                </div>
                <span className="voice-text">Speaking...</span>
              </div>
            </div>
            
            {/* Voice Controls */}
            <div className="voice-controls">
              <button onClick={startVoiceAssistance} className="voice-btn listen-btn">
                🎤 Listen
              </button>
              <button onClick={repeatInstruction} className="voice-btn repeat-btn">
                🔄 Repeat
              </button>
            </div>
          </div>
          
          {/* Form Section */}
          <div className="form-section">
            <div className="form-container">
              <h2>Patient Information</h2>
              
              <form className="assistant-form">
                <div className="form-field" id="nameField">
                  <label>
                    <span className="english">Full Name</span>
                    <span className="hindi hidden">पूरा नाम</span>
                  </label>
                  <input 
                    type="text" 
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="form-input" 
                    placeholder="Enter your full name"
                  />
                  <div className="help-text hidden" id="nameHelp">Please tell me your full name</div>
                </div>
                
                <div className="form-field disabled" id="ageField">
                  <label>
                    <span className="english">Age</span>
                    <span className="hindi hidden">उम्र</span>
                  </label>
                  <input 
                    type="number" 
                    name="age"
                    value={formData.age}
                    onChange={handleInputChange}
                    className="form-input" 
                    placeholder="Enter your age" 
                    disabled
                  />
                  <div className="help-text hidden" id="ageHelp">Now, please tell me your age</div>
                </div>
                
                <div className="form-field disabled" id="pinField">
                  <label>
                    <span className="english">PIN Code</span>
                    <span className="hindi hidden">पिन कोड</span>
                  </label>
                  <input 
                    type="text" 
                    name="pinCode"
                    value={formData.pinCode}
                    onChange={handleInputChange}
                    className="form-input" 
                    placeholder="Enter your PIN code" 
                    disabled
                  />
                  <div className="help-text hidden" id="pinHelp">What is your area PIN code?</div>
                </div>
                
                <div className="form-field disabled" id="symptomsField">
                  <label>
                    <span className="english">Symptoms</span>
                    <span className="hindi hidden">लक्षण</span>
                  </label>
                  <select 
                    name="symptoms"
                    value={formData.symptoms}
                    onChange={handleSymptomsChange}
                    className="form-input" 
                    disabled
                  >
                    <option value="">Select your symptoms</option>
                    <option value="chest-pain">Chest Pain</option>
                    <option value="headache">Headache</option>
                    <option value="fever">Fever</option>
                    <option value="stomach-pain">Stomach Pain</option>
                    <option value="joint-pain">Joint Pain</option>
                    <option value="breathing-difficulty">Breathing Difficulty</option>
                    <option value="skin-issues">Skin Issues</option>
                    <option value="eye-problems">Eye Problems</option>
                  </select>
                  <div className="help-text hidden" id="symptomsHelp">Please describe your main symptoms</div>
                </div>
                
                {showDepartment && (
                  <div className="department-suggestion" id="assistantDepartmentSuggestion">
                    <div className="suggestion-card">
                      <h3>Recommended Department</h3>
                      <p>{departmentSuggestion}</p>
                    </div>
                  </div>
                )}
                
                <button 
                  type="button" 
                  onClick={assistantShowTimeSlots} 
                  id="assistantContinueBtn" 
                  className="continue-btn disabled" 
                  disabled
                >
                  <span className="english">Continue to Time Slots</span>
                  <span className="hindi hidden">समय स्लॉट पर जाएं</span>
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Assistance; 