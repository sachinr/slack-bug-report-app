# Bug Reporter

## Creating a bug report directly from Slack

Use a slash command and a dialog to create a bug report and have it posted to the correct triage channel based on the product area.

## Setup

#### Create a Slack app

1. Create an app at api.slack.com/apps
1. Navigate to the OAuth & Permissions page and add the following scopes:
    * `commands`
    * `chat:write:bot`
1. Click 'Save Changes' and install the app

#### Run locally
1. Get the code
    * Clone this repo and run `npm install`
1. Set the following environment variables to `.env` (see `.env.sample`):
    * `SLACK_ACCESS_TOKEN`: Your app's `xoxp-` token (available on the Install App page)
    * `PORT`: The port that you want to run the web server on
    * `SLACK_VERIFICATION_TOKEN`: Your app's Verification Token (available on the Basic Information page)
1. Run it
    1. Start the app (`npm start`)
    1. In another window, start ngrok on the same port as your webserver (`ngrok http $PORT`)

#### Add a Slash Command
1. Go back to the app settings and click on Slash Commands.
1. Click the 'Create New Command' button and fill in the following:
    * Command: `/bug-it`
    * Request URL: Your ngrok URL + /slack/events/commands
    * Short description: `Create a bug report`
    * Usage hint: `[the problem you're having]`
1. Save and reinstall the app

#### Enable Interactive Components
1. Go back to the app settings and click on Interactive Components.
1. Set the Request URL to your ngrok URL + /slack/events/components
