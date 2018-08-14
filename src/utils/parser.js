const c = {
  cc: '\x0300:\x0F',
  nx: '\x0300,\x0F',
  x: '\x0F',
  y: '\x0308',
  w: '\x0300',
  b: '\x0301',
  p: '\x0313',
  u: '\x0302',
  o: '\x0307',
  lg: '\x0309',
  lc: '\x0311',
  g: '\x0303',
  r: '\x0304',
};

const ratings = r =>
  r.length
    ? `${c.nx}${c.lg} ${r
        .map(rating => rating.Value.split('/').shift())
        .join(' ')}${c.x}`
    : '';

const genres = g => {
  return g.length ? `${c.nx}${c.p} ${g}${c.x}` : '';

  return g.length
    ? `${c.nx}${c.p} ${g
        .split(',')
        .shift()
        .trim()}${c.x}`
    : '';
};

const removedArgs = quertyWords => {
  const availableArgs = ['-movie', '-series', '-episode'];

  return quertyWords.filter(q => {
    return availableArgs.indexOf(q.trim().toLowerCase()) === -1;
  });
};

const findArgs = quertyWords => {
  const availableArgs = ['-movie', '-series', '-episode'];

  const singleArg = quertyWords
    .filter(q => availableArgs.includes(q.trim().toLowerCase()))
    .shift();

  return singleArg ? singleArg.slice(1) : singleArg;
};

const frank = plot => {
  const punctuation = plot.charAt(plot.length - 1);
  // trim punctuation if necessary and then add a Frank
  return ['.', '!', '?'].includes(plot.charAt(plot.length - 1))
    ? `${plot.substring(0, plot.length - 1)}, Frank${punctuation}`
    : `${plot}, Frank.`;
};

var isDoublehappy = nick => {
  const {franks} = global.config;

  return (
    franks.filter(
      f => nick.length >= f.length && nick.substring(0, f.length) === f
    ).length > 0
  );
};

const parse = (i, from) => {
  const title = i.Title;
  const rating = i.Rated;
  const director = i.Director;
  const plot = isDoublehappy(from.toLowerCase())
    ? frank(i.Plot.trim())
    : i.Plot;
  const year = i.Year;
  const imdb = i.imdbID ? `https://imdb.com/title/${i.imdbID}` : '';

  return `${c.lc}${title}${c.x} (${c.r}${rating}${c.nx} ${year}${c.nx} ${
    c.o
  }${director}${genres(i.Genre)}${ratings(i.Ratings)}${c.x}) ${plot} ${imdb}`;
};

module.exports = {parse, findArgs, removedArgs};
