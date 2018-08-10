const rp = require('request-promise');
const {key} = global.config.modules.omdb;
const {removedArgs, findArgs} = require('./parser.js');

/*
 * TODO random movie title
 * imdb uses a 7 character format
 * generate a number and verify it has a result before sending to chan
 *
 * movieroll
 * tvrol
 * eproll
 */

const types = ['movie', 'series', 'episode']

const pad = (n, width) => {
  console.log(n, width);
  const z = 0;
  n = n + '';
  return n.length >= width ? n : new Array(width - n.length + 1).join(z) + n;
}

const randomId = () => {
  const min = 1;
  const max = 9999999;
  return pad(Math.floor((Math.random() * max) + min), 7);
}

const random = () => {
  return rp({
    url: 'http://www.omdbapi.com',
    qs: {
      apikey: key,
      i: `tt${randomId()}`
    },
    json: true,
  });
}

const search = (parts) => {
  return rp({
    url: 'http://www.omdbapi.com',
    qs: {
      apikey: key,
      t: removedArgs(parts).join(' '),
      type: findArgs(parts)
    },
    json: true,
  });
}

const url = params => `${omdbUrl}${querify(params)}`;

const querify = rules =>
  Object.keys(rules)
    .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(rules[key])}`)
    .join('&');

module.exports = {search, random};
