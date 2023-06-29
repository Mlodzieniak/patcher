import { useEffect, useState, FC, useRef } from "react";
import { Node } from "./Node";
import { ToolType, ToolPicker } from "./Tools";
interface Props {
  width: number;
  height: number;
  currentTool: ToolType;
  inspectCell: (cell: string) => void;
}

export const Board: FC<Props> = (props) => {
  const { width, height, inspectCell, currentTool } = props;
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
            currentTool={currentTool}
          />
        );
        row.push(newCell);
      }
      newBoard.push(row);
    }
    setBoard(newBoard);
  }, [width, height, currentTool]);
  return (
    <div className="board">
      {board.map((row, i) => {
        return (
          <div className="row" key={i}>
            {row.map((cell) => {
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
