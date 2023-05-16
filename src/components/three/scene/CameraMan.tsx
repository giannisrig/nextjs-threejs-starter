import { useFrame, useThree } from "@react-three/fiber";
import { useMemo } from "react";
import CameraControls from "camera-controls";
import * as THREE from "three";

CameraControls.install({ THREE });

function CameraMan({ zoom, focus, pos = new THREE.Vector3(), look = new THREE.Vector3() }) {
  const camera = useThree((state) => state.camera);
  const gl = useThree((state) => state.gl);
  const controls = useMemo(() => new CameraControls(camera, gl.domElement), [camera, gl.domElement]);
  return useFrame((state, delta) => {
    zoom ? pos.set(focus.x, focus.y, focus.z + 0.2) : pos.set(10, 5, 40);
    zoom ? look.set(focus.x, focus.y, focus.z - 0.2) : look.set(0, 2, 0);

    state.camera.position.lerp(pos, 0.5);
    state.camera.updateProjectionMatrix();

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
    return controls.update(delta);
  });
}

export default CameraMan;
