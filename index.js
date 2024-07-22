// index.js
// where your node app starts

// init project
const express = require('express');
const app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
const cors = require('cors');
app.use(cors({ optionsSuccessStatus: 200 })); // some legacy browsers choke on 204

// serve static files
app.use(express.static('public'));

// serve index.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});

// API endpoint
app.get("/api/:date?", (req, res) => {
  let input = req.params.date;

  // Check if input is empty
  if (!input) {
    // Return current date and time
    const now = new Date();
    return res.json({
      unix: now.getTime(),
      utc: now.toUTCString()
    });
  }

  // Check if input is a valid Unix timestamp
  if (/^\d+$/.test(input)) {
    const date = new Date(parseInt(input));
    return res.json({
      unix: date.getTime(),
      utc: date.toUTCString()
    });
  }

  // Check if input is a valid date string
  const date = new Date(input);
  if (date.toString() === 'Invalid Date') {
    return res.json({ error: "Invalid Date" });
  }

  // Return valid date results
  res.json({
    unix: date.getTime(),
    utc: date.toUTCString()
  });
});

// Listen for requests
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
