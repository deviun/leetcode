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

    // go to deep
    stack.push(candidates[offset]);
    get(offset, t - candidates[offset], stack);
    stack.pop();

    // shift & shift in deep
    for (let dOffset = offset + 1; dOffset < candidates.length; dOffset += 1) {
      stack.push(candidates[dOffset]);
      get(dOffset, t - candidates[dOffset], stack);
      stack.pop();
    }
  }

  get(0, target, []);

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
