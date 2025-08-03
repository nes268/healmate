const sqlite3 = require('sqlite3').verbose();
const path = require('path');

// Database file path
const dbPath = path.join(__dirname, 'healmate.db');

// Create database connection
const db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    console.error('Error opening database:', err.message);
  } else {
    console.log('✅ Connected to SQLite database');
    initializeTables();
  }
});

// Initialize database tables
const initializeTables = () => {
  // Users table
  db.run(`CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL,
    phone TEXT,
    dateOfBirth TEXT,
    bloodGroup TEXT,
    emergencyContactName TEXT,
    emergencyContactPhone TEXT,
    emergencyContactRelationship TEXT,
    createdAt DATETIME DEFAULT CURRENT_TIMESTAMP
  )`);

  // Doctors table
  db.run(`CREATE TABLE IF NOT EXISTS doctors (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    specialty TEXT NOT NULL,
    experience INTEGER,
    rating REAL,
    availableSlots TEXT,
    image TEXT,
    createdAt DATETIME DEFAULT CURRENT_TIMESTAMP
  )`);

  // Appointments table
  db.run(`CREATE TABLE IF NOT EXISTS appointments (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    userId INTEGER NOT NULL,
    doctorName TEXT NOT NULL,
    specialty TEXT NOT NULL,
    date TEXT NOT NULL,
    time TEXT NOT NULL,
    duration INTEGER DEFAULT 60,
    status TEXT DEFAULT 'confirmed',
    notes TEXT,
    createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (userId) REFERENCES users (id)
  )`);

  // Wait times table
  db.run(`CREATE TABLE IF NOT EXISTS wait_times (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    department TEXT NOT NULL,
    currentWait INTEGER NOT NULL,
    status TEXT NOT NULL,
    updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP
  )`);

  // Payments table
  db.run(`CREATE TABLE IF NOT EXISTS payments (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    userId INTEGER NOT NULL,
    amount REAL NOT NULL,
    description TEXT NOT NULL,
    status TEXT DEFAULT 'pending',
    paymentMethod TEXT,
    dueDate TEXT,
    date TEXT,
    createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (userId) REFERENCES users (id)
  )`);

  // Insert sample data
  insertSampleData();
};

// Insert sample data
const insertSampleData = () => {
  // Check if data already exists
  db.get("SELECT COUNT(*) as count FROM users", (err, row) => {
    if (err) {
      console.error('Error checking users:', err);
      return;
    }
    
    if (row.count === 0) {
      // Insert sample user
      const hashedPassword = '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi'; // password
      db.run(`INSERT INTO users (name, email, password, phone, dateOfBirth, bloodGroup, emergencyContactName, emergencyContactPhone, emergencyContactRelationship) 
              VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        ['John Doe', 'john.doe@example.com', hashedPassword, '+1234567890', '1990-05-15', 'O+', 'Jane Doe', '+1234567891', 'Spouse']
      );

      // Insert sample doctors
      db.run(`INSERT INTO doctors (name, specialty, experience, rating, availableSlots, image) VALUES (?, ?, ?, ?, ?, ?)`,
        ['Dr. Sarah Johnson', 'Cardiology', 15, 4.8, '["09:00","10:00","11:00","14:00","15:00"]', 'https://via.placeholder.com/150']
      );
      db.run(`INSERT INTO doctors (name, specialty, experience, rating, availableSlots, image) VALUES (?, ?, ?, ?, ?, ?)`,
        ['Dr. Michael Chen', 'Laboratory', 10, 4.6, '["08:00","09:00","10:00","13:00","14:00"]', 'https://via.placeholder.com/150']
      );
      db.run(`INSERT INTO doctors (name, specialty, experience, rating, availableSlots, image) VALUES (?, ?, ?, ?, ?, ?)`,
        ['Dr. Emily Brown', 'Neurology', 12, 4.9, '["10:00","11:00","14:00","15:00","16:00"]', 'https://via.placeholder.com/150']
      );

      // Insert sample appointments
      db.run(`INSERT INTO appointments (userId, doctorName, specialty, date, time, duration, status, notes) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
        [1, 'Dr. Sarah Johnson', 'Cardiology', '2024-12-15', '10:00', 60, 'confirmed', 'Follow-up consultation']
      );
      db.run(`INSERT INTO appointments (userId, doctorName, specialty, date, time, duration, status, notes) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
        [1, 'Dr. Michael Chen', 'Laboratory', '2024-12-18', '14:00', 30, 'confirmed', 'Blood test']
      );

      // Insert sample wait times
      db.run(`INSERT INTO wait_times (department, currentWait, status) VALUES (?, ?, ?)`,
        ['Emergency Department', 45, 'moderate']
      );
      db.run(`INSERT INTO wait_times (department, currentWait, status) VALUES (?, ?, ?)`,
        ['Outpatient Clinic', 15, 'low']
      );
      db.run(`INSERT INTO wait_times (department, currentWait, status) VALUES (?, ?, ?)`,
        ['Radiology', 30, 'moderate']
      );

      // Insert sample payment
      db.run(`INSERT INTO payments (userId, amount, description, status, dueDate) VALUES (?, ?, ?, ?, ?)`,
        [1, 150, 'Lab Test Payment', 'pending', '2024-12-20']
      );

      console.log('✅ Sample data inserted successfully');
    }
  });
};

// Database helper functions
const dbHelper = {
  // Get all users
  getAllUsers: () => {
    return new Promise((resolve, reject) => {
      db.all("SELECT * FROM users", (err, rows) => {
        if (err) reject(err);
        else resolve(rows);
      });
    });
  },

  // Get user by email
  getUserByEmail: (email) => {
    return new Promise((resolve, reject) => {
      db.get("SELECT * FROM users WHERE email = ?", [email], (err, row) => {
        if (err) reject(err);
        else resolve(row);
      });
    });
  },

  // Get user by ID
  getUserById: (id) => {
    return new Promise((resolve, reject) => {
      db.get("SELECT * FROM users WHERE id = ?", [id], (err, row) => {
        if (err) reject(err);
        else resolve(row);
      });
    });
  },

  // Create new user
  createUser: (userData) => {
    return new Promise((resolve, reject) => {
      db.run(`INSERT INTO users (name, email, password, phone, dateOfBirth, bloodGroup, emergencyContactName, emergencyContactPhone, emergencyContactRelationship) 
              VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [userData.name, userData.email, userData.password, userData.phone, userData.dateOfBirth, userData.bloodGroup, 
         userData.emergencyContactName, userData.emergencyContactPhone, userData.emergencyContactRelationship],
        function(err) {
          if (err) reject(err);
          else resolve({ id: this.lastID, ...userData });
        }
      );
    });
  },

  // Update user
  updateUser: (id, userData) => {
    return new Promise((resolve, reject) => {
      db.run(`UPDATE users SET name = ?, phone = ?, dateOfBirth = ?, bloodGroup = ?, 
              emergencyContactName = ?, emergencyContactPhone = ?, emergencyContactRelationship = ? 
              WHERE id = ?`,
        [userData.name, userData.phone, userData.dateOfBirth, userData.bloodGroup,
         userData.emergencyContactName, userData.emergencyContactPhone, userData.emergencyContactRelationship, id],
        function(err) {
          if (err) reject(err);
          else resolve({ id, ...userData });
        }
      );
    });
  },

  // Get all doctors
  getAllDoctors: (specialty, search) => {
    return new Promise((resolve, reject) => {
      let query = "SELECT * FROM doctors";
      let params = [];
      
      if (specialty || search) {
        query += " WHERE";
        if (specialty) {
          query += " specialty LIKE ?";
          params.push(`%${specialty}%`);
        }
        if (search) {
          if (specialty) query += " AND";
          query += " (name LIKE ? OR specialty LIKE ?)";
          params.push(`%${search}%`, `%${search}%`);
        }
      }
      
      db.all(query, params, (err, rows) => {
        if (err) reject(err);
        else resolve(rows);
      });
    });
  },

  // Get doctor by ID
  getDoctorById: (id) => {
    return new Promise((resolve, reject) => {
      db.get("SELECT * FROM doctors WHERE id = ?", [id], (err, row) => {
        if (err) reject(err);
        else resolve(row);
      });
    });
  },

  // Get appointments by user ID
  getAppointmentsByUserId: (userId) => {
    return new Promise((resolve, reject) => {
      db.all("SELECT * FROM appointments WHERE userId = ? ORDER BY date DESC", [userId], (err, rows) => {
        if (err) reject(err);
        else resolve(rows);
      });
    });
  },

  // Create appointment
  createAppointment: (appointmentData) => {
    return new Promise((resolve, reject) => {
      db.run(`INSERT INTO appointments (userId, doctorName, specialty, date, time, duration, status, notes) 
              VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
        [appointmentData.userId, appointmentData.doctorName, appointmentData.specialty, 
         appointmentData.date, appointmentData.time, appointmentData.duration || 60, 
         appointmentData.status || 'confirmed', appointmentData.notes || ''],
        function(err) {
          if (err) reject(err);
          else resolve({ id: this.lastID, ...appointmentData });
        }
      );
    });
  },

  // Update appointment
  updateAppointment: (id, appointmentData) => {
    return new Promise((resolve, reject) => {
      db.run(`UPDATE appointments SET date = ?, time = ?, notes = ? WHERE id = ?`,
        [appointmentData.date, appointmentData.time, appointmentData.notes, id],
        function(err) {
          if (err) reject(err);
          else resolve({ id, ...appointmentData });
        }
      );
    });
  },

  // Delete appointment
  deleteAppointment: (id) => {
    return new Promise((resolve, reject) => {
      db.run("DELETE FROM appointments WHERE id = ?", [id], function(err) {
        if (err) reject(err);
        else resolve({ message: 'Appointment deleted successfully' });
      });
    });
  },

  // Get all wait times
  getAllWaitTimes: () => {
    return new Promise((resolve, reject) => {
      db.all("SELECT * FROM wait_times ORDER BY updatedAt DESC", (err, rows) => {
        if (err) reject(err);
        else resolve(rows);
      });
    });
  },

  // Get payments by user ID
  getPaymentsByUserId: (userId) => {
    return new Promise((resolve, reject) => {
      db.all("SELECT * FROM payments WHERE userId = ? ORDER BY createdAt DESC", [userId], (err, rows) => {
        if (err) reject(err);
        else resolve(rows);
      });
    });
  },

  // Create payment
  createPayment: (paymentData) => {
    return new Promise((resolve, reject) => {
      db.run(`INSERT INTO payments (userId, amount, description, status, paymentMethod, date) 
              VALUES (?, ?, ?, ?, ?, ?)`,
        [paymentData.userId, paymentData.amount, paymentData.description, 
         paymentData.status || 'completed', paymentData.paymentMethod, new Date().toISOString().split('T')[0]],
        function(err) {
          if (err) reject(err);
          else resolve({ id: this.lastID, ...paymentData });
        }
      );
    });
  }
};

module.exports = { db, dbHelper }; 