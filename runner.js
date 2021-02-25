const task = require('./src/medium/combination-sum');

try {
  console.time('timer');
  task();
  console.timeEnd('timer');
} catch (err) {
  console.error(err);
}
