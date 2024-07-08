import { useState, useCallback, useRef } from "react";
import { NodeEditor } from "flume";
import config from "./config";
import GraphDebug from "./GraphDebug";
import UI from "./UI";

function App() {
  const [nodes, setNodes] = useState({});
  const nodeEditor = useRef();
  const dateNow = useRef();

  const getJsonUpload = () =>
    new Promise((resolve) => {
      const inputFileElement = document.createElement("input");
      inputFileElement.setAttribute("type", "file");
      inputFileElement.setAttribute("multiple", "true");
      inputFileElement.setAttribute("accept", ".json");

      inputFileElement.addEventListener(
        "change",
        async (event) => {
          const { files } = event.target;
          if (!files) {
            return;
          }

          const filePromises = [...files].map((file) => file.text());

          resolve(await Promise.all(filePromises));
        },
        false
      );
      inputFileElement.click();
    });

  const saveNodes = () => {
    const nodes = nodeEditor.current.getNodes();
    console.log("saving ....", nodes);
    const jsonString = `data:text/json;chatset=utf-8,${encodeURIComponent(JSON.stringify(nodes))}`;
    const link = document.createElement("a");
    link.href = jsonString;
    link.download = "nodes.json";
    link.click();
  };

  const loadNodes = async () => {
    const jsonFiles = await getJsonUpload();
    const loadedNodes = JSON.parse(jsonFiles);
    dateNow.current = new Date().toString(); // update key (workaround to re-render graph, not necessary if we load nodes at first render)
    setNodes(loadedNodes);
    console.log("loading ....", loadedNodes);
  };

  // useCallback(
  //   (nodes) => {
  //     console.log("----------------------updated!");
  //     setNodes(nodes);
  //   },
  //   [nodes]
  // );

  return (
    <>
      <div className="graphcontainer">
        <button className="savebutton" onClick={saveNodes}>
          Save Logic
        </button>
        <button className="loadbutton" onClick={loadNodes}>
          Load Logic
        </button>
        <NodeEditor
          key={dateNow.current}
          ref={nodeEditor}
          portTypes={config.portTypes}
          nodeTypes={config.nodeTypes}
          nodes={nodes}
          onChange={setNodes}
          defaultNodes={[
            {
              type: "loadGLB",
              x: 190,
              y: -150,
            },
          ]}
        />
      </div>
      <GraphDebug nodes={nodes} />
    </>
  );
}

export default App;
