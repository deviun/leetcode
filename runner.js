const task = require('./src/basic-calculator-ii');

try {
  console.time('timer');
  task();
  console.timeEnd('timer');
} catch (err) {
  console.error(err);
}
