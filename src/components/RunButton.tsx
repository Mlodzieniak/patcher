import React from "react";
import { Colors } from "./Node";
enum ButtonValue {
  run = "Run",
  stop = "Stop",
}
interface Props {
  run: boolean;
  setRun: React.Dispatch<React.SetStateAction<boolean>>;
}
export default function RunButton({ run, setRun }: Props) {
  return (
    <button
      type="button"
      onClick={() => setRun(!run)}
      style={
        run ? { backgroundColor: Colors.end } : { backgroundColor: Colors.path }
      }
    >
      {run ? ButtonValue.stop : ButtonValue.run}
    </button>
  );
}
