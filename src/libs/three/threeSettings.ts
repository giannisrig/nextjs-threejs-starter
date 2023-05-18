import { ThreeSettings } from "@/types/three";
import { Euler, Vector3 } from "three";

const threeSettings: ThreeSettings = {
  default: {
    camera: {
      position: new Vector3(180, 14, 0),
      rotation: new Euler(0, 0, 0, "XYZ"),
      fov: 75,
      near: 0.1,
      far: 1000,
      zoom: 1,
      focus: 20,
    },
    cameraman: {
      zoom: false,
      targetPosition: new Vector3(0, 2, 0),
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
    },
    {
      name: "Scene2",
      objectsDependencies: ["Box2"],
    },
  ],
};

export default threeSettings;
