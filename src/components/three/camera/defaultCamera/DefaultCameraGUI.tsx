"use client";
import { useControls } from "leva";
import { Euler, Vector3 } from "three";
import { CameraState } from "@/types/three/state";

const DefaultCameraGUI = (defaultCameraState: CameraState) => {
  const { position, rotation, fov, zoom, near, far, focus } = useControls(
    "Default Camera Settings",
    {
      position: {
        value: [defaultCameraState.position.x, defaultCameraState.position.y, defaultCameraState.position.z],
        step: 0.1,
      },
      rotation: {
        value: [defaultCameraState.rotation.x, defaultCameraState.rotation.y, defaultCameraState.rotation.z],
        step: 0.1,
      },
      fov: { value: defaultCameraState.fov, min: 0, max: 180, step: 1 },
      zoom: { value: defaultCameraState.zoom, min: 0, max: 10, step: 0.1 },
      near: { value: defaultCameraState.near, min: 0, max: 10, step: 0.1 },
      far: { value: defaultCameraState.far, min: 0, max: 10000, step: 10 },
      focus: { value: defaultCameraState.focus, min: 0, max: 10000, step: 10 },
    },
    {
      collapsed: true,
    }
  );

  const cameraSettings: CameraState = {
    name: defaultCameraState.name,
    position: new Vector3(...position),
    rotation: new Euler(...rotation),
    fov: fov,
    zoom: zoom,
    near: near,
    far: far,
    focus: focus,
  };

  return cameraSettings;
};

export default DefaultCameraGUI;
