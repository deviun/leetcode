/**
 * @param {number[]} nums
 * @return {number}
 */
function singleNumber(nums) {
  if (nums.length === 1) {
    return nums[0];
  }

  const counters = {};

  for (const n of nums) {
    counters[n] = (counters[n] ?? 0) + 1;
  }

  return nums.find((n) => counters[n] === 1);
}

module.exports = () => {
  const res1 = singleNumber([2, 2, 6]) === 6;
  const res2 = singleNumber([4, 1, 2, 1, 2]) === 4;
  const res3 = singleNumber([1]) === 1;

  console.log([res1, res2, res3].join('\n'));
};
