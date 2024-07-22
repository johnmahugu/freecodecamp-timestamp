const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();
app.use(cors());

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'index.html'), (err) => {
    if (err) {
      res.status(404).send("Index file not found");
    }
  });
});

app.get("/api/:date?", (req, res) => {
  let dateString = req.params.date;
  let date;

  if (!dateString) {
    // No date parameter provided, return the current date and time
    date = new Date();
  } else {
    // If dateString is a number (Unix timestamp), parse it
    if (!isNaN(dateString)) {
      dateString = parseInt(dateString, 10);
    }
    // Create a new Date object from the dateString
    date = new Date(dateString);
  }

  // Check if the date is valid
  if (date.toString() === 'Invalid Date') {
    res.json({ error: 'Invalid Date' });
  } else {
    res.json({
      unix: date.getTime(),
      utc: date.toUTCString()
    });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
