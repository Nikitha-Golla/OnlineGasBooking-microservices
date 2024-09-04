const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const path = require('path');

// Initialize Express
const app = express();
const port = 5000;

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

// MongoDB Connection
mongoose.connect('mongodb://localhost:27017/gasBooking', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('MongoDB connected'))
.catch(err => console.log(err));

// Define Mongoose Schema and Model
const userSchema = new mongoose.Schema({
  username: String,
  mobile: String,
  provider: String,
  bookingFor: String,
  contactOption: String
});

const User = mongoose.model('User', userSchema);

// Serve HTML File
app.get('/', (_req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'register.html'));
});

// Handle Form Submission
app.post('/submit', async (req, res) => {
  try {
    const { username, mobile, provider, bookingFor, contactOption } = req.body;

    // Create a new User instance and save it to the database
    const newUser = new User({
      username,
      mobile,
      provider,
      bookingFor,
      contactOption
    });

    await newUser.save();

    res.send('Registration successful!');
  } catch (error) {
    console.error('Error saving user:', error);
    res.status(500).send('An error occurred while processing your request.');
  }
});

// Start Server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
