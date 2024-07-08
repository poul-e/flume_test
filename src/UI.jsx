import { useState } from "react";
import attributes from "./data";
import { useSnapshot } from "valtio";

const UI = () => {
  //let [attribute, setAttribute] = useState("");

  const snap = useSnapshot(attributes);

  const handleAttributeValueChange = (e, attr) => {
    //change current value for updated attribute
    attributes.find((a) => a.name === attr.name).currentValue = e.target.value;

    // console.log(attributes);
  };

  return (
    <div className="ui">
      {snap.map((attr, attrIndex) => (
        <div className="attribute_dropdown" key={attrIndex}>
          {attr.name}
          <br />
          <select key={attrIndex} defaultValue={attr.currentValue} onChange={(e) => handleAttributeValueChange(e, attr)}>
            {attr.values.map((val, valIndex) => (
              <option key={valIndex} value={val} /*selected={val === attr.currentValue}*/>
                {val}
              </option>
            ))}
          </select>
        </div>
      ))}
    </div>
  );
};

export default UI;
