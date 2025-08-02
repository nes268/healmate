import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/login';
import Language from './pages/language';
import Options from './pages/options';
import Form from './pages/form';
import Assistance from './pages/assistance';
import TimeSlots from './pages/timeslots';
import Dashboard from './pages/dashboard';
import Profile from './pages/profile';
import Settings from './pages/settings';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/language" element={<Language />} />
          <Route path="/options" element={<Options />} />
          <Route path="/form" element={<Form />} />
          <Route path="/assistance" element={<Assistance />} />
          <Route path="/timeslots" element={<TimeSlots />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/" element={<Navigate to="/login" replace />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
