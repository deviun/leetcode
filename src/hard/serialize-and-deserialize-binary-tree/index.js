const { TreeNode } = require('../../utils/lists');

/**
 * Encodes a tree to a single string.
 *
 * @param {TreeNode} root
 * @return {string}
 */
const serialize = function serialize(root) {
  if (root === null || root === undefined) {
    return '[]';
  }

  const queue = [root];
  const data = [root.val];

  while (queue.length) {
    const node = queue.shift();

    if (node.left !== null) {
      data.push(node.left.val);
      queue.push(node.left);
    } else {
      data.push(null);
    }

    if (node.right !== null) {
      data.push(node.right.val);
      queue.push(node.right);
    } else {
      data.push(null);
    }
  }

  // clear null end
  for (let i = data.length - 1; i >= 0; i -= 1) {
    const el = data[i];

    if (el === null) {
      data.pop();
    } else {
      break;
    }
  }

  return JSON.stringify(data);
};

/**
 * Decodes your encoded data to tree.
 *
 * @param {string} data
 * @return {TreeNode}
 */
const deserialize = function deserialize(data) {
  const parsedData = JSON.parse(data);
  const rootVal = parsedData.shift();

  if (rootVal === null || rootVal === undefined) {
    return null;
  }

  const root = new TreeNode(rootVal);
  const nodeQueue = [root];

  while (nodeQueue.length) {
    const targetNode = nodeQueue.shift();
    const nodeLeftVal = parsedData.shift();
    const nodeRightVal = parsedData.shift();
    const nodeLeft = nodeLeftVal !== undefined && nodeLeftVal !== null
      ? new TreeNode(nodeLeftVal)
      : null;
    const nodeRight = nodeRightVal !== undefined && nodeRightVal !== null
      ? new TreeNode(nodeRightVal)
      : null;

    if (nodeLeft) {
      targetNode.left = nodeLeft;
      nodeQueue.push(nodeLeft);
    }

    if (nodeRight) {
      targetNode.right = nodeRight;
      nodeQueue.push(nodeRight);
    }
  }

  return root;
};

module.exports = () => {
  const ex1 = '[1,2,3,null,null,4,5]';
  const ex2 = '[]';
  const ex3 = '[1]';
  const ex4 = '[1,2]';
  const ex5 = '[4,-7,-3,null,null,-9,-3,9,-7,-4,null,6,null,-6,-6,null,null,0,6,5,null,9,null,null,-1,-4,null,null,null,-2]';
  const ex6 = '[0,0,0,0,null,null,1,null,null,null,2]';

  console.log([
    serialize(deserialize(ex1)) === ex1,
    serialize(deserialize(ex2)) === ex2,
    serialize(deserialize(ex3)) === ex3,
    serialize(deserialize(ex4)) === ex4,
    serialize(deserialize(ex5)) === ex5,
    serialize(deserialize(ex6)) === ex6,
  ]);
};
