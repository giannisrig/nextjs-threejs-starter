import React from "react";
import { folder, useControls } from "leva";

const Lights = () => {
  const { position1, intensity1, position2, intensity2, intensity } = useControls(
    "Lights",
    {
      "PointLight 1": folder(
        {
          intensity1: { value: 0.5, step: 0.05, min: 0, max: 1 },
          position1: { value: [-87, 18, 3], step: 1 }, //{"position1":[{"position1":[-87,18,-5]}]}
        },
        {
          collapsed: true,
        }
      ),
      "PointLight 2": folder(
        {
          intensity2: { value: 0.45, step: 0.05, min: 0, max: 1 },
          position2: { value: [-135, 12, 2], step: 1 }, //{"position2":[-135,12,2]}
        },
        {
          collapsed: true,
        }
      ),
      "Ambient Light": folder(
        {
          intensity: { value: 0.4, step: 0.05, min: 0, max: 1 },
        },
        {
          collapsed: true,
        }
      ),
    },
    {
      collapsed: true,
    }
  );

  return (
    <>
      <pointLight position={position1} intensity={intensity1} />
      <pointLight position={position2} intensity={intensity2} />
      <ambientLight intensity={intensity} />
    </>
  );
};

export default Lights;
