import { useFrame, useThree } from "@react-three/fiber";
import { useMemo } from "react";
import CameraControls from "camera-controls";
import * as THREE from "three";
import { DefaultCameramanSettings } from "@/types/three/settings";
import { RootState, useAppSelector } from "@/libs/store/store";
import { PerspectiveCamera } from "three";

CameraControls.install({ THREE });

interface CameraManProps {
  cameraman: DefaultCameramanSettings;
}

function CameraMan({ cameraman }: CameraManProps) {
  console.log("cameraman running:", cameraman);

  // Get the cameraman state
  const defaultCameraman: DefaultCameramanSettings = useAppSelector(
    (state: RootState) => state.three.default.cameraman as DefaultCameramanSettings
  );

  const look = new THREE.Vector3();

  // Get the ThreeJS camera
  const camera = useThree((state) => state.camera);

  // Gt the gl object from Canvas
  const gl = useThree((state) => state.gl);

  // Set up the camera controls
  const controls = useMemo(() => new CameraControls(camera, gl.domElement), [camera, gl.domElement]);

  // if (camera instanceof PerspectiveCamera) {
  //   // update camera properties
  //   camera.position.set(...position);
  //   camera.rotation.set(...rotation);
  //   camera.fov = fov;
  //   camera.zoom = zoom;
  //   camera.near = near;
  //   camera.far = far;
  //   camera.focus = focus;
  //   camera.updateProjectionMatrix();
  // }

  // Return RAF to handle the cameraman controls
  return useFrame((state, delta) => {
    // zoom ? pos.set(focus.x, focus.y, focus.z + 5) : pos.set(10, 5, 40);
    cameraman.action
      ? look.set(cameraman.targetPosition.x, cameraman.targetPosition.y, cameraman.targetPosition.z - 0.2)
      : look.set(
          defaultCameraman.targetPosition.x,
          defaultCameraman.targetPosition.y,
          defaultCameraman.targetPosition.z
        );

    // Documentation: https://yomotsu.github.io/camera-controls/classes/CameraControls.html#lerpLookAt
    // Camera man will look at
    controls
      .setLookAt(
        state.camera.position.x,
        state.camera.position.y,
        state.camera.position.z,
        look.x,
        look.y,
        look.z,
        true
      )
      .then();
    // controls.lookInDirectionOf(1, 0, 3, true).then();

    // Update the controls
    return controls.update(delta);
  });
}

export default CameraMan;
