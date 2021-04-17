const { deserialize } = require('../../utils/trees');

/**
 * @param {TreeNode} root
 * @return {number}
 */
function widthOfBinaryTree(root) {
  if (!root) {
    return 0;
  }

  // skip holy shit
  while (root.left && !root.right) {
    root = root.left;
  }
  while (root.right && !root.left) {
    root = root.right;
  }

  let maxWidth = 0;
  const queue = [root, 0];

  while (queue.length) {
    const first = queue[1];
    const currLevelLen = queue.length / 2;
    const last = queue[queue.length - 1];

    for (let i = 0; i < currLevelLen; i += 1) {
      const node = queue.shift();
      const level = queue.shift();
      const nextLeft = 2 * level;
      const nextRight = nextLeft + 1;

      if (node.left) {
        queue.push(node.left, nextLeft);
      }

      if (node.right) {
        queue.push(node.right, nextRight);
      }
    }

    const width = last - first + 1;

    if (width > maxWidth) {
      maxWidth = width;
    }
  }

  return maxWidth;
}

module.exports = () => {
  const exTree1 = deserialize('[1,3,2,5,3,null,9]');
  const exRes1 = 4;
  const exTree2 = deserialize('[1,3,null,5,3]');
  const exRes2 = 2;
  const exTree3 = deserialize('[1,3,2,5]');
  const exRes3 = 2;
  const exTree4 = deserialize('[1,3,2,5,null,null,9,6,null,null,7]');
  const exRes4 = 8;
  const exTree5 = deserialize('[1,1,1,1,1,1,1,null,null,null,1,null,null,null,null,2,2,2,2,2,2,2,null,2,null,null,2,null,2]');
  const exRes5 = 8;
  const exTree6 = deserialize('[1,3,2,5,3,null,9]');
  const exRes6 = 4;
  const exTree7 = deserialize('[1,2,3,4,5]');
  const exRes7 = 2;
  const exTree8 = deserialize('[1,2]');
  const exRes8 = 1;
  const exTree9 = deserialize('[2,1,4,3,null,5]');
  const exRes9 = 3;
  const exTree10 = deserialize('[-64,12,18,-4,-53,null,76,null,-51,null,null,-93,3,null,-31,47,null,3,53,-81,33,4,null,-51,-44,-60,11,null,null,null,null,78,null,-35,-64,26,-81,-31,27,60,74,null,null,8,-38,47,12,-24,null,-59,-49,-11,-51,67,null,null,null,null,null,null,null,-67,null,-37,-19,10,-55,72,null,null,null,-70,17,-4,null,null,null,null,null,null,null,3,80,44,-88,-91,null,48,-90,-30,null,null,90,-34,37,null,null,73,-38,-31,-85,-31,-96,null,null,-18,67,34,72,null,-17,-77,null,56,-65,-88,-53,null,null,null,-33,86,null,81,-42,null,null,98,-40,70,-26,24,null,null,null,null,92,72,-27,null,null,null,null,null,null,-67,null,null,null,null,null,null,null,-54,-66,-36,null,-72,null,null,43,null,null,null,-92,-1,-98,null,null,null,null,null,null,null,39,-84,null,null,null,null,null,null,null,null,null,null,null,null,null,-93,null,null,null,98]');
  const exRes10 = 169;
  const exTree11 = deserialize('[1,5,4,2,null,null,null,3]');
  const exRes11 = 2;
  const exTree12 = deserialize('[0,null,0,null,0,null,0,null,0,null,0,null,0,null,0,null,0,null,0,null,0,null,0,null,0,null,0,null,0,null,0,null,0,null,0,1,2,3,4,5,6]');
  const exRes12 = 4;

  // console.log(JSON.stringify(exTree12));

  const tests = [
    widthOfBinaryTree(exTree1) === exRes1,
    widthOfBinaryTree(exTree2) === exRes2,
    widthOfBinaryTree(exTree3) === exRes3,
    widthOfBinaryTree(exTree4) === exRes4,
    widthOfBinaryTree(exTree5) === exRes5,
    widthOfBinaryTree(exTree6) === exRes6,
    widthOfBinaryTree(exTree7) === exRes7,
    widthOfBinaryTree(exTree8) === exRes8,
    widthOfBinaryTree(exTree9) === exRes9,
    widthOfBinaryTree(exTree10) === exRes10,
    widthOfBinaryTree(exTree11) === exRes11,
    widthOfBinaryTree(exTree12) === exRes12,
  ];

  const passed = tests.includes(false) === false;

  console.log({ passed }, !passed ? JSON.stringify(tests) : null);
};
