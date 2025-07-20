const express = require('express');
const router = express.Router();
const twilio = require('twilio');

// Replace with your Twilio credentials
const accountSid = 'ACabf3587fe46df602ba54b99aa843f846';
const authToken = '4720850299dd99b52ad96a16407e7f6a';
const client = twilio(accountSid, authToken);

router.post('/sendSMS', async (req, res) => {
  const { message, phoneNumber } = req.body;

  if (!message || !phoneNumber) {
    return res.status(400).json({ message: 'Phone number and message are required.' });
  }

  try {
    const response = await client.messages.create({
      body: message,
      from: '+18783789773',
      to: phoneNumber
    });

    res.status(200).json({ message: 'SMS sent successfully!', response });
  } catch (error) {
    res.status(500).json({ error: 'Failed to send SMS', details: error });
    console.log(error.message);
    
  }
});

module.exports = router;
