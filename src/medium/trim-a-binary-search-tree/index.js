const { deserialize, serialize } = require('../../utils/trees');

/**
 * @param {TreeNode} root
 * @param {number} low
 * @param {number} high
 * @return {TreeNode}
 */
function trimBST(root, low, high) {
  const queue = [root];
  let validRoot = null;
  // val to prev node
  const backLinks = {};

  // trim nodes
  while (queue.length) {
    const node = queue.shift();

    if (node.left && node.val > low) {
      queue.push(node.left);
      backLinks[node.left.val] = { node, side: 0 };
    } else {
      node.left = null;
    }

    if (node.right && node.val < high) {
      queue.push(node.right);
      backLinks[node.right.val] = { node, side: 1 };
    } else {
      node.right = null;
    }

    const isValidNode = node.val >= low && node.val <= high;

    if (isValidNode && !validRoot) {
      validRoot = node;
    }

    if (!isValidNode) {
      const parent = backLinks[node.val];

      if (parent) {
        const sideToReconnect = parent.side === 0 ? 'left' : 'right';
        const nodeToReconnect = (node.val > high && node.left)
          || (node.val < low && node.right) || null;
        parent.node[sideToReconnect] = nodeToReconnect;

        if (nodeToReconnect) {
          backLinks[nodeToReconnect.val] = parent;
        }
      }
    }
  }

  return validRoot;
}

module.exports = function exec() {
  const tree1 = deserialize('[3,0,4,null,2,null,null,1]');
  const trim1 = trimBST(tree1, 1, 3);
  const res1 = serialize(trim1) === '[3,2,null,1]';
  const tree2 = deserialize('[2,0,33,null,1,25,40,null,null,11,31,34,45,10,18,29,32,null,36,43,46,4,null,12,24,26,30,null,null,35,39,42,44,null,48,3,9,null,14,22,null,null,27,null,null,null,null,38,null,41,null,null,null,47,49,null,null,5,null,13,15,21,23,null,28,37,null,null,null,null,null,null,null,null,8,null,null,null,17,19,null,null,null,null,null,null,null,7,null,16,null,null,20,6]');
  console.log(JSON.stringify(tree2));
  const trim2 = trimBST(tree2, 25, 26);
  const res2 = serialize(trim2) === '[25,null,26]';

  console.log(
    res1,
    res2,
  );
};
