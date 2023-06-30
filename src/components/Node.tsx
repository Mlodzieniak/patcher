import {
  useEffect,
  useReducer,
  useRef,
  useState,
  MutableRefObject,
} from "react";
import { ToolPicker, ToolType } from "./Tools";
import { Location } from "../pages/Hub";
import { StartEndLocation } from "./Board";

enum NodeState {
  start = "start",
  end = "end",
  wall = "wall",
  normal = "normal",
}
export enum Colors {
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
interface Props {
  clear: boolean;
  cords: Location;
  currentTool: ToolType;
  inspectCell: (cell: string) => void;
  start: StartEndLocation;
  end: StartEndLocation;
  setStart: React.Dispatch<React.SetStateAction<StartEndLocation>>;
  setEnd: React.Dispatch<React.SetStateAction<StartEndLocation>>;
}

export const Node = (props: Props) => {
  const {
    cords,
    inspectCell,
    currentTool,
    start,
    end,
    setStart,
    setEnd,
    clear,
  } = props;
  const { x, y } = cords;
  const [color, setColor] = useState<Colors>(Colors.normal);
  const [discovered, setDiscovered] = useState<boolean>(false);

  const reducer = (state: NodeParams, action: NodeState) => {
    switch (action) {
      case NodeState.start:
        setStart({ x, y });
        return {
          ...state,
          isStart: true,
          isEnd: false,
          isWall: false,
        };
      case NodeState.end:
        setEnd({ x, y });

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
  useEffect(() => {
    // console.log("start end change");
    if (params.isStart && start) {
      if (start.x !== x || start.y !== y) dispatch(NodeState.normal);
    } else if (params.isEnd && end) {
      if (end.x !== x || end.y !== y) dispatch(NodeState.normal);
    }
  }, [start, end]);
  useEffect(() => {
    if (clear) dispatch(NodeState.normal);
  }, [clear]);

  return (
    <div
      className="cell"
      style={{ backgroundColor: color }}
      onMouseDown={handleClick}
      onMouseEnter={handleEnter}
    ></div>
  );
};
