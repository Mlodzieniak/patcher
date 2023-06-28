import { useEffect, useState, FC } from "react";
import { Node } from "./Node";

interface Props {
  width: number;
  height: number;
  inspectCell: (cell: string) => void;
}

export const Board: FC<Props> = (props) => {
  const { width, height, inspectCell } = props;
  const [board, setBoard] = useState<[]>([]);

  useEffect(() => {
    const newBoard = [];
    for (let i = 0; i < height; i++) {
      const row = [];
      for (let j = 0; j < width; j++) {
        const newCell = (
          <Node
            cords={{ x: j, y: i }}
            inspectCell={inspectCell}
            key={`${i}${j}`}
          />
        );
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
              return cell;
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
