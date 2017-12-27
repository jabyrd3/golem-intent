const natural = require('natural');
const WtoN = require('words-to-num');
tokenizer = new natural.TreebankWordTokenizer();
module.exports = () => {
  let state = {};
  return {
    name: 'timer',
    shortDesc: 'Sets a timer',
    category: 'scheduler',
    examples: [
      'set a timer for 45 minutes',
      'set a timer for 30 seconds',
      'can you set a timer for 99 hours and 42 minutes'
    ],
    parameters: [{
      name: 'hours',
      type: 'number'
    },{
      name: 'minutes',
      type: 'number'
    }, {
      name: 'seconds',
      type: 'number'
    }, {
      name: 'tag',
      type: 'string'
    }],
    probabilityWords: ['reminder', 'remind', 'minutes', 'hours', 'stopwatch'],
    probability: function(sentence){
      const tokens = tokenizer.tokenize(sentence);
      return tokens.find(v => v === 'timer') ?
        1 :
        tokens.reduce((acc, val) => {
          return this.probabilityWords.find(v=> v===val) ?
            acc + (1 / this.probabilityWords.length) :
            acc
        }, 0)
    },
    parse:  function(sentence, speaker) {
      const tokens = tokenizer.tokenize(sentence.replace(/-/g, ' '));
      return new Promise((res, rej) => {
        this.parameters.map((param) => {
          if(param.type === 'number'){
            const timeIdx = tokens.findIndex((val) => natural.JaroWinklerDistance(val, param.name) > .75);
            const startIdx = tokens
                  .slice(0, timeIdx)
                  .reverse()
                  .findIndex(val => this.parameters.find(p => natural.JaroWinklerDistance(val, p.name) > .75) || val === 'and');
            if(timeIdx > -1){
              const searchSpace = tokens
                .slice(startIdx > -1 ? timeIdx - startIdx : 0, timeIdx);
              const numberWords = searchSpace
                .map(token => WtoN.convert(token))
                .filter(parsed => !isNaN(parsed) && parsed !== 0);
              const val = numberWords.reduce((acc, val) => {
                return acc + val;
              }, 0);
              state[param.name] = val;
            }
          }
        });
        res(state);
      });
    },
    response: () => {
      return `Timer for ${Object
        .keys(state)
        .reduce((acc, val, idx) =>
          acc + `${idx > 0 ? ' ' : ''}${state[val]} ${val}`, '')} set.`;
    },
    scheduleTask: () => {
      return {
        expires: 
          new Date().getTime() +
          (state.hours ? state.hours * 60 * 60 * 1000: 0) +
          (state.minutes ? state.minutes * 60 * 1000: 0) +
          (state.seconds ? state.seconds * 1000: 0),
        output: `{{bing(5)}} ${state.tag || 'Timer Completed'}`,
        waitForDismissal: true
      } 
    }
  };
};
