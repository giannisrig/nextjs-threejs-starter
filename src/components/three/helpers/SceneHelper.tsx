import { Stats } from "@react-three/drei";

const SceneHelper = () => {
  // https://threejs.org/docs/#api/en/helpers/AxesHelper
  // https://threejs.org/docs/?q=grid#api/en/helpers/GridHelper

  return (
    <>
      <axesHelper args={[1000]} />
      <gridHelper args={[1000, 100]} />
      <Stats />
    </>
  );
};

export default SceneHelper;
