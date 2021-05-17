const directionMap = {
  0: '▲',
  90: '▶',
  180: '▼',
  270: '◀',
};

class Robot {
  constructor(room, startRow, startCol) {
    this.room = room;
    this.row = startRow;
    this.col = startCol;
    this.direction = 0; // top 0, right 1, bottom 2, right 3
    this.cleanedMap = {};
  }

  /**
   * Returns true if the cell in front is open and robot moves into the cell.
   * Returns false if the cell in front is blocked and robot stays in the current cell.
   * @returns {boolean}
  * */
  move() {
    let nextRow = this.row;
    let nextCol = this.col;

    if (this.direction === 0) {
      nextRow -= 1;
    } else if (this.direction === 90) {
      nextCol += 1;
    } else if (this.direction === 180) {
      nextRow += 1;
    } else if (this.direction === 270) {
      nextCol -= 1;
    }

    const nextCell = this.room[nextRow] && this.room[nextRow][nextCol];

    if (Boolean(nextCell) === false) {
      return false;
    }

    this.row = nextRow;
    this.col = nextCol;

    return true;
  }

  turnLeft() {
    if (this.direction === 0) {
      this.direction = 270;
    } else {
      this.direction -= 90;
    }
  }

  turnRight() {
    if (this.direction === 270) {
      this.direction = 0;
    } else {
      this.direction += 90;
    }
  }

  clean() {
    this.cleanedMap[`${this.row}/${this.col}`] = true;
  }

  // debug method
  printStatus() {
    const cleanedCells = Object.keys(this.cleanedMap).length;
    const { row, col } = this;
    const direction = directionMap[this.direction];
    const currRoom = JSON.parse(JSON.stringify(this.room));
    // console.log('>>><<<', {
    //   row, col, rowMap: currRoom[row], room: JSON.stringify(currRoom),
    // });
    currRoom[row][col] = direction;

    console.log('Robot status --------', { cleanedCells, direction });
    let remain = 0;
    currRoom.forEach((r, indexRow) => {
      const printR = r.map((printC, indexCol) => {
        if (this.cleanedMap[`${indexRow}/${indexCol}`] && !(this.col === indexCol && this.row === indexRow)) {
          return '•';
        }

        if (r[indexCol] === 1) {
          remain += 1;
        }

        return printC;
      });
      console.log(JSON.stringify(printR).replace(/([0-9]+)/g, '"$1"'));
    });
    console.log('------ Room map', { remain });
  }
}

/**
 * @param {Robot} robot
 * @return {void}
 */
function cleanRoom(robot) {
  let currDirection = 0; // up
  let xOffset = 0;
  let yOffset = 0;
  const directionArr = [0, 90, 270, 180];
  const parentDirectionMap = {
    0: 180,
    90: 270,
    180: 0,
    270: 90,
  };

  // robot.printStatus();

  // always clean first place
  robot.clean();

  function rotateTo(moveTo) {
    // some optimization
    if ((currDirection === 0 && moveTo === 270) || (currDirection === 180 && moveTo === 90)) {
      currDirection = moveTo;
      robot.turnLeft();
      return;
    }
    // console.log('rotate to', moveTo);
    while (currDirection !== moveTo) {
      currDirection += currDirection === 270 ? -270 : 90;
      robot.turnRight();
    }
    // console.log('rotate ended');
  }
  function makeStep() {
    // console.log('move robot');
    const can = robot.move();

    // animation
    // robot.printStatus();
    // const st = Date.now();
    // while ((Date.now() - st) < 100); // ms delay
    //-------

    if (can) {
      robot.clean();
      if (currDirection === 270 || currDirection === 90) {
        xOffset += currDirection === 270 ? -1 : 1;
      } else if (currDirection === 0 || currDirection === 180) {
        yOffset += currDirection === 0 ? 1 : -1;
      }
    }

    // console.log('move robot ended', { can });

    return can;
  }
  function getIndexByDirection(direction) {
    if (direction === 0) {
      return `${xOffset}:${yOffset + 1}`;
    }
    if (direction === 90) {
      return `${xOffset + 1}:${yOffset}`;
    }
    if (direction === 180) {
      return `${xOffset}:${yOffset - 1}`;
    }
    if (direction === 270) {
      return `${xOffset - 1}:${yOffset}`;
    }
    return '';
  }

  const breadcrumbs = new Set([]);
  const points = [];

  // parentDirection is direction to parent from this point
  function createPoint(x, y, parentDirection = null) {
    const index = `${x}:${y}`;
    if (breadcrumbs.has(index)) {
      return null;
    }
    breadcrumbs.add(index);
    // pd - parent direction, vd - visited directions
    return {
      x, y, pd: parentDirection, vd: new Set([parentDirection]),
    };
  }

  points.unshift(createPoint(0, 0));

  while (points.length) {
    const point = points[0];

    // console.log(JSON.stringify(points));

    // try make step
    const direction = directionArr.find(
      (d) => !(point.vd.has(d) || breadcrumbs.has(getIndexByDirection(d))),
    );

    // if have available direction for current point
    if (typeof direction === 'number') {
      if (currDirection !== direction) {
        rotateTo(direction);
      }
      const step = makeStep();

      point.vd.add(direction);

      if (step) {
        // console.log('step has');
        const newPoint = createPoint(xOffset, yOffset, parentDirectionMap[currDirection]);
        if (!newPoint) {
          rotateTo(parentDirectionMap[currDirection]);
          makeStep();
          continue;
        }
        points.unshift(newPoint);
        continue;
      }
      // console.log('can not step');
    } else {
      // rollback point
      // console.log('>>>>>>>>>>>>>>>>>>>>>>>>>>>>>rollback point', point);
      points.shift();
      if (typeof point.pd === 'number') {
        rotateTo(point.pd);
        makeStep();
      }
    }
  }

  // robot.printStatus();
  // const st = Date.now();
  // while ((Date.now() - st) < 5000) {}
}

module.exports = () => {
  const room1 = [
    [1, 1, 1, 1, 1, 0, 1, 1],
    [1, 1, 0, 1, 1, 0, 1, 1],
    [1, 0, 1, 1, 1, 1, 1, 1],
    [0, 0, 0, 1, 0, 0, 0, 0],
    [1, 1, 1, 1, 1, 1, 1, 1],
  ];
  const pos1 = [1, 3]; // row, col
  const robot1 = new Robot(room1, ...pos1);

  const room2 = [
    [1, 1, 1, 1, 1, 0, 1, 1],
    [1, 1, 0, 1, 1, 0, 1, 1],
    [1, 0, 0, 1, 1, 1, 1, 1],
    [1, 1, 1, 0, 0, 0, 0, 1],
    [1, 0, 1, 0, 1, 1, 1, 1],
  ];
  const pos2 = [1, 3]; // row, col
  const robot2 = new Robot(room2, ...pos2);

  const room3 = [
    [1, 1, 1, 0, 0, 1, 1, 1, 0, 0, 0],
    [0, 1, 1, 1, 1, 1, 1, 1, 0, 1, 0],
    [0, 1, 1, 1, 1, 1, 1, 1, 0, 1, 0],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 0],
    [1, 1, 0, 1, 1, 1, 0, 1, 1, 1, 0],
    [0, 1, 1, 1, 1, 1, 1, 0, 1, 1, 0],
    [0, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0],
    [0, 0, 1, 1, 1, 0, 1, 1, 0, 0, 0],
    [0, 1, 1, 1, 1, 0, 0, 1, 1, 0, 0],
    [0, 1, 1, 1, 1, 0, 0, 1, 1, 1, 0],
    [0, 0, 0, 0, 1, 1, 1, 1, 1, 0, 0],
    [0, 0, 0, 0, 0, 1, 1, 0, 1, 1, 0],
    [0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0],
  ];
  const pos3 = [11, 7]; // row, col
  const robot3 = new Robot(room3, ...pos3);

  // eslint-disable-next-line global-require
  const room4 = require('./bigroom1');
  const pos4 = [32, 25];
  const robot4 = new Robot(room4, ...pos4);

  cleanRoom(robot1);
  cleanRoom(robot2);
  cleanRoom(robot3);
  cleanRoom(robot4);
};
