const { performance } = require('perf_hooks');
const task = require('./src/medium/validate-binary-search-tree');

try {
  const startMemory = process.memoryUsage().heapUsed;
  const startTime = performance.now();
  task();
  const endTime = performance.now();
  const endMemory = process.memoryUsage().heapUsed;
  const runtime = endTime - startTime;
  const memory = Math.round(((endMemory - startMemory) / 1024) * 100) / 100;
  console.log(`Runtime ${runtime} ms\nMemory  ${memory} kb`);
} catch (err) {
  console.error(err);
}
