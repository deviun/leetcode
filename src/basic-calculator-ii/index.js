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

class Expression {
  constructor(s) {
    if (!s) {
      throw new Error('define expression');
    }

    this.expression = s;
    this.currTokenT = TOKEN.START;
    this.currTokenValue = '';
    this.tree = [];
    this.treeLevel = 0;
  }

  makeTree() {
    // now currTokenT is START
    for (const char of this.expression) {
      let tokenType;
      if (Number.isNaN(Number(char)) === false) { // numbers
        tokenType = TOKEN.NUMBER;
      } else if (opSet.has(char)) { // operators
        tokenType = TOKEN.OPERATOR;
      }

      if (tokenType) {
        if (this.currTokenT !== tokenType) {
          this.#handleNewTokenType(tokenType, char);
        }
        this.currTokenValue += char;
      }
    }

    this.#handleNewTokenType(TOKEN.END);

    return this;
  }

  #insertToTree(token, targetTree = this.tree, level = 0) {
    if (this.treeLevel === 0 || level === this.treeLevel) {
      targetTree.push(token);
    } else {
      let deepTree = targetTree[targetTree.length - 1];

      if (Array.isArray(deepTree) === false) {
        deepTree = [];
        targetTree.push(deepTree);
      }

      this.#insertToTree(token, deepTree, level + 1);
    }
  }

  #handleNewTokenType(newType, nextChar = '') {
    let typeToSwitch = newType;
    let clearTokenValueAfterSwitch = true;

    switch (`${this.currTokenT}->${newType}`) {
      // if detected op in start of expression then mark token as sign of number
      case `${TOKEN.START}->${TOKEN.OPERATOR}`:
        typeToSwitch = TOKEN.SIGN;
        break;
      case `${TOKEN.NUMBER}->${TOKEN.OPERATOR}`:
      case `${TOKEN.NUMBER}->${TOKEN.END}`:
        // insert mul & div to deep expression
        if (newType === TOKEN.OPERATOR && upLevelOpSet.has(nextChar)) {
          this.treeLevel = 1;
        }
        this.#insertToTree(Number(this.currTokenValue));
        // reset level after all deep expression operators
        if (newType === TOKEN.OPERATOR && upLevelOpSet.has(nextChar) === false) {
          this.treeLevel = 0;
        }
        break;
      case `${TOKEN.SIGN}->${TOKEN.NUMBER}`:
        // make negative number
        if (this.currTokenValue === OP.MINUS) {
          clearTokenValueAfterSwitch = false;
        }
        break;
      default:
        if (this.currTokenValue !== '') {
          this.#insertToTree(this.currTokenValue);
        }
        break;
    }

    this.currTokenT = typeToSwitch;

    if (clearTokenValueAfterSwitch) {
      this.currTokenValue = '';
    }

    return 1;
  }

  exec(tree = this.tree) {
    let sum = 0;
    let op = OP.PLUS;

    tree.forEach((token) => {
      let value = token;

      if (Array.isArray(value)) {
        value = this.exec(value);
      }

      if (Number.isNaN(Number(value)) === false) {
        sum = execOp[op](sum, Number(value));
      } else {
        op = token;
      }
    });

    return sum;
  }
}

/**
 * @param {string} s
 * @return {number}
 */
function calculate(s) {
  // parse expression to tree of tokens and exec calc
  return new Expression(s).makeTree().exec();
}

module.exports = () => {
  const expression = '1*2-3/4+5*6-7*8+9/10';
  const result = calculate(expression);

  console.log(result);
};
