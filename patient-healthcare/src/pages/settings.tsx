import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './settings.css';

const Settings: React.FC = () => {
  const [notifications, setNotifications] = useState({
    appointment: true,
    payment: true,
    health: true,
    emergency: true
  });
  const [privacy, setPrivacy] = useState({
    shareData: false,
    location: true,
    analytics: true
  });
  const [language, setLanguage] = useState('English');
  const [theme, setTheme] = useState('light');

  const handleNotificationChange = (type: string) => {
    setNotifications(prev => ({
      ...prev,
      [type]: !prev[type as keyof typeof prev]
    }));
  };

  const handlePrivacyChange = (type: string) => {
    setPrivacy(prev => ({
      ...prev,
      [type]: !prev[type as keyof typeof prev]
    }));
  };

  return (
    <div className="settings-container">
      <div className="settings-header">
        <Link to="/dashboard" className="back-link">← Back to Dashboard</Link>
        <h1>⚙ Settings</h1>
        <p>Manage your healthcare app preferences</p>
      </div>

      <div className="settings-content">
        {/* Notifications Section */}
        <div className="settings-section">
          <h2>🔔 Notifications</h2>
          <div className="settings-options">
            <div className="setting-item">
              <div className="setting-info">
                <h3>Appointment Reminders</h3>
                <p>Get notified about upcoming appointments</p>
              </div>
              <label className="toggle">
                <input
                  type="checkbox"
                  checked={notifications.appointment}
                  onChange={() => handleNotificationChange('appointment')}
                />
                <span className="slider"></span>
              </label>
            </div>

            <div className="setting-item">
              <div className="setting-info">
                <h3>Payment Alerts</h3>
                <p>Receive payment due notifications</p>
              </div>
              <label className="toggle">
                <input
                  type="checkbox"
                  checked={notifications.payment}
                  onChange={() => handleNotificationChange('payment')}
                />
                <span className="slider"></span>
              </label>
            </div>

            <div className="setting-item">
              <div className="setting-info">
                <h3>Health Updates</h3>
                <p>Get health tips and wellness reminders</p>
              </div>
              <label className="toggle">
                <input
                  type="checkbox"
                  checked={notifications.health}
                  onChange={() => handleNotificationChange('health')}
                />
                <span className="slider"></span>
              </label>
            </div>

            <div className="setting-item">
              <div className="setting-info">
                <h3>Emergency Alerts</h3>
                <p>Critical health and safety notifications</p>
              </div>
              <label className="toggle">
                <input
                  type="checkbox"
                  checked={notifications.emergency}
                  onChange={() => handleNotificationChange('emergency')}
                />
                <span className="slider"></span>
              </label>
            </div>
          </div>
        </div>

        {/* Privacy Section */}
        <div className="settings-section">
          <h2>🔒 Privacy & Security</h2>
          <div className="settings-options">
            <div className="setting-item">
              <div className="setting-info">
                <h3>Share Health Data</h3>
                <p>Allow sharing with healthcare providers</p>
              </div>
              <label className="toggle">
                <input
                  type="checkbox"
                  checked={privacy.shareData}
                  onChange={() => handlePrivacyChange('shareData')}
                />
                <span className="slider"></span>
              </label>
            </div>

            <div className="setting-item">
              <div className="setting-info">
                <h3>Location Services</h3>
                <p>Use location for nearby services</p>
              </div>
              <label className="toggle">
                <input
                  type="checkbox"
                  checked={privacy.location}
                  onChange={() => handlePrivacyChange('location')}
                />
                <span className="slider"></span>
              </label>
            </div>

            <div className="setting-item">
              <div className="setting-info">
                <h3>Analytics</h3>
                <p>Help improve app with usage data</p>
              </div>
              <label className="toggle">
                <input
                  type="checkbox"
                  checked={privacy.analytics}
                  onChange={() => handlePrivacyChange('analytics')}
                />
                <span className="slider"></span>
              </label>
            </div>
          </div>
        </div>

        {/* Language Section */}
        <div className="settings-section">
          <h2>🌐 Language</h2>
          <div className="setting-item">
            <div className="setting-info">
              <h3>App Language</h3>
              <p>Choose your preferred language</p>
            </div>
            <select 
              value={language} 
              onChange={(e) => setLanguage(e.target.value)}
              className="language-select"
            >
              <option value="English">English</option>
              <option value="Spanish">Spanish</option>
              <option value="French">French</option>
              <option value="German">German</option>
              <option value="Hindi">Hindi</option>
              <option value="Chinese">Chinese</option>
            </select>
          </div>
        </div>

        {/* Theme Section */}
        <div className="settings-section">
          <h2>🎨 Appearance</h2>
          <div className="setting-item">
            <div className="setting-info">
              <h3>Theme</h3>
              <p>Choose your preferred theme</p>
            </div>
            <select 
              value={theme} 
              onChange={(e) => setTheme(e.target.value)}
              className="theme-select"
            >
              <option value="light">Light</option>
              <option value="dark">Dark</option>
              <option value="auto">Auto</option>
            </select>
          </div>
        </div>

        {/* Account Section */}
        <div className="settings-section">
          <h2>👤 Account</h2>
          <div className="settings-options">
            <div className="setting-item">
              <div className="setting-info">
                <h3>Profile Information</h3>
                <p>Update your personal details</p>
              </div>
              <button className="btn-secondary">Edit Profile</button>
            </div>

            <div className="setting-item">
              <div className="setting-info">
                <h3>Change Password</h3>
                <p>Update your account password</p>
              </div>
              <button className="btn-secondary">Change Password</button>
            </div>

            <div className="setting-item">
              <div className="setting-info">
                <h3>Medical History</h3>
                <p>View and manage your health records</p>
              </div>
              <button className="btn-secondary">View Records</button>
            </div>
          </div>
        </div>

        {/* Support Section */}
        <div className="settings-section">
          <h2>🆘 Support</h2>
          <div className="settings-options">
            <div className="setting-item">
              <div className="setting-info">
                <h3>Help & FAQ</h3>
                <p>Get help and find answers</p>
              </div>
              <button className="btn-secondary">View Help</button>
            </div>

            <div className="setting-item">
              <div className="setting-info">
                <h3>Contact Support</h3>
                <p>Get in touch with our team</p>
              </div>
              <button className="btn-secondary">Contact Us</button>
            </div>

            <div className="setting-item">
              <div className="setting-info">
                <h3>About App</h3>
                <p>Version and app information</p>
              </div>
              <button className="btn-secondary">App Info</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
