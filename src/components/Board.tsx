import { useEffect, useState, FC } from "react";
import { Node } from "./Node";

interface Props {
  width: number;
  height: number;
  inspectCell: (cell: string) => void;
}

export const Board: FC<Props> = (props) => {
  const { width, height, inspectCell } = props;
  const [board, setBoard] = useState<[][]>([]);

  // class Cell {
  //   x: number;
  //   y: number;
  //   isStart: boolean;
  //   isEnd: boolean;
  //   isWall: boolean;
  //   discovered: boolean;
  //   constructor(
  //     x: number,
  //     y: number,
  //     isStart = false,
  //     isEnd = false,
  //     isWall = false,
  //     discovered = false
  //   ) {
  //     this.x = x;
  //     this.y = y;
  //     this.isStart = isStart;
  //     this.isEnd = isEnd;
  //     this.isWall = isWall;
  //     this.discovered = discovered;
  //   }
  // }

  useEffect(() => {
    const newBoard = [];
    for (let i = 0; i < height; i++) {
      const row = [];
      for (let j = 0; j < width; j++) {
        // const newCell = new Cell(j, i);
        const newCell = <Node x={j} y={i} />;
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
                // <div
                //   key={j}
                //   className="cell"
                //   data-x={cell.x}
                //   data-y={cell.y}
                //   onClick={() => {
                //     return inspectCell(JSON.stringify(cell));
                //   }}
                // ></div>
                cell
              );
            })}
          </div>
        );
      })}
    </div>
  );
};

Board.defaultProps = {
  width: 10,
  height: 10,
};
