import { useState } from "react";
import { Board } from "../components/Board";
import Tools, { ToolType } from "../components/Tools";
export interface Location {
  x: number;
  y: number;
}
// type CellCords = (event: MouseEvent) => Location;
// type DrawWall = (cords: Location) => void;

export default function Hub() {
  const [width, setWidth] = useState(15);
  const [height, setHeight] = useState(15);
  const [inspectedCell, setInspectedCell] = useState("");
  const [tool, setTool] = useState<ToolType>("pencil");

  const checkSize = (stringSize: string): number => {
    const intSize = parseInt(stringSize);
    if (intSize > 100) return 100;
    if (intSize < 10) return 10;
    else return intSize;
  };

  return (
    <div className="hub">
      <div>Hub</div>
      <Tools setTool={setTool} tool={tool}></Tools>
      <div className="cell-data">{inspectedCell}</div>
      <label htmlFor="">
        Width
        <input
          type="number"
          onChange={(e) => {
            setWidth(checkSize(e.target.value));
          }}
        />
      </label>
      <label htmlFor="">
        Height
        <input
          type="number"
          onChange={(e) => {
            setHeight(checkSize(e.target.value));
          }}
        />
      </label>
      <div className="display-size">
        {width}x{height}
      </div>
      <Board
        width={width}
        height={height}
        inspectCell={setInspectedCell}
        currentTool={tool}
      ></Board>
    </div>
  );
}
