/**
 * @param {number} n
 * @param {number} headID
 * @param {number[]} manager
 * @param {number[]} informTime
 * @return {number}
 */
function numOfMinutes(n, headID, manager, informTime) {
  const graph = {};

  manager.forEach((managerId, employeeId) => {
    if (managerId < 0) {
      return;
    }
    let node = graph[managerId];
    if (!node) {
      node = { t: informTime[managerId], child: [] };
      graph[managerId] = node;
    }
    node.child.push(employeeId);
  });

  function calcChildTime(managerId) {
    const node = graph[managerId];
    if (!node || node.child.length === 0) {
      return 0;
    }
    const childTime = node.child
      .reduce((max, childId) => {
        const curr = calcChildTime(childId);
        if (curr > max) {
          return curr;
        }
        return max;
      }, 0);
    return node.t + childTime;
  }

  return calcChildTime(headID);
}

module.exports = () => {
  const case1 = [6, 2, [2, 2, -1, 2, 2, 2], [0, 0, 1, 0, 0, 0]];
  const expect1 = 1;
  const case2 = [1, 0, [-1], [0]];
  const expect2 = 0;
  const case3 = [7, 6, [1, 2, 3, 4, 5, 6, -1], [0, 6, 5, 4, 3, 2, 1]];
  const expect3 = 21;
  const case4 = [
    11, 4, [5, 9, 6, 10, -1, 8, 9, 1, 9, 3, 4], [0, 213, 0, 253, 686, 170, 975, 0, 261, 309, 337],
  ];
  const expect4 = 2560;
  const case5 = [4, 2, [3, 3, -1, 2], [0, 0, 162, 914]];
  const expect5 = 1076;

  const test = [
    numOfMinutes(...case1) === expect1,
    numOfMinutes(...case2) === expect2,
    numOfMinutes(...case3) === expect3,
    numOfMinutes(...case4) === expect4,
    numOfMinutes(...case5) === expect5,
  ];

  console.log({
    passed: test.filter(Boolean).length,
    total: test.length,
    failed: test
      .map((r, i) => ({ r, i }))
      .filter(({ r }) => !r)
      .map(({ i }) => i),
  });
};
