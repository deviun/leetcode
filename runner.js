const { performance } = require('perf_hooks');
const task = require('./src/medium/meeting-rooms-ii');

try {
  const startTime = performance.now();
  task();
  const endTime = performance.now();
  const nowMemory = process.memoryUsage().heapUsed;
  const runtime = endTime - startTime;
  const memory = Math.round(((nowMemory) / 1024 / 1024) * 100) / 100;
  console.log(`Runtime ${runtime} ms\nMemory  ${memory} mb`);
} catch (err) {
  console.error(err);
}
