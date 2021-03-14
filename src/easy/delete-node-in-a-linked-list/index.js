const { makeList, checkListOrder } = require('../../utils/lists');

/**
 * @param {ListNode} node
 * @return {void} Do not return anything, modify node in-place instead.
 */
const deleteNode = function deleteNode(node) {
  // omg!!
  Object.assign(node, node.next);
};

module.exports = function exec() {
  const list1 = makeList([4, 5, 1, 9]);
  const nodeToDelete = list1.next; // 5
  deleteNode(
    nodeToDelete,
  );
  const res1 = checkListOrder(
    list1,
    [4, 1, 9],
  );

  console.log(
    res1,
  );
};
