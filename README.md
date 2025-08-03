# HealMate Healthcare Application

A comprehensive healthcare management system built with React, TypeScript, Node.js, and Express. HealMate provides a complete solution for patient healthcare management with features like appointment booking, doctor search, payment processing, and emergency services.

## 🏥 Features

### Core Features
- **User Authentication** - Secure login/registration with JWT
- **Dashboard** - Real-time healthcare statistics and activity tracking
- **Doctor Search** - Find and book appointments with specialists
- **Appointment Management** - Schedule, reschedule, and cancel appointments
- **Wait Time Monitoring** - Real-time department wait times
- **Payment Processing** - Secure payment handling for medical services
- **Emergency Services** - Ambulance and diagnostic van booking
- **Multi-language Support** - Internationalization ready

### Technical Features
- **Frontend**: React 18 + TypeScript + Vite
- **Backend**: Node.js + Express + JWT Authentication
- **Database**: SQLite with automatic setup and sample data
- **Real-time Data**: Live updates for appointments and wait times
- **Responsive Design**: Mobile-first approach
- **Modern UI/UX**: Clean, intuitive interface
- **API Integration**: RESTful API with comprehensive endpoints

## 🚀 Quick Start

### Prerequisites
- Node.js (v16 or higher)
- npm (v8 or higher)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/your-username/healmate.git
   cd healmate
   ```

2. **Install all dependencies**
   ```bash
   npm run install-all
   ```

3. **Start the development servers**
   ```bash
   npm run dev
   ```

This will start both the backend (port 5000) and frontend (port 5173) servers concurrently.

### Manual Setup

If you prefer to run servers separately:

**Backend:**
```bash
cd backend
npm install
npm start
```

**Frontend:**
```bash
cd patient-healthcare
npm install
npm run dev
```

## 📁 Project Structure

```
healmate/
├── backend/                 # Node.js + Express API
│   ├── server.js           # Main server file
│   ├── database/           # SQLite database setup
│   │   ├── database.js     # Database configuration
│   │   └── healmate.db     # SQLite database file
│   ├── package.json        # Backend dependencies
│   └── README.md           # Backend documentation
├── patient-healthcare/      # React + TypeScript frontend
│   ├── src/
│   │   ├── pages/          # React components
│   │   ├── services/       # API service layer
│   │   └── App.tsx         # Main app component
│   ├── package.json        # Frontend dependencies
│   └── README.md           # Frontend documentation
├── package.json            # Root package.json
└── README.md              # This file
```

## 🔧 Configuration

### Environment Variables

Create a `.env` file in the `backend` directory:

```env
PORT=5000
JWT_SECRET=your-secret-key-here
NODE_ENV=development
```

### Default Test User

For testing purposes, use these credentials:
- **Email**: `john.doe@example.com`
- **Password**: `password`

## 📚 API Documentation

### Authentication Endpoints
- `POST /api/auth/login` - User login
- `POST /api/auth/register` - User registration

### User Management
- `GET /api/user/profile` - Get user profile
- `PUT /api/user/profile` - Update user profile

### Dashboard
- `GET /api/dashboard/stats` - Get dashboard statistics
- `GET /api/dashboard/recent-activity` - Get recent activities

### Doctors
- `GET /api/doctors` - Get all doctors (with filters)
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

## 🎨 Frontend Features

### Pages
- **Login** - User authentication
- **Language Selection** - Multi-language support
- **Dashboard** - Main healthcare portal
- **Doctor Search** - Find and book doctors
- **Appointments** - Manage appointments
- **Wait Times** - Real-time department wait times
- **Payments** - Payment processing
- **Emergency Services** - Ambulance and diagnostic van booking
- **Profile** - User profile management
- **Settings** - Application settings

### Components
- **Responsive Sidebar** - Collapsible navigation
- **Real-time Data** - Live updates from API
- **Loading States** - User-friendly loading indicators
- **Error Handling** - Comprehensive error management
- **Form Validation** - Client-side validation

## 🔒 Security Features

- **JWT Authentication** - Secure token-based authentication
- **Password Hashing** - bcrypt password encryption
- **CORS Protection** - Cross-origin resource sharing
- **Input Validation** - Server-side validation
- **Protected Routes** - Authentication-required endpoints

## 🚀 Deployment

### Backend Deployment
1. Set up environment variables
2. Install dependencies: `npm install`
3. Start production server: `npm start`

### Frontend Deployment
1. Build the application: `npm run build`
2. Deploy the `dist` folder to your hosting service

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature-name`
3. Commit your changes: `git commit -am 'Add feature'`
4. Push to the branch: `git push origin feature-name`
5. Submit a pull request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

For support and questions:
- Create an issue in the GitHub repository
- Contact the development team
- Check the documentation in the respective folders

## 🔮 Future Enhancements

- [ ] Database integration (MongoDB/PostgreSQL)
- [ ] Real-time notifications
- [ ] Video consultations
- [ ] Prescription management
- [ ] Medical records
- [ ] Insurance integration
- [ ] Mobile app (React Native)
- [ ] AI-powered symptom checker
- [ ] Telemedicine features

---

**HealMate** - Your Health, Our Priority 🏥 