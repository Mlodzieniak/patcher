import { useEffect, useState, FC } from "react";
import { Node } from "./Node";
import { ToolType } from "./Tools";
// import { Location } from "../pages/Hub";
interface Props {
  width: number;
  height: number;
  currentTool: ToolType;
  inspectCell: (cell: string) => void;
}
export interface StartEndLocation {
  x: number | null;
  y: number | null;
}

export const Board: FC<Props> = (props) => {
  const { width, height, inspectCell, currentTool } = props;
  const [board, setBoard] = useState([]);
  const [start, setStart] = useState<StartEndLocation>({ x: null, y: null });
  const [end, setEnd] = useState<StartEndLocation>({ x: null, y: null });

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
            start={start}
            end={end}
            setStart={setStart}
            setEnd={setEnd}
          />
        );
        row.push(newCell);
      }
      newBoard.push(row);
    }
    setBoard(newBoard);
  }, [width, height, currentTool, start, end]);
  return (
    <div className="board">
      {board.map((row, i) => {
        return (
          <div className="row" key={i}>
            {row.map((cell: JSX.Element) => {
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
