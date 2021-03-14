class ListNode {
  constructor(val, next) {
    this.val = (val === undefined ? 0 : val);
    this.next = (next === undefined ? null : next);
  }
}

/**
 * @param {ListNode} list
 * @param {number[] | string[]} expectOrder
 * @param {string} label
 * @returns {boolean}
 *
*/
function checkListOrder(list, expectOrder, label = '') {
  const listOrder = [];

  let currNode = list;

  while (currNode) {
    listOrder.push(currNode.val);
    currNode = currNode.next;
  }

  const strListOrder = JSON.stringify(listOrder);
  const strExpectOrder = JSON.stringify(expectOrder);
  const match = strListOrder === strExpectOrder;

  if (!match) {
    console.log('unexpected list order', label, { listOrder, expectOrder });
  }

  return match;
}

/**
 * @param {string[] | number[]} order
 * @returns {ListNode}
 */
function makeList(order) {
  const head = new ListNode(order.shift());
  let last = head;

  for (const nodeVal of order) {
    const node = new ListNode(nodeVal);
    last.next = node;
    last = node;
  }

  return head;
}

module.exports = {
  ListNode,
  checkListOrder,
  makeList,
};
