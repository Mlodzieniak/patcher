import { useEffect, useReducer, useState } from "react";

// interface Props{

// }
enum NodeState {
  start = "start",
  end = "end",
  wall = "wall",
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
  inspectCell: (cell: string) => void;
}

export const Node = (props: Props) => {
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
  //   const colorReducer = (state, action:)=>{

  //   }
  const [color, setColor] = useState<Colors>(Colors.normal);

  const [discovered, setDiscovered] = useState<boolean>(false);
  const [x, setX] = useState<number>(props.cords.x);
  const [y, setY] = useState<number>(props.cords.y);
  //   console.log(params);
  useEffect(() => {
    // const {isStart, isEnd, isWall} = parm
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

  return (
    <div
      className="cell"
      style={{ backgroundColor: color }}
      onClick={() =>
        props.inspectCell(`x:${x}, y:${y}, ${JSON.stringify(params)}`)
      }
    >
      {x}
    </div>
  );
};
