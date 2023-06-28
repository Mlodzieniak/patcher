import React, { useState } from "react";
type HandleToolClick = (event: React.MouseEvent<HTMLButtonElement>) => void;
export type ToolType = "pencil" | "eraser" | "start" | "end";
export enum ToolPicker {
  pencil = "pencil",
  eraser = "eraser",
  start = "start",
  end = "end",
}
interface Props {
  setTool: (tool: string) => void;
  tool: string;
}
export default function Tools(props: Props) {
  const { tool, setTool } = props;
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
      >
        Pencil
      </button>
      <button
        type="button"
        value={ToolPicker.eraser}
        className={tool === ToolPicker.eraser ? "active" : ""}
        onClick={(event) => handleToolClick(event)}
      >
        Eraser
      </button>
      <button
        type="button"
        value={ToolPicker.start}
        className={tool === ToolPicker.start ? "active" : ""}
        onClick={(event) => handleToolClick(event)}
      >
        Set Start
      </button>
      <button
        type="button"
        value={ToolPicker.end}
        className={tool === ToolPicker.end ? "active" : ""}
        onClick={(event) => handleToolClick(event)}
      >
        Set End
      </button>
      <button type="button">Clear</button>
    </div>
  );
}
