const {execSync} = require('child_process');
const log = (t, c) => console.log(`${t} => ${execSync(c)}`.toString().trim());

module.exports = (() => {
  log('rev', 'git rev-parse HEAD');
  log('msg', 'git log -1 --pretty=%s');
  log('date', 'git log -1 --format=%cd ');
})();
