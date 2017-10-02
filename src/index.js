require('dotenv').config();

const axios = require('axios');
const bodyParser = require('body-parser');
const express = require('express');
const qs = require('querystring');

const app = express();

/*
 * Parse application/x-www-form-urlencoded && application/json
 */
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.send('<h2>The Dialog Slash Command app is running</h2> <p>Follow the' +
  ' instructions in the README to configure the Slack App and your environment variables.</p>');
});

app.post('/slack/events/commands', (req, res) => {
  const { token } = req.body;

  if (token === process.env.SLACK_VERIFICATION_TOKEN) {
  } else { res.sendStatus(500); }
});

/*
 * Endpoint to receive interactive message events from Slack.
 * Checks verification token and then update priority.
 */
app.post('/slack/events/components', (req, res) => {
  const body = JSON.parse(req.body.payload);

  if (body.token === process.env.SLACK_VERIFICATION_TOKEN) {
  } else { res.sendStatus(500); }
});

app.listen(process.env.PORT, () => {
  console.log(`App listening on port ${process.env.PORT}!`);
});
