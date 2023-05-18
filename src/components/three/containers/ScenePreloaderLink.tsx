import { ReactNodeWrapper } from "@/types/ReactNodeWrapper";
import { useEffect, useState } from "react";
import { RootState, useAppDispatch, useAppSelector } from "@/libs/store/store";
import { ThreeSceneState, ThreeStateLoadingAction } from "@/types/three/state";
import { setSceneLoading } from "@/slices/threeSlice";
import Link from "next/link";

interface ScenePreloaderLinkProps extends ReactNodeWrapper {
  scene: number;
  href: string;
  className?: string;
}

const ScenePreloaderLink = ({ scene, href, className = null, children, ...props }: ScenePreloaderLinkProps) => {
  const [hovered, setHovered] = useState(false);
  const dispatch = useAppDispatch();

  // Get the current scene state and the main scene state
  const { isLoaded, name }: { isLoaded: boolean; name: string } = useAppSelector((state: RootState) => {
    return state.three.scenes[1] as ThreeSceneState;
  });

  useEffect(() => {
    // If the scene is already loaded return
    if (isLoaded) return;

    if (hovered) {
      // Set up the loading action data
      const loadingAction: ThreeStateLoadingAction = {
        scene: scene,
        value: true,
      };

      // Update the state and start loading the scene
      dispatch(setSceneLoading(loadingAction));

      console.log("Preloading ", name);
    }
  }, [dispatch, hovered, isLoaded, name, scene]);

  return (
    <Link
      href={href}
      onMouseEnter={() => {
        setHovered(true);
      }}
      className={className}
      {...props}
    >
      {children}
    </Link>
  );
};

export default ScenePreloaderLink;
