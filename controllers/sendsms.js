const express = require('express');
const bodyParser = require('body-parser');
const twilio = require('twilio');

const app = express();
const port = process.env.PORT || 3000;

const accountSid = 'YOUR_ACTUAL_ACCOUNT_SID';
const authToken = 'YOUR_ACTUAL_AUTH_TOKEN';
const client = twilio(accountSid, authToken);

app.use(bodyParser.urlencoded({ extended: false }));

app.post('/send-sms', (req, res) => {
  const { to, body } = req.body;

  client.messages.create({
    body: body,
    to: to,
    from: 'YOUR_TWILIO_PHONE_NUMBER'
  })
  .then(() => {
    res.send('SMS sent successfully!');
  })
  .catch((err) => {
    console.error(err);
    res.status(500).send('Error sending SMS');
  });
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
