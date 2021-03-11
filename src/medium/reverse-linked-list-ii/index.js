const { ListNode, checkListOrder } = require('../../utils/lists');

/**
 * @param {ListNode} head
 * @param {number} left
 * @param {number} right
 * @return {ListNode}
 */
const reverseBetween = function reverseBetween(head, left, right) {
  let nodeBeforeReverse = null;
  let nodeAfterReverse = null;
  let leftNode = null;
  let rightNode = null;
  let prevNode = null;
  let nextNode = head;
  let currHead = head;
  let position = 1;

  while (nextNode) {
    const node = nextNode;
    const pos = position;
    const prev = prevNode;
    nextNode = node.next;
    position += 1;
    prevNode = node;

    // init left pointers
    if (pos === left && pos !== right) {
      nodeBeforeReverse = prev;
      leftNode = node;
      continue;
    }

    // reverse inner links
    if (leftNode && !rightNode) {
      node.next = prev;
    }

    // init right pointers
    if (pos === right && pos !== left) {
      rightNode = node;
      continue;
    }

    if (rightNode && !nodeAfterReverse) {
      nodeAfterReverse = node;
    }
  }

  if (nodeBeforeReverse) {
    nodeBeforeReverse.next = rightNode;
  } else if (rightNode) {
    currHead = rightNode;
  }

  if (nodeAfterReverse) {
    leftNode.next = nodeAfterReverse;
  } else if (leftNode) {
    leftNode.next = null;
  }

  return currHead;
};

module.exports = () => {
  const list1 = () => (
    new ListNode(
      1,
      new ListNode(
        2,
        new ListNode(
          3,
          new ListNode(
            4,
            new ListNode(
              5,
            ),
          ),
        ),
      ),
    )
  );
  const list2 = () => (
    new ListNode(
      1,
    )
  );
  const list3 = () => (
    new ListNode(
      3,
      new ListNode(5),
    )
  );
  const res1 = reverseBetween(
    list1(),
    2,
    4,
  );
  const res2 = reverseBetween(
    list1(),
    1,
    4,
  );
  const res3 = reverseBetween(
    list1(),
    2,
    5,
  );
  const res4 = reverseBetween(
    list1(),
    1,
    5,
  );
  const res5 = reverseBetween(list2(), 1, 1);
  const res6 = reverseBetween(list3(), 1, 2);
  const res7 = reverseBetween(list3(), 1, 1);

  console.log([
    checkListOrder(res1, [1, 4, 3, 2, 5], 'res1'),
    checkListOrder(res2, [4, 3, 2, 1, 5], 'res2'),
    checkListOrder(res3, [1, 5, 4, 3, 2], 'res3'),
    checkListOrder(res4, [5, 4, 3, 2, 1], 'res4'),
    checkListOrder(res5, [1], 'res5'),
    checkListOrder(res6, [5, 3], 'res6'),
    checkListOrder(res7, [3, 5], 'res7'),
  ]);
};
