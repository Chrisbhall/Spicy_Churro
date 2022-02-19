// Download the helper library from https://www.twilio.com/docs/node/install
// Find your Account SID and Auth Token at twilio.com/console
// and set the environment variables. See http://twil.io/secure
const accountSid = "AC62c23f1fddbf62f6e49355d5f06403c0";
const authToken = "8cf39aabdd89284fe80968c653c9e655";
const client = require('twilio')(accountSid, authToken);
const database = require('./database');
const number = database.getPhoneNumber(1);

number.then(value=> {console.log('+1'+value);
client.messages
  .create({
     body: 'Your order is ready for pickup!',
     from: '+19362433062',
     to: '+1'+value
   })
  .then(message => console.log(message.sid));
});
