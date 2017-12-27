const timer = require('./timer');

// console.log(timer.probability('can you set a timer for forty-five minutes'));
// console.log(timer.probability('can you set a reminder for forty-five minutes to walk the dog'));

const test = [
  'can you set a reminder for forty-five minutes to walk the dog',
  'can you set a timer for 8 hours 45 minutes',
  'can you set a timer for 0 hours and 45 minutes',
  'can you set a timer for three-hours and 45 minutes twenty-seven seconds',
  'timer for five-hours and 12 minutes twenty-seven seconds',
  'reminder 20 minutes'
];
test.map(c => {
  const toomer = timer();
  toomer
    .parse(c)
    .then(state => console.log(toomer.response()))
    .catch(console.log)
});
