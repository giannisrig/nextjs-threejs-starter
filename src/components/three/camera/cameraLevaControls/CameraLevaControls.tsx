"use client";
import { Euler, PerspectiveCamera, Vector3 } from "three";
import { useThree } from "@react-three/fiber";
import { CameraState } from "@/types/three/state";
import CameraGUI from "@/components/three/camera/cameraLevaControls/CameraGUI";
import { useEffect } from "react";

const CameraLevaControls = ({ showGUI = true }) => {
  // Get the Scene camera
  const { camera }: { camera: PerspectiveCamera } = useThree();

  // Set the default camera state
  const defaultCameraState: CameraState = {
    position: new Vector3(150, 11, 77),
    rotation: new Euler(0, 0, 0, "XYZ"),
    fov: 37,
    near: 0.1,
    far: 4000,
    zoom: 1,
    focus: 20,
  };

  // Set up the default camera settings
  const defaultCameraSettings: CameraState = showGUI ? CameraGUI(defaultCameraState) : defaultCameraState;

  useEffect(() => {
    // update camera properties
    // camera.position.set(...defaultCameraSettings.position.toArray());
    camera.rotation.set(defaultCameraSettings.rotation.x, defaultCameraSettings.rotation.y, defaultCameraSettings.rotation.z);
    camera.fov = defaultCameraSettings.fov;
    camera.zoom = defaultCameraSettings.zoom;
    camera.near = defaultCameraSettings.near;
    camera.far = defaultCameraSettings.far;
    camera.updateProjectionMatrix();

    // console.log("Will start loading: ", sceneState.name);
  }, [defaultCameraSettings, camera]);

  return <></>;
};

export default CameraLevaControls;
