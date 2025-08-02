import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './profile.css';

const Profile: React.FC = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState({
    name: 'John Doe',
    email: 'john.doe@email.com',
    phone: '+1 (555) 123-4567',
    dateOfBirth: '1985-03-15',
    gender: 'Male',
    bloodGroup: 'O+',
    address: '123 Healthcare Street, Medical City, MC 12345',
    emergencyContact: {
      name: 'Jane Doe',
      relationship: 'Spouse',
      phone: '+1 (555) 987-6543'
    },
    medicalHistory: {
      allergies: ['Penicillin', 'Peanuts'],
      conditions: ['Hypertension', 'Diabetes Type 2'],
      medications: ['Metformin', 'Lisinopril'],
      surgeries: ['Appendectomy - 2010']
    }
  });

  const [editData, setEditData] = useState(profileData);

  const handleEdit = () => {
    setEditData(profileData);
    setIsEditing(true);
  };

  const handleSave = () => {
    setProfileData(editData);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditData(profileData);
    setIsEditing(false);
  };

  const handleInputChange = (field: string, value: string) => {
    setEditData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  return (
    <div className="profile-container">
      <div className="profile-header">
        <Link to="/dashboard" className="back-link">← Back to Dashboard</Link>
        <h1>👤 Profile</h1>
        <p>Manage your personal and medical information</p>
      </div>

      <div className="profile-content">
        {/* Profile Picture Section */}
        <div className="profile-picture-section">
          <div className="profile-picture">
            <span className="profile-avatar">👤</span>
            <div className="profile-picture-overlay">
              <button className="change-photo-btn">📷 Change Photo</button>
            </div>
          </div>
          <div className="profile-name">
            <h2>{isEditing ? editData.name : profileData.name}</h2>
            <p>Patient ID: P-2024-001</p>
          </div>
        </div>

        {/* Personal Information */}
        <div className="profile-section">
          <div className="section-header">
            <h3>📋 Personal Information</h3>
            {!isEditing && (
              <button className="edit-btn" onClick={handleEdit}>✏️ Edit</button>
            )}
          </div>
          
          <div className="info-grid">
            <div className="info-item">
              <label>Full Name</label>
              {isEditing ? (
                <input
                  type="text"
                  value={editData.name}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                  className="edit-input"
                />
              ) : (
                <span>{profileData.name}</span>
              )}
            </div>

            <div className="info-item">
              <label>Email</label>
              {isEditing ? (
                <input
                  type="email"
                  value={editData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  className="edit-input"
                />
              ) : (
                <span>{profileData.email}</span>
              )}
            </div>

            <div className="info-item">
              <label>Phone Number</label>
              {isEditing ? (
                <input
                  type="tel"
                  value={editData.phone}
                  onChange={(e) => handleInputChange('phone', e.target.value)}
                  className="edit-input"
                />
              ) : (
                <span>{profileData.phone}</span>
              )}
            </div>

            <div className="info-item">
              <label>Date of Birth</label>
              {isEditing ? (
                <input
                  type="date"
                  value={editData.dateOfBirth}
                  onChange={(e) => handleInputChange('dateOfBirth', e.target.value)}
                  className="edit-input"
                />
              ) : (
                <span>{new Date(profileData.dateOfBirth).toLocaleDateString()}</span>
              )}
            </div>

            <div className="info-item">
              <label>Gender</label>
              {isEditing ? (
                <select
                  value={editData.gender}
                  onChange={(e) => handleInputChange('gender', e.target.value)}
                  className="edit-input"
                >
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
              ) : (
                <span>{profileData.gender}</span>
              )}
            </div>

            <div className="info-item">
              <label>Blood Group</label>
              {isEditing ? (
                <select
                  value={editData.bloodGroup}
                  onChange={(e) => handleInputChange('bloodGroup', e.target.value)}
                  className="edit-input"
                >
                  <option value="A+">A+</option>
                  <option value="A-">A-</option>
                  <option value="B+">B+</option>
                  <option value="B-">B-</option>
                  <option value="AB+">AB+</option>
                  <option value="AB-">AB-</option>
                  <option value="O+">O+</option>
                  <option value="O-">O-</option>
                </select>
              ) : (
                <span>{profileData.bloodGroup}</span>
              )}
            </div>

            <div className="info-item full-width">
              <label>Address</label>
              {isEditing ? (
                <textarea
                  value={editData.address}
                  onChange={(e) => handleInputChange('address', e.target.value)}
                  className="edit-input"
                  rows={3}
                />
              ) : (
                <span>{profileData.address}</span>
              )}
            </div>
          </div>

          {isEditing && (
            <div className="edit-actions">
              <button className="btn-primary" onClick={handleSave}>💾 Save Changes</button>
              <button className="btn-secondary" onClick={handleCancel}>❌ Cancel</button>
            </div>
          )}
        </div>

        {/* Emergency Contact */}
        <div className="profile-section">
          <h3>🚨 Emergency Contact</h3>
          <div className="emergency-contact-card">
            <div className="emergency-info">
              <h4>{profileData.emergencyContact.name}</h4>
              <p>{profileData.emergencyContact.relationship}</p>
              <span className="emergency-phone">{profileData.emergencyContact.phone}</span>
            </div>
            <button className="btn-secondary">Edit Contact</button>
          </div>
        </div>

        {/* Medical Information */}
        <div className="profile-section">
          <h3>🏥 Medical Information</h3>
          
          <div className="medical-grid">
            <div className="medical-card">
              <h4>🩸 Allergies</h4>
              <div className="medical-list">
                {profileData.medicalHistory.allergies.map((allergy, index) => (
                  <span key={index} className="medical-tag">{allergy}</span>
                ))}
              </div>
            </div>

            <div className="medical-card">
              <h4>💊 Current Conditions</h4>
              <div className="medical-list">
                {profileData.medicalHistory.conditions.map((condition, index) => (
                  <span key={index} className="medical-tag">{condition}</span>
                ))}
              </div>
            </div>

            <div className="medical-card">
              <h4>💊 Medications</h4>
              <div className="medical-list">
                {profileData.medicalHistory.medications.map((medication, index) => (
                  <span key={index} className="medical-tag">{medication}</span>
                ))}
              </div>
            </div>

            <div className="medical-card">
              <h4>🔪 Surgical History</h4>
              <div className="medical-list">
                {profileData.medicalHistory.surgeries.map((surgery, index) => (
                  <span key={index} className="medical-tag">{surgery}</span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="profile-section">
          <h3>⚡ Quick Actions</h3>
          <div className="quick-actions">
            <button className="action-btn">
              <span className="action-icon">📋</span>
              <span>View Medical Records</span>
            </button>
            <button className="action-btn">
              <span className="action-icon">💳</span>
              <span>Payment History</span>
            </button>
            <button className="action-btn">
              <span className="action-icon">📅</span>
              <span>Appointment History</span>
            </button>
            <button className="action-btn">
              <span className="action-icon">🔐</span>
              <span>Change Password</span>
            </button>
            <button className="action-btn">
              <span className="action-icon">📧</span>
              <span>Contact Support</span>
            </button>
            <button className="action-btn">
              <span className="action-icon">📄</span>
              <span>Download Records</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile; 