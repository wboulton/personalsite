const express = require('express');
const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json());

// Test Route
app.get('/api/data', (req, res) => {
  res.json({ message: 'hello from the backend' });
});

setInterval(() => {
  console.log('hello from the backend');
}, 10000);

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
  app.post('/api/print', (req, res) => {
    console.log(req.body);
    res.sendStatus(200);
  });
});