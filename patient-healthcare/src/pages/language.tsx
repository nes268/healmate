import React from 'react';
import { useNavigate } from 'react-router-dom';
import './language.css';

const Language: React.FC = () => {
  const navigate = useNavigate();

  const selectLanguage = (language: string) => {
    console.log('Selected language:', language);
    // Store the selected language in localStorage
    localStorage.setItem('selectedLanguage', language);
    // Navigate to options page after language selection
    navigate('/options');
  };

  return (
    <div id="languagePage" className="language-page">
      <div className="language-container">
        <div className="language-header">
          <div className="language-icon">
            <svg className="icon-svg" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129"></path>
            </svg>
          </div>
          <h2 className="language-title">Choose Your Language</h2>
          <p className="language-subtitle">Select your preferred language for assistance</p>
        </div>
        
        <div className="language-grid">
          <button onClick={() => selectLanguage('English')} className="language-btn english-btn">
            <div className="flag">🇺🇸</div>
            <div className="language-name">English</div>
          </button>
          
          <button onClick={() => selectLanguage('हिंदी')} className="language-btn hindi-btn">
            <div className="flag">🇮🇳</div>
            <div className="language-name">हिंदी</div>
          </button>
          
          <button onClick={() => selectLanguage('தமிழ்')} className="language-btn tamil-btn">
            <div className="flag">🌴</div>
            <div className="language-name">தமிழ்</div>
          </button>
          
          <button onClick={() => selectLanguage('বাংলা')} className="language-btn bengali-btn">
            <div className="flag">🐅</div>
            <div className="language-name">বাংলা</div>
          </button>
          
          <button onClick={() => selectLanguage('తెలుగు')} className="language-btn telugu-btn">
            <div className="flag">🏛</div>
            <div className="language-name">తెలుగు</div>
          </button>
          
          <button onClick={() => selectLanguage('ગુજરાતી')} className="language-btn gujarati-btn">
            <div className="flag">🦁</div>
            <div className="language-name">ગુજરાતી</div>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Language;
