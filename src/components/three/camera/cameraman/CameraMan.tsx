import { useFrame, useThree } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import CameraControls from "camera-controls";
import * as THREE from "three";
import CameraTarget from "@/components/three/camera/cameraTarget/CameraTarget";
import CameramanCamera from "@/components/three/camera/cameramanCamera/CameramanCamera";

CameraControls.install({ THREE });

function CameraMan({ showGUI = false }) {
  // Get the ThreeJS camera and the gl object from Canvas
  const { camera, gl } = useThree();

  // Set up the camera controls
  const controls = useMemo(() => new CameraControls(camera, gl.domElement), [camera, gl.domElement]);

  // Ref objects, these refs are used for the cameraman actions
  const cameramanRef = useRef(null);

  // RAF to handle the cameraman controls
  useFrame((state, delta) => {
    // Make sure the cameraman objects are defined
    if (cameramanRef.current && cameramanRef.current.children[0] && cameramanRef.current.children[1]) {
      // Set the position of the camera and the target to look at
      // Documentation: https://yomotsu.github.io/camera-controls/classes/CameraControls.html#setLookAt
      controls.setLookAt(
        cameramanRef.current.children[0].position.x,
        cameramanRef.current.children[0].position.y,
        cameramanRef.current.children[0].position.z,
        cameramanRef.current.children[1].position.x,
        cameramanRef.current.children[1].position.y,
        cameramanRef.current.children[1].position.z,
        true
      );
    }

    // Update the controls
    controls.update(delta);
  });

  return (
    <group ref={cameramanRef}>
      {/* This component is used for the cameraman's camera position and for zoom/fov */}
      <CameramanCamera showGUI={showGUI} />
      {/* This component is used for the cameraman's target position to look at */}
      <CameraTarget showGUI={showGUI} />
    </group>
  );
}

export default CameraMan;
