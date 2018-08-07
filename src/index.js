global.config = require('../config.js')

const irc = require('irc');
const {search} = require('./utils/omdb.js');
const {parse} = require('./utils/parser.js');
const gitinfo = require('./utils/gitinfo.js');

const {server, nick, pass, chans} = global.config.modules.irc;

// INIT
const client = new irc.Client('irc.slashnet.org', nick, {
  channels: chans,
  sasl: false,
  userName: nick,
  password: pass
});

// CHATTER
client.addListener('message', (from, to, message) => {
  const parts = message.split(' ');
  const head = parts.shift();
  const acceptable = ['', ',', ':'].map(thing => `${nick}${thing}`);

  if (acceptable.indexOf(head) === -1) return;

  search(parts)
    .then(info => {
      console.log(info);

      if (info.Response === 'False') {
        return client.say(to, `${from}, ${info.Error.toLowerCase()}`);
      }

      return client.say(to, `${parse(info)}`);
    })
    .catch(err => {
      console.log(err);
      client.say(to, `fuck!`);
    });

  console.log(`INFO: ${from + ' => ' + to + ': ' + message}`);
});

// ERRORS
client.addListener('error', msg => console.log('error: ', msg));
