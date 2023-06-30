import React, { useState } from "react";
type HandleToolClick = (event: React.MouseEvent<HTMLButtonElement>) => void;
export type ToolType = "pencil" | "eraser" | "start" | "end" | "none";
export enum ToolPicker {
  pencil = "pencil",
  eraser = "eraser",
  start = "start",
  end = "end",
  none = "none",
}
interface Props {
  setTool: (tool: string) => void;
  tool: string;
  run: boolean;
  clear: boolean;
  setClear: React.Dispatch<React.SetStateAction<boolean>>;
}
export default function Tools(props: Props) {
  const { tool, setTool, run, clear, setClear } = props;
  const handleToolClick: HandleToolClick = (event) => {
    setTool(event.currentTarget.value);
  };
  return (
    <div className="toolbar">
      <button
        type="button"
        value={ToolPicker.pencil}
        className={tool === ToolPicker.pencil ? "active" : ""}
        onClick={(event) => handleToolClick(event)}
        disabled={run}
      >
        Pencil
      </button>
      <button
        type="button"
        value={ToolPicker.eraser}
        className={tool === ToolPicker.eraser ? "active" : ""}
        onClick={(event) => handleToolClick(event)}
        disabled={run}
      >
        Eraser
      </button>
      <button
        type="button"
        value={ToolPicker.start}
        className={tool === ToolPicker.start ? "active" : ""}
        onClick={(event) => handleToolClick(event)}
        disabled={run}
      >
        Set Start
      </button>
      <button
        type="button"
        value={ToolPicker.end}
        className={tool === ToolPicker.end ? "active" : ""}
        onClick={(event) => handleToolClick(event)}
        disabled={run}
      >
        Set End
      </button>
      <button
        type="button"
        disabled={run || clear}
        onClick={() => {
          setClear(true);
        }}
      >
        Clear
      </button>
    </div>
  );
}
