# HealMate Database Setup

This folder contains the SQLite database setup for the HealMate healthcare application.

## Database Structure

### Tables

1. **users** - User accounts and profiles
2. **doctors** - Doctor information and specialties
3. **appointments** - Patient appointments
4. **wait_times** - Department wait times
5. **payments** - Payment records

### Sample Data

The database automatically creates sample data on first run:
- Test user: `john.doe@example.com` / `password`
- Sample doctors with different specialties
- Sample appointments and wait times

## Usage

The database is automatically initialized when the server starts. The SQLite file `healmate.db` will be created in this folder.

## Database Helper Functions

The `dbHelper` object provides the following functions:

- `getAllUsers()` - Get all users
- `getUserByEmail(email)` - Get user by email
- `getUserById(id)` - Get user by ID
- `createUser(userData)` - Create new user
- `updateUser(id, userData)` - Update user
- `getAllDoctors(specialty, search)` - Get doctors with filters
- `getDoctorById(id)` - Get doctor by ID
- `getAppointmentsByUserId(userId)` - Get user appointments
- `createAppointment(appointmentData)` - Create appointment
- `updateAppointment(id, appointmentData)` - Update appointment
- `deleteAppointment(id)` - Delete appointment
- `getAllWaitTimes()` - Get all wait times
- `getPaymentsByUserId(userId)` - Get user payments
- `createPayment(paymentData)` - Create payment

## File Structure

```
database/
├── database.js    # Main database setup and helper functions
├── config.js      # Database configuration
├── healmate.db    # SQLite database file (created automatically)
└── README.md      # This file
``` 