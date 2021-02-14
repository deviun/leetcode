class TreeNode {
  constructor(val, left, right) {
    this.val = val;
    this.left = left;
    this.right = right;
  }
}

/**
 * @param {TreeNode} p
 * @param {TreeNode} q
 * @return {boolean}
 */
function isSameTree(p, q) {
  let isSame = true;
  const pQueue = [p];
  const qQueue = [q];

  while (pQueue.length > 0 && qQueue.length > 0) {
    const pRoot = pQueue.shift();
    const qRoot = qQueue.shift();

    if ((!pRoot || !qRoot) && (pRoot !== qRoot)) {
      isSame = false;
      break;
    } else if ((!pRoot || !qRoot) && (pRoot === qRoot)) {
      continue;
    } else if (pRoot.val !== qRoot.val) {
      isSame = false;
      break;
    }

    pQueue.push(pRoot.left, pRoot.right);
    qQueue.push(qRoot.left, qRoot.right);
  }

  return isSame;
}

module.exports = () => {
  const treeA = new TreeNode(
    1,
    new TreeNode(2),
    new TreeNode(3),
  );
  const treeB = new TreeNode(
    1,
    new TreeNode(2),
  );
  const treeC = new TreeNode(
    1,
    null,
    new TreeNode(
      2,
      treeA,
      treeB,
    ),
  );

  const res1 = isSameTree(treeA, treeA) === true;
  const res2 = isSameTree(treeA, treeB) === false;
  const res3 = isSameTree(treeC, treeC) === true;
  const res4 = isSameTree(treeA, treeC) === false;

  console.log([
    res1,
    res2,
    res3,
    res4,
  ].join('\n'));
};
