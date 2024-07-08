import { FlumeConfig, Colors, Controls } from "flume";
import attributes from "./data";
import LoadGLBPortCtrl from "./LoadGLBPortCtrl";

const config = new FlumeConfig();

config.addPortType({
  type: "boolean",
  name: "boolean",
  label: "Boolean",
  color: Colors.green,
  controls: [
    Controls.checkbox({
      name: "boolean",
      label: "True/False",
    }),
  ],
});

config.addPortType({
  type: "url",
  name: "url",
  label: "URL",
  hidePort: true,
  color: Colors.blue,
  controls: [
    Controls.text({
      name: "string",
      label: "Text",
    }),
  ],
});

config.addPortType({
  type: "string",
  name: "string",
  label: "string",
  hidePort: true,
  color: Colors.blue,
  controls: [
    Controls.text({
      name: "string",
      label: "Text",
      defaultValue: "toto",
    }),
  ],
});

config.addPortType({
  type: "attribute",
  name: "attribute",
  label: "attribute",
  color: Colors.orange,
  controls: [
    Controls.select({
      defaultValue: attributes.length !== 0 ? attributes[0].name : "",
      options: attributes.map((att) => ({ value: att.name, label: att.name })),
    }),
  ],
});

config.addPortType({
  type: "value",
  name: "value",
  label: "Value",
  color: Colors.orange,
});

config.addPortType({
  type: "loadGLBPort",
  name: "loadGLBPort",
  label: "load Glb",
  hidePort: true,
  color: Colors.green,
  controls: [
    Controls.custom({
      name: "loadGLBPortControl",
      label: "load Glb",
      defaultValue: "toto.glb",
      render: (data, onChange, context, redraw, portProps, inputData) => <LoadGLBPortCtrl inputData={inputData} url={data} onChange={onChange} />,
    }),
  ],
});

config.addPortType({
  type: "actionShowGLBEntries",
  name: "actionShowGLBEntries",
  label: "",
  hidePort: true,
  color: Colors.green,
  controls: [
    Controls.custom({
      name: "entriesControl",
      label: "",
      defaultValue: ["entry"],
      //render: (data, onChange) => <></>,
    }),
  ],
});

// config.addRootNodeType({
//   type: "loadGLB",
//   label: "Load GLB",
//   description: "Load GLB 3D models",
//   initialWidth: 400,
//   inputs: (ports) => (data) => {
//     const template = (data && data.ids && data.ids.string) || "";
//     const ids = template.split("\n");

//     return [
//       ports.string({ name: "ids", label: "Entries IDs", hidePort: true }),
//       ...ids.flatMap((id, index) => [
//         ports.boolean({
//           name: "triggerGLBVisibility" + index,
//           label: "show 3D Model",
//         }),
//         ports.loadGLBPort({
//           name: "glbURL" + index,
//           label: id,
//         }),
//       ]),
//     ];
//   },
// });

config.addRootNodeType({
  type: "loadGLB",
  label: "Load GLB",
  description: "Load GLB 3D models",
  initialWidth: 400,
  inputs: (ports) => (data) => {
    const entries = (data && data.ids && data.ids.entriesControl) || [];
    console.log("root node data", data);

    const nbEntries = entries.length;
    let nbFilledEntries = 0;
    entries.map((e, index) => {
      if (data["glbURL" + index] && data["glbURL" + index] !== "") nbFilledEntries++;
    });

    if (data && data.ids && data.ids.entriesControl && nbFilledEntries === nbEntries) data.ids.entriesControl.push("entry");

    // console.log(nbFilledEntries);

    // const test = [
    //   ports.actionShowGLBEntries({ name: "ids", label: "", hidePort: true }),
    //   ...entries.flatMap((id, index) => [
    //     ports.boolean({
    //       name: "triggerGLBVisibility" + index,
    //       label: "show 3D Model",
    //     }),
    //     ports.loadGLBPort({
    //       name: "glbURL" + index,
    //       label: id,
    //     }),
    //   ]),
    // ];
    // console.log("test", test);

    // const test2 = [
    //   ports.actionShowGLBEntries({ name: "ids", label: "", hidePort: true }),
    //   ports.boolean({
    //     name: "triggerGLBVisibility0",
    //     label: "show 3D Model",
    //   }),
    //   ports.loadGLBPort({
    //     name: "glbURL0",
    //     label: "a",
    //   }),
    //   ports.boolean({
    //     name: "triggerGLBVisibility1",
    //     label: "show 3D Model",
    //   }),
    //   ports.loadGLBPort({
    //     name: "glbURL1",
    //     label: "b",
    //   }),
    // ];
    // console.log("test2", test2);

    /* let result = [];
    result.push(ports.actionShowGLBEntries({ name: "ids", label: "", hidePort: true }));
    for (let i = 0; i < entries.length; i++) {
      result.push(
        ports.boolean({
          name: "triggerGLBVisibility" + i,
          label: "show 3D Model",
        })
      );

      result.push(
        ports.loadGLBPort({
          name: "glbURL" + i,
          label: "url",
        })
      );
    }

    console.log(result);

    return result;*/

    return [
      ports.actionShowGLBEntries({ name: "ids", label: "", hidePort: true }),
      ...entries.flatMap((id, index, array) => [
        ports.boolean({
          name: "triggerGLBVisibility" + index,
          label: "show 3D Model",
        }),
        /*ports.loadGLBPort({
          name: "glbURL" + index,
          label: id,
        }),*/
        ports.string({
          name: "glbURL" + index,
          label: "Model URL",
        }),
      ]),

      // ports.boolean({
      //   name: "triggerGLBVisibility" + 0,
      //   label: "show 3D Model",
      // }),
      // ports.loadGLBPort({
      //   name: "glbURL" + 0,
      //   label: "id",
      // }),
      // ports.boolean({
      //   name: "triggerGLBVisibility" + 1,
      //   label: "show 3D Model",
      // }),
      // ports.loadGLBPort({
      //   name: "glbURL" + 1,
      //   label: "id",
      // }),
    ];
  },
});

config.addNodeType({
  type: "attribute_equals",
  label: "Equals ?",
  description: "Test attribute value",
  inputs: (ports) => (data) => {
    const selectedAttribute = data.attribute && data.attribute.length !== 0 && data.attribute.select;
    let vals = [];
    let controlsOptions = [];
    let defaultControlValue = "";
    if (selectedAttribute) {
      vals = attributes.find((e) => e.name === selectedAttribute).values;
      controlsOptions = vals.map((v) => ({ value: v, label: v }));
      if (controlsOptions.length !== 0) defaultControlValue = controlsOptions[0].value;
      // console.log(defaultControlValue);
    }
    return [ports.attribute({ name: "attribute", label: "Attribute", hidePort: true }), ports.value({ hidePort: true, controls: [Controls.select({ defaultValue: defaultControlValue, options: controlsOptions })] })];
  },
  outputs: (ports) => [ports.boolean()],
});

config.addNodeType({
  type: "and",
  label: "And",
  description: "Logic And operation",
  initialWidth: 100,
  inputs: (ports) => [
    ports.boolean({
      name: "a",
      label: "A",
    }),
    ports.boolean({
      name: "b",
      label: "B",
    }),
  ],
  outputs: (ports) => [ports.boolean()],
});

console.log(config);

config.addNodeType({
  type: "reverseBoolean",
  label: "Reverse True/False",
  description: "Reverses a true/false value",
  initialWidth: 140,
  inputs: (ports) => [ports.boolean()],
  outputs: (ports) => [ports.boolean()],
});

config.addNodeType({
  type: "test",
  label: "test",
  description: "test",
  inputs: (ports) => [
    ports.boolean({
      name: "triggerGLBVisibility",
      label: "show 3D Model",
    }),
    ports.loadGLBPort({
      name: "glbURL",
      label: "url",
    }),
  ],
  outputs: (ports) => [ports.boolean()],
});

export default config;
