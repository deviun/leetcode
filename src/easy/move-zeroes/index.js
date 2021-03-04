/**
 * @param {number[]} nums
 * @return {void} Do not return anything, modify nums in-place instead.
 */
function moveZeroes(nums) {
  const origLength = nums.length;

  for (let count = nums.length; count > 0; count -= 1) {
    const elem = nums.shift();

    if (elem !== 0) {
      nums.push(elem);
    }
  }

  while (nums.length < origLength) {
    nums.push(0);
  }
}

module.exports = () => {
  const arr = [0, 1, 0, 3, 12];
  const arrBefore = JSON.stringify(arr);
  moveZeroes(arr);
  const arrAfter = JSON.stringify(arr);
  const res = arrAfter === '[1,3,12,0,0]';
  console.log([arrBefore, arrAfter, res]);
};
