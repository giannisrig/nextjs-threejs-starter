import Image from "next/image";
import Link from "next/link";
import { useAppDispatch } from "@/libs/store/store";
import { useEffect, useState } from "react";
import { setScene1Loading } from "@/slices/sceneSlice";
export default function Logo() {
  const dispatch = useAppDispatch();

  const [hovered, setHovered] = useState(false);

  useEffect(() => {
    if (hovered) {
      // Update the state and start loading the scene for homepage
      dispatch(setScene1Loading(true));

      console.log("Preloading scene1");
    }
  }, [dispatch, hovered]);

  return (
    <Link
      href={"/"}
      onMouseEnter={() => {
        setHovered(true);
      }}
      className="cursor-hover flex items-center gap-[4px] transition-colors duration-200 hover:text-pink"
    >
      <Image src={"/images/demo/vercel.svg"} alt={"Logo of the Project"} width={22} height={22} />
      <span className="text-2xl font-light text-silver ">/</span>
      <h4 className={`font-primary text-lg font-semibold`}>NextJS Three Starter</h4>
    </Link>
  );
}
