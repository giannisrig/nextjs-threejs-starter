import Image from "next/image";
import ScenePreloaderLink from "@/components/three/containers/ScenePreloaderLink";
export default function Logo() {
  return (
    <ScenePreloaderLink
      href={"/"}
      scene={1}
      className="cursor-hover flex items-center gap-[4px] transition-colors duration-200 hover:text-pink"
    >
      <Image src={"/images/demo/vercel.svg"} alt={"Logo of the Project"} width={22} height={22} />
      <span className="text-2xl font-light text-silver ">/</span>
      <h4 className={`font-primary text-lg font-semibold`}>NextJS Three Starter</h4>
    </ScenePreloaderLink>
  );
}
