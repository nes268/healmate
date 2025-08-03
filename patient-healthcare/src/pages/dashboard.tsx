import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../App';
import { 
  dashboardAPI, 
  doctorsAPI, 
  appointmentsAPI, 
  waitTimesAPI,
  type DashboardStats,
  type Doctor,
  type Appointment,
  type WaitTime,
  type Activity
} from '../services/api';
import './dashboard.css';

const Dashboard: React.FC = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const [selectedLanguage, setSelectedLanguage] = useState<string>('');
  const [activeModule, setActiveModule] = useState<string>('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState<boolean>(true);
  
  // API data states
  const [dashboardStats, setDashboardStats] = useState<DashboardStats | null>(null);
  const [recentActivities, setRecentActivities] = useState<Activity[]>([]);
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [waitTimes, setWaitTimes] = useState<WaitTime[]>([]);
  // const [payments, setPayments] = useState<Payment[]>([]); // Will be used in payment module
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');
  
  // Form states
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedSpecialty, setSelectedSpecialty] = useState<string>('');

  useEffect(() => {
    // Get the selected language from localStorage
    const language = localStorage.getItem('selectedLanguage');
    setSelectedLanguage(language || 'English');
    
    // Load dashboard data
    loadDashboardData();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const loadDashboardData = async () => {
    setLoading(true);
    setError('');
    
    try {
      // Load dashboard stats and recent activities
      const [stats, activities] = await Promise.all([
        dashboardAPI.getStats(),
        dashboardAPI.getRecentActivity()
      ]);
      
      setDashboardStats(stats);
      setRecentActivities(activities);
      
      // Load other data based on active module
      await loadModuleData();
    } catch (err) {
      setError('Failed to load dashboard data');
      console.error('Dashboard data loading error:', err);
    } finally {
      setLoading(false);
    }
  };

  const loadModuleData = async () => {
    try {
      switch (activeModule) {
        case 'see-doctor': {
          const doctorsData = await doctorsAPI.getAll(selectedSpecialty, searchQuery);
          setDoctors(doctorsData);
          break;
        }
        case 'appointments': {
          const appointmentsData = await appointmentsAPI.getAll();
          setAppointments(appointmentsData);
          break;
        }
        case 'wait-time': {
          const waitTimesData = await waitTimesAPI.getAll();
          setWaitTimes(waitTimesData);
          break;
        }
        case 'payment': {
          // const paymentsData = await paymentsAPI.getAll();
          // setPayments(paymentsData);
          break;
        }
      }
    } catch (err) {
      console.error('Module data loading error:', err);
    }
  };

  useEffect(() => {
    loadModuleData();
  }, [activeModule, searchQuery, selectedSpecialty]); // eslint-disable-line react-hooks/exhaustive-deps

  const sidebarModules = [
    { id: 'dashboard', name: 'Dashboard', icon: '🏠' },
    { id: 'see-doctor', name: 'See Doctor', icon: '👨‍⚕' },
    { id: 'appointments', name: 'My Appointments', icon: '📅' },
    { id: 'wait-time', name: 'Wait Time', icon: '⏰' },
    { id: 'hospital-map', name: 'Hospital Map', icon: '🗺' },
    { id: 'payment', name: 'Make Payment', icon: '💳' },
    { id: 'ambulance', name: 'Ambulance Booking', icon: '🚑' },
    { id: 'transportation', name: 'Transportation Help', icon: '🚗' },
    { id: 'diagnostic-van', name: 'Diagnostic Van Booking', icon: '🚐' },
    { id: 'next-visit', name: 'Next Visit Alert', icon: '🔔' }
  ];

  const renderModuleContent = () => {
    switch (activeModule) {
      case 'dashboard':
        return (
          <div className="main-content">
            <div className="welcome-section">
              <h2>Welcome to Patient Healthcare Portal</h2>
              <p>Manage your healthcare needs efficiently</p>
            </div>
            
            {loading ? (
              <div className="loading">Loading dashboard data...</div>
            ) : error ? (
              <div className="error">{error}</div>
            ) : (
              <div className="quick-stats">
                <div className="stat-card">
                  <div className="stat-icon">📊</div>
                  <div className="stat-info">
                    <h3>{dashboardStats?.upcomingAppointments || 0}</h3>
                    <p>Upcoming Appointments</p>
                  </div>
                </div>
                <div className="stat-card">
                  <div className="stat-icon">💊</div>
                  <div className="stat-info">
                    <h3>{dashboardStats?.activePrescriptions || 0}</h3>
                    <p>Active Prescriptions</p>
                  </div>
                </div>
                <div className="stat-card">
                  <div className="stat-icon">🏥</div>
                  <div className="stat-info">
                    <h3>{dashboardStats?.totalVisits || 0}</h3>
                    <p>Total Visits</p>
                  </div>
                </div>
                <div className="stat-card">
                  <div className="stat-icon">💰</div>
                  <div className="stat-info">
                    <h3>${dashboardStats?.pendingPayments || 0}</h3>
                    <p>Pending Payments</p>
                  </div>
                </div>
              </div>
            )}

            <div className="recent-activity">
              <h3>Recent Activity</h3>
              <div className="activity-list">
                {recentActivities.length > 0 ? (
                  recentActivities.map((activity, index) => (
                    <div key={index} className="activity-item">
                      <div className="activity-icon">📅</div>
                      <div className="activity-content">
                        <h4>{activity.title}</h4>
                        <p>{activity.description}</p>
                        <small>{activity.date} at {activity.time}</small>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="activity-item">
                    <div className="activity-icon">📋</div>
                    <div className="activity-content">
                      <h4>No recent activity</h4>
                      <p>Your recent activities will appear here</p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        );
      
      case 'see-doctor':
        return (
          <div className="main-content">
            <h2>Find and Book Doctor</h2>
            <div className="doctor-search">
              <input 
                type="text" 
                placeholder="Search for doctors, specialties..." 
                className="search-input"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <select 
                className="search-input"
                value={selectedSpecialty}
                onChange={(e) => setSelectedSpecialty(e.target.value)}
              >
                <option value="">All Specialties</option>
                <option value="Cardiology">Cardiology</option>
                <option value="Neurology">Neurology</option>
                <option value="Laboratory">Laboratory</option>
                <option value="Pediatrics">Pediatrics</option>
                <option value="Orthopedics">Orthopedics</option>
              </select>
              <button className="search-btn">Search</button>
            </div>
            
            <div className="doctors-grid">
              {doctors.map((doctor) => (
                <div key={doctor.id} className="doctor-card">
                  <div className="doctor-image">
                    <img src={doctor.image} alt={doctor.name} />
                  </div>
                  <div className="doctor-info">
                    <h3>{doctor.name}</h3>
                    <p className="specialty">{doctor.specialty}</p>
                    <p className="experience">{doctor.experience} years experience</p>
                    <div className="rating">⭐ {doctor.rating}</div>
                    <button className="btn-primary">Book Appointment</button>
                  </div>
                </div>
              ))}
            </div>
            
            {doctors.length === 0 && !loading && (
              <div className="no-results">
                <p>No doctors found matching your criteria</p>
              </div>
            )}
          </div>
        );

      case 'appointments':
        return (
          <div className="main-content">
            <h2>My Appointments</h2>
            <div className="appointments-list">
              {appointments.map((appointment) => {
                const appointmentDate = new Date(appointment.date);
                const isUpcoming = appointmentDate > new Date();
                
                return (
                  <div key={appointment.id} className={`appointment-card ${isUpcoming ? 'upcoming' : ''}`}>
                    <div className="appointment-date">
                      <span className="day">{appointmentDate.getDate()}</span>
                      <span className="month">{appointmentDate.toLocaleDateString('en-US', { month: 'short' })}</span>
                    </div>
                    <div className="appointment-details">
                      <h3>{appointment.doctorName}</h3>
                      <p>{appointment.specialty}</p>
                      <span className="time">{appointment.time} - {new Date(`2000-01-01T${appointment.time}`).toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' })}</span>
                      {appointment.notes && <p className="notes">{appointment.notes}</p>}
                    </div>
                    <div className="appointment-actions">
                      <button className="btn-primary">Reschedule</button>
                      <button 
                        className="btn-secondary"
                        onClick={async () => {
                          try {
                            await appointmentsAPI.cancel(appointment.id);
                            setAppointments(appointments.filter(a => a.id !== appointment.id));
                          } catch (err) {
                            console.error('Failed to cancel appointment:', err);
                          }
                        }}
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                );
              })}
              
              {appointments.length === 0 && (
                <div className="no-appointments">
                  <p>No appointments found</p>
                  <button className="btn-primary">Book New Appointment</button>
                </div>
              )}
            </div>
          </div>
        );

      case 'wait-time':
        return (
          <div className="main-content">
            <h2>Current Wait Times</h2>
            <div className="wait-times">
              {waitTimes.map((waitTime, index) => (
                <div key={index} className="wait-time-card">
                  <h3>{waitTime.department}</h3>
                  <div className="wait-time">{waitTime.currentWait} minutes</div>
                  <div className={`status ${waitTime.status}`}>
                    {waitTime.status === 'low' ? 'Low Wait' : 
                     waitTime.status === 'moderate' ? 'Moderate Wait' : 'High Wait'}
                  </div>
                </div>
              ))}
              
              {waitTimes.length === 0 && (
                <div className="no-wait-times">
                  <p>No wait time information available</p>
                </div>
              )}
            </div>
          </div>
        );

      case 'hospital-map':
        return (
          <div className="main-content">
            <h2>Hospital Map</h2>
            <div className="map-container">
              <div className="map-placeholder">
                <div className="map-icon">🗺</div>
                <h3>Interactive Hospital Map</h3>
                <p>Find departments, facilities, and parking areas</p>
                <button className="btn-primary">Open Map</button>
              </div>
            </div>
            <div className="facilities-list">
              <h3>Quick Navigation</h3>
              <div className="facility-grid">
                <div className="facility-item">🏥 Emergency</div>
                <div className="facility-item">💊 Pharmacy</div>
                <div className="facility-item">🅿 Parking</div>
                <div className="facility-item">🍽 Cafeteria</div>
                <div className="facility-item">🛗 Elevators</div>
                <div className="facility-item">🚻 Restrooms</div>
              </div>
            </div>
          </div>
        );

      case 'payment':
        return (
          <div className="main-content">
            <h2>Make Payment</h2>
            <div className="payment-section">
              <div className="payment-methods">
                <h3>Payment Methods</h3>
                <div className="payment-options">
                  <div className="payment-option">
                    <input type="radio" name="payment" id="card" />
                    <label htmlFor="card">💳 Credit/Debit Card</label>
                  </div>
                  <div className="payment-option">
                    <input type="radio" name="payment" id="upi" />
                    <label htmlFor="upi">📱 UPI</label>
                  </div>
                  <div className="payment-option">
                    <input type="radio" name="payment" id="netbanking" />
                    <label htmlFor="netbanking">🏦 Net Banking</label>
                  </div>
                </div>
              </div>
              <div className="payment-form">
                <h3>Payment Details</h3>
                <input type="text" placeholder="Card Number" className="form-input" />
                <div className="form-row">
                  <input type="text" placeholder="MM/YY" className="form-input" />
                  <input type="text" placeholder="CVV" className="form-input" />
                </div>
                <input type="text" placeholder="Card Holder Name" className="form-input" />
                <button className="btn-primary">Pay Now</button>
              </div>
            </div>
          </div>
        );

      case 'ambulance':
        return (
          <div className="main-content">
            <h2>Ambulance Booking</h2>
            <div className="ambulance-booking">
              <div className="emergency-contact">
                <h3>🚨 Emergency Contact</h3>
                <div className="emergency-number">108</div>
                <p>24/7 Emergency Ambulance Service</p>
              </div>
              <div className="booking-form">
                <h3>Book Ambulance</h3>
                <input type="text" placeholder="Pickup Address" className="form-input" />
                <input type="text" placeholder="Destination Hospital" className="form-input" />
                <select className="form-input">
                  <option>Select Ambulance Type</option>
                  <option>Basic Ambulance</option>
                  <option>Advanced Life Support</option>
                  <option>Cardiac Ambulance</option>
                </select>
                <input type="text" placeholder="Contact Number" className="form-input" />
                <textarea placeholder="Additional Notes" className="form-input"></textarea>
                <button className="btn-primary">Book Ambulance</button>
              </div>
            </div>
          </div>
        );

      case 'transportation':
        return (
          <div className="main-content">
            <h2>Transportation Help</h2>
            <div className="transportation-options">
              <div className="transport-card">
                <div className="transport-icon">🚗</div>
                <h3>Taxi Service</h3>
                <p>Book a taxi to and from hospital</p>
                <button className="btn-primary">Book Taxi</button>
              </div>
              <div className="transport-card">
                <div className="transport-icon">🚌</div>
                <h3>Hospital Shuttle</h3>
                <p>Free shuttle service within hospital campus</p>
                <button className="btn-primary">Check Schedule</button>
              </div>
              <div className="transport-card">
                <div className="transport-icon">🛣</div>
                <h3>Route Planning</h3>
                <p>Find best route to hospital</p>
                <button className="btn-primary">Plan Route</button>
              </div>
            </div>
          </div>
        );

      case 'diagnostic-van':
        return (
          <div className="main-content">
            <h2>Diagnostic Van Booking</h2>
            <div className="diagnostic-van-booking">
              <div className="van-info">
                <h3>🏥 Mobile Diagnostic Services</h3>
                <p>Get diagnostic tests done at your doorstep</p>
                <div className="services-list">
                  <div className="service-item">🩸 Blood Tests</div>
                  <div className="service-item">💓 ECG</div>
                  <div className="service-item">🫁 X-Ray</div>
                  <div className="service-item">🔬 Pathology</div>
                </div>
              </div>
              <div className="booking-form">
                <h3>Book Diagnostic Van</h3>
                <input type="text" placeholder="Full Name" className="form-input" />
                <input type="text" placeholder="Address" className="form-input" />
                <input type="text" placeholder="Contact Number" className="form-input" />
                <input type="date" className="form-input" />
                <select className="form-input">
                  <option>Select Test Type</option>
                  <option>Complete Blood Count</option>
                  <option>Diabetes Screening</option>
                  <option>Cardiac Profile</option>
                  <option>General Health Checkup</option>
                </select>
                <button className="btn-primary">Book Van</button>
              </div>
            </div>
          </div>
        );

      case 'next-visit':
        return (
          <div className="main-content">
            <h2>Next Visit Alert</h2>
            <div className="visit-alerts">
              <div className="alert-card urgent">
                <div className="alert-icon">🔴</div>
                <div className="alert-content">
                  <h3>Follow-up Visit Due</h3>
                  <p>Dr. Sarah Johnson - Cardiology</p>
                  <span className="alert-date">Due: December 20, 2024</span>
                </div>
                <button className="btn-primary">Book Now</button>
              </div>
              <div className="alert-card">
                <div className="alert-icon">🟡</div>
                <div className="alert-content">
                  <h3>Annual Checkup</h3>
                  <p>General Health Assessment</p>
                  <span className="alert-date">Due: January 15, 2025</span>
                </div>
                <button className="btn-primary">Schedule</button>
              </div>
              <div className="alert-card">
                <div className="alert-icon">🟢</div>
                <div className="alert-content">
                  <h3>Dental Checkup</h3>
                  <p>Dr. Robert Wilson - Dentistry</p>
                  <span className="alert-date">Due: February 5, 2025</span>
                </div>
                <button className="btn-primary">Schedule</button>
              </div>
            </div>
          </div>
        );

      default:
        return <div className="main-content"><h2>Select a module from the sidebar</h2></div>;
    }
  };

  return (
    <div className="dashboard-layout">
      {/* Sidebar */}
      <div className={`sidebar ${sidebarOpen ? 'open' : 'closed'}`}>
        <div className="sidebar-header">
          <h2>🏥 Healthcare</h2>
          <button 
            className="sidebar-toggle"
            onClick={() => setSidebarOpen(!sidebarOpen)}
          >
            {sidebarOpen ? '◀' : '▶'}
          </button>
        </div>
        
        <nav className="sidebar-nav">
          {sidebarModules.map((module) => (
            <button
              key={module.id}
              className={`sidebar-item ${activeModule === module.id ? 'active' : ''}`}
              onClick={() => setActiveModule(module.id)}
            >
              <span className="sidebar-icon">{module.icon}</span>
              {sidebarOpen && <span className="sidebar-text">{module.name}</span>}
            </button>
          ))}
        </nav>

        <div className="sidebar-footer">
          <div className="language-info">
            <span className="language-icon">🌐</span>
            {sidebarOpen && <span>{selectedLanguage}</span>}
          </div>
          <Link to="/profile" className="sidebar-link">
            <span className="sidebar-icon">👤</span>
            {sidebarOpen && <span>Profile</span>}
          </Link>
          <Link to="/settings" className="sidebar-link">
            <span className="sidebar-icon">⚙</span>
            {sidebarOpen && <span>Settings</span>}
          </Link>
          <button 
            onClick={() => {
              logout();
              navigate('/login');
            }}
            className="sidebar-link"
            style={{ background: 'none', border: 'none', cursor: 'pointer', width: '100%', textAlign: 'left' }}
          >
            <span className="sidebar-icon">🚪</span>
            {sidebarOpen && <span>Logout</span>}
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="main-layout">
        {/* Header */}
        <header className="main-header">
          <div className="header-left">
            <h1>{sidebarModules.find(m => m.id === activeModule)?.name || 'Dashboard'}</h1>
          </div>
          <div className="header-right">
            <div className="user-info">
              <Link to="/profile" style={{ textDecoration: 'none', color: 'inherit' }}>
                <span className="user-avatar">👤</span>
                <span className="user-name">{user?.name || 'User'}</span>
              </Link>
            </div>
            <div className="header-actions">
              <button className="header-btn">🔔</button>
              <button className="header-btn">📧</button>
            </div>
          </div>
        </header>

        {/* Content Area */}
        <main className="content-area">
          {renderModuleContent()}
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
