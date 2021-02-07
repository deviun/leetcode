/**
 * @param {string} s
 * @return {number}
 */
function lengthOfLongestSubstring(s) {
  let maxSubstr = '';
  const currentSubstr = new Set([]);
  let lCursor = 0;
  let rCursor = 0;
  do {
    const char = s[rCursor];
    if (!currentSubstr.has(char)) {
      currentSubstr.add(char);
      rCursor += 1;
    } else {
      if (currentSubstr.size > maxSubstr.length) {
        maxSubstr = Array.from(currentSubstr).join('');
      }
      currentSubstr.clear();
      lCursor += 1;
      rCursor = lCursor;
    }
  } while (maxSubstr.length < (s.length - lCursor) || rCursor < s.length);

  console.log(maxSubstr);

  return maxSubstr.length;
}

module.exports = () => {
  const res = lengthOfLongestSubstring('abcabcbb');
  console.log(res);
};
