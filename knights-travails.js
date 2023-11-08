function createChestBoard() {
  const arr = [];

  for (let i = 0; i < 8; i++) {
    for (let j = 0; j < 8; j++) {
      arr.push([i, j]);
    }
  }

  return arr;
}

const Node = (data, left, right) => {
  return { data, left, right };
};

const KnightNode = (
  data,
  topLeft = null,
  topRight = null,
  rightTop = null,
  rightBottom = null,
  bottomLeft = null,
  bottomRight = null,
  leftTop = null,
  leftBottom = null,
  prev = null
) => {
  return {
    data,
    topLeft,
    topRight,
    rightTop,
    rightBottom,
    bottomLeft,
    bottomRight,
    leftTop,
    leftBottom,
    prev,
  };
};

function sameRow(a, b) {
  if (a && b) {
    return a[0] === b[0];
  }

  return false;
}

const PossibleKnightMove = (arr, current, prev = null) => {
  const top = current - 16 < 0 ? null : current - 16;
  const right = sameRow(arr[current], arr[current + 2]) ? current + 2 : null;
  const bottom = current + 16 > 63 ? null : current + 16;
  const left = sameRow(arr[current], arr[current - 2]) ? current - 2 : null;
  const topLeft =
    top !== null ? (sameRow(arr[top], arr[top - 1]) ? top - 1 : null) : null;
  const topRight =
    top !== null ? (sameRow(arr[top], arr[top + 1]) ? top + 1 : null) : null;
  const rightTop = right !== null ? (right - 8 < 0 ? null : right - 8) : null;
  const rightBottom =
    right !== null ? (right + 8 < 0 ? null : right + 8) : null;
  const bottomLeft =
    bottom !== null
      ? sameRow(arr[bottom], arr[bottom - 1])
        ? bottom - 1
        : null
      : null;
  const bottomRight =
    bottom !== null
      ? sameRow(arr[bottom], arr[bottom + 1])
        ? bottom + 1
        : null
      : null;
  const leftTop = left !== null ? (left - 8 === 7 ? null : left - 8) : null;
  const leftBottom = left !== null ? (left + 8 === 7 ? null : left + 8) : null;

  return KnightNode(
    arr[current],
    arr[topLeft],
    arr[topRight],
    arr[rightTop],
    arr[rightBottom],
    arr[bottomLeft],
    arr[bottomRight],
    arr[leftTop],
    arr[leftBottom],
    prev
  );
};

const getIndex = function (arr, item) {
  return arr.findIndex((a) => a[0] === item[0] && a[1] === item[1]);
};

const Game = () => {
  const chestBoard = createChestBoard();
  let knight = [7, 1];

  function knightMoves(
    startingPoint,
    destination,
    arr = chestBoard,
    prev = null
  ) {
    if (startingPoint === null) {
      return;
    }

    const q = [];

    q.push(PossibleKnightMove(arr, getIndex(arr, startingPoint)));

    while (q.length !== 0) {
      const current = q[0];

      if (
        current.data[0] === destination[0] &&
        current.data[1] === destination[1]
      ) {
        announcePath(recursePrev(current, startingPoint));
        return recursePrev(current, startingPoint);
      }

      if (current.topLeft !== null) {
        q.push(
          PossibleKnightMove(arr, getIndex(arr, current.topLeft), current)
        );
      }
      if (current.topRight !== null) {
        q.push(
          PossibleKnightMove(arr, getIndex(arr, current.topRight), current)
        );
      }
      if (current.rightTop !== null) {
        q.push(
          PossibleKnightMove(arr, getIndex(arr, current.rightTop), current)
        );
      }
      if (current.rightBottom !== null) {
        q.push(
          PossibleKnightMove(arr, getIndex(arr, current.rightBottom), current)
        );
      }
      if (current.bottomLeft !== null) {
        q.push(
          PossibleKnightMove(arr, getIndex(arr, current.bottomLeft), current)
        );
      }
      if (current.bottomRight !== null) {
        q.push(
          PossibleKnightMove(arr, getIndex(arr, current.bottomRight), current)
        );
      }
      if (current.leftTop !== null) {
        q.push(
          PossibleKnightMove(arr, getIndex(arr, current.leftTop), current)
        );
      }
      if (current.leftBottom !== null) {
        q.push(
          PossibleKnightMove(arr, getIndex(arr, current.leftBottom), current)
        );
      }

      // Removing the element at front
      q.shift();
    }
  }

  const changeKnightPos = (destination) => {
    const data = knightMoves(knight, destination);
    knight = data[data.length - 1];
  };

  const announcePath = (data) => {
    const word = data.length - 1 === 1 ? "move" : "moves";
    const string = `You made it in ${
      data.length - 1
    } ${word}! Here's your path`;
    console.log(string);
    data.forEach((item) => console.log(`[${item}]`));
  };

  const recursePrev = (data, start) => {
    if (data.prev === null) {
      return [start];
    } else {
      return [...recursePrev(data.prev, start), data.data];
    }
  };

  const showBoard = (board = chestBoard) => {
    for (let i = 0; i < 8; i++) {
      const start = i * 8;
      const end = (i + 1) * 8;
      console.log(chestBoard.slice(start, end).join(`|`));
    }
  };

  return {
    get knight() {
      return knight;
    },
    chestBoard,
    showBoard,
    knightMoves,
    changeKnightPos,
  };
};

const game = Game();

game.showBoard();
game.knightMoves([0, 0], [7, 7]);
game.changeKnightPos([7, 7]);
console.log(game.knight);
game.changeKnightPos([0, 0]);
console.log(game.knight);
