import { useReducer, useState } from "react";

// interface Props{

// }
enum NodeState {
  start = "start",
  end = "end",
  wall = "wall",
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

export const Node = (props: Cords) => {
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
    }
  };
  const [params, dispatch] = useReducer(reducer, {
    isStart: false,
    isEnd: false,
    isWall: false,
  });

  const [discovered, setDiscovered] = useState<boolean>(false);
  const [x, setX] = useState<number>(props.x);
  const [y, setY] = useState<number>(props.y);

  return (
    <div className="cell">
      {x},{y}
    </div>
  );
};
