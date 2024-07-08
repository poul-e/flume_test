import { RootEngine } from "flume";
import config from "./config";
import attributes from "./data";

const resolvePorts = (portType, data) => {
  //console.log("--- resolving port :", data);
  switch (portType) {
    case "string":
      return data.string;
    case "boolean":
      return data.boolean;
    default:
      return data;
  }
};

const resolveNodes = (node, inputValues, nodeType, context) => {
  // console.log("resolving node :", node.type);
  switch (node.type) {
    case "and": {
      //console.log("and", inputValues.a && inputValues.b);
      return { boolean: inputValues.a && inputValues.b };
    }
    case "attribute_equals": {
      const attribute = attributes.find((a) => a.name === inputValues.attribute.select);
      // console.log("attribute_equals", attribute.currentValue === inputValues.value.select);
      return { boolean: attribute.currentValue === inputValues.value.select };
    }
    case "reverseBoolean":
      return { boolean: !inputValues.boolean };
    default:
      return inputValues;
  }
};

const engine = new RootEngine(config, resolvePorts, resolveNodes);

export default engine;
