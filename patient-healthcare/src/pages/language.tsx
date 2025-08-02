import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './language.css';

const Language: React.FC = () => {
  const navigate = useNavigate();
  const [selectedLanguage, setSelectedLanguage] = useState<string>('');

  const languages = [
    {
      code: 'English',
      name: 'English',
      native: 'English',
      flag: '🇺🇸'
    },
    {
      code: 'Hindi',
      name: 'Hindi',
      native: 'हिंदी',
      flag: '🇮🇳'
    },
    {
      code: 'Tamil',
      name: 'Tamil',
      native: 'தமிழ்',
      flag: '🇮🇳'
    },
    {
      code: 'Bengali',
      name: 'Bengali',
      native: 'বাংলা',
      flag: '🇮🇳'
    },
    {
      code: 'Telugu',
      name: 'Telugu',
      native: 'తెలుగు',
      flag: '🇮🇳'
    },
    {
      code: 'Gujarati',
      name: 'Gujarati',
      native: 'ગુજરાતી',
      flag: '🇮🇳'
    }
  ];

  const handleLanguageSelect = (languageCode: string) => {
    setSelectedLanguage(languageCode);
    localStorage.setItem('selectedLanguage', languageCode);
  };

  const handleContinue = () => {
    if (selectedLanguage) {
      navigate('/options');
    }
  };

  return (
    <div className="language-container">
      {/* Floating Elements */}
      <div className="floating-elements">
        <div className="floating-element"></div>
        <div className="floating-element"></div>
        <div className="floating-element"></div>
      </div>
      
      <div className="language-card">
        <div className="language-header">
          <div className="language-icon">
            <svg fill="currentColor" viewBox="0 0 24 24">
              <path d="M12.87 15.07l-2.54-2.51.03-.03c1.74-1.94 2.01-4.65.77-6.99l2.53 2.52c.27.28.27.72 0 1z"/>
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zM4 12c0-4.42 3.58-8 8-8 1.85 0 3.55.63 4.9 1.69L5.69 16.9C4.63 15.55 4 13.85 4 12zm8 8c-1.85 0-3.55-.63-4.9-1.69L18.31 7.1C19.37 8.45 20 10.15 20 12c0 4.42-3.58 8-8 8z"/>
            </svg>
          </div>
          <h1 className="language-title">Choose Your Language</h1>
          <p className="language-subtitle">Select your preferred language</p>
          <p className="language-description">We'll use this language throughout your healthcare journey</p>
        </div>
        
        <div className="language-options">
          {languages.map((language) => (
            <div
              key={language.code}
              className={`language-option ${selectedLanguage === language.code ? 'selected' : ''}`}
              onClick={() => handleLanguageSelect(language.code)}
            >
              <div className="language-flag">
                {language.flag}
              </div>
              <div className="language-name">{language.name}</div>
              <div className="language-native">{language.native}</div>
            </div>
          ))}
        </div>
        
        <button
          className="continue-btn"
          onClick={handleContinue}
          disabled={!selectedLanguage}
        >
          Continue with {selectedLanguage || 'Language'}
        </button>
      </div>
    </div>
  );
};

export default Language;
