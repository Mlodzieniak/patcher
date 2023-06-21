import React, { useState } from "react";
type HandleToolClick = (event: React.MouseEvent<HTMLButtonElement>) => void;
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
        value="pencil"
        className={tool === "pencil" ? "active" : ""}
        onClick={(event) => handleToolClick(event)}
      >
        Pensil
      </button>
      <button
        type="button"
        value="eraser"
        className={tool === "eraser" ? "active" : ""}
        onClick={(event) => handleToolClick(event)}
      >
        Eraser
      </button>
      <button
        type="button"
        value="start"
        className={tool === "start" ? "active" : ""}
        onClick={(event) => handleToolClick(event)}
      >
        Set Start
      </button>
      <button
        type="button"
        value="end"
        className={tool === "end" ? "active" : ""}
        onClick={(event) => handleToolClick(event)}
      >
        Set End
      </button>
      <button type="button">Clear</button>
    </div>
  );
}
