const task = require('./src/easy/move-zeroes');

try {
  console.time('timer');
  task();
  console.timeEnd('timer');
} catch (err) {
  console.error(err);
}
