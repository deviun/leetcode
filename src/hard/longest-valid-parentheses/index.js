/**
 * @param {string} s
 * @return {number}
 */
function longestValidParentheses(s) {
  const stack = [];
  let level = 0;
  const lvlRef = {};

  function calc(block, reset = false) {
    const { lvl, child } = block;
    let ref = lvlRef[String(lvl)];
    if (!ref) {
      ref = lvlRef[String(lvl)] = { curr: 0, max: 0 };
    }

    if (reset) {
      ref.curr = 0;
      return;
    }

    let incr = 2;

    if (child.length > 0) {
      incr += lvlRef[lvl + 1].max;
      lvlRef[lvl + 1] = { curr: 0, max: 0 };
    }

    ref.curr += incr;
    ref.count += 1;

    if (ref.curr > ref.max) {
      ref.max = ref.curr;
    }
  }

  const resetBlock = { lvl: 0 };

  for (const char of s) {
    if (char === '(') {
      const block = { lvl: level, child: [] };
      if (stack[0]) {
        stack[0].child.push(block);
      }
      stack.unshift(block);
      level += 1;
    } else if (char === ')' && level > 0) {
      const block = stack.shift();
      calc(block);
      level -= 1;
    } else {
      calc(resetBlock, true);
    }
  }

  return Object.values(lvlRef).reduce((max, ref) => {
    if (ref.max > max) {
      return ref.max;
    }
    return max;
  }, 0);

  // console.log('>>>', { s, max });
  // console.log(lvlRef);
  // console.log('-----------');
}

module.exports = () => {
  const case1 = '(()';
  const expect1 = 2;
  const case2 = ')()())';
  const expect2 = 4;
  const case3 = '';
  const expect3 = 0;
  const case4 = '()(())';
  const expect4 = 6;
  const case5 = '()(()';
  const expect5 = 2;
  const case6 = '((()()())(';
  const expect6 = 8;
  const case7 = ')()())()()(';
  const expect7 = 4;
  const case8 = ')(((((()())()()))()(()))(';
  const expect8 = 22;
  const case9 = '()((())()';
  const expect9 = 6;
  const case10 = ')(()((((())';
  const expect10 = 4;

  const test = [
    longestValidParentheses(case1) === expect1,
    longestValidParentheses(case2) === expect2,
    longestValidParentheses(case3) === expect3,
    longestValidParentheses(case4) === expect4,
    longestValidParentheses(case5) === expect5,
    longestValidParentheses(case6) === expect6,
    longestValidParentheses(case7) === expect7,
    longestValidParentheses(case8) === expect8,
    longestValidParentheses(case9) === expect9,
    longestValidParentheses(case10) === expect10,
  ];

  console.log({
    passed: test.filter(Boolean).length,
    total: test.length,
  });
};
