/* eslint-disable no-param-reassign */
const { serialize, deserialize } = require('../../utils/trees');

/**
 * @param {TreeNode} root
 * @return {TreeNode}
 */
const invertTree = function invertTree(root) {
  function invert(node) {
    if (!node) {
      return;
    }

    const toLeft = node.right;
    const toRight = node.left;

    node.left = toLeft;
    node.right = toRight;

    invert(toLeft);
    invert(toRight);
  }

  invert(root);

  return root;
};

module.exports = () => {
  const testTree = deserialize('[4, 2, 7, 1, 3, 6, 9]');
  const invertedTree = '[4,7,2,9,6,3,1]';

  const res = invertTree(testTree);
  const match = serialize(res) === invertedTree;

  if (!match) {
    console.log('bad res', serialize(res));
  }

  console.log(match);
};
