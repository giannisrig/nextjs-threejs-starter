import { ThreeState } from "@/types/three";
import { Euler, Vector3 } from "three";

//{"position":[38,5,5]}
const threeSettings: ThreeState = {
  activeScene: 0,
  default: {
    camera: {
      name: "default",
      position: new Vector3(112, 11, 77),
      rotation: new Euler(0, 0, 0, "XYZ"),
      fov: 66,
      near: 0.1,
      far: 1000,
      zoom: 1,
      focus: 20,
    },
    cameraman: {
      action: false,
      cameraPosition: new Vector3(112, 11, 77),
      targetPosition: new Vector3(16, 11, -35),
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
      cameraman: {
        cameraPosition: new Vector3(112, 11, 77),
        targetPosition: new Vector3(16, 11, -35),
      },
    },
    {
      name: "Scene2",
      objectsDependencies: ["Box2"],
      cameraman: {
        cameraPosition: new Vector3(0, 11, 9),
        targetPosition: new Vector3(48, 4, 294),
      },
    },
  ],
};

export default threeSettings;
