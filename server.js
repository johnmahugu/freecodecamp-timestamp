// server.js

// Initialize project
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const app = express();

// Enable CORS
app.use(cors({ optionsSuccessStatus: 200 }));

// Use Body Parser
app.use(bodyParser.urlencoded({ extended: true }));

// Serve static files
app.use(express.static(__dirname + '/views'));

// Serve index.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});

// Timestamp GET response
app.get("/api/timestamp", (req, res) => {
  res.json({ unix: Date.now(), utc: new Date().toUTCString() });
});

app.get("/api/timestamp/:date_string", (req, res) => {
  const dateString = req.params.date_string;
  let date;

  // Check if dateString is a Unix timestamp
  if (/^\d{5,}$/.test(dateString)) {
    date = new Date(parseInt(dateString));
  } else {
    date = new Date(dateString);
  }

  // Check if the date is valid
  if (isNaN(date.getTime())) {
    res.json({ error: "Invalid Date" });
  } else {
    res.json({ unix: date.getTime(), utc: date.toUTCString() });
  }
});

app.post('/api/timestamp', (req, res) => {
  const dateString = req.body.date;
  let date;

  if (/^\d{5,}$/.test(dateString)) {
    date = new Date(parseInt(dateString));
  } else {
    date = new Date(dateString);
  }

  if (isNaN(date.getTime())) {
    res.json({ error: "Invalid Date" });
  } else {
    res.json({ unix: date.getTime(), utc: date.toUTCString() });
  }
});

// Listen for requests
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Your app is listening on port ${PORT}`);
});

// For testing purposes
app.use((req, res, next) => {
  console.log(`${req.method} ${req.path} - ${req.ip}`);
  next();
});

// Your first API endpoints
app.get("/api/hello", (req, res) => {
  res.json({ greeting: 'hello API' });
});

app.get('/json', (req, res) => {
  const response = "Hello json";
  if (process.env.MESSAGE_STYLE === 'uppercase') {
    res.json({ message: response.toUpperCase() });
  } else {
    res.json({ message: response });
  }
});
