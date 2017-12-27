categories of action:
  one-off (create appt)
  scheduler (timer)
  query/async (what is)
  interactive 

action schema:
  name: string
  shortDesc: short_desc
  category: string
  examples: [string]
  paramters: [{
    name: string,
    type: string,
    required: bool 
  }]
  probabilityWords: [string]
  probability: function (returns 0-1)
  parse: function (sets state for params)
  response: function (output speech)



other objects:
  transaction: encapsulates an interaction (back and forth, success, etc)
    - status: pending, success, failed
    - id
    - action
    - phase
    - user

  ongoing_queue: represents an ongoing action that may periodically be polled
    poll timeout: # rep ms
    handler: every
    close: gracefully clean up ongoing transaction

  talk_stack: array of things that need interaction, sort by priority
  resource: objects representing resources, such as timers or spotify or whatever
  
  scheduler: periodically performs actions

command flow:
  - on text command, run action.probability for each available action
  - take highest, parse command
    - if command has all required state params, execute action
    - try next most probable command, parse and check if .ready()
    - if original command has 50% of required state params, prompt for missing requireds

stack flow:
  - every second check speak stack
    - if not empty, speak then remove self
  - check schedule stack for actions that are ready
    - for each action, perform the callback (likely adds something to speak stack)

ideas:
  - take lots of data for failure, etc so we can tune / learn / weight commands
  - figure out users, do per-user weighting if it doesn't make the thing unusable

actions:
  - [ ] start music
    - [ ] attempt to connect to bluetooth automatically
  - [ ] listen to npr
  - [ ] connect to bluetooth
  - [ ] turn on tv
  - [x] set a timer
    - [ ] wait for dismissal?
  - [ ] list a timer
  - [ ] cancel all / tagged timers
  - [ ] 'what is' ,  'find', 'query' for goog search and spit out answer
  - [ ] ask me what i can do
  - [ ] help [action]
  - [ ] turn on lights (need bulbs & outlets)
    - [ ] profiles ? auto

infrastructure:
  - cluster w service discovery
  - allow for roving nodes
  - shared db of tasks, etc
  - originating node for tasks
  - 'go to http://whatever to set up this node!'