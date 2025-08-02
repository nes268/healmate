import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './form.css';

const Form: React.FC = () => {
  const navigate = useNavigate();
  const [selectedLanguage, setSelectedLanguage] = useState<string>('English');
  const [formData, setFormData] = useState({
    name: '',
    age: '',
    pinCode: '',
    symptoms: '',
    gender: '',
    medicalHistory: '',
    currentMedications: ''
  });
  const [departmentSuggestion, setDepartmentSuggestion] = useState('');
  const [showDepartment, setShowDepartment] = useState(false);

  useEffect(() => {
    // Get the selected language from localStorage
    const language = localStorage.getItem('selectedLanguage');
    setSelectedLanguage(language || 'English');
  }, []);

  const handleBack = () => {
    navigate('/options');
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
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

  const showTimeSlots = () => {
    // This would typically navigate to a time slots page
    // For now, we'll just submit the form
    handleSubmit();
  };

  const handleSubmit = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    console.log('Form submitted:', formData);
    // Here you would typically send the data to your backend
    alert('Health assessment form submitted successfully!');
    // Navigate back to options page after form completion
    navigate('/options');
  };

  return (
    <div className="form-container">
      <div className="form-card">
        <div className="form-header">
          <button onClick={handleBack} className="back-button">
            ← Back
          </button>
          <h2>Patient Information</h2>
          <p>Language: {selectedLanguage}</p>
          <p>Please fill in your details</p>
        </div>
        
        <form className="form-content" onSubmit={handleSubmit}>
          <div className="form-grid">
            <div className="form-group">
              <label htmlFor="name">Full Name *</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                required
                placeholder="Enter your full name"
              />
            </div>

            <div className="form-group">
              <label htmlFor="age">Age *</label>
              <input
                type="number"
                id="age"
                name="age"
                value={formData.age}
                onChange={handleInputChange}
                required
                min="1"
                max="120"
                placeholder="Enter your age"
              />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="pinCode">PIN Code *</label>
            <input
              type="text"
              id="pinCode"
              name="pinCode"
              value={formData.pinCode}
              onChange={handleInputChange}
              required
              placeholder="Enter your PIN code"
            />
          </div>

          <div className="form-group">
            <label htmlFor="gender">Gender *</label>
            <select
              id="gender"
              name="gender"
              value={formData.gender}
              onChange={handleInputChange}
              required
            >
              <option value="">Select gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="symptoms">Symptoms *</label>
            <select
              id="symptoms"
              name="symptoms"
              value={formData.symptoms}
              onChange={handleSymptomsChange}
              required
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
          </div>

          {showDepartment && (
            <div className="department-suggestion">
              <div className="suggestion-card">
                <h3>Recommended Department</h3>
                <p>{departmentSuggestion}</p>
              </div>
            </div>
          )}

          <div className="form-group">
            <label htmlFor="medicalHistory">Medical History</label>
            <textarea
              id="medicalHistory"
              name="medicalHistory"
              value={formData.medicalHistory}
              onChange={handleInputChange}
              rows={3}
              placeholder="Any previous medical conditions, surgeries, etc."
            />
          </div>

          <div className="form-group">
            <label htmlFor="currentMedications">Current Medications</label>
            <textarea
              id="currentMedications"
              name="currentMedications"
              value={formData.currentMedications}
              onChange={handleInputChange}
              rows={3}
              placeholder="List any medications you are currently taking"
            />
          </div>

          <div className="form-actions">
            <button type="button" onClick={showTimeSlots} className="continue-btn">
              Continue to Time Slots
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Form; 