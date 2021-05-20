/* eslint-disable prefer-destructuring */
/**
 * @param {number[][]} intervals
 * @return {number}
 */
function minMeetingRooms(intervals) {
  const sorted = intervals
    .sort((a, b) => a[0] - b[0]);

  let counter = 0;
  let currRoom = sorted;

  while (currRoom) {
    counter += 1;
    const next = [];
    let prevEnd = -1;
    currRoom.forEach((meet) => {
      if (!prevEnd) {
        prevEnd = meet[1];
      } else if (meet[0] < prevEnd) {
        next.push(meet);
      } else {
        prevEnd = meet[1];
      }
    });

    if (next.length > 0) {
      currRoom = next;
    } else {
      currRoom = null;
    }
  }

  return counter;
}

module.exports = function exec() {
  const intervals1 = [[0, 30], [5, 10], [15, 20]];
  const res1 = minMeetingRooms(intervals1);

  const intervals2 = [[7, 10], [2, 4]];
  const res2 = minMeetingRooms(intervals2);

  const intervals3 = [[9, 10], [4, 9], [4, 17]];
  const res3 = minMeetingRooms(intervals3);

  // eslint-disable-next-line max-len
  const intervals4 = [[64738, 614406], [211748, 780229], [208641, 307338], [499908, 869489], [218907, 889449], [177201, 481150], [123679, 384415], [120440, 404695], [191810, 491295], [800783, 826206], [165175, 221995], [420412, 799259], [484168, 617671], [746410, 886281], [765198, 792311], [493853, 971285], [194579, 313372], [119757, 766274], [101315, 917883], [557309, 599256], [167729, 723580], [731216, 988021], [225883, 752657], [588461, 854166], [231328, 285640], [772811, 869625], [892212, 973218], [143535, 306402], [336799, 998119], [65892, 767719], [380440, 518918], [321447, 558462], [54489, 234291], [43934, 44986], [11260, 968186], [248987, 707178], [355162, 798511], [661962, 781083], [149228, 412762], [71084, 953153], [44890, 655659], [708781, 956341], [251847, 707658], [650743, 932826], [561965, 814428], [697026, 932724], [583473, 919161], [463638, 951519], [769086, 785893], [17912, 923570], [423089, 653531], [317269, 395886], [412117, 701471], [465312, 520002], [168739, 770178], [624091, 814316], [143729, 249836], [699196, 879379], [585322, 989087], [501009, 949840], [424092, 580498], [282845, 345477], [453883, 926476], [392148, 878695], [471772, 771547], [339375, 590100], [110499, 619323], [8713, 291093], [268241, 283247], [160815, 621452], [168922, 810532], [355051, 377247], [10461, 488835], [220598, 261326], [403537, 438947], [221492, 640708], [114702, 926457], [166567, 477230], [856127, 882961], [218411, 256327], [184364, 909088], [130802, 828793], [312028, 811716], [294638, 839683], [269329, 343517], [167968, 391811], [25351, 369583], [210660, 454598], [166834, 576380], [296440, 873280], [660142, 822072], [33441, 778393], [456500, 955635], [59220, 954158], [306295, 429913], [110402, 448322], [44523, 88192], [231386, 353197], [120940, 902781], [348758, 597599], [329467, 664450], [208411, 890114], [230238, 516885], [434113, 602358], [349759, 419831], [10689, 308144], [94526, 180723], [435280, 986655], [611999, 690154], [75208, 395348], [403243, 489260], [498884, 611075], [487209, 863242], [13900, 873774], [656706, 782943], [53478, 586952], [226216, 723114], [554799, 922759], [467777, 689913], [80630, 147482], [277803, 506346], [532240, 976029], [206622, 761192], [148277, 985819], [10879, 807349], [952227, 971268], [172074, 919866], [239230, 384499], [607687, 984661], [4405, 264532], [41071, 437502], [432603, 661142], [144398, 907360], [139605, 360037], [943191, 997317], [12894, 171584], [382477, 800157], [452077, 518175], [208007, 398880], [375250, 489928], [384503, 726837], [278181, 628759], [114470, 635575], [382297, 733713], [156559, 874172], [507016, 815520], [164461, 532215], [17332, 536971], [418721, 911117], [11497, 14032]];
  const res4 = minMeetingRooms(intervals4);

  const intervals5 = [[1, 2], [2, 4], [3, 5], [5, 9]];
  const res5 = minMeetingRooms(intervals5);

  const test = [
    res1 === 2,
    res2 === 1,
    res3 === 2,
    res4 === 77,
    res5 === 2,
  ];

  const passed = test.filter(Boolean);

  console.log({ passed: passed.length, total: test.length });
};
