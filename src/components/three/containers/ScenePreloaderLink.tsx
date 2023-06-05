import { ReactNodeWrapper } from "@/types/ReactNodeWrapper";
import { useEffect, useState } from "react";
import { useAppDispatch } from "@/libs/store/store";
import { ThreeState, ThreeStateLoadingAction } from "@/types/three/state";
import { setSceneLoading } from "@/slices/threeSlice";
import Link from "next/link";
import useThreeState from "@/libs/hooks/useThreeState";
import useSound from "use-sound";

interface ScenePreloaderLinkProps extends ReactNodeWrapper {
  scene: number;
  href: string;
  className?: string;
}

const ScenePreloaderLink = ({ scene, href, className = null, children, ...props }: ScenePreloaderLinkProps) => {
  const [hovered, setHovered] = useState(false);
  const dispatch = useAppDispatch();
  const [play, { stop }] = useSound("/sounds/hover.mp3");

  // Get the scenes from three state
  const { scenes } = useThreeState() as ThreeState;

  // Get the current scene's loaded state and its name
  const isLoaded = scenes[scene].isLoaded ? scenes[scene].isLoaded : false;
  const name = scenes[scene].name;

  useEffect(() => {
    // If the scene is already loaded return
    if (isLoaded) return;

    // If not hovered return
    if (!hovered) return;

    // Set up the loading action data
    const loadingAction: ThreeStateLoadingAction = {
      scene: scene,
      value: true,
    };

    // Update the state and start loading the scene
    dispatch(setSceneLoading(loadingAction));

    console.log("Preloading ", name);
  }, [dispatch, hovered, isLoaded, name, scene]);

  useEffect(() => {
    if (hovered) {
      play();
    } else {
      stop();
    }
  }, [hovered, play, stop]);

  return (
    <Link
      href={href}
      onMouseEnter={() => {
        setHovered(true);
      }}
      onMouseLeave={() => {
        setHovered(false);
      }}
      className={className}
      {...props}
    >
      {children}
    </Link>
  );
};

export default ScenePreloaderLink;
