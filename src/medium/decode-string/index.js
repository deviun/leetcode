/**
 * @param {string} s
 * @return {string}
 */
function decodeString(s) {
  const stack = [
    { coef: 1, buffer: '' }, // root stack element
  ];

  let coefBuffer = '';

  for (const char of s) {
    const coef = parseInt(char, 10);
    if (coef >= 0) {
      // parse coef value
      coefBuffer += char;
      continue;
    }

    if (char === '[') {
      // create new item
      stack.unshift({ coef: parseInt(coefBuffer, 10), buffer: '' });
      coefBuffer = '';
      continue;
    }

    if (char === ']') {
      // calc string and pass next
      const { coef: bufCoef, buffer } = stack.shift();
      const stackRes = Array(bufCoef).fill(buffer).join('');
      stack[0].buffer += stackRes;
      continue;
    }

    // data to buffer
    stack[0].buffer += char;
  }

  return stack[0].buffer;
}

module.exports = () => {
  const case1 = '3[a]2[bc]';
  const expect1 = 'aaabcbc';
  const case2 = '3[a2[c]]';
  const expect2 = 'accaccacc';
  const case3 = '10[x]';
  const expect3 = 'xxxxxxxxxx';

  const test = [
    decodeString(case1) === expect1,
    decodeString(case2) === expect2,
    decodeString(case3) === expect3,
  ];

  console.log({
    passed: test.filter(Boolean).length, total: test.length,
  });
};
