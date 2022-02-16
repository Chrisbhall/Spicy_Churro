// Download the helper library from https://www.twilio.com/docs/node/install
// Find your Account SID and Auth Token at twilio.com/console
// and set the environment variables. See http://twil.io/secure
const accountSid = "AC62c23f1fddbf62f6e49355d5f06403c0";
const authToken = "5ed373d0cb5019ffa2116d1c4f1bf3a2";
const client = require('twilio')(accountSid, authToken);

client.messages
  .create({
     body: 'This is the ship that made the Kessel Run in fourteen parsecs?',
     from: '+19362433062',
     to: '+19053341614'
   })
  .then(message => console.log(message.sid));
