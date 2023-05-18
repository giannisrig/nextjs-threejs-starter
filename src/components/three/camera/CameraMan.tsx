import { useFrame, useThree } from "@react-three/fiber";
import { useMemo } from "react";
import CameraControls from "camera-controls";
import * as THREE from "three";
import cameraSettings from "@/libs/three/cameraSettings";

CameraControls.install({ THREE });

function CameraMan({ zoom, targetPosition, cameraPosition }) {
  const camPos = new THREE.Vector3();
  const look = new THREE.Vector3();

  // Get the ThreeJS camera
  const camera = useThree((state) => state.camera);

  // Gt the gl object from Canvas
  const gl = useThree((state) => state.gl);

  // Set up the camera controls
  const controls = useMemo(() => new CameraControls(camera, gl.domElement), [camera, gl.domElement]);

  // Return RAF to handle the cameraman controls
  return useFrame((state, delta) => {
    // zoom ? pos.set(focus.x, focus.y, focus.z + 5) : pos.set(10, 5, 40);
    zoom ? look.set(targetPosition.x, targetPosition.y, targetPosition.z - 0.2) : look.set(0, 2, 0);
    zoom && cameraPosition
      ? camPos.set(cameraPosition.x, cameraPosition.y, cameraPosition.z)
      : camPos.set(state.camera.position.x, state.camera.position.y, state.camera.position.z);
    // state.camera.position.lerp(pos, 0.5);
    // state.camera.updateProjectionMatrix();

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
