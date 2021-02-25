/**
 * @param {number[]} candidates
 * @param {number} target
 * @return {number[][]}
 */
function combinationSum(candidates, target) {
  const res = [];

  function get(offset, t, stack) {
    // no way to continue
    if (t < 0) {
      return;
    }

    // found combination
    if (t === 0) {
      res.push([...stack]); // get stack copy
      return;
    }

    let processTarget = t;

    // go to deep
    stack.push(candidates[offset]);
    processTarget -= candidates[offset];
    get(offset, processTarget, stack);
    stack.pop();
    processTarget += candidates[offset];

    // shift in deep
    if (stack.length > 0) {
      for (let deepOffset = offset + 1; deepOffset < candidates.length; deepOffset += 1) {
        stack.push(candidates[deepOffset]);
        processTarget -= candidates[deepOffset];
        get(deepOffset, processTarget, stack);
        processTarget += candidates[deepOffset];
        stack.pop();
      }
    }
  }

  for (let offset = 0; offset < candidates.length; offset += 1) {
    get(offset, target, []);
  }

  return res;
}

module.exports = () => {
  const res1 = JSON.stringify(combinationSum([2, 3, 6, 7], 7)) === '[[2,2,3],[7]]';
  const res2 = JSON.stringify(combinationSum([2, 3, 5], 8)) === '[[2,2,2,2],[2,3,3],[3,5]]';
  const res3 = JSON.stringify(combinationSum([3, 5, 8], 11)) === '[[3,3,5],[3,8]]';

  console.log(
    res1,
    res2,
    res3,
  );
};
