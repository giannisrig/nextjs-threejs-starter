import React from "react";
import { useControls } from "leva";

const Lights = () => {
  const { position1, intensity1 } = useControls("PointLight 1", {
    intensity1: { value: 1, step: 0.05, min: 0, max: 1 },
    position1: { value: [17, -100, -100], step: 1 }, //{"position1":[17,-100,-100]}
  });
  const { position2, intensity2 } = useControls("PointLight 2", {
    intensity2: { value: 0.4, step: 0.05, min: 0, max: 1 },
    position2: { value: [-256, -92, 100], step: 1 }, //{"position2":[-256,-92,100]}
  });
  const { intensity } = useControls("Ambient Light", {
    intensity: { value: 0.4, step: 0.05, min: 0, max: 1 },
  });
  return (
    <>
      <pointLight position={position1} intensity={intensity1} />
      <pointLight position={position2} intensity={intensity2} />
      <ambientLight intensity={intensity} />
    </>
  );
};

export default Lights;
