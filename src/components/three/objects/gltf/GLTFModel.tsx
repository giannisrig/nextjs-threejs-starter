import { useGLTF } from "@react-three/drei";
import * as Three from "three";
import { GLTF } from "three-stdlib";
import { useAppDispatch } from "@/libs/store/store";
import { setScene1Loaded } from "@/slices/threeSlice";

type GLTFResult = GLTF & {
  nodes: {
    Pyramid: Three.Mesh;
    Model_7_1: any;
  };
  materials: {
    ["default"]: Three.MeshStandardMaterial;
  };
};
function GLTFModel({ url, ...props }) {
  const dispatch = useAppDispatch();

  // Get the nodes and materials of the model
  const { nodes, materials } = useGLTF(url, true, true, () => {
    // Update the state and start loading the scene for homepage
    dispatch(setScene1Loaded(true));
  }) as GLTFResult;

  useGLTF.preload(url);

  return (
    <group {...props} dispose={null}>
      <mesh
        geometry={nodes.Model_7_1.geometry}
        material={materials["Cube.001"]}
        position={[4.36, 17, -28.37]}
        rotation={[0, 0.35, -Math.PI]}
        scale={0.09}
      />
    </group>
  );
}

export default GLTFModel;
