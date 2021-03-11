class TreeNode {
  constructor(val, left, right) {
    this.val = (val === undefined ? 0 : val);
    this.left = (left === undefined ? null : left);
    this.right = (right === undefined ? null : right);
  }
}

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

module.exports = {
  TreeNode,
  serialize,
  deserialize,
};
