"use client";
import { ReactNodeWrapper } from "@/types/ReactNodeWrapper";
import { useEffect, useState } from "react";
import Link from "next/link";
import useSound from "use-sound";

interface ScenePreloaderLinkProps extends ReactNodeWrapper {
  href: string;
  className?: string;
}

const ScenePreloaderLink = ({ href, className = "", children, ...props }: ScenePreloaderLinkProps) => {
  const [hovered, setHovered] = useState(false);
  // const dispatch = useAppDispatch();
  const [play, { stop }] = useSound("/sounds/hover.mp3");

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
