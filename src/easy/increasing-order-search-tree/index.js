const { deserialize, serialize } = require('../../utils/trees');

/**
 * @param {TreeNode} root
 * @return {TreeNode}
 */
function increasingBST(root) {
  let tail = null;
  function deep(r) {
    if (!r.left && !r.right) {
      tail = r;
      return r;
    }

    const middleNode = r;
    let newRoot = r;
    let increasingByLeft;
    let increasingByRight;

    if (middleNode.left) {
      increasingByLeft = deep(middleNode.left);
      newRoot = increasingByLeft;

      tail.right = middleNode;
      tail = middleNode;
      middleNode.left = null;
    }

    if (middleNode.right) {
      increasingByRight = deep(middleNode.right);
      middleNode.right = increasingByRight;
    }

    return newRoot;
  }

  return deep(root);
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
