const TOKEN = {
  START: '^',
  SIGN: '-+',
  NUMBER: '1',
  OPERATOR: '@',
  END: '$',
};
const OP = {
  MUL: '*',
  DIV: '/',
  PLUS: '+',
  MINUS: '-',
};

const opSet = new Set([
  OP.MUL,
  OP.DIV,
  OP.PLUS,
  OP.MINUS,
]);

const upLevelOpSet = new Set([
  OP.MUL,
  OP.DIV,
]);

const execOp = {
  [OP.MUL]: (a, b) => a * b,
  [OP.DIV]: (a, b) => Math.floor(a / b),
  [OP.PLUS]: (a, b) => a + b,
  [OP.MINUS]: (a, b) => a - b,
};

function stringToTree(stringExpression) {
  let currTokenT = TOKEN.START;
  let mem = '';
  const tree = [];
  let treeLevel = 0;

  function insert(token, targetTree = tree, level = 0) {
    if (treeLevel === 0 || level === treeLevel) {
      targetTree.push(token);
    } else {
      let deepTree = targetTree[targetTree.length - 1];

      if (Array.isArray(deepTree) === false) {
        deepTree = [];
        targetTree.push(deepTree);
      }

      insert(token, deepTree, level + 1);
    }
  }

  function switchTokenType(newType, nextChar = '') {
    let typeToSwitch = newType;
    let clearMemAfterSwitch = true;
    switch (`${currTokenT}->${newType}`) {
      // if detected op in start of expression then mark token as sign of number
      case `${TOKEN.START}->${TOKEN.OPERATOR}`:
        typeToSwitch = TOKEN.SIGN;
        break;
      case `${TOKEN.NUMBER}->${TOKEN.OPERATOR}`:
      case `${TOKEN.NUMBER}->${TOKEN.END}`:
        // insert mul & div to deep expression
        if (newType === TOKEN.OPERATOR && upLevelOpSet.has(nextChar)) {
          treeLevel = 1;
        }
        insert(Number(mem));
        // reset level after all deep expression operators
        if (newType === TOKEN.OPERATOR && upLevelOpSet.has(nextChar) === false) {
          treeLevel = 0;
        }
        break;
      case `${TOKEN.SIGN}->${TOKEN.NUMBER}`:
        // make negative number
        if (mem === OP.MINUS) {
          clearMemAfterSwitch = false;
        }
        break;
      default:
        if (mem !== '') {
          insert(mem);
        }
        break;
    }

    currTokenT = typeToSwitch;

    if (clearMemAfterSwitch) {
      mem = '';
    }

    return 1;
  }

  for (const char of stringExpression) {
    let tokenType;
    if (Number.isNaN(Number(char)) === false) { // numbers
      tokenType = TOKEN.NUMBER;
    } else if (opSet.has(char)) { // operators
      tokenType = TOKEN.OPERATOR;
    }

    if (tokenType) {
      if (currTokenT !== tokenType) {
        switchTokenType(tokenType, char);
      }
      mem += char;
    }
  }

  switchTokenType(TOKEN.END);

  return tree;
}

function execExpressionTree(tree) {
  let sum = 0;
  let op = OP.PLUS;

  tree.forEach((token) => {
    let value = token;

    if (Array.isArray(value)) {
      value = execExpressionTree(value);
    }

    if (Number.isNaN(Number(value)) === false) {
      sum = execOp[op](sum, Number(value));
    } else {
      op = token;
    }
  });

  return sum;
}

/**
 * @param {string} s
 * @return {number}
 */
function calculate(s) {
  // parse expression to tree of tokens and exec calc
  return execExpressionTree(
    stringToTree(s),
  );
}

module.exports = () => {
  const expression = '1*2-3/4+5*6-7*8+9/10';
  const result = calculate(expression);

  console.log(result);
};
