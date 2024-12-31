const express = require('express');
const { google } = require('googleapis');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(bodyParser.json());
app.use(cors());

const oauth2Client = new google.auth.OAuth2(
  process.env.CLIENT_ID,
  process.env.CLIENT_SECRET,
  process.env.REDIRECT_URI
);

// Step 1: Generate Authentication URL
app.get('/auth-url', (req, res) => {
  const scopes = ['https://www.googleapis.com/auth/calendar'];
  const url = oauth2Client.generateAuthUrl({
    access_type: 'offline',
    scope: scopes,
  });
  res.send({ url });
});


// Step 2: Exchange Code for Tokens
app.post('/tokens', async (req, res) => {
  const { code } = req.body;
  try {
    const { tokens } = await oauth2Client.getToken(code);
    oauth2Client.setCredentials(tokens); // Save tokens in oauth2Client
    res.send(tokens); // Return tokens to the client
  } catch (error) {
    console.error('Error exchanging code for tokens:', error);
    res.status(500).send('Failed to exchange code for tokens');
  }
});

// Step 3: Fetch Events
app.get('/events', async (req, res) => {
  try {
    // Ensure valid credentials are set
    oauth2Client.setCredentials(req.headers);

    const calendar = google.calendar({ version: 'v3', auth: oauth2Client });
    const { data } = await calendar.events.list({
      calendarId: 'primary',
      timeMin: new Date().toISOString(),
      maxResults: 10,
      singleEvents: true,
      orderBy: 'startTime',
    });

    res.send(data.items);
  } catch (error) {
    console.error('Error fetching events:', error);
    res.status(500).send('Failed to fetch events.');
  }
});
app.get('/oauth2callback', async (req, res) => {
  const code = req.query.code;

  if (!code) {
    return res.status(400).send('Authorization code not found');
  }

  try {
    const { tokens } = await oauth2Client.getToken(code);
    oauth2Client.setCredentials(tokens);

    // Save tokens to a file
    fs.writeFileSync('tokens.json', JSON.stringify(tokens));
    console.log('Tokens saved:', tokens);

    res.send('Authentication successful! You can now close this window.');
  } catch (error) {
    console.error('Error exchanging code for tokens:', {
      message: error.message,
      response: error.response?.data,
    });

    const errorDetails = error.response?.data || {};
    res.status(500).send(`Failed to exchange authorization code for tokens: ${errorDetails.error_description || 'Unknown error'}`);
  }
});

const PORT = 5001; // Change this if 5000 is in use

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

