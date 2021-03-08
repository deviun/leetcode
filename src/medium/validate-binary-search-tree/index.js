class TreeNode {
  constructor(val, left, right) {
    this.val = (val === undefined ? 0 : val);
    this.left = (left === undefined ? null : left);
    this.right = (right === undefined ? null : right);
  }
}

/**
 * @param {TreeNode} root
 * @return {boolean}
 */
function isValidBST(root) {
  function dfs(node, min = Number.MIN_SAFE_INTEGER, max = Number.MAX_SAFE_INTEGER) {
    if (!node) {
      return true;
    }

    if (node.val <= min || node.val >= max) {
      return false;
    }

    return dfs(node.left, min, node.val) && dfs(node.right, node.val, max);
  }

  return dfs(root);
}

module.exports = () => {
  const res1 = isValidBST(
    new TreeNode(
      2,
      new TreeNode(1),
      new TreeNode(3),
    ),
  ) === true;
  const res2 = isValidBST(
    new TreeNode(
      5,
      new TreeNode(
        1,
      ),
      new TreeNode(
        4,
        new TreeNode(3),
        new TreeNode(6),
      ),
    ),
  ) === false;
  const res3 = isValidBST(
    new TreeNode(
      1,
      new TreeNode(1),
    ),
  ) === false;
  const res4 = isValidBST(
    new TreeNode(
      0,
      new TreeNode(-1),
    ),
  ) === true;
  const res5 = isValidBST(
    new TreeNode(
      5,
      new TreeNode(4),
      new TreeNode(
        6,
        new TreeNode(3),
        new TreeNode(7),
      ),
    ),
  ) === false;
  const res6 = isValidBST(
    new TreeNode(
      32,
      new TreeNode(
        26,
        new TreeNode(
          19,
          null,
          new TreeNode(27),
        ),
        null,
      ),
      new TreeNode(
        47,
        null,
        new TreeNode(56),
      ),
    ),
  ) === false;
  console.log({
    res1, res2, res3, res4, res5, res6,
  });
};
