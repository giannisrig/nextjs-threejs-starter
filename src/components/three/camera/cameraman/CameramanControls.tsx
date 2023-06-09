"use client";
import { useFrame, useThree } from "@react-three/fiber";
import { useEffect, useRef, useState } from "react";
import CameraTarget from "@/components/three/camera/cameraTarget/CameraTarget";
import CameramanCamera from "@/components/three/camera/cameramanCamera/CameramanCamera";
import useThreeCameramanState from "@/libs/hooks/useThreeCameramanState";
import { OrbitControls } from "@react-three/drei";
import { Mesh } from "three";
import * as React from "react";
import { OrbitControls as OrbitControlsImpl } from "three-stdlib/controls/OrbitControls";

function CameramanControls() {
  // Get the ThreeJS camera and the gl object from Canvas
  const { camera, gl } = useThree();

  const [action, setAction] = useState(false);
  const [changed, setChanged] = useState(false);

  // Ref objects, these refs are used for the cameraman actions
  const cameramanRef = useRef(null);
  const orbit = useRef<OrbitControlsImpl>(null);

  // Get the active cameraman state
  const { cameramanState } = useThreeCameramanState();

  // We need this as state so that we can have a camera transition when the page changes
  const [orbitTarget] = useState(cameramanState.targetPosition);

  // Triggered every time the Leva target position changes
  useEffect(() => {
    if (changed) {
      // Set the action so that the useFrame is running
      setAction(true);

      // After 2 sec, the camera transition will have finished
      setTimeout(() => {
        // Make sure there's an active camera action
        if (action) {
          if (cameramanRef.current) {
            const cameraman: Mesh = cameramanRef.current;

            // Set the global camera position with the one from the cameraman camera
            camera.position.set(cameraman.children[0].position.x, cameraman.children[0].position.y, cameraman.children[0].position.z);

            // Set the global camera to look at the position of cameraTarget's
            camera.lookAt(cameraman.children[1].position.x, cameraman.children[1].position.y, cameraman.children[1].position.z);
          }

          // Update the projection matrix of the camera because we made changes
          camera.updateProjectionMatrix();
        }

        // Stop the camera action
        setAction(false);

        // Set the changed back to false
        setChanged(false);
      }, 2500);
    }
  }, [action, camera, changed, setAction]);

  // https://sbcode.net/threejs/annotations/
  useFrame((_, delta) => {
    if (!action) {
      console.log("Not rendering");
      return;
    }

    if (cameramanRef.current) {
      console.log("rendeding");
      const cameraman: Mesh = cameramanRef.current;

      // Check that our ref objects exist
      if (cameramanRef.current && cameraman.children[0] && cameraman.children[1] && orbit.current) {
        // Change the camera position based on the cameraman camera position
        camera.position.lerp(cameraman.children[0].position, delta * 2);

        // Update & animate the orbit target from the cameraman target position
        orbit.current.target.lerp(cameraman.children[1].position, delta * 2);

        // // Update the orbit controls
        orbit.current.update();

        // Update the camera
        camera.updateProjectionMatrix();
        // If something's strange maybe use this too
        // camera.updateMatrixWorld();
      }
    }
  });

  // Orbit controls ref is the issue
  return (
    <group ref={cameramanRef}>
      {/* This component is used for the cameraman's camera position and for zoom/fov */}
      <CameramanCamera setChanged={setChanged} />
      {/* This component is used for the cameraman's target position to look at */}
      <CameraTarget setChanged={setChanged} />
      {/* This component is used to actually handling the look at action */}
      <OrbitControls ref={orbit} target={orbitTarget} camera={camera} domElement={gl.domElement} enabled={false} />
    </group>
  );
}

export default CameramanControls;
