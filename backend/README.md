# HealMate Healthcare Backend API

A comprehensive REST API for the HealMate healthcare application built with Node.js, Express, and JWT authentication.

## Features

- 🔐 JWT Authentication
- 👤 User Management
- 📅 Appointment Booking & Management
- 👨‍⚕️ Doctor Search & Profiles
- ⏰ Real-time Wait Times
- 💳 Payment Processing
- 🚑 Ambulance Booking
- 🚐 Diagnostic Van Booking
- 📊 Dashboard Statistics
- 🔔 Activity Tracking

## API Endpoints

### Authentication
- `POST /api/auth/login` - User login
- `POST /api/auth/register` - User registration

### User Profile
- `GET /api/user/profile` - Get user profile
- `PUT /api/user/profile` - Update user profile

### Dashboard
- `GET /api/dashboard/stats` - Get dashboard statistics
- `GET /api/dashboard/recent-activity` - Get recent activities

### Doctors
- `GET /api/doctors` - Get all doctors (with optional filters)
- `GET /api/doctors/:id` - Get specific doctor details

### Appointments
- `GET /api/appointments` - Get user appointments
- `POST /api/appointments` - Book new appointment
- `PUT /api/appointments/:id` - Update appointment
- `DELETE /api/appointments/:id` - Cancel appointment

### Wait Times
- `GET /api/wait-times` - Get current wait times

### Payments
- `GET /api/payments` - Get user payments
- `POST /api/payments` - Process payment

### Emergency Services
- `POST /api/ambulance` - Book ambulance
- `POST /api/diagnostic-van` - Book diagnostic van

## Installation

1. Install dependencies:
```bash
npm install
```

2. Create a `.env` file in the root directory:
```env
PORT=5000
JWT_SECRET=your-secret-key-here
NODE_ENV=development
```

3. Start the server:
```bash
# Development mode
npm run dev

# Production mode
npm start
```

## Default Test User

For testing purposes, a default user is available:
- Email: `john.doe@example.com`
- Password: `password`

## API Documentation

The API is self-documenting. All endpoints return JSON responses and include appropriate HTTP status codes.

### Authentication Headers

For protected routes, include the JWT token in the Authorization header:
```
Authorization: Bearer <your-jwt-token>
```

## Data Structure

The API uses in-memory storage for development. In production, this should be replaced with a proper database (MongoDB, PostgreSQL, etc.).

## Error Handling

All endpoints include proper error handling with meaningful error messages and appropriate HTTP status codes.

## Security Features

- JWT token-based authentication
- Password hashing with bcrypt
- CORS enabled for frontend communication
- Input validation and sanitization 