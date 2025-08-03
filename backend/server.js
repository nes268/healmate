const express = require('express');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const moment = require('moment');
const { dbHelper } = require('./database/database');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;
const JWT_SECRET = process.env.JWT_SECRET || 'healmate-secret-key-2024';

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Database will be used instead of in-memory storage

// Authentication middleware
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ error: 'Access token required' });
  }

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({ error: 'Invalid token' });
    }
    req.user = user;
    next();
  });
};

// Routes

// Health check
app.get('/', (req, res) => {
  res.json({ 
    message: 'HealMate Healthcare API is running ✅',
    version: '1.0.0',
    timestamp: new Date().toISOString()
  });
});

// Authentication routes
app.post('/api/auth/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    
    const user = await dbHelper.getUserByEmail(email);
    if (!user) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const token = jwt.sign(
      { userId: user.id, email: user.email },
      JWT_SECRET,
      { expiresIn: '24h' }
    );

    res.json({
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email
      }
    });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

app.post('/api/auth/register', async (req, res) => {
  try {
    const { name, email, password, phone, dateOfBirth, bloodGroup } = req.body;
    
    const existingUser = await dbHelper.getUserByEmail(email);
    if (existingUser) {
      return res.status(400).json({ error: 'User already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await dbHelper.createUser({
      name,
      email,
      password: hashedPassword,
      phone,
      dateOfBirth,
      bloodGroup,
      emergencyContactName: '',
      emergencyContactPhone: '',
      emergencyContactRelationship: ''
    });

    const token = jwt.sign(
      { userId: newUser.id, email: newUser.email },
      JWT_SECRET,
      { expiresIn: '24h' }
    );

    res.status(201).json({
      token,
      user: {
        id: newUser.id,
        name: newUser.name,
        email: newUser.email
      }
    });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

// User profile routes
app.get('/api/user/profile', authenticateToken, async (req, res) => {
  try {
    const user = await dbHelper.getUserById(req.user.userId);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    const { password, ...userProfile } = user;
    // Format emergency contact
    userProfile.emergencyContact = {
      name: userProfile.emergencyContactName || '',
      phone: userProfile.emergencyContactPhone || '',
      relationship: userProfile.emergencyContactRelationship || ''
    };
    
    res.json(userProfile);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

app.put('/api/user/profile', authenticateToken, async (req, res) => {
  try {
    const { name, phone, dateOfBirth, bloodGroup, emergencyContact } = req.body;
    const updatedUser = await dbHelper.updateUser(req.user.userId, {
      name: name,
      phone: phone,
      dateOfBirth: dateOfBirth,
      bloodGroup: bloodGroup,
      emergencyContactName: emergencyContact?.name || '',
      emergencyContactPhone: emergencyContact?.phone || '',
      emergencyContactRelationship: emergencyContact?.relationship || ''
    });

    const { password, ...userProfile } = updatedUser;
    userProfile.emergencyContact = {
      name: userProfile.emergencyContactName || '',
      phone: userProfile.emergencyContactPhone || '',
      relationship: userProfile.emergencyContactRelationship || ''
    };
    
    res.json(userProfile);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

// Dashboard routes
app.get('/api/dashboard/stats', authenticateToken, async (req, res) => {
  try {
    const userAppointments = await dbHelper.getAppointmentsByUserId(req.user.userId);
    const upcomingAppointments = userAppointments.filter(a => 
      moment(a.date).isAfter(moment(), 'day')
    );
    const pendingPayments = await dbHelper.getPaymentsByUserId(req.user.userId);
    const pendingPaymentsFiltered = pendingPayments.filter(p => p.status === 'pending');

    res.json({
      upcomingAppointments: upcomingAppointments.length,
      activePrescriptions: 3, // Mock data
      totalVisits: userAppointments.length,
      pendingPayments: pendingPaymentsFiltered.reduce((sum, p) => sum + p.amount, 0)
    });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

app.get('/api/dashboard/recent-activity', authenticateToken, async (req, res) => {
  try {
    const userAppointments = await dbHelper.getAppointmentsByUserId(req.user.userId);
    const recentAppointments = userAppointments
      .sort((a, b) => moment(b.date).diff(moment(a.date)))
      .slice(0, 5);

    const activities = recentAppointments.map(appointment => ({
      type: 'appointment',
      title: 'Appointment Scheduled',
      description: `${appointment.doctorName} - ${appointment.specialty}`,
      date: appointment.date,
      time: appointment.time
    }));

    res.json(activities);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

// Doctor routes
app.get('/api/doctors', async (req, res) => {
  try {
    const { specialty, search } = req.query;
    const doctors = await dbHelper.getAllDoctors(specialty, search);
    
    // Parse availableSlots from JSON string
    const doctorsWithParsedSlots = doctors.map(doctor => ({
      ...doctor,
      availableSlots: doctor.availableSlots ? JSON.parse(doctor.availableSlots) : []
    }));
    
    res.json(doctorsWithParsedSlots);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

app.get('/api/doctors/:id', async (req, res) => {
  try {
    const doctor = await dbHelper.getDoctorById(parseInt(req.params.id));
    if (!doctor) {
      return res.status(404).json({ error: 'Doctor not found' });
    }
    
    // Parse availableSlots from JSON string
    doctor.availableSlots = doctor.availableSlots ? JSON.parse(doctor.availableSlots) : [];
    
    res.json(doctor);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

// Appointment routes
app.get('/api/appointments', authenticateToken, async (req, res) => {
  try {
    const userAppointments = await dbHelper.getAppointmentsByUserId(req.user.userId);
    res.json(userAppointments);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

app.post('/api/appointments', authenticateToken, async (req, res) => {
  try {
    const { doctorName, specialty, date, time, duration, notes } = req.body;
    
    const newAppointment = await dbHelper.createAppointment({
      userId: req.user.userId,
      doctorName,
      specialty,
      date,
      time,
      duration: duration || 60,
      status: 'confirmed',
      notes: notes || ''
    });
    
    res.status(201).json(newAppointment);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

app.put('/api/appointments/:id', authenticateToken, async (req, res) => {
  try {
    const { date, time, notes } = req.body;
    const updatedAppointment = await dbHelper.updateAppointment(parseInt(req.params.id), {
      date: date,
      time: time,
      notes: notes
    });
    
    res.json(updatedAppointment);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

app.delete('/api/appointments/:id', authenticateToken, async (req, res) => {
  try {
    const result = await dbHelper.deleteAppointment(parseInt(req.params.id));
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

// Wait times routes
app.get('/api/wait-times', async (req, res) => {
  try {
    const waitTimes = await dbHelper.getAllWaitTimes();
    res.json(waitTimes);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

// Payment routes
app.get('/api/payments', authenticateToken, async (req, res) => {
  try {
    const userPayments = await dbHelper.getPaymentsByUserId(req.user.userId);
    res.json(userPayments);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

app.post('/api/payments', authenticateToken, async (req, res) => {
  try {
    const { amount, description, paymentMethod } = req.body;
    
    const newPayment = await dbHelper.createPayment({
      userId: req.user.userId,
      amount,
      description,
      paymentMethod,
      status: 'completed'
    });
    
    res.status(201).json(newPayment);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

// Ambulance booking routes
app.post('/api/ambulance', authenticateToken, (req, res) => {
  const { pickupAddress, destination, ambulanceType, contactNumber, notes } = req.body;
  
  const booking = {
    id: Date.now(),
    userId: req.user.userId,
    pickupAddress,
    destination,
    ambulanceType,
    contactNumber,
    notes,
    status: 'confirmed',
    bookingTime: new Date().toISOString()
  };
  
  res.status(201).json(booking);
});

// Diagnostic van booking routes
app.post('/api/diagnostic-van', authenticateToken, (req, res) => {
  const { fullName, address, contactNumber, date, testType } = req.body;
  
  const booking = {
    id: Date.now(),
    userId: req.user.userId,
    fullName,
    address,
    contactNumber,
    date,
    testType,
    status: 'confirmed',
    bookingTime: new Date().toISOString()
  };
  
  res.status(201).json(booking);
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

app.listen(PORT, () => {
  console.log(`🚀 HealMate Healthcare API running on http://localhost:${PORT}`);
  console.log(`📚 API Documentation available at http://localhost:${PORT}/api-docs`);
});
