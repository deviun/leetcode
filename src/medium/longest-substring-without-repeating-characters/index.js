/**
 * @param {string} s
 * @return {number}
 */
function lengthOfLongestSubstring(s) {
  let maxSubstr = '';
  const currentSubstr = new Set([]);
  let startFrom = 0;
  let currentPos = 0;
  do {
    const char = s[currentPos];
    if (!currentSubstr.has(char)) {
      currentSubstr.add(char);
      currentPos += 1;
    } else {
      const substringResult = Array.from(currentSubstr).join('');
      if (substringResult.length > maxSubstr.length) {
        maxSubstr = substringResult;
      }
      currentSubstr.clear();
      startFrom += 1;
      currentPos = startFrom;
    }
  } while (maxSubstr.length < (s.length - startFrom) || currentPos < s.length);

  console.log(maxSubstr);

  return maxSubstr.length;
}

module.exports = () => {
  const res = lengthOfLongestSubstring('abcabcbb');
  console.log(res);
};
