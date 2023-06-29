import { useEffect, useReducer, useRef, useState } from "react";
import { ToolPicker, ToolType } from "./Tools";

enum NodeState {
  start = "start",
  end = "end",
  wall = "wall",
  normal = "normal",
}
enum Colors {
  end = "#d72638", // red
  wall = "#232528", // black
  start = "#3f88c5", // blue
  searched = "#ffc914", //yellow
  path = "#0cca4a", //green
  normal = "#fcfafa", // white
}

interface NodeParams {
  isStart: boolean;
  isEnd: boolean;
  isWall: boolean;
}
interface Cords {
  x: number;
  y: number;
}
interface Props {
  cords: Cords;
  currentTool: ToolType;
  inspectCell: (cell: string) => void;
}

export const Node = (props: Props) => {
  const { cords, inspectCell, currentTool } = props;
  const [color, setColor] = useState<Colors>(Colors.normal);
  const [discovered, setDiscovered] = useState<boolean>(false);
  const [x, setX] = useState<number>(cords.x);
  const [y, setY] = useState<number>(cords.y);
  //   const [isMouseHold, setMouseHold] = useEffect(mouseHold);

  const reducer = (state: NodeParams, action: NodeState) => {
    switch (action) {
      case NodeState.start:
        return {
          ...state,
          isStart: true,
          isEnd: false,
          isWall: false,
        };
      case NodeState.end:
        return {
          ...state,
          isStart: false,
          isEnd: true,
          isWall: false,
        };
      case NodeState.wall:
        return {
          ...state,
          isStart: false,
          isEnd: false,
          isWall: true,
        };

      case NodeState.normal:
        return {
          ...state,
          isStart: false,
          isEnd: false,
          isWall: false,
        };
    }
  };

  const [params, dispatch] = useReducer(reducer, {
    isStart: false,
    isEnd: false,
    isWall: false,
  });
  const mouseHold = useRef(false);

  const handleClick = () => {
    inspectCell(`x:${x}, y:${y}, ${JSON.stringify(params)}`);
    switch (currentTool) {
      case ToolPicker.pencil:
        dispatch(NodeState.wall);
        break;
      case ToolPicker.eraser:
        dispatch(NodeState.normal);
        break;
      case ToolPicker.end:
        dispatch(NodeState.end);
        break;
      case ToolPicker.start:
        dispatch(NodeState.start);
        break;
    }
  };
  const handleEnter = () => {
    if (mouseHold.current) handleClick();
  };
  useEffect(() => {
    if (params.isStart) {
      setColor(Colors.start);
    } else if (params.isEnd) {
      setColor(Colors.end);
    } else if (params.isWall) {
      setColor(Colors.wall);
    } else {
      setColor(Colors.normal);
    }
  }, [params]);
  useEffect(() => {
    const handleMouseDown = () => {
      mouseHold.current = true;
    };
    const handleMouseUp = () => {
      mouseHold.current = false;
    };
    document.addEventListener("mousedown", handleMouseDown);
    document.addEventListener("mouseup", handleMouseUp);

    return () => {
      document.removeEventListener("mousedown", handleMouseDown);
      document.removeEventListener("mouseup", handleMouseUp);
    };
  }, []);

  return (
    <div
      className="cell"
      style={{ backgroundColor: color }}
      onMouseDown={handleClick}
      onMouseEnter={handleEnter}
    ></div>
  );
};
