import { useEffect, useState } from "react";
interface Props {
  width: number;
  height: number;
  inspectCell: (cell: string) => void;
}

export default function Board(props: Props) {
  const { width, height, inspectCell } = props;
  const [board, setBoard] = useState<Cell[][]>([]);

  class Cell {
    x: number;
    y: number;
    isStart: boolean;
    isEnd: boolean;
    isWall: boolean;
    wasChecked: boolean;
    constructor(
      x: number,
      y: number,
      isStart = false,
      isEnd = false,
      isWall = false,
      wasSearched = false
    ) {
      this.x = x;
      this.y = y;
      this.isStart = isStart;
      this.isEnd = isEnd;
      this.isWall = isWall;
      this.wasChecked = wasSearched;
    }
  }

  useEffect(() => {
    const newBoard = [];
    for (let i = 0; i < height; i++) {
      const row = [];
      for (let j = 0; j < width; j++) {
        const newCell = new Cell(j, i);
        row.push(newCell);
      }
      newBoard.push(row);
    }
    setBoard(newBoard);
  }, [width, height]);
  return (
    <div className="board">
      {board.map((row, i) => {
        return (
          <div className="row" key={i}>
            {row.map((cell, j) => {
              return (
                <div
                  key={j}
                  className="cell"
                  data-x={cell.x}
                  data-y={cell.y}
                  onClick={() => {
                    return inspectCell(JSON.stringify(cell));
                  }}
                ></div>
              );
            })}
          </div>
        );
      })}
    </div>
  );
}

Board.defaultProps = {
  width: 10,
  height: 10,
};
