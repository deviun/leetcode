const { ListNode } = require('../../utils/lists');

/**
 * @param {ListNode} head
 * @return {boolean}
 */
const hasCycle = function hasCycle(head) {
  let node = head;
  let prev = null;

  while (node) {
    if (node.prev) {
      return true;
    }

    node.prev = prev;
    prev = node;
    node = node.next;
  }

  return false;
};

module.exports = function exec() {
  const cycledNode = new ListNode(-4);
  const head = new ListNode(
    3,
    new ListNode(
      2,
      new ListNode(
        0,
        cycledNode,
      ),
    ),
  );

  cycledNode.next = head.next;

  const res1 = hasCycle(
    head,
  ) === true;

  const singleNode = new ListNode(1);
  const res2 = hasCycle(singleNode) === false;

  console.log(
    res1,
    res2,
  );
};
