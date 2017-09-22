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

app.post('/commands', (req, res) => {
  const { token, text, trigger_id } = req.body;

  if (token === process.env.SLACK_VERIFICATION_TOKEN) {
    res.send('');
    const dialog = {
      token: process.env.SLACK_ACCESS_TOKEN,
      trigger_id,
      dialog: JSON.stringify({
        title: 'Submit a bug',
        callback_id: 'submit-bug',
        submit_label: 'Submit',
        elements: [
          {
            label: 'Title',
            type: 'text',
            name: 'title',
            value: text,
            hint: '30 second summary of the problem',
          },
          {
            label: 'Description',
            type: 'textarea',
            name: 'description',
            hint: 'Tell us more! What did you expect to happen?',
          },
          {
            label: 'Product Feature',
            type: 'select',
            name: 'feature',
            options: [
              { label: 'Core', value: 'triage-core' },
              { label: 'Platform', value: 'triage-platform' },
              { label: 'Mobile', value: 'triage-mobile' },
              { label: 'Desktop', value: 'triage-desktop' },
            ],
            hint: 'What feature does this relate to?',
          },
          {
            label: 'Reproduction steps',
            type: 'textarea',
            name: 'reproduction',
            hint: 'Can you reproduce the problem repeatedly? If so, what are the steps?',
            optional: true,
          },
        ],
      }),
    };

    axios.post('https://slack.com/api/dialog.open', qs.stringify(dialog)).then(result => console.log(result));
  } else { res.sendStatus(500); }
});

/*
 * Endpoint to receive interactive message events from Slack.
 * Checks verification token and then update priority.
 */
app.post('/interactive-message', (req, res) => {
  const body = JSON.parse(req.body.payload);

  if (body.token === process.env.SLACK_VERIFICATION_TOKEN) {
    switch (body.type) {
      case 'dialog_submission': {
        res.send('');
        axios.post('https://slack.com/api/chat.postMessage', qs.stringify({
          token: process.env.SLACK_BOT_TOKEN,
          text: body.submission.title,
          channel: body.submission.feature,
        })).then(result => console.log(result));
        break;
      }
      default: res.sendStatus(500);
    }
  } else { res.sendStatus(500); }
});

app.listen(process.env.PORT, () => {
  console.log(`App listening on port ${process.env.PORT}!`);
});
