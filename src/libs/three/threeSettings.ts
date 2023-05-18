import { ThreeSettings } from "@/types/three";
import { Euler, Vector3 } from "three";
//{"position":[38,5,5]}
const threeSettings: ThreeSettings = {
  default: {
    camera: {
      position: new Vector3(32, 5, 2),
      rotation: new Euler(0, 0, 0, "XYZ"),
      fov: 75,
      near: 0.1,
      far: 1000,
      zoom: 1,
      focus: 20,
    },
    cameraman: {
      targetPosition: new Vector3(8, 7, -19),
    },
  },
  scenes: [
    {
      name: "GlobalScene",
      objectsDependencies: [],
    },
    {
      name: "Scene1",
      objectsDependencies: ["Scene1GltfModel"],
      camera: {
        position: new Vector3(38, 5, 5),
      },
      cameraman: {
        targetPosition: new Vector3(8, 7, -19),
      },
    },
    {
      name: "Scene2",
      objectsDependencies: ["Box2"],
      camera: {
        position: new Vector3(0, 11, 9),
      },
      cameraman: {
        targetPosition: new Vector3(48, 4, 294),
      },
    },
  ],
};

export default threeSettings;
