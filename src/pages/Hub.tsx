import React, { useEffect, useState } from "react";
import Board from "../components/Board";

export default function Hub() {
  const [width, setWidth] = useState(30);
  const [height, setHeight] = useState(30);
  const [inspectedCell, setInspectedCell] = useState("");

  const checkSize = (stringSize: string): number => {
    const intSize = parseInt(stringSize);
    if (intSize > 100) return 100;
    if (intSize < 10) return 10;
    else return intSize;
  };

  return (
    <div className="hub">
      <div>Hub</div>
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
      ></Board>
    </div>
  );
}
