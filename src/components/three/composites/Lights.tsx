import React from "react";

const Lights = () => {
  return (
    <>
      <pointLight position={[-100, -100, -100]} />
      <pointLight position={[100, 100, 100]} />
      <ambientLight />
    </>
  );
};

export default Lights;
