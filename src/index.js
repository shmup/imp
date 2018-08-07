global.config = require('../config.js');

const irc = require('irc');
const {search, random} = require('./utils/omdb.js');
const {parse} = require('./utils/parser.js');
const gitinfo = require('./utils/gitinfo.js');

const {server, nick, pass, chans} = global.config.modules.irc;

// INIT
const client = new irc.Client('irc.slashnet.org', nick, {
  channels: chans,
  sasl: false,
  userName: nick,
  password: pass,
});

const randomChat = (req, to, from) => {
  req.then(info => {
    console.log(info);

    if (info.Response === 'False') {
      randomChat(random(), to, from);
    } else {
      client.say(to, `${parse(info)}`);
    }
  }).catch(err => {
    console.log('fuck!', err);
  });
}

const searchChat = (req, to, from) => {
  req.then(info => {
    console.log(info);

    if (info.Response === 'False') {
      client.say(to, `${from}, ${info.Error.toLowerCase()}`);
    } else {
      client.say(to, `${parse(info)}`);
    }
  }).catch(err => {
    client.say(to, `fuck!`);
  });
}

// CHATTER
client.addListener('message', (from, to, message) => {
  const parts = message.trim().split(' ');
  const head = parts.shift();
  const acceptable = ['', ',', ':'].map(thing => `${nick}${thing}`);

  if (acceptable.indexOf(head) === -1) return;

  if (!parts.length || parts[0].trim() === '?') {
    randomChat(random(), to, from);
  } else {
    searchChat(search(parts), to, from);
  }

  console.log(`INFO: ${from + ' => ' + to + ': ' + message}`);
});

// ERRORS
client.addListener('error', msg => console.log('error: ', msg));
