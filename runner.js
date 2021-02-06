const task = require('./src/hard/minimum-window-substring');

try {
  console.time('timer');
  task();
  console.timeEnd('timer');
} catch (err) {
  console.error(err);
}
