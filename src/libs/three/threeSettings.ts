import { ThreeState } from "@/types/three";
import { Euler, Vector3 } from "three";

//{"position":[38,5,5]}
const threeSettings: ThreeState = {
  activeScene: 0,
  default: {
    camera: {
      name: "default",
      position: new Vector3(150, 11, 77),
      rotation: new Euler(0, 0, 0, "XYZ"),
      fov: 37,
      near: 0.1,
      far: 4000,
      zoom: 1,
      focus: 20,
    },
    cameraman: {
      cameraPosition: new Vector3(150, 11, 77),
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
        cameraPosition: new Vector3(112, 11, 77), //{"cameraPosition":[115,11,62]}
        targetPosition: new Vector3(-18, 14, -31), //{"targetPosition":[-18,14,-31]}
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
