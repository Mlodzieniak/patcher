import { useEffect, useState, FC } from "react";
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
  const [mouseHold, setMouseHold] = useState(false);

  // useEffect(() => {
  //   switch(currentTool){
  //     case ToolPicker.pencil:

  //   }
  // }, [currentTool]);
  useEffect(() => {
    const handleMouseDown = () => {
      setMouseHold(true);
    };
    const handleMouseUp = () => {
      setMouseHold(false);
    };
    document.addEventListener("mousedown", handleMouseDown);

    document.addEventListener("mouseup", handleMouseUp);
    document.addEventListener("mousemove", () => {
      console.log(mouseHold);
    });
    return () => {
      document.removeEventListener("mousedown", handleMouseDown);

      document.removeEventListener("mouseup", handleMouseUp);
    };
  }, []);

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
            mouseHold={mouseHold}
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
