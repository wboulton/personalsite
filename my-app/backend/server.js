const express = require('express');
const app = express();
const cors = require('cors');
const fs = require('fs');
const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json());
app.use(cors())
// Test Route
app.get('/api/data', (req, res) => {
  res.json({ message: 'hello from the backend' });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
  app.post('/api/print', (req, res) => {
    console.log("request was sent");
    console.log("sending response...");
    res.json({ message: 'Print triggered successfully' });
    console.log("response sent!");
  });

  //TODO: add rsa encryption or some other security protocal 
  app.post('/api/newuser', (req, res) => {
    console.log("creating a new user");
    const { username, password, firstname, lastname } = req.body;
    const userData = { username, password, firstname, lastname };

    fs.readFile('public/database.txt', 'utf8', (err, data) => {
      if (err) {
      console.error('Error reading file', err);
      return res.status(500).json({ message: 'Internal server error' });
      }

      const users = data.split('\n').filter(line => line).map(line => JSON.parse(line));
      const userExists = users.some(user => user.username === username);

      if (userExists) {
      console.log("user already existed");
      return res.status(400).json({ message: 'User already exists' });
      }

      // Append the new user to the file
      fs.appendFile('public/database.txt', JSON.stringify(userData) + '\n', (err) => {
      if (err) {
        console.error('Error appending to file', err);
        return res.status(500).json({ message: 'Internal server error' });
      } else {
        console.log('User data appended to database.txt');
        return res.json({ message: 'User created successfully', user: { username, firstname, lastname } });
      }
      });
    });
  });
});