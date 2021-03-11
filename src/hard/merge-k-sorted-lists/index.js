const { ListNode, checkListOrder } = require('../../utils/lists');

/**
 * @param {ListNode[]} lists
 * @return {ListNode}
 */
const mergeKLists = function mergeKLists(lists) {
  let nodeHead = null;
  let lastNode = null;
  const nodePointers = [...lists];

  while (true) {
    // find first head and group by value to merge near now
    let firstNode = null;
    let firstNodeIndex = 0;
    nodePointers.forEach((node, index) => {
      if (!node) {
        return;
      }
      if (!firstNode || node.val < firstNode.val) {
        firstNode = node;
        firstNodeIndex = index;
      }
    });

    if (!firstNode) {
      break;
    }

    // shift first node pointer
    nodePointers[firstNodeIndex] = firstNode.next;

    // chain first node to result list
    if (!nodeHead && !lastNode) {
      nodeHead = lastNode = firstNode;
    } else {
      lastNode.next = firstNode;
      lastNode = firstNode;
    }

    // chain grouped
    // eslint-disable-next-line no-loop-func
    nodePointers.forEach((node, index) => {
      if (!node) {
        return;
      }

      if (node.val === firstNode.val) {
        // shift pointer
        nodePointers[index] = node.next;
        // chain to result list
        lastNode.next = node;
        lastNode = node;
      }
    });
  }

  return nodeHead;
};

module.exports = () => {
  const res1 = mergeKLists([
    new ListNode(
      1,
      new ListNode(
        4,
        new ListNode(5),
      ),
    ),
    new ListNode(
      1,
      new ListNode(
        3,
        new ListNode(4),
      ),
    ),
    new ListNode(
      2,
      new ListNode(
        6,
      ),
    ),
  ]);

  console.log([
    checkListOrder(res1, [1, 1, 2, 3, 4, 4, 5, 6]),
  ]);
};
