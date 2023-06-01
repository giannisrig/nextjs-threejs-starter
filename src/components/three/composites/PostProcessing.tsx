import { EffectComposer, Autofocus } from "@react-three/postprocessing";

// ===================================================================
// Three Postprocessing Effects documentation:
// @see: https://docs.pmnd.rs/react-postprocessing/effect-composer
// ===================================================================
const PostProcessing = () => {
  return (
    <>
      <EffectComposer enabled={false} multisampling={0}>
        <Autofocus />
      </EffectComposer>
    </>
  );
};

export default PostProcessing;
