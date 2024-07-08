import { useEffect } from "react";

export default function LoadGLBPortCtrl(props) {
  useEffect(() => {
    console.log("props", props);
  });

  return (
    <div>
      <div className="load-glb-port-container">
        <input className="load-glb-port-inputs" onChange={(e) => props.onChange(e.target.value)} value={props.url}></input>
        <button>✕</button>
        <button>+</button>
      </div>
      <hr className="separator"></hr>
    </div>
  );
}
