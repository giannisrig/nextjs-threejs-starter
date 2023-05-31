import MobileMenu from "@/components/common/mobileMenu/MobileMenu";
import HamburgerButton from "@/components/common/mobileMenu/HamburgerButton";
import Logo from "@/components/common/header/Logo";
import GithubLink from "@/components/common/header/GithubLink";
import ScenePreloaderLink from "@/components/three/containers/ScenePreloaderLink";

export default function Header() {
  return (
    <>
      <header className="fixed top-0 z-10 w-full border-b border-basicGray py-6 text-sm ">
        <div className="container">
          <div className="flex w-full items-center justify-between">
            <div className="flex items-center gap-20px">
              <Logo />
              <div className="h-[20px] w-[1px] bg-silver" />
              <GithubLink />
              <ScenePreloaderLink
                scene={2}
                href={"/test"}
                className="cursor-hover flex items-center gap-[4px] transition-colors duration-200 hover:text-pink"
              >
                <h4 className={`font-primary text-lg font-semibold`}>Test</h4>
              </ScenePreloaderLink>
            </div>

            <div className="flex items-center gap-20px">
              <HamburgerButton />
            </div>
          </div>
        </div>
      </header>
      <MobileMenu />
    </>
  );
}
