import React from "react";

type HandleToolClick = (event: React.MouseEvent<HTMLButtonElement>) => void;
export type Algorithm = "dijkstra" | "a";
export enum AlgorithmPicker {
  dijkstra = "dijkstra",
  a = "a",
}
interface Props {
  setAlgorithm: (tool: string) => void;
  algorithm: string;
}
export default function AlgoPanel(props: Props) {
  const { algorithm, setAlgorithm } = props;
  const handleToolClick: HandleToolClick = (event) => {
    setAlgorithm(event.currentTarget.value);
  };
  return (
    <div className="toolbar">
      <button
        type="button"
        value={AlgorithmPicker.dijkstra}
        className={algorithm === AlgorithmPicker.dijkstra ? "active" : ""}
        onClick={(event) => handleToolClick(event)}
      >
        Dijkstra
      </button>
      <button
        type="button"
        value={AlgorithmPicker.a}
        className={algorithm === AlgorithmPicker.a ? "active" : ""}
        onClick={(event) => handleToolClick(event)}
      >
        A*
      </button>
    </div>
  );
}
