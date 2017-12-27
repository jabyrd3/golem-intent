const _ = require('lodash');
let timer = require('./actions/timer');
let speakStack = [];
let scheduler = [];
let elapsed = 0;
const say = console.log;

let schedLoop = (polling) => {
  if(scheduler.length > 0){
    scheduler = scheduler
      .sort((a, b)=>a.expires > b.expires ? 1 : -1);
    if(new Date().getTime() > scheduler[0].expires){
      say('elapsed', elapsed)
      say(scheduler[0].output);
      scheduler = _.tail(scheduler);
    }
  }
  elapsed+=polling;
  setTimeout(()=>schedLoop(polling), polling)
};

schedLoop(2500);

let time1 = timer();
let time2 = timer();
let time3 = timer();

time1
  .parse('set a timer for 10 seconds')
  .then(() => {
    say(time1.response());
    const item = time1.scheduleTask();
    scheduler.push(item)
  }).catch(say);

time2
  .parse('set a timer for 20 seconds')
  .then(() => {
    say(time2.response());
    const item = time2.scheduleTask();
    scheduler.push(item)
  }).catch(say);

time3
  .parse('set a timer for 1 minutes 20 seconds')
  .then(() => {
    say(time3.response());
    const item = time3.scheduleTask();
    scheduler.push(item)
  }).catch(say);