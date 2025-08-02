const express = require('express');
const cors = require('cors');
const app = express();
const PORT = 5000;

app.use(cors()); // allow frontend to talk to backend
app.use(express.json()); // allow JSON requests

// Simple route
app.get('/', (req, res) => {
  res.send('Backend is running ✅');
});

// Example API
app.get('/api/hello', (req, res) => {
  res.json({ message: 'Hello from backend!' });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
