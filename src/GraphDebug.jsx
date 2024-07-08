import { useReducer } from "react";
import { useRootEngine } from "flume";
import engine from "./engine";
import UI from "./UI";
import attributes from "./data";
import { subscribe } from "valtio";

const GraphDebug = ({ nodes }) => {
  const [, forceUpdate] = useReducer((x) => x + 1, 0);
  const { ...inputs } = useRootEngine(nodes, engine);
  console.log("rootNode inputs", inputs);

  subscribe(attributes, () => forceUpdate());

  return (
    <div className="graphDebug">
      <h1>GRAPH DEBUG</h1>
      <UI />
      {/* {triggerGLBVisibility1 && <p>{glbURL.string}</p>} */}
    </div>
  );
};

export default GraphDebug;
