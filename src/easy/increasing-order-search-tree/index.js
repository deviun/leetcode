const { deserialize, serialize } = require('../../utils/trees');

/**
 * @param {TreeNode} root
 * @return {TreeNode}
 */
function increasingBST(root) {
  if (!root.left && !root.right) {
    return root;
  }

  const middleNode = root;
  let newRoot = root;
  let increasingByLeft;
  let increasingByRight;

  if (middleNode.left) {
    increasingByLeft = increasingBST(middleNode.left);
    newRoot = increasingByLeft;

    let endOfLeftTree = increasingByLeft;

    while (endOfLeftTree) {
      if (endOfLeftTree.right) {
        endOfLeftTree = endOfLeftTree.right;
      } else {
        break;
      }
    }

    endOfLeftTree.right = middleNode;
  }

  if (middleNode.right) {
    increasingByRight = increasingBST(middleNode.right);
    middleNode.right = increasingByRight;
  }

  middleNode.left = null;

  return newRoot;
}

module.exports = () => {
  const tree1 = deserialize('[5,3,6,2,4,null,8,1,null,null,null,7,9]');
  const op1 = increasingBST(tree1);
  const ser1 = serialize(op1);
  const res1 = ser1 === '[1,null,2,null,3,null,4,null,5,null,6,null,7,null,8,null,9]';

  console.log(
    res1,
  );
};
