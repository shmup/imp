const rp = require('request-promise');

const {key} = global.config.modules.omdb;

const search = parts =>
  rp({
    url: 'http://www.omdbapi.com',
    qs: {
      apikey: key,
      t: parts.join(' '),
    },
    json: true,
  });

const url = params => `${omdbUrl}${querify(params)}`;

const querify = rules =>
  Object.keys(rules)
    .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(rules[key])}`)
    .join('&');

module.exports = {search};
