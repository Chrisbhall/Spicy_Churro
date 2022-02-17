// Download the helper library from https://www.twilio.com/docs/node/install
// Find your Account SID and Auth Token at twilio.com/console
// and set the environment variables. See http://twil.io/secure
const accountSid = "AC62c23f1fddbf62f6e49355d5f06403c0";
const authToken = "47a7dd1c5737966999345a9f34c7e71a";
const client = require('twilio')(accountSid, authToken);

client.messages
  .create({
     body: 'We have received your order!',
     from: '+19362433062',
     to: '+16479849541'
   })
  .then(message => console.log(message.sid));
//6479849541
//4165575839
