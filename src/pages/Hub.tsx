import { useEffect, useState } from "react";
import { Board } from "../components/Board";
import Tools, { ToolPicker, ToolType } from "../components/Tools";
import AlgoPanel from "../components/AlgoPanel";
import { Algorithm } from "../components/AlgoPanel";
import RunButton from "../components/RunButton";
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
  const [algorithm, setAlgorithm] = useState<Algorithm>("dijkstra");
  const [run, setRun] = useState<boolean>(false); // When algorithm runs drawing is disabled
  const checkSize = (stringSize: string): number => {
    const intSize = parseInt(stringSize);
    if (intSize > 100) return 100;
    if (intSize < 10) return 10;
    else return intSize;
  };

  useEffect(() => {
    run ? setTool(ToolPicker.none) : setTool(ToolPicker.pencil);
  }, [run]);
  return (
    <div className="hub">
      <RunButton run={run} setRun={setRun}></RunButton>
      <AlgoPanel
        setAlgorithm={setAlgorithm}
        algorithm={algorithm}
        run={run}
      ></AlgoPanel>
      <Tools setTool={setTool} tool={tool} run={run}></Tools>
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
