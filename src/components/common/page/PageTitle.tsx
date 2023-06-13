"use client";
import { useEffect } from "react";
import { RootState, useAppSelector } from "@/libs/store/store";
import gsap from "gsap";

export default function PageTitle({ title }) {
  // Get the Redux state for the enteredWebsite
  const enteredWebsite = useAppSelector((state: RootState) => state.loading.entered); // updated

  useEffect(() => {
    if (enteredWebsite) {
      gsap.to("#pageTitle", { opacity: 1, duration: 3 });
    }
  }, [enteredWebsite]);

  return (
    <h1
      id="pageTitle"
      className="fixed left-[50%] top-[40%] z-99 w-[1000px] translate-x-[-50%] translate-y-[-50%] text-center font-secondary text-[80px] leading-[90px] text-black opacity-0"
    >
      {title}
    </h1>
  );
}
