import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './login.css';

const Login: React.FC = () => {
  const [mobile, setMobile] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Logging in with:', { mobile, password });
    // After successful login, redirect to language page
    navigate('/language');
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <div className="login-header">
          <div className="avatar-icon">👤</div>
          <h2>Welcome Back</h2>
          <p>Login to your account</p>
        </div>
        <form className="login-form" onSubmit={handleLogin}>
          <label>Mobile Number</label>
          <input
            type="tel"
            value={mobile}
            onChange={(e) => setMobile(e.target.value)}
            placeholder="Enter your mobile number"
            required
          />

          <label>Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your password"
            required
          />

          <button type="submit">Login</button>
        </form>
        <div className="signup-link">
          Don't have an account? <Link to="/signup">Sign Up</Link>
        </div>
        <div className="language-link">
          <Link to="/language">Change Language</Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
