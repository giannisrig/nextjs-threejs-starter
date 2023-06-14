"use client";
import { useEffect } from "react";
import { RootState, useAppSelector } from "@/libs/store/store";
import gsap from "gsap";

const TextContent = ({ children }) => {
  const selector = useAppSelector;
  const mobileMenuOpen = selector((state: RootState) => state.mobileMenu.open); // updated

  useEffect(() => {
    gsap.to("#textContent", { opacity: mobileMenuOpen ? 0 : 1, duration: 0.2 });
  }, [mobileMenuOpen]);

  return <div id="textContent">{children}</div>;
};

export default TextContent;
