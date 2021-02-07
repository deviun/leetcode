const task = require('./src/easy/single-number');

try {
  console.time('timer');
  task();
  console.timeEnd('timer');
} catch (err) {
  console.error(err);
}
