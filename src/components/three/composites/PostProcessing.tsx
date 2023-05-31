import { EffectComposer, Autofocus } from "@react-three/postprocessing";
import { useThree } from "@react-three/fiber";
import { useState } from "react";

// ===================================================================
// Three Postprocessing Effects documentation:
// @see: https://docs.pmnd.rs/react-postprocessing/effect-composer
// ===================================================================
const PostProcessing = () => {
  const [enabled, setEnabled] = useState(true);
  const { camera, scene } = useThree();
  return (
    <>
      camera && scene && (
      <EffectComposer enabled={enabled} multisampling={8} camera={camera} scene={scene}>
        <Autofocus mouse={true} />
      </EffectComposer>
      )
    </>
  );
};

export default PostProcessing;
