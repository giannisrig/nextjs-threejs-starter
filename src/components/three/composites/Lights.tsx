import React from "react";
import { useControls } from "leva";

const Lights = () => {
  const { position1 } = useControls("PointLight 1", {
    position1: { value: [-100, -100, -100], step: 1 },
  });
  const { position2 } = useControls("PointLight 2", {
    position2: { value: [100, 100, 100], step: 1 },
  });
  const { intensity } = useControls("Ambient Light", {
    intensity: { value: 0.2, step: 0.1, min: 0, max: 1 },
  });
  return (
    <>
      <pointLight position={position1} />
      <pointLight position={position2} />
      <ambientLight intensity={intensity} />
    </>
  );
};

export default Lights;
