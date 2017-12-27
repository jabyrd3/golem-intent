const timer = require('./timer');
const natural = require('natural');

const test = [
  'reminder for forty-five minutes to walk the dog',
  'can you set a timer for 8 hours 45 minutes',
  'would you set a timer for 0 hours and 45 minutes',
  'set a timer for three-hours and 45 minutes thirty-two seconds',
  'timer for five-hours and 12 minutes twenty seven seconds',
  'please timer for five-hours and 12 minutes twenny seven seconds',
  'please set timer for 18-hours and 2 minutes fourty seven seconds',
  'reminder 20 minutes',
  'reminder for thirdy minutes',
  'reminder for ate minutes'
];

test.map(c => {
  const toomer = timer();
  toomer
    .parse(c)
    .then(state => console.log(toomer.response()))
    .catch(console.log)
});
